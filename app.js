class DrumKit {
  constructor() {
    this.pads = document.querySelectorAll(".pad");
    this.playBtn = document.querySelector(".play");
    this.currentKick = "./sounds/kick-classic.wav";
    this.currentSnare = "./sounds/snare-acoustic01.wav";
    this.currentHihat = "./sounds/hihat-acoustic01.wav";
    this.kickaudio = document.querySelector(".kick-sound");
    this.snareaudio = document.querySelector(".snare-sound");
    this.hihataudio = document.querySelector(".hihat-sound");
    this.index = 0;
    this.bpm = 150;
    this.isPlaying = null;
    this.selects = document.querySelectorAll("select");
    this.muteBtns = document.querySelectorAll(".mute");
  }

  activePad() {
    this.classList.toggle("active");
  }

  repeat() {
    let step = this.index % 8;
    const activeBars = document.querySelectorAll(`.b${step}`);
    //loop over pads
    activeBars.forEach((bar) => {
      bar.style.animation = `playTrack 0.3s alternate ease-in-out 2`;
      //check pads are active
      if (bar.classList.contains("active")) {
        //check each sound
        if (bar.classList.contains("kick-pad")) {
          this.kickaudio.currentTime = 0;
          this.kickaudio.play();
        }
        if (bar.classList.contains("snare-pad")) {
          this.snareaudio.currentTime = 0;
          this.snareaudio.play();
        }
        if (bar.classList.contains("hihat-pad")) {
          this.hihataudio.currentTime = 0;
          this.hihataudio.play();
        }
      }
    });

    this.index++;
  }

  start() {
    const interval = (60 / this.bpm) * 1000;
    //check if playing
    if (this.isPlaying) {
      //clear interval
      clearInterval(this.isPlaying);
      this.isPlaying = null;
    } else {
      this.isPlaying = setInterval(() => {
        this.repeat();
      }, interval);
    }
  }

  updateBtn() {
    if (!this.isPlaying) {
      this.playBtn.innerText = "Stop";
      this.playBtn.classList.add("active");
    } else {
      this.playBtn.innerText = "Play";
      this.playBtn.classList.remove("active");
    }
  }

  changeSound(e) {
    const selectionName = e.target.name;
    const selectionValue = e.target.value;
    switch (selectionName) {
      case "kick-select":
        this.kickaudio.src = selectionValue;
        break;
      case "snare-select":
        this.snareaudio.src = selectionValue;
        break;
      case "hihat-select":
        this.hihataudio.src = selectionValue;
        break;
    }
  }

  mute(e) {
    const muteIndex = e.target.getAttribute("data-track");
    e.target.classList.toggle("active");
    if( e.target.classList.contains("active")){
      switch(muteIndex){
        case "0":
        this.kickaudio.volume = 0;
        break;
        case "1":
          this.snareaudio.volume = 0;
          break;
          case "2":
            this.hihataudio.volume = 0;
            break;
      }
    }else{
      switch(muteIndex){
        case "0":
        this.kickaudio.volume = 1;
        break;
        case "1":
          this.snareaudio.volume = 1;
          break;
          case "2":
            this.hihataudio.volume = 1;
            break;
      }
    }
  }
}

const drumKit = new DrumKit();

//Event Listeners

drumKit.pads.forEach((pad) => {
  pad.addEventListener("click", drumKit.activePad);
  pad.addEventListener("animationend", function () {
    this.style.animation = "";
  });
});

drumKit.playBtn.addEventListener("click", function () {
  drumKit.updateBtn();
  drumKit.start();
});

drumKit.selects.forEach((select) => {
  select.addEventListener("change", function (e) {
    drumKit.changeSound(e);
  });
});

drumKit.muteBtns.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    drumKit.mute(e);
  });
});
