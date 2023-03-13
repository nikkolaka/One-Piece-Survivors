class EndScreen {
    constructor(game) {
        Object.assign(this, { game });
        this.game = game;
        this.spritesheet = ASSET_MANAGER.getAsset("./img/endscreen.jpg");
        this.gameover = new Animator(this.spritesheet, 0, 0, 1024, 768, 1, 1);
    }

    update() {
        if (this.game.mouse !== null) {
            if (this.game.mouse && (this.game.mouse.x > 300 && this.game.mouse.x < 600 && this.game.mouse.y > 550 && this.game.mouse.y < 600) && this.game.click) {
                //console.log("Restart clicked");
                this.scene = new SceneManager(gameEngine);
                gameEngine.addEntity(scene);
                this.scene.loadTitleScreen();
            }
        }
    }

    draw(ctx) {
        this.drawEnd(ctx);
    }

    drawEnd(ctx) {
        // Draw game over screen
        this.gameover.drawFrameStill(this.game.clockTick, ctx, 0, 0, 1);

        // Draw game over message
        ctx.font = "100px Arial";
        ctx.fillStyle = "red";
        ctx.fillText("Game Over", 200, 200);

        // Draw wave and enemy count
        ctx.font = "50px Arial";
        ctx.fillText("Wave: " + this.game.wave, 300, 400);
        ctx.fillText("Score: " + this.game.score, 300, 500);

        // Draw restart message
        if(this.game.mouse && (this.game.mouse.x > 300 && this.game.mouse.x < 600 && this.game.mouse.y > 550
            && this.game.mouse.y < 600)) {
            ctx.fillStyle = "gray";
            ctx.font = "50px Arial";
            ctx.fillText("Click to Restart", 300, 600);
        } else {
            ctx.fillStyle = "red";
            ctx.font = "50px Arial";
            ctx.fillText("Click to Restart", 300, 600);
        }
    }
}  

class characterSelectScreen {
    constructor(game) {
        Object.assign(this, { game });
        this.spritesheet = ASSET_MANAGER.getAsset("./img/characterscreen.png");
        this.gameover = new Animator(this.spritesheet, 0, 0, 1024, 768, 1, 1);
    }

    update() {
        if (this.game.mouse !== null) {
            if (this.game.mouse && (this.game.mouse.x > 165 && this.game.mouse.x < 290
                    && this.game.mouse.y > 290 && this.game.mouse.y < 465) && this.game.click) {
                this.game.camera.player = null;
                this.game.characterselect = true;
                this.game.luffyclicked = true;
                this.game.zoroclicked = false;
                this.game.brookclicked = false;
                this.game.camera.loadAssets();
            }
        }
        if (this.game.mouse && (this.game.mouse.x > 440 && this.game.mouse.x < 565
            && this.game.mouse.y > 290 && this.game.mouse.y < 475) && this.game.click) {
                this.game.camera.player = null;
                this.game.characterselect = true;
                this.game.luffyclicked = false; 
                this.game.zoroclicked = true;
                this.game.brookclicked = false;
                this.game.camera.loadAssets();
        }
        if (this.game.mouse && (this.game.mouse.x > 720 && this.game.mouse.x < 840
            && this.game.mouse.y > 280 && this.game.mouse.y < 480) && this.game.click) {
                this.game.camera.player = null;
                this.game.characterselect = true;
                this.game.luffyclicked = false; 
                this.game.zoroclicked = false;
                this.game.brookclicked = true;
                this.game.camera.loadAssets();
        }
    }

    draw(ctx) {
        this.drawCharacterSelect(ctx);
    }

    drawCharacterSelect(ctx) {
        this.gameover.drawFrameStill(this.game.clockTick, ctx, 0, 0, 1);

        ctx.font = "100px Arial";
        ctx.fillStyle = "red";
        ctx.fillText("Character Select", 120, 200);

        //for luffy
        if(this.game.mouse && (this.game.mouse.x > 165 && this.game.mouse.x < 290
            && this.game.mouse.y > 290 && this.game.mouse.y < 465)) {
            ctx.lineWidth = 5;
            ctx.strokeStyle = "red";
            ctx.strokeRect(165, 290, 140, 200);
            ctx.closePath();
            ctx.lineWidth = 2;
            this.game.luffy.animation[1][0].drawFrame(this.game.clockTick, ctx, this.game.luffy.x - this.game.camera.x - 75, this.game.luffy.y - this.game.camera.y + 150, this.game.luffy.scale * 3);
        } 
        //zoro
        if(this.game.mouse && (this.game.mouse.x > 440 && this.game.mouse.x < 565
            && this.game.mouse.y > 290 && this.game.mouse.y < 475)) {
            ctx.lineWidth = 5;
            ctx.strokeStyle = "red";
            ctx.strokeRect(440, 290, 140, 200);
            ctx.closePath();
            ctx.lineWidth = 2;
            this.game.zoro.animation[1][0].drawFrame(this.game.clockTick, ctx, this.game.zoro.x - this.game.camera.x - 75, this.game.zoro.y - this.game.camera.y + 160, this.game.zoro.scale * 3);
        } 
        //brook
        if(this.game.mouse && (this.game.mouse.x > 720 && this.game.mouse.x < 840
            && this.game.mouse.y > 280 && this.game.mouse.y < 480)) {
            ctx.lineWidth = 5;
            ctx.strokeStyle = "red";
            ctx.strokeRect(720, 290, 140, 200);
            ctx.closePath();
            ctx.lineWidth = 2;
            this.game.Brook.animation[1][0].drawFrame(this.game.clockTick, ctx, this.game.Brook.x - this.game.camera.x -95, this.game.Brook.y - this.game.camera.y + 180, this.game.Brook.scale * 2);
        }
    }
}

class StartScreen {

    constructor(game) {
        Object.assign(this, { game });
        this.spritesheet = ASSET_MANAGER.getAsset("./img/titlescreen.png");
        this.title = new Animator(this.spritesheet, 0, 0, 1024, 768, 1, 1);
    }

    update() {
        if (this.game.mouse !== null) {
            if(this.game.mouse && (this.game.mouse.x > 350 && this.game.mouse.x < 635 && this.game.mouse.y > 630
                && this.game.mouse.y < 690) && this.game.click) {
                console.log("Start clicked");
                this.game.camera.loadCharacterSelect();
            }
            
        }
    }

    draw(ctx) {
        this.drawTitle(ctx);
    }

    drawTitle(ctx) {

        this.title.drawFrameStill(this.game.clockTick, ctx, 0, 0, 1);

        if(this.game.mouse && (this.game.mouse.x > 350 && this.game.mouse.x < 635 && this.game.mouse.y > 630
             && this.game.mouse.y < 690)) {
            ctx.fillStyle = "GRAY";
             ctx.font = "50px Arial";
            ctx.fillText("Click to Start", 350, 680);
        } else {
            ctx.fillStyle = "white";
             ctx.font = "50px Arial";
            ctx.fillText("Click to Start", 350, 680);
        }
    }
}