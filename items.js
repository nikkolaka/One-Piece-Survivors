class Diamond{
    constructor(game){
        this.name = "Diamond";
        this.game = game;
        this.x = 0;
        this.y = 0;
        this.scale = 1;
        this.animator = new Animator(ASSET_MANAGER.getAsset("img/item.png"), 0, 0, 90, 88, 4, .3, false, true);
        this.game.Diamond = this;
    }
    update(){

    }
    draw(ctx){
        this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x , this.y - this.game.camera.y, this.scale);
    }

}

class Bomb{
    constructor(game){
        this.name = "Bomb";
        this.game = game;
        this.x = 0;
        this.y = 0;
        this.scale = 1;
        this.animator = new Animator(ASSET_MANAGER.getAsset("img/item.png"), 0, 88, 90, 88, 3, 0.2, false, true);
        this.game.Bomb = this;
    }
    update(){

    }
    draw(ctx){
        this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x , this.y - this.game.camera.y , this.scale);
    }
}

class Freeze{
    constructor(game){
        this.name = "Freeze";
        this.game = game;
        this.x = 0;
        this.y = 0;
        this.scale = 1;
        this.animator = new Animator(ASSET_MANAGER.getAsset("img/item.png"), 0, 176, 90, 88, 1, 0.5, false, true);
        this.game.Freeze = this;
    }
    update(){

    }
    draw(ctx){
        this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x , this.y - this.game.camera.y , this.scale);
    }

}

class Meat{
    constructor(game){
        this.name = "Meat";
        this.game = game;
        this.x = 0;
        this.y = 0;
        this.scale = 1;
        this.animator = new Animator(ASSET_MANAGER.getAsset("img/item.png"), 0, 264, 90, 88, 1, 0.5, false, true);
        this.game.Meat = this;
    }
    update(){

    }
    draw(ctx){
        this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x , this.y - this.game.camera.y , this.scale);
    }

}

class Weight{
    constructor(game){
        this.name = "Weight";
        this.game = game;
        this.x = 0;
        this.y = 0;
        this.scale = 1;
        this.animator = new Animator(ASSET_MANAGER.getAsset("img/item.png"), 0, 352, 90, 88, 1, 0.5, false, true);
        this.game.Weight = this;
    }
    update(){

    }
    draw(ctx){
        this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, this.scale);
    }

}