class Gomu{
    constructor(game){
        this.width = 20;
        this.height = 6;
        this.hitbox = {x1: -(this.width/2), y1: -(this.height/2), x2: (this.width/2), y2: (this.height/2)};
        this.location = {x1: -10, y1: 3, x2: 10, y2: -3};
        this.game = game;
        this.range = 200;
        this.duration = 70;
        this.step = 0;
    }

    update(){
        this.location.x1 = this.game.playerLocation.x + this.hitbox.x1;
        this.location.y1 = this.game.playerLocation.y + this.hitbox.y1;
        this.location.x2 = this.game.playerLocation.x + this.hitbox.x2;
        this.location.y2 = this.game.playerLocation.y + this.hitbox.y2;

        if(this.step >= this.range) this.step = 0;

        this.location.y1 -= this.step;
        this.location.y2 -= this.step;
        this.step += this.range/this.duration;







    }

    draw(ctx){
        ctx.beginPath()
        ctx.rect(this.location.x1 - this.game.camera.x + 52, this.location.y1 - this.game.camera.y + 53, this.width, this.height);
        ctx.stroke();
    }





}