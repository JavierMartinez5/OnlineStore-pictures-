import {customHttp} from "../services/customRequests";
export default function showMoreStyle(triggerSelector) {
    const trigger = document.body.querySelector(triggerSelector);
    
    trigger.addEventListener("click", () => {
        customHttp.get("http://localhost:3000/styles")
            .then(res => {
                const cards = createCards(res);
                renderCards(cards);
            })
            .catch(err => console.log(err))
            .finally(trigger.remove());
    })
    function createCards(response) {
        let fragment = "";
        response.forEach(({src, title, link}) => {
            const card = `
                <div class="animated fadeInUp col-sm-3 col-sm-offset-0 col-xs-10 col-xs-offset-1">
                    <div class="styles-block">
                        <img src="${src}" alt="style">
                        <h4>${title}</h4>
                        <a href="${link}">Подробнее</a>
                    </div>
                </div>
            `
            fragment += card;
        });
        return fragment;
    }
    function renderCards(cards) {
        document.body.querySelector("#styles .row").insertAdjacentHTML("beforeend", cards);
    }
}