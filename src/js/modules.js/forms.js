import {customHttp} from "../services/customRequests";

export default function initForms() {
    const forms = document.body.querySelectorAll("form");
    inputsInit();

    forms.forEach(form => {
        form.addEventListener("submit", e => {
            e.preventDefault();
            showMsg(form, "SENDING...", "violet");
            const formData = new FormData(form);

            if (form.getAttribute("data-type") === "media") {
                customHttp.post("assets/server.php", formData)
                    .then(res => {
                        console.log(res);
                        removeMsg();
                        showSuccessMsg(form, 3000);
                    })
                    .catch(err => {
                        console.log(err);
                        removeMsg();
                        showMsg(form, "SOMTHING WENT WRONG. PLEASE CHECK YOUR CONECTION", "red", 5000);
                    })
                    .finally(clearInputs(form));
            } else {
                customHttp.post("assets/questions.php", formData)
                    .then(res => {
                        console.log(res);
                        removeMsg();
                        showSuccessMsg(form, 3000);
                    })
                    .catch(err => {
                        console.log(err);
                        removeMsg();
                        showMsg(form, "SOMTHING WENT WRONG. PLEASE CHECK YOUR CONECTION", "red", 5000);
                    })
                    .finally(clearInputs(form));
            }
        })
    })
    function showMsg(form, msg, color, time) {
        const div = document.createElement("div");
        const formParent = form.parentElement;
        div.textContent = msg;
        div.style.color = color;
        div.classList.add("showMsgBlock", "animated", "fadeInUp");
        formParent.appendChild(div);
        form.style = "display: none";
        if (time) {
            setTimeout(() => {
            div.remove();
            form.style = "display: block";
        }, time)
        }
    }
    function removeMsg() {
        document.querySelector(".showMsgBlock").remove();
    }
    function showSuccessMsg(form, time) {
        const formParent = form.parentElement;
        const img = document.createElement("img");
        const div = document.createElement("div");
        div.textContent = "Thank you! In about 5 minutes we'll call you back";
        div.classList.add("successMsg");
        img.setAttribute("src", "assets/img/ok.png");
        img.classList.add("successMsg");
        form.classList.add("animated", "fadeOutUp");
        form.style = "display: none;";
        img.classList.add("animated", "fadeInUp");
        formParent.appendChild(img);
        formParent.appendChild(div);
        formParent.style = "text-align: center;"
        setTimeout(() => {
            document.querySelectorAll(".successMsg").forEach(elem => {
                elem.classList.remove("fadeInUp");
                elem.classList.add("fadeOutUp");
                setTimeout(() => {
                    elem.remove();
                }, 400)
            })
            form.classList.remove("fadeOutUp");
            form.classList.add("fadeInUp");
            setTimeout(() => {
                form.style = "display: block";
            }, 400);
        }, time)
    }
    function inputsInit() {
        const inputs = document.body.querySelectorAll("[name='upload']");
        inputs.forEach(input => {
            input.addEventListener("input", () => {
                console.log(input.files[0].name);
                const textBlock = input.previousElementSibling;
                let fileName = input.files[0].name;

                if (fileName.split(".")[0].length < 7) {
                    console.log("ggggggg");
                    textBlock.textContent = fileName;
                } else {
                    const arr = fileName.split(".");
                    textBlock.textContent = arr[0].slice(0, 7) + "..." + arr[1];
                }
            })
        })
    }
    function clearInputs(form) {
        form.reset();
        const inputs = document.body.querySelectorAll("[name='upload']");
        inputs.forEach(input => {
            input.previousElementSibling.textContent = "File has not chosen";
        })
    }
}
