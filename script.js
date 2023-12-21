//Variable
let trackImg = document.querySelector(".trackImg");
let trackName = document.querySelector(".trackName");
let trackArt = document.querySelector(".trackArt");
let audio = document.querySelector(".audio");
let preBtn = document.querySelector(".preBtn");
let playBtn = document.querySelector(".playBtn");
let pauseBtn = document.querySelector(".pauseBtn");
let nextBtn = document.querySelector(".nextBtn");
let totalTime = document.querySelector(".totalTime");
let currentTime = document.querySelector(".currentTime");
let currentTimeBar = document.querySelector(".currentTimeBar");

let count = 0;
let isPlay = false;
//Song Array
const songs = [
    {
        name: "ညီလေး",
        singer: "မျိုးကြီး",
        image: "./image/music1.jpg",
        songPath: "./music/music1.mp3",
    },
    {
        name: "တရက်တော့ငိုပါ",
        singer: "အေးမြနန္ဒာ",
        image: "./image/music2.png",
        songPath: "./music/music2.mp3",
    },
    {
        name: "သားကြီးတို့အေးဆေး",
        singer: "ရေမွန် + ဟန်နေသာ",
        image: "./image/music3.jpg",
        songPath: "./music/music3.mp3",
    }
]

// Start Function
function start() {
    trackImg.style.backgroundImage = "url(" + songs[count].image + ")";
    trackName.innerHTML = songs[count].name;
    trackArt.innerHTML = songs[count].singer;
    audio.src = songs[count].songPath;
    preBtn.classList.add("disabled");
    //audio.play();
}

//Play
function playMusic() {
    audio.play();
    isPlay = true;
    playBtn.classList.add("hidden");
    pauseBtn.classList.remove("hidden");
}

//Pause
function pauseMusic() {
    audio.pause();
    isPlay = false;
    playBtn.classList.remove("hidden");
    pauseBtn.classList.add("hidden");
}

//Next
function nextMusic() {
    if (count < songs.length - 1) {
        randomBgBolor();
        count++;
        start();
        preBtn.classList.remove("disabled");
        if (isPlay) {
            playBtn.classList.add("hidden");
            pauseBtn.classList.remove("hidden");
            audio.play();
        }
    }
    if (count == songs.length - 1) {
        nextBtn.classList.add("disabled");
    }
}

//Previous
function previousMusic() {
    if (count > 0) {
        randomBgBolor();
        nextBtn.classList.remove("disabled");
        count--;
        start();
        if (isPlay) {
            playBtn.classList.add("hidden");
            pauseBtn.classList.remove("hidden");
            audio.play();
        }
        preBtn.classList.remove("disabled");
    }
    if (count == 0) {
        preBtn.classList.add("disabled");
        return;
    }
}

//Track Length
audio.addEventListener("loadeddata", function () {
    let totalDuration = Math.floor(audio.duration);
    let minutes = Math.floor(totalDuration / 60);
    let seconds = Math.floor(totalDuration % 60);

    totalTime.innerHTML = (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds);

    audio.addEventListener("timeupdate", function () {
        let currentDuration = Math.floor(audio.currentTime);
        let minutes = Math.floor(currentDuration / 60);
        let seconds = Math.floor(currentDuration % 60);

        currentTime.innerHTML = (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds);

        currentTimeBar.style.width = ((currentDuration / totalDuration) * 400) + "px";

        if(currentDuration == totalDuration){
            if (count == songs.length - 1) {
                playBtn.classList.remove("hidden");
                pauseBtn.classList.add("hidden");
            }
            nextMusic();
        }
    })
})


//Random BG Color
function randomBgBolor() {
    let red = Math.floor(Math.random() * 256) + 150;
    let green = Math.floor(Math.random() * 256) + 150;
    let blue = Math.floor(Math.random() * 256) + 150;

    let bgColor = "rgb(" + red + "," + green + "," + blue + ")";
    document.body.style.background = bgColor;
}

start();