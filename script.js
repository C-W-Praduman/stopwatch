// selecting dom element
const time = document.querySelector(".clock");
const gettime = document.querySelector(".showtime");
const startbtn = document.getElementById("start")
const resetbtn = document.getElementById("reset")
const stopbtn = document.getElementById("stop")
const gettimebtn = document.getElementById("gettime")
const cleartimebtn = document.getElementById("cleartime")
let startcount = 1
let minutecount = 0
let IntervalId;
let isRunning = false;
// ⏱ Format the time properly before displaying
const updatetimeDisplay = () => {
    const paddedMinute = minutecount < 10 ? `0${minutecount}` : minutecount;
    const paddedSecond = startcount < 10 ? `0${startcount}` : startcount;
    time.innerHTML = `${paddedMinute}:${paddedSecond}`;
};
// 🚀 Load saved time from localStorage
const showLOcalstorageData = () => {
    let returneddata = JSON.parse(localStorage.getItem("clocktimer"));
    if (!returneddata) return; // ✅ Safe exit if no data

    if (returneddata[1] == 0) {
        startcount = returneddata[1];
    } else {

        minutecount = returneddata[0];
        startcount = returneddata[1] - 1;
    }

    updatetimeDisplay();
}


showLOcalstorageData()

// 💾 Save the current minute and second count
const setlocalstoragedata = (data) => {
    localStorage.setItem("clocktimer", JSON.stringify(data))
}
// ⏳ Start the stopwatch
const timer = () => {
    if (isRunning) return;

    isRunning = true

    IntervalId = setInterval(() => {

        if (startcount >= 60) {
            minutecount++
            startcount = 0
        }
        updatetimeDisplay();
        startcount++
    }, 1000);

}
startbtn.addEventListener("click", () => {
    timer()
})
// ⏹ Stop the stopwatch
stopbtn.addEventListener("click", () => {
    isRunning = false
    clearInterval(IntervalId)
    let data = [minutecount, startcount]
    setlocalstoragedata(data)
})
// 📌 Show time on "Get Time" click
gettimebtn.addEventListener("click", () => {
    gettime.innerHTML += `<p>🕒 Time captured: ${time.textContent}</p>`;
})
// 🔄 Reset the stopwatch
resetbtn.addEventListener("click", () => {
    minutecount = 0
    startcount = 0
    clearInterval(IntervalId)
    updatetimeDisplay()
    let data = [minutecount, startcount];
    setlocalstoragedata(data)
})
// ❌ Clear captured times
cleartimebtn.addEventListener("click", () => {
    gettime.innerHTML = ""

})