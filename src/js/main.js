import initModals from "./modules.js/modal";
import slidersInit from "./modules.js/slider";
import initForms from "./modules.js/forms";
import mask from "./modules.js/mask";
import showMoreStyle from "./modules.js/showMoreStyles";
import calcPicturePriceInit from "./modules.js/calcPicturePrice";
import initFilterPicture from "./modules.js/picturesFilter";
import initPicturesSizes from "./modules.js/pictureSizes";
import initAccordion from "./modules.js/accordion";
import initBurger from "./modules.js/burger";
import initFastScrolling from "./modules.js/srcolling";
import dropInit from "./modules.js/drop";

document.addEventListener("DOMContentLoaded", () => {
    initModals();
    slidersInit();  
    initForms();
    mask("[name='phone']");
    showMoreStyle(".button-styles", ".styles-2");
    calcPicturePriceInit();
    initFilterPicture();
    initPicturesSizes(".sizes-block");
    initAccordion("#accordion .accordion-heading");
    initBurger(".burger", ".burger-menu");
    initFastScrolling(".pageup");
    dropInit();
})