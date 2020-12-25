export default function initFilterPicture() {
    function fileterProfilePicture(portfolioBtnsSelector, portfolioContainerSelector, noPicturesMsgSelector) {
        const portfolioBtns = document.body.querySelectorAll(portfolioBtnsSelector),
            portfolioContainer = document.body.querySelector(portfolioContainerSelector),
            noPicturesMsg = document.body.querySelector(noPicturesMsgSelector);
        
        portfolioBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                const btnClass = btn.classList[0];
                const picturesWithBtnClass = portfolioContainer.querySelectorAll(`.${btnClass}`);

                clearContainer(portfolioContainer, noPicturesMsg);
                clearActiveBtnState(portfolioBtns);
                displayPictures(picturesWithBtnClass);
                setNewActiveBtnState(btn);
                emptyContainerHandler(portfolioContainer, noPicturesMsg);
            })
        })
        function clearContainer(container, noPicturesMsg) {
            container.children.forEach(picture => {
                picture.style = "display: none";
                noPicturesMsg.style.display = "none";
            })
        }
        function clearActiveBtnState(btns) {
            btns.forEach(btn => {
                btn.classList.remove("active");
            })
        }
        function displayPictures(pictures) {
            pictures.forEach(picture => {
                picture.classList.add("animated", "fadeIn");
                picture.style = "display: block";
            })
        }
        function setNewActiveBtnState(btn) {
            btn.classList.add("active");
        }
        function emptyContainerHandler(portfolioContainer, noPicturesMsg) {
            const isEmptyPictureContainer = [...portfolioContainer.children].every(picture => {
                if (picture.style.display === "none") {
                    return true;
                } else {
                    return false;
                }
            })
            if (isEmptyPictureContainer) {
                noPicturesMsg.style.display = "block";
            }
        }
    }
    fileterProfilePicture(".portfolio-menu li", ".portfolio-wrapper", ".portfolio-no");
}