const trackType = document.querySelector("#track-type");
const startIndex = document.querySelector("#start-index");
const endIndex = document.querySelector("#end-index");
const trackName = document.querySelector("#name");
const incrementNumber = document.querySelector("#increment-number");
const numberPosition = document.querySelector("#number-position");
const btn = document.querySelector("#rename");
const warning = document.querySelector(".warning");

const incrementNumberOptions = document.querySelector(".increment-number-options");

btn.addEventListener("click", async (e) => {
    e.preventDefault();

    const trackTypeValue = trackType.value.toString();
    const trackCount = await window.appAPI.trackCount(trackTypeValue);

    const addIncrementNumber = incrementNumber.checked;
    const start = Number(startIndex.value);
    const end = (() => {
        const endVal = Number(endIndex.value);
        return endVal <= trackCount ? endVal : trackCount;
    })()

    if (!addIncrementNumber) {
        const name = trackName ? trackName.value : "";
        for (let i = start; i <= end; i++) {
            await window.appAPI.setTrackName(trackTypeValue, i, name);
        }
    } else {
        let index = 1;
        for (let i = start; i <= end; i++) {
            const name = numberPosition.value == "before" ?
                `${String(index).padStart(2, "0")}${trackName.value}` :
                `${trackName.value}${String(index).padStart(2, "0")}`;

            await window.appAPI.setTrackName(trackTypeValue, i, name);
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

const toggleWarning = (e) => {
    if (trackName.value != "") {
        btn.disabled = false;
        warning.classList.add("hide");
    } else {
        btn.disabled = true;
        warning.classList.remove("hide");
    }
}

trackName.addEventListener("input", toggleWarning);
trackName.addEventListener("blur", toggleWarning);

btn.disabled = true;