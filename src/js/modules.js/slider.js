export default function slidersInit() {
    function initSlider(slidesSelector, leftBtnSelector, rigthBtnSelector, time, direction = "left") {
        const slides = document.body.querySelectorAll(slidesSelector),
            leftBtnSlider = document.body.querySelector(leftBtnSelector),
            rightBtnSlider = document.body.querySelector(rigthBtnSelector);
        let currentSlideIndex = slides.length - 1;
        // document.body.style = "overflow-x: hidden;"
        setInitialSlide(currentSlideIndex);
        setAnimatedClassToSliders(slides);
        if (time) {
            const slidesContainer = slides[0].parentElement;
            changeSlidesAuto(time, slidesContainer);
        }
        if (leftBtnSlider && rightBtnSlider) {
            leftBtnSlider.addEventListener("click", () => {
                hideAllSlides();
                showSlide("left");
            })
            rightBtnSlider.addEventListener("click", () => {
                hideAllSlides();
                showSlide("right");
            })
        }

        function showSlide(direction) {
            switch (direction) {
                case "right" : 
                    currentSlideIndex += 1;
                    if (currentSlideIndex == slides.length) {
                        currentSlideIndex = 0;
                    }
                    slides[currentSlideIndex].classList.remove("slideInLeft");
                    slides[currentSlideIndex].classList.add("slideInRight");
                    slides[currentSlideIndex].style.display = "block";
                    break;
                case "left" :
                    currentSlideIndex -= 1;
                    if (currentSlideIndex < 0) {
                        currentSlideIndex = slides.length - 1;
                    }
                    slides[currentSlideIndex].classList.remove("slideInRight");
                    slides[currentSlideIndex].classList.add("slideInLeft");
                    slides[currentSlideIndex].style.display = "block";
                    break;
                case "down" :
                    currentSlideIndex += 1;
                    if (currentSlideIndex == slides.length) {
                        currentSlideIndex = 0;
                    }
                    slides[currentSlideIndex].classList.add("slideInDown");
                    slides[currentSlideIndex].style.display = "block";
                    break;
            }
        }
        function hideAllSlides() {
            slides.forEach(slide => {
                slide.style.display = "none";
            })
        }
        function setInitialSlide() {
            hideAllSlides();
            showSlide(direction);
        }
        function setAnimatedClassToSliders(sliders) {
            sliders.forEach(slide =>  {
                slide.classList.add("animated");
            })
        }
        function changeSlidesAuto(time, slidesContainer) {
            let intervalId = startSliding(time);

            slidesContainer.addEventListener("mouseenter", () => {
                clearInterval(intervalId);
            })
            slidesContainer.addEventListener("mouseleave", () => {
                intervalId = startSliding(time);
            })

            function startSliding(time) {
                return setInterval(() => {
                    hideAllSlides();
                    showSlide(direction);
                }, time);
            }
        }
    }
    initSlider(".feedback-slider-item", ".main-prev-btn", ".main-next-btn", 3000);
    initSlider(".main-slider-item", null, null, 3000, "down");
}