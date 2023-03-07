// created a new class for the player death
// when the player dies the music will stop and the death music will play
class Death {
    constructor() {
        this.audio = new Audio("./music/Death.mp3");
        this.audio.loop = true;
        this.audio.play();
    }

    stop() {
        this.audio.pause();
    }

    play() {
        this.audio.play();
    }

    restart() {
        this.audio.currentTime = 0;
    }
}

// created a new class for the opening music
class Opening {
    constructor() {
        this.audio = new Audio("./music/Opening.mp3");
        this.audio.loop = true;
        this.audio.play();
    }
}

// created a new class for the in game music
class In_Game {
    constructor() {
        this.audio = new Audio("./music/In_Game.mp3");
        this.audio.loop = true;
        this.audio.play();
    }

    stop() {
        this.audio.pause();
    }

    play() {
        this.audio.play();
    }
}

class Luffy{
    constructor(game, theId){
        this.game = game;
        this.id = theId;
        this.weapons = [new Gomu(game)];
        this.game.luffy = this;
        this.shop = new Shop(game);
        this.shop.availFruit.gomu--;

        //music
        this.death = new Audio("./music/Death.mp3");
        this.death.loop = true;
        this.In_Game = new Audio("./music/In_Game.mp3");
        this.In_Game.loop = true;
        this.In_Game.play();
        // this.Death = new Death(this, 1);
        // this.Opening = new Opening();
        this.In_Game = new In_Game();

        //sprite
        this.spriteSheet = ASSET_MANAGER.getAsset("./img/luffy7.png");
        this.loadAnimation(this.spriteSheet);

        //states
        this.states = 0; // 0 = idle, 1 = walking 2 = dead
        this.facing = 0; // 0 = right, 1 = left
        this.dead = false;

        // position
        // player hitbox
        this.x =  2500;
        this.y =  2500;
        this.radius = 25;
        this.direction = Direction.Up;

        this.scale = 1.2;

        //stats
        this.health = 100;
        this.maxHealth = 100;
        this.speed = 150;

    };

    loadAnimation(spriteSheet){
        this.animation = [];
        for(var i = 0; i < 3; i++){
            this.animation.push([]);
            for(var j = 0; j < 2; j++){
                this.animation[i].push([]);
            }
        }

        // idle right
        this.animation[0][0] = new Animator(spriteSheet, 0, 0, 79, 88, 3, .3, false, true);
        // idle left
        this.animation[0][1] = new Animator(spriteSheet, 239, 0, 79, 88, 3, .3, false, true);

        // walking right
        this.animation[1][0] = new Animator(spriteSheet, 0, 88, 79, 88, 8, .2, false, true);
        // walking left
        this.animation[1][1] = new Animator(spriteSheet, 645,88, 79, 88, 8, .2, true, true);

        // dead right
        this.animation[2][0] = new Animator(spriteSheet, 5, 176, 79, 88, 5, .2, false, false);
        // dead left
        this.animation[2][1] = new Animator(spriteSheet, 5, 264, 79, 88, 5, .2, false, false);
    }

    update(){

        this.shop.update();

        if(this.dead){
            this.weapons = [];
            return;
        } 
        // changes the state of the player and the direction of the player when moving
        if(this.game.keys.a || this.game.keys.A){
            this.states = 1;
            this.facing = 1;
            this.direction = Direction.Left;
            this.x -= this.game.clockTick * this.speed;
        }
        if(this.game.keys.d || this.game.keys.D){
            this.states = 1;
            this.facing = 0;
            this.direction = Direction.Right;
            this.x += this.game.clockTick * this.speed;
        }
        if(this.game.keys.w || this.game.keys.W){
            this.states = 1;
            this.direction = Direction.Up;
            this.y -= this.game.clockTick * this.speed;
        }
        if(this.game.keys.s || this.game.keys.S){
            this.states = 1;
            this.direction = Direction.Down;
            this.y += this.game.clockTick * this.speed;
        }
        if(!(this.game.keys.a || this.game.keys.A) && !(this.game.keys.d || this.game.keys.D) &&
         !(this.game.keys.w || this.game.keys.W) && !(this.game.keys.s || this.game.keys.S)){
            this.states = 0;
        }

        // this is for the camera to follow the player when he gets to the edge of the screen
        if (this.game.playerLocation.x >= 600 || this.game.playerLocation.y >= 600) {
            this.game.camera.x += this.game.clockTick * this.speed;
            this.game.camera.y += this.game.clockTick * this.speed;
        }

        for (let i = 0; i < this.weapons.length; i++) {
            let weapon = this.weapons[i];

            weapon.update();

        }

        // checks if the player is dead
        if (this.health <= 0 && !this.dead) {
            this.dead = true;
            this.states = 2;
            // this.In_Game.pause();
            this.death.play();
            this.Death = new Death(this, this.game.timer.gameTime); // added this line to pass in the time the player died
            // this.In_Game.stop();
            this.In_Game = new In_Game(this, this.game.timer.gameTime);
            this.In_Game.stop();

        }

        this.game.playerLocation.x = this.x;
        this.game.playerLocation.y = this.y;

        // this is for the border collision
        CheckBorder(this);
    };

