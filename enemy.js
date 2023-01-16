class Enemy{
    constructor(game, theId){
        
        this.id = theId;
        this.game = game
        this.radius = 2.5;
        this.diameter = this.radius*2;
        this.x = 400;
        this.y = 400;




        this.speed = 200;
    };

    update() {



        for(i = 0; i < this.game.entities.length; i++){
            this.checkCircleColliding(this.game.entities[i])
            /* if(this.game.entities[i].constructor.name == "Enemy"){
                this.checkCircleColliding(this.game.entities[i])

            } */
        }

        if(this.game.mouse !== null && this.id == 0){
            this.x = this.game.mouse.x;
            this.y = this.game.mouse.y;
        }

        var possibleCollisionList;


/* 
        for(var i = 0; i < this.game.entities.length; i++){
            

            var otherEntity = this.game.entities[i];
            if(i !== this.id){

               
                this.checkCircleColliding(otherEntity);

            }
        } */





        
    };

    draw(ctx){
        ctx.strokeStyle = "#dec32c";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.stroke(); 
        


        
    };




    checkCircleColliding(otherEntity){
        if(!this instanceof Enemy || this.id === otherEntity.id){
            return;
        }
        var thisCircle={radius:(this.radius), x:this.x, y:this.y}
        var otherCircle={radius:(otherEntity.radius), x:otherEntity.x, y:otherEntity.y}

        var dx = thisCircle.x - otherCircle.x;
        var dy = thisCircle.y - otherCircle.y;
        
        var COLLISIONREBOUND = 5;

        if((dx * dx + dy * dy) < (thisCircle.radius+otherCircle.radius)*(thisCircle.radius+otherCircle.radius)){


            var distance = Math.sqrt(dx * dx + dy * dy);
            var step = thisCircle.radius + otherCircle.radius - distance;
            
            dx /= distance;
            dy /= distance;



            this.x += dx*step/COLLISIONREBOUND;
            this.y += dy*step/COLLISIONREBOUND;
/*             otherEntity.x -= dx*step/COLLISIONREBOUND;
            otherEntity.y -= dy*step/COLLISIONREBOUND; */



        }

    }


    

}