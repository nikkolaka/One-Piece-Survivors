class blueBerry{
    constructor(){
        this.value = 10;
        this.x;
        this.y;
        this.removeFromWorld = false;
        
        this.radius = 5;


    }


    draw(ctx, game){
        
        ctx.strokeStyle = 'cyan';
        ctx.beginPath();
        ctx.arc(this.x +50 - game.camera.x, this.y +50 - game.camera.y, this.radius, 0, 2 * Math.PI);    
        ctx.fillStyle = 'cyan';
        ctx.fill();
        ctx.stroke(); 
        ctx.strokeStyle = 'black';
        
    }


}