class Diamond{
    constructor(game){
        this.name = "Diamond";
        this.game = game;
        this.x = 2500;
        this.y = 2500;
        this.scale = 1;
        this.radius = 5;
        this.animation = new Animator(ASSET_MANAGER.getAsset("./img/items.png"), 0, 0, 90, 88, 4, .15, false, true);
        this.game.Diamond = this;
        this.removeFromWorld = false;
    }
    update(){
        if(checkCircleTouching(this.game.player, this)){
            this.game.player.magnet = true;
            this.removeFromWorld = true;
        }
    }
    draw(ctx){
        this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x , this.y - this.game.camera.y, this.scale);
    }

}

class Bomb{
    constructor(game){
        this.name = "Bomb";
        this.game = game;
        this.x = 2500;
        this.y = 2500;
        this.scale = 1;
        this.radius = 5;
        this.animation = new Animator(ASSET_MANAGER.getAsset("./img/items.png"), 0, 88, 90, 88, 2, 0.2, false, true);
        this.game.Bomb = this;
        this.removeFromWorld = false;
    }
    update(){
        if(checkCircleTouching(this.game.player, this)){
            this.game.enemies.forEach(enemy => {if(inWindow(enemy, this.game.player)) enemy.dead = true;});
            this.removeFromWorld = true;
        }



    }
    draw(ctx){
        this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x , this.y - this.game.camera.y , this.scale);
    }
}

class Freeze{
    constructor(game){
        this.name = "Freeze";
        this.game = game;
        this.x = 2500;
        this.y = 2500;
        this.scale = 1;
        this.radius = 5;
        this.animation = new Animator(ASSET_MANAGER.getAsset("./img/items.png"), 0, 176, 90, 88, 1, .1, false, true);
        this.game.Freeze = this;
        this.removeFromWorld = false;
    }
    update(){
        if(checkCircleTouching(this.game.player, this)){
            this.game.enemies.forEach(enemy => {if(inWindow(enemy, this.game.player)) 
                enemy.frozen = true;
                setTimeout(() => {
                    enemy.frozen = false;
                },10000);
            });

            this.removeFromWorld = true;
        }
    }
    draw(ctx){
        this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x , this.y - this.game.camera.y , this.scale);
    }

}

class Meat{
    constructor(game){
        this.name = "Meat";
        this.game = game;
        this.x = 2500;
        this.y = 2500;
        this.scale = 1;
        this.radius = 5;
        this.animation = new Animator(ASSET_MANAGER.getAsset("./img/items.png"), 0, 264, 90, 88, 1, 0.1, false, true);
        this.game.Meat = this;
        this.removeFromWorld = false;
    }
    update(){

        if(checkCircleTouching(this.game.player, this)){
            this.game.player.maxHealth += 10;
            this.game.player.health += this.game.player.maxHealth/4;
            if(this.game.player.health > this.game.player.maxHealth) this.game.player.health = this.game.player.maxHealth;
            this.removeFromWorld = true;
        }

    }
    draw(ctx){
        this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x , this.y - this.game.camera.y , this.scale);
    }

}

class Weight{
    constructor(game){
        this.name = "Weight";
        this.game = game;
        this.x = 2500;
        this.y = 2500;
        this.scale = 1;
        this.radius = 5;
        this.animation = new Animator(ASSET_MANAGER.getAsset("./img/items.png"), 0, 352, 90, 88, 1, 0.1, false, true);
        this.game.Weight = this;
        this.removeFromWorld = false;
    }
    update(){
        if(checkCircleTouching(this.game.player, this)){
            this.game.player.weapons.forEach(weapon => {
                let temp = weapon.damage;
                weapon.damage += 100;
                setTimeout(() => {
                    weapon.damage = temp;
                },20000);
            });
            this.removeFromWorld = true;
        }

    }
    draw(ctx){
        this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, this.scale);
    }

}