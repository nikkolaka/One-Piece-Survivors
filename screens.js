class EndScreen {
    constructor(game) {
        Object.assign(this, { game });
        this.game = game;

        this.spritesheet = ASSET_MANAGER.getAsset("./img/titlecreen.jpg");
        this.gameover = new Animator(this.spritesheet, 0, 0, 1024, 768, 1, 1);
    }

    update() {
        if (this.game.mouse !== null) {
            if(this.game.mouse && (this.game.mouse.x > 300 && this.game.mouse.x < 600 && this.game.mouse.y > 550 && this.game.mouse.y < 600) && this.game.click) {
                this.game.camera.loadTitleScreen();
            }
        }
    }

    draw(ctx) {
        this.drawEnd(ctx);
    }

    drawEnd(ctx) {

        //ctx.fillRect(0, 0, 800, 600);
        ctx.font = "100px Arial";
        ctx.fillStyle = "white";
        ctx.fillText("Game Over", 200, 200);
        ctx.font = "50px Arial";
        ctx.fillText("Click to Restart", 300, 600);
    }
}

class characterSelectScreen {
    constructor(game) {
        Object.assign(this, { game });
        
    }
}

class StartScreen {

    constructor(game) {
        Object.assign(this, { game });
        this.spritesheet = ASSET_MANAGER.getAsset("./img/titlescreen.jpg");
        this.title = new Animator(this.spritesheet, 0, 0, 1024, 768, 1, 1);
    }

    update() {
        if (this.game.mouse !== null) {
            if(this.game.mouse && (this.game.mouse.x > 300 && this.game.mouse.x < 600 && this.game.mouse.y > 550
                 && this.game.mouse.y < 600) && this.game.click){
                console.log("Start clicked");
                this.game.camera.loadAssets();
            }
            
        }
    }

    draw(ctx) {
        this.drawTitle(ctx);
    }

    drawTitle(ctx) {

        //ctx.fillStyle = "background: url('img/titlescreen.jpg') no-repeat center center fixed;";
        this.title.drawFrameStill(this.game.clockTick, ctx, 0, 0, 1);

        //ctx.fillRect(0, 0, 800, 600);
        ctx.font = "100px Arial";
        ctx.fillStyle = "white";
        ctx.fillText("One Piece", 200, 200);

        if(this.game.mouse && (this.game.mouse.x > 300 && this.game.mouse.x < 600 && this.game.mouse.y > 550
             && this.game.mouse.y < 600)) {
            ctx.fillStyle = "GRAY";
             ctx.font = "50px Arial";
            ctx.fillText("Click to Start", 300, 600);
        } else {
            ctx.fillStyle = "white";
             ctx.font = "50px Arial";
            ctx.fillText("Click to Start", 300, 600);
        }
    }


}