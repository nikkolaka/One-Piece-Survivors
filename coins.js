class Berry{
    constructor(type){
        switch (type) {
            case Berries.BLUE:
                this.value = 10;
                this.speed = randomInt(300) + 2000;
                break;

            case Berries.RED:
                this.value = 50;
                this.speed = randomInt(200) + 1000;
                break;

            case Berries.GREEN:
                this.value = 150;
                this.speed = randomInt(100) + 700;
                break;

            default:
                break;
        }
        this.type = type;
        this.x;
        this.y;
        this.removeFromWorld = false;


        this.radius = 5;


    }

    update(game){
        if(game.player.magnet){
            enemyTracking(this, game.player, game);
        }
    }


    draw(ctx, game){
        ctx.strokeStyle = this.type;
        ctx.beginPath();
        ctx.arc(this.x +50 - game.camera.x, this.y +50 - game.camera.y, this.radius, 0, 2 * Math.PI);  
        ctx.fillStyle = this.type;
        ctx.fill();
        ctx.stroke();
    }
}