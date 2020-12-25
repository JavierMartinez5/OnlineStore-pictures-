export default function initFastScrolling(btnTriggerSelector) {
    const btnTrigger = document.body.querySelector(btnTriggerSelector);

    btnTrigger.style.display = "none";

    window.addEventListener("scroll", () => {
        if (document.documentElement.scrollTop > 1600) {
            btnTrigger.classList.add("animated", "fadeIn");
            btnTrigger.classList.remove("fadeOut");
            btnTrigger.style.display = "";
        } else {
            btnTrigger.classList.add("fadeOut");
            btnTrigger.classList.remove("fadeIn");
            
            setTimeout(() => {
                if (document.documentElement.scrollTop > 1600) return;
                btnTrigger.style.display = "none";
            }, 1000);
        }
    })
}