    draw(ctx){
        for (let i = 0; i < this.weapons.length; i++) {
            let weapon = this.weapons[i];
            weapon.draw(ctx);

        }

        this.animation[this.states][this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, this.scale);
        if(this.game.options.debugging){
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x - this.game.camera.x + 52, this.y - this.game.camera.y + 53, this.radius, 0, 2 * Math.PI);
            ctx.stroke(); 
        }
        

        this.shop.draw(ctx);
    }
}

class Zoro{
    constructor(game, theId){
        this.game = game;
        this.id = theId;
        this.weapons = [new Sword(game)];


        this.game.player = this;
        this.shop = new Shop(game);
        this.shop.availFruit.sword--;
        

        //sprite
        this.spriteSheet = ASSET_MANAGER.getAsset("./img/zoro1.png");
        this.loadAnimation(this.spriteSheet);

        //states
        this.states = 0; // 0 = idle, 1 = walking 2 = dead
        this.facing = 0; // 0 = right, 1 = leftd
        this.dead = false;

        // player hitbox
        this.x =  2500;
        this.y =  2500;
        this.radius = 25;
        this.direction = Direction.Up;

        this.scale = 1.2;

        //stats
        this.health = 150;
        this.maxHealth = 150;
        this.speed = 200;

    };

    loadAnimation(spriteSheet){
        this.animation = [];
        for(var i = 0; i < 3; i++){
            this.animation.push([]);
            for(var j = 0; j < 2; j++){
                this.animation[i].push([]);
            }
        }

        // idle right
        this.animation[0][0] = new Animator(spriteSheet, 0, 0, 90, 88, 4, .25, false, true);
        // idle left
        this.animation[0][1] = new Animator(spriteSheet, 0, 90, 90, 88, 4, .25, false, true);

        // walking right
        this.animation[1][0] = new Animator(spriteSheet, 0, 180, 90, 88, 8, .2, false, true);
        // walking left
        this.animation[1][1] = new Animator(spriteSheet, 0, 270, 90, 88, 8, .2, true, true);

        // dead right
        this.animation[2][0] = new Animator(spriteSheet, 0, 360, 90, 88, 4, .25, false, false);
        // dead left
        this.animation[2][1] = new Animator(spriteSheet, 0, 450, 90, 88, 4, .25, true, false);
    }

    update(){

        this.shop.update();

        if(this.dead){
            this.weapons = [];
            return;
        } 
        // changes the state of the player and the direction of the player when moving
        if(this.game.keys.a || this.game.keys.A){
            this.states = 1;
            this.facing = 1;
            this.direction = Direction.Left;
            this.x -= this.game.clockTick * this.speed;
        }
        if(this.game.keys.d || this.game.keys.D){
            this.states = 1;
            this.facing = 0;
            this.direction = Direction.Right;
            this.x += this.game.clockTick * this.speed;
        }
        if(this.game.keys.w || this.game.keys.W){
            this.states = 1;
            this.direction = Direction.Up;
            this.y -= this.game.clockTick * this.speed;
        }
        if(this.game.keys.s || this.game.keys.S){
            this.states = 1;
            this.direction = Direction.Down;
            this.y += this.game.clockTick * this.speed;
        }
        if(!(this.game.keys.a || this.game.keys.A) && !(this.game.keys.d || this.game.keys.D) &&
         !(this.game.keys.w || this.game.keys.W) && !(this.game.keys.s || this.game.keys.S)){
            this.states = 0;
        }

        // this is for the camera to follow the player when he gets to the edge of the screen
        if (this.game.playerLocation.x >= 600 || this.game.playerLocation.y >= 600) {
            this.game.camera.x += this.game.clockTick * this.speed;
            this.game.camera.y += this.game.clockTick * this.speed;
        }

        for (let i = 0; i < this.weapons.length; i++) {
            let weapon = this.weapons[i];

            weapon.update();

        }

        // checks if the player is dead
        if (this.health <= 0){
            this.dead = true;
            this.states = 2;
        }
        this.game.playerLocation.x = this.x;
        this.game.playerLocation.y = this.y;

        // this is for the border collision
        CheckBorder(this);


    };

    draw(ctx){
        for (let i = 0; i < this.weapons.length; i++) {
            let weapon = this.weapons[i];
            weapon.draw(ctx);
        }

        this.animation[this.states][this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, this.scale);

        if(this.game.options.debugging){
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x - this.game.camera.x + 52, this.y - this.game.camera.y +53, this.radius, 0, 2 * Math.PI);
            ctx.stroke(); 
            this.shop.draw(ctx);
    }
        
    }
}

class Brook{
    constructor(game, theId){
        this.game = game;
        this.id = theId;
        this.weapons = [new Sword(this.game), new Fire(game)];
        this.game.Brook = this;
        this.shop = new Shop(game);
        this.shop.availFruit.sword--;
        //sprite
        this.spriteSheet = ASSET_MANAGER.getAsset("./img/brook.png");
        this.loadAnimation(this.spriteSheet);

        //states
        this.states = 0; // 0 = idle, 1 = walking 2 = dead 3 = revive
        this.facing = 0; // 0 = right, 1 = leftd
        this.dead = false;

        // player hitbox
        this.x =  2500;
        this.y =  2500;
        this.radius = 25;
        this.direction = Direction.Up;

        this.scale = 1.2;

        //stats
        this.health = 100;
        this.maxHealth = 100;
        this.speed = 100;
        this.revive = true;

    };

    loadAnimation(spriteSheet){
        this.animation = [];
        for(var i = 0; i < 4; i++){
            this.animation.push([]);
            for(var j = 0; j < 2; j++){
                this.animation[i].push([]);
            }
        }

        // idle right
        this.animation[0][0] = new Animator(spriteSheet, 0, 60, 160, 100, 4, .2, false, true);
        // idle left
        this.animation[0][1] = new Animator(spriteSheet, 0, 240, 160, 100, 4, .2, false, true);

        // walking right
        this.animation[1][0] = new Animator(spriteSheet, 0, 420, 160, 100, 8, .2, false, true);
        // walking left
        this.animation[1][1] = new Animator(spriteSheet, 0, 600, 160, 100, 8, .2, true, true);

        // dead right
        this.animation[3][0] = new Animator(spriteSheet, 0, 780, 160, 100, 3, .2, false, false);
        // dead left
        this.animation[3][1] = new Animator(spriteSheet, 0, 960, 160, 100, 3, .2, true, false);

        // dead right
        this.animation[2][1] = new Animator(spriteSheet, 0, 1140, 160, 100, 4, .2, false, false);
        // dead left
        this.animation[2][0] = new Animator(spriteSheet, 800, 1140, 160, 100, 4, .2, true, false);;
    }

    update(){
        this.shop.update();

        if(this.dead){
            this.weapons = [];
            return;
        } 
        // changes the state of the player and the direction of the player when moving
        if(this.game.keys.a || this.game.keys.A){
            this.states = 1;
            this.facing = 1;
            this.direction = Direction.Left;
            this.x -= this.game.clockTick * this.speed;
        }
        if(this.game.keys.d || this.game.keys.D){
            this.states = 1;
            this.facing = 0;
            this.direction = Direction.Right;
            this.x += this.game.clockTick * this.speed;
        }
        if(this.game.keys.w || this.game.keys.W){
            this.states = 1;
            this.direction = Direction.Up;
            this.y -= this.game.clockTick * this.speed;
        }
        if(this.game.keys.s || this.game.keys.S){
            this.states = 1;
            this.direction = Direction.Down;
            this.y += this.game.clockTick * this.speed;
        }
        if(!(this.game.keys.a || this.game.keys.A) && !(this.game.keys.d || this.game.keys.D) &&
         !(this.game.keys.w || this.game.keys.W) && !(this.game.keys.s || this.game.keys.S)){
            this.states = 0;
        }

        // this is for the camera to follow the player when he gets to the edge of the screen
        if (this.game.playerLocation.x >= 600 || this.game.playerLocation.y >= 600) {
            this.game.camera.x += this.game.clockTick * this.speed;
            this.game.camera.y += this.game.clockTick * this.speed;
        }

        for (let i = 0; i < this.weapons.length; i++) {
            let weapon = this.weapons[i];

            weapon.update();

        }

        // checks if the player is dead
        if (this.health <= 0){
            if (this.revive){
                this.states = 2;
                setTimeout(() => {
                    this.revive = false;
                    this.health = this.maxHealth;
                },1000);
            } else {
                this.states = 3;
                this.dead = true;
            }
        }
        this.game.playerLocation.x = this.x;
        this.game.playerLocation.y = this.y;

        // this is for the border collision
        CheckBorder(this);

    };

    draw(ctx){
        for (let i = 0; i < this.weapons.length; i++) {
            let weapon = this.weapons[i];
            weapon.draw(ctx);

        }
        this.animation[this.states][this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x - 50, this.y - this.game.camera.y , this.scale);

        if(this.game.options.debugging){
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x - this.game.camera.x + 50, this.y - this.game.camera.y + 53, this.radius, 0, 2 * Math.PI);
            ctx.stroke(); 
            this.shop.draw(ctx);
    }
        
    }
}