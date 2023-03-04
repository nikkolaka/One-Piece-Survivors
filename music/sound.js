class Sound {
    constructor(src) {
        this.sound = document.createElement("audio");
        this.sound.src = src;
        this.sound.setAttribute("preload", "auto");
        this.sound.setAttribute("controls", "none");
        this.sound.style.display = "none";
        document.body.appendChild(this.sound);
    }
    play() {
        this.sound.play();
    }
    stop() {
        this.sound.pause();
    }

    loop() {
        this.sound.loop = true;
        this.sound.play();
    }

    stopLoop() {

        this.sound.loop = false;
        this.sound.pause();
    }

    setVolume(volume) {
        this.sound.volume = volume;
    }
}