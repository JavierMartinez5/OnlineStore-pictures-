export default function initPicturesSizes(picturesBlockSelector) {
    const picturesBlock = document.body.querySelectorAll(picturesBlockSelector);

    picturesBlock.forEach(pictureBlock => {
        pictureBlock.addEventListener("mouseover", () => {
            setPictureSizeMode("mouseover", pictureBlock);
        })
        pictureBlock.addEventListener("mouseout", () => {
            setPictureSizeMode("mouseout", pictureBlock);
        })
    })
    function setPictureSizeMode(mode, pictureBlock) {
        const img = pictureBlock.querySelector("img");

        if (mode === "mouseover") {
            img.src = img.src.slice(0, -4) + "-1.png";
            pictureBlock.children.forEach(element => {
                if (element.tagName !== "IMG") {
                    console.log(element)
                    element.style = "display: none";
                }
            });
        } else {
            img.src = img.src.slice(0, -6) + ".png";
            pictureBlock.children.forEach(element => {
                element.display = "block";
            })
        }
    }
}