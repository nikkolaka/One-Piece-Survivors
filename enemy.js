class Enemy{
    constructor(game){
        this.game = game
        this.size = 15;
        this.x = 400;
        this.y = 400;
        this.speed = 200;
    };

    update() {
        if(this.game.mouse !== null){
            this.game.entities[0].x = this.game.mouse.x;
            this.game.entities[0].y = this.game.mouse.y;
        }

        var dx = this.x - this.game.entities[0].x;
        var dy = this.y - this.game.entities[0].y;


/*         this.x += (dx/dy);
        this.y += (dy/dx); */


        for(var i = 0; i < this.game.entities.length; i++){
            

            var otherEntity = this.game.entities[i];
            if(otherEntity.x !== this.x || otherEntity.y !== this.y){
                this.checkCircleColliding(otherEntity);

            }
        }

        
    };

    draw(ctx){
        ctx.strokeStyle = "#FF0000";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size/2, 0, 2 * Math.PI);
        ctx.stroke(); 
        


        
    };




    checkCircleColliding(otherEntity){
        var thisCircle={radius:(this.size/2), x:this.x, y:this.y}
        var otherCircle={radius:(otherEntity.size/2), x:otherEntity.x, y:otherEntity.y}

        var dx = thisCircle.x - otherCircle.x;
        var dy = thisCircle.y - otherCircle.y;
        var distance = Math.sqrt(dx * dx + dy * dy);
        var step = thisCircle.radius + otherCircle.radius - distance;
        var COLLISIONREBOUND = 5;

        if(step > 0){
            
            dx /= distance;
            dy /= distance;
            this.x += dx*step/COLLISIONREBOUND;
            this.y += dy*step/COLLISIONREBOUND;
            /* this.x += (20*Math.sin(collisionAngle)) * this.game.clockTick;
            this.y += (20*Math.cos(collisionAngle)) * this.game.clockTick; */
        }

    }

}