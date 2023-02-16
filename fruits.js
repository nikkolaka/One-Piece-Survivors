class Gomu{
    constructor(game){
        this.width = 20;
        this.height = 6;
        this.direction = Direction.Up;
        this.lastDirection = this.direction;
        if(this.direction == Direction.Up || this.direction == Direction.Down){
            
            this.location = {x1: -10, y1: 3, x2: 10, y2: -3};
        } else{
            var temp = this.width;
            this.width = this.height;
            this.height = temp;
            this.location = {x1: -3, y1: -10, x2: 10, y2: 3};
        }

        this.hitbox = {x1: -(this.width/2), y1: -(this.height/2), x2: (this.width/2), y2: (this.height/2)};
        this.x = this.location.x1;
        this.y = this.location.y1;
        this.game = game;
        this.range = 300;
        this.duration = 70;
        this.step = 0;
        this.damage = 5;
    }

    update(){

        if(this.direction !== this.lastDirection){
            this.lastDirection = this.direction;
            this.step = 0
            if(this.direction == Direction.Up || this.direction == Direction.Down){
                this.hitbox = {x1: -(this.width/2), y1: -(this.height/2), x2: (this.width/2), y2: (this.height/2)};
                this.location = {x1: -10, y1: 3, x2: 10, y2: -3};
            } else{
                this.hitbox = {x1: -(this.height/2), y1: -(this.width/2), x2: (this.height/2), y2: (this.width/2)};
                this.location = {x1: -3, y1: -10, x2: 10, y2: 3};
            }
        }

        

        this.location.x1 = this.game.playerLocation.x + this.hitbox.x1;
        this.location.y1 = this.game.playerLocation.y + this.hitbox.y1;
        this.location.x2 = this.game.playerLocation.x + this.hitbox.x2;
        this.location.y2 = this.game.playerLocation.y + this.hitbox.y2;

        if(this.step >= this.range) this.step = 0;
        

        if(this.direction == Direction.Up){
            this.location.y1 -= this.step;
            this.location.y2 -= this.step;
        } else if(this.direction == Direction.Down){
            this.location.y1 += this.step;
            this.location.y2 += this.step;
        } else if(this.direction == Direction.Left){
            this.location.x1 -= this.step;
            this.location.x2 -= this.step;
        } else if(this.direction == Direction.Right){
            this.location.x1 += this.step;
            this.location.x2 += this.step;
        }
        
        this.step += this.range/this.duration;

    }

    draw(ctx){
        ctx.beginPath()
        if(this.direction == Direction.Up || this.direction == Direction.Down){
            ctx.rect(this.location.x1 - this.game.camera.x + 52, this.location.y1 - this.game.camera.y + 53, this.width, this.height);
        } else {
            ctx.rect(this.location.x1 - this.game.camera.x + 52, this.location.y1 - this.game.camera.y + 53, this.height, this.width);
        }
        ctx.stroke();
    }





}