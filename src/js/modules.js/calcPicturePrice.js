
import {customHttp} from "../services/customRequests";
export default function calcPicturePriceInit() {
    function calcPicturePrice(selectsSelector, promocodeSelector, priceBlockSelector, promocode) {
        const selects = document.querySelectorAll(selectsSelector),
            promocodeInput = document.querySelector(promocodeSelector),
            priceBlock = document.querySelector(priceBlockSelector);
        let pricesStore = {};
        console.log([...selects]);

        initRequiredSelects(selects, priceBlock);

        promocodeInput.addEventListener("input", () => {
            checkIsPromoValid();
        })

        function initRequiredSelects(allSelects, priceBlock) {
            allSelects.forEach(selectElement => {
                selectElement.addEventListener("change", () => {
                    customHttp.get("http://localhost:3000/prices")
                        .then(response => {
                            const selectName = selectElement.getAttribute("id");
                            pricesStore[selectName] = response[selectName][selectElement.value];
                        })
                        .then(() => {
                            const areSelected = areRequiredSelectsValid(allSelects);
                            console.log(areSelected)
                            if (areSelected) {
                                let sum = 0;
                                allSelects.forEach(select => {
                                    if (typeof pricesStore[select.getAttribute("id")] === "undefined") {
                                        return;
                                    }
                                    sum += pricesStore[select.getAttribute("id")];
                                    console.log(pricesStore[select.getAttribute("id")]);
                                })
                                priceBlock.textContent = sum;

                                checkIsPromoValid();
                            } else {
                                priceBlock.textContent = "Please select at least size and material of the picture";
                                promocodeInput.style = "background-color: white;";
                            }
                        })
                        .catch(err => console.log(err));
                });
            
            })
        }

        function calcPriceWithDiscount() {
            let sum = 0;
            Object.values(pricesStore).forEach(price => {
                sum += price;
            })
            priceBlock.textContent = Math.round(sum * 0.7);
        }

        function checkIsPromoValid() {
            const areSelectsValid = areRequiredSelectsValid(selects);
            if (promocodeInput.value === promocode && areSelectsValid) {
                calcPriceWithDiscount(pricesStore, priceBlock);
                promocodeInput.style = "background-color: lime;";
            } else {
                let sum = 0;
                Object.values(pricesStore).forEach(price => {
                    console.log(price);
                    if (typeof price !== "undefined") {
                        sum += price;
                    }
                })
                console.log("sum =", sum)
                if (sum && areSelectsValid) {
                    priceBlock.textContent = sum;
                }
                promocodeInput.style = "background-color: white;";
            }
        }

        function areRequiredSelectsValid(allSelects) {
            return [...allSelects].every(select => {
                console.log(select.classList.contains("priceRequired"));
                if (!select.classList.contains("priceRequired")) {
                    return true;
                } 
                return pricesStore[select.getAttribute("id")];
            })
        }
    }
    

    
    

    calcPicturePrice(".calc select", ".calc .promocode",".calc .calc-price", "IWANTPOPART");
    console.log(document.querySelector(".portfolio-menu .active").classList[0]);
}