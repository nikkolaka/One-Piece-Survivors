class Animator {
    constructor(spritesheet, xStart, yStart, width, height, frameCount, frameDuration, reverse, loop) {
        Object.assign(this, {spritesheet, xStart, yStart, width, height, frameCount, frameDuration, reverse, loop});

        this.elapsedTime = 0;
        this.totalTime = frameCount * frameDuration;
    };

    drawFrameStill(tick, ctx, x, y, scale) {
        this.elapsedTime += tick;

        if (this.elapsedTime > this.totalTime) this.elapsedTime -= this.totalTime;

        let frame = this.currentFrame();
        if(this.reverse) frame = this.frameCount - frame - 1;

        ctx.drawImage(this.spritesheet,
            this.xStart + this.width * frame, this.yStart,
            this.width, this.height,
            x, y,
            this.width, this.height);
    };

    drawFrame(tick, ctx, x, y, scale) {
        this.elapsedTime += tick;

        if (this.isDone()) {
            if (this.loop) {
                this.elapsedTime -= this.totalTime;
            } else {
                return;
            }
        }

        let frame = this.currentFrame();
        if(this.reverse)
            frame = this.frameCount - 1 - frame;

        ctx.drawImage(this.spritesheet,
            this.xStart + this.width * frame, this.yStart,
            this.width, this.height,
            x, y,
            this.width * scale, this.height * scale);
    };

    currentFrame() {
        return Math.floor(this.elapsedTime / this.frameDuration);
    };

    isDone() {
        return (this.elapsedTime >= this.totalTime);
    }
};
