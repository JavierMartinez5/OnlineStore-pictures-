export default function initAccordion(triggers) {
    const btns = document.body.querySelectorAll(triggers);

    btns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            const content = btn.nextElementSibling;
            closeAllActiveHeaders(btns, e);
            console.log("aaaaaaaaa");
            contentManager(content, btn);
        })
    })
    function contentManager(content, btn) {
        btn.classList.toggle("ui-accordion-header-active");
        content.classList.toggle("active-style");

        if (content.classList.contains("active-style")) {
            content.style = `max-height: ${content.scrollHeight + 80}px`;
        } else {
            content.style = "max-height: 0px";
        }
    }
    function closeAllActiveHeaders(btns, e) {
        btns.forEach(btn => {
            if (btn === e.currentTarget) return;
            const content = btn.nextElementSibling;
            btn.classList.remove("ui-accordion-header-active");
            content.classList.remove("active-style");
            content.style = "max-height: 0px";
        })
    }
}