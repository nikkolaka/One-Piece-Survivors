class GameEngine {
    constructor(options) {
        // What you will use to draw
        // Documentation: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
        this.ctx = null;

        // Everything that will be updated and drawn each frame
        this.entities = [];

        // array of berries for the map
        this.berries = [];
        this.berriesTotal = 91;

        this.uniqueEId = 0;

        this.camera = null;
        this.player;

        this.playerLocation = {x: params.screenWidth/2, y: params.screenHeight/2};

        // array of enemies
        this.enemies = [];

        // array of score and wave
        this.score = 0;
        this.wave = 0;

        //shop default set to false
        this.inShop = false;
        this.gameOver = true;

        // // music for in game
        // this.In_Game = new Audio("./music/In_Game.mp3");
        // this.In_Game.loop = true;
        // this.In_Game.volume = 0.2;
        // this.In_Game.play();

        // // music for death
        // this.Death = new Audio("./music/Death.mp3");
        // this.Death.loop = true;
        // this.Death.volume = 0.2;

        // // music for opening
        // this.Opening = new Audio("./music/Opening.mp3");
        // this.Opening.loop = true;
        // this.Opening.volume = 0.2;
        // this.Opening.play();
        // this.Opening.pause();

        // Information on the input
        this.click = false;
        this.mouse = null;
        this.mousedown = null;
        this.mouseup = null;

        this.wheel = null;
        this.keys = {};

        // Options and the Details
        this.options = options || {
            debugging: false,
        };
    };

    init(ctx) {
        this.ctx = ctx;
        this.startInput();
        this.timer = new Timer();
    };

    start() {
        this.running = true;
        const gameLoop = () => {
            this.loop();
            requestAnimFrame(gameLoop, this.ctx.canvas);
        };
        gameLoop();
    };

    startInput() {
        const getXandY = e => ({
            x: e.clientX - this.ctx.canvas.getBoundingClientRect().left,
            y: e.clientY - this.ctx.canvas.getBoundingClientRect().top
        });
        
        this.ctx.canvas.addEventListener("mousemove", e => {
            if (this.options.debugging) {
                console.log("MOUSE_MOVE", getXandY(e));
            }
            this.mouse = getXandY(e);
        });

        this.ctx.canvas.addEventListener("click", e => {
            if (this.options.debugging) {
                console.log("CLICK", getXandY(e));
            }
            this.click = getXandY(e);
        });

        this.ctx.canvas.addEventListener("wheel", e => {
            if (this.options.debugging) {
                console.log("WHEEL", getXandY(e), e.wheelDelta);
            }
            e.preventDefault(); // Prevent Scrolling
            this.wheel = e;
        });

        this.ctx.canvas.addEventListener("contextmenu", e => {
            if (this.options.debugging) {
                console.log("RIGHT_CLICK", getXandY(e));
            }
            e.preventDefault(); // Prevent Context Menu
            this.rightclick = getXandY(e);
        });

        this.ctx.canvas.addEventListener("mousedown", function (e) {
            //Left mouse button
            if (e.which == 1) {
                this.click = true;
                console.log("click");

            }
            else {
                this.click = true;
            }
        }, false);

        this.ctx.canvas.addEventListener("mouseup", function (e) {
            //Left mouse button
            if (e.which == 1) {
                this.click = false;
            }
        }, false);

        this.ctx.canvas.addEventListener("keydown", event => this.keys[event.key] = true);
        this.ctx.canvas.addEventListener("keyup", event => this.keys[event.key] = false);
    };

    addEntity(entity) {
        this.entities.push(entity);
    };

    addPlayer(player) {
        this.player = player;
    }
    
    addEnemy(enemy) {
        this.enemies.push(enemy);
    };

    addBerry(berry) {
        this.berries.push(berry);
    };
    

    draw() {
        // Clear the whole canvas with transparent color (rgba(0, 0, 0, 0))
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);



        // Draw latest things first
        

        for (let i = this.entities.length - 1; i >= 0; i--) {
            this.entities[i].draw(this.ctx, this);
        }
        
        for (let i = this.berries.length - 1; i >= 0; i--) {
            this.berries[i].draw(this.ctx, this);
        }
        for (let i = this.enemies.length - 1; i >= 0; i--) {

            if(inWindow(this.enemies[i], this.player))this.enemies[i].draw(this.ctx, this);
            
        }

        if(this.gameOver == false) {
            this.player.draw(this.ctx);

            var healthWidth = params.screenWidth*(this.player.health/this.player.maxHealth);
            this.ctx.fillStyle = "red";
            this.ctx.fillRect(0,params.screenHeight-20, healthWidth, 20)
            this.ctx.stroke();
            this.ctx.font = "48px sans-serif";
            this.ctx.fillText(this.score, 20, 50);
            this.ctx.font = "48px sans-serif";
            this.ctx.fillText(this.wave, 20, 100);
            this.ctx.font = "48px sans-serif";
            this.ctx.fillText(this.berriesTotal, 20, 150);
        }
        
        //this.player.draw(this.ctx);

        /* var healthWidth = params.screenWidth*(this.player.health/this.player.maxHealth); */
        /* this.ctx.fillStyle = "red"; */
        /* this.ctx.fillRect(0,params.screenHeight-20, healthWidth, 20) */
        /* this.ctx.stroke(); */

        /* this.ctx.font = "48px sans-serif"; */
        /* this.ctx.fillText(this.score, 20, 50); */

        /* this.ctx.font = "48px sans-serif"; */
        /* this.ctx.fillText(this.wave, 20, 100); */

        /* this.ctx.font = "48px sans-serif"; */
        /* this.ctx.fillText(this.berriesTotal, 20, 150); */

        


        //added draw camera after entities
        //this.camera.draw(this.ctx);



        
    };

    update() {
        let entitiesCount = this.entities.length;
        /* if(this.player.shop.inShop){
            this.player.shop.update();
            return;
        }
        */

        if(this.gameOver == false) {
            if(this.player.shop.inShop){ 
                this.player.shop.update(); 
                return; 
           } 
           this.player.update();
        }
                
                
        //this.player.update();
        

        for (let i = 0; i < entitiesCount; i++) {
            let entity = this.entities[i];
  
            entity.update();        
        }

        for (let i = 0; i < this.enemies.length; i++) {
            let enemy = this.enemies[i];
            if (!enemy.removeFromWorld) {
                enemy.update();
                if(checkCircleTouching(this.player, enemy) && !enemy.dead){
                    
                    this.player.health -= Math.abs(enemy.health/200);
                }
                for(let j = 0; j < this.player.weapons.length; j ++){
                    this.player.weapons[j].colliding(enemy)

                    if(enemy.dead)setTimeout(() => {enemy.removeFromWorld = true;}, 1000);
                }
            }
        }

        for (let i = 0; i < this.berries.length; i++) {
            let berry = this.berries[i];

            if(checkCircleTouching(this.player, berry)){
                berry.removeFromWorld = true;
                this.berriesTotal += berry.value;
            }
        }

        /* if(this.game.camera.gameOver == false) { */
        /*     if(this.player.shop.inShop){  */
        /*         this.player.shop.update();  */
        /*         return;  */
        /*    }  */
        /* } */
        /*  */
        /*  */
        
        

        //added camera update
        this.camera.update();


        //mouse control

        for (let i = this.enemies.length - 1; i >= 0; --i) { 
             if (this.enemies[i].removeFromWorld) { 
                let enemy = this.enemies[i];
                
                enemy.berry.x = enemy.x ;
                enemy.berry.y = enemy.y ;
                this.addBerry(enemy.berry)
                this.score++;
                this.enemies.splice(i, 1); 
             }
        }

        for (let i = this.berries.length - 1; i >= 0; --i) { 
            if (this.berries[i].removeFromWorld) { 
               
               this.berries.splice(i, 1); 
            }
       }
        for (let i = this.entities.length - 1; i >= 0; --i) {
            if (this.entities[i].removeFromWorld) {
                this.entities.splice(i, 1);
            }
        }
        /* for (let i = this.enemies.length - 1; i >= 0; --i) { */
        /*     if (this.enemies[i].removeFromWorld) { */
        /*         this.enemies.splice(i, 1); */
        /*     } */
        /* } */


        // music
        /* if(!this.In_Game.playing && !this.player.dead) { */
        /*     this.In_Game.play(); */
        /* } */
        /* else { */
        /*     this.In_Game.pause(); */
        /*     this.Death.play(); */
        /* } */
    };

    loop() {
        this.clockTick = this.timer.tick();
        this.update();
        this.draw();
        this.click = null;
    };
};
