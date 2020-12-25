export default function initBurger(burgerBtnSelector, menuListSelector) {
    const burgerBtn = document.body.querySelector(burgerBtnSelector),
        menuList = document.body.querySelector(menuListSelector);
    
    burgerBtn.addEventListener("click", () => {
        const display = menuList.style.display;

        if (display === "none" && window.screen.availWidth < 993) {
            menuList.style.display = "block";
            console.log("open");
        } else {
            menuList.style.display = "none";
            console.log("close");
        }
    })
    window.addEventListener("resize", () => {
        if (window.screen.availWidth > 992) {
            menuList.style.display = "none";
        }
    })
}