const trackType = document.querySelector("#track-type");
const startIndex = document.querySelector("#start-index");
const endIndex = document.querySelector("#end-index");
const trackName = document.querySelector("#name");
const incrementNumber = document.querySelector("#increment-number");
const numberPosition = document.querySelector("#number-position");
const btn = document.querySelector("#rename");

const incrementNumberOptions = document.querySelector(".increment-number-options");

window.onload = async function () {
    //await window.appAPI.setTrackName("audio", 1, "test");
}


btn.addEventListener("click", async (e) => {
    e.preventDefault();

    const addIncrementNumber = incrementNumber.checked;
    const start = Number(startIndex.value);
    const end = Number(endIndex.value);
    if (!addIncrementNumber) {
        const name = trackName ? trackName.value : "";
        for (let i = start; i <= end; i++) {
            await window.appAPI.setTrackName(trackType.value.toString(), i, name);
        }
    } else {
        let index = 1;
        for (let i = start; i <= end; i++) {
            const name = numberPosition.value == "before" ?
                `${String(index).padStart(2, "0")}${trackName.value}` :
                `${trackName.value}${String(index).padStart(2, "0")}`;

            await window.appAPI.setTrackName(trackType.value.toString(), i, name);
            index++;
        }
    }
});

incrementNumber.addEventListener("click", () => {
    if (incrementNumber.checked) {
        incrementNumberOptions.classList.remove("hide")
    } else {
        incrementNumberOptions.classList.add("hide");
    }
});