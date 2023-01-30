class Enemy{
    constructor(game, theId){
        
        this.id = theId;
        this.game = game 
        this.radius = 15;
        this.diameter = this.radius*2;
        this.x = 400;
        this.y = 400;




        this.speed = randomInt(100)+500;
    };

    update() {

        for(let i = 0; i < this.game.enemies.length; i++){
            if(this.id !== this.game.enemies[i].id && this.id !== 0){
                checkCircleColliding(this,this.game.enemies[i])
            }   
            enemyTracking(this, this.game);
        }

        
    };

    draw(ctx){
        ctx.strokeStyle = "#FF0000";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.stroke(); 
    };

    
            



    

}