export default function initModals() {
    function initModal(triggersSelector, modalSelector, closeBtnSelector, outlineCloseMode = true, destroyTrigerAfterClick = false) {
        const triggers = document.body.querySelectorAll(triggersSelector),
            modal = document.body.querySelector(modalSelector),
            closeBtn = document.body.querySelector(closeBtnSelector);
        
        bindTriggersToModal(triggers, modal, destroyTrigerAfterClick);
        initCloseModalManager(closeBtn, modal, outlineCloseMode);
        animateModal(modal);
    }
    function bindTriggersToModal(triggers, modal, destroyTrigerMode) {
        triggers.forEach(trigger => {
            trigger.addEventListener("click", () => {
                modal.style.display = "block";
                document.body.classList.add("modal-open");
                managePageMargin("add");
                if (destroyTrigerMode) {
                    trigger.remove();
                }
                isClickedAnyBtn = true;
            })
        });
    }
    function initCloseModalManager(closeElement, modal, outlineCloseMode) {
        closeElement.addEventListener("click", () => {
            modal.style.display = "none";
            document.body.classList.remove("modal-open");
            managePageMargin("reset");
        })
        modal.addEventListener("click", (e) => {
            if (e.target === modal && outlineCloseMode) {
                modal.style.display = "none";
                document.body.classList.remove("modal-open");
                managePageMargin("reset");
            }
        })
    }
    function showModalByTime(modalSelector, time) {
        setTimeout(() => {
            if (!document.body.classList.contains("modal-open")) {
                const modal = document.body.querySelector(modalSelector);
                modal.style.display = "block";
                document.body.classList.add("modal-open");
                managePageMargin("add");
            }
        }, time);
    }

    function calcScrollWidth() {
        const div = document.createElement("div");
        div.style.visibility = "hidden";
        div.style.height = "50px";
        div.style.width = "50px";
        div.style.overflowY = "scroll";
        document.body.appendChild(div);
        const scrollWidth = div.offsetWidth - div.clientWidth;
        div.remove();
        return scrollWidth;
    }
    function managePageMargin(mode) {
        switch (mode) {
            case "add":
                document.body.style.marginRight = `${scrollWidth}px`;
                document.querySelector(".fixed-gift").style.marginRight = `${scrollWidth}px`;
                break;
            case "reset":
                document.body.style.marginRight = "0px";
                // document.querySelector(".fixed-gift").style.marginRight = "0px";
                break;
        }
    }

    function showGiftAtTheEndOfThePage() {
        window.addEventListener("scroll", () => {
            if (!isClickedAnyBtn && (window.pageYOffset + document.documentElement.clientHeight >= 
                document.documentElement.scrollHeight)) {
                    document.querySelector(".fixed-gift").click();
                }
        })
    }

    function animateModal(modal) {
        modal.classList.add("animated", "fadeIn");
    }

    const scrollWidth = calcScrollWidth();
    let isClickedAnyBtn = false;

    showModalByTime(".popup-consultation", 3000);
    initModal(".button-design", ".popup-design", ".popup-design .popup-close");
    initModal(".button-consultation", ".popup-consultation", ".popup-consultation .popup-close");
    initModal(".fixed-gift", ".popup-gift", ".popup-gift .popup-close", false, true);
    showGiftAtTheEndOfThePage();
}