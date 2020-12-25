export default function dropInit() {
    function fileInputsInit(inputsSelector) {
        const inputs = document.body.querySelectorAll(inputsSelector);

        inputs.forEach(input => {
            const inputContainer = input.parentElement;

            input.addEventListener("drop", (e) => {
                e.preventDefault();
                e.stopPropagation();
                input.files = e.dataTransfer.files;
                inputContainer.style = "";

                const textBlock = input.previousElementSibling;
                let fileName = input.files[0].name;

                if (fileName.split(".")[0].length < 7) {
                    textBlock.textContent = fileName;
                } else {
                    const arr = fileName.split(".");
                    textBlock.textContent = arr[0].slice(0, 7) + "..." + arr[1];
                }
            })
            input.addEventListener("dragleave", () => {
                inputContainer.style = "";
            })
        });
        ["dragenter", "dragover"].forEach(eventName => {
            inputs.forEach(input => {
                input.addEventListener(eventName, () => {
                    const inputContainer = input.parentElement;
                    inputContainer.style = "border: 4px dashed violet; border-radius: 15px; background: rgba(238,130,238 , .5);";
                })
            })
        })
    }
    fileInputsInit("[name='upload']");
}