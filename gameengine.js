// This game shell was happily modified from Googler Seth Ladd's "Bad Aliens" game and his Google IO talk in 2011

class GameEngine {
    constructor(options) {
        // What you will use to draw
        // Documentation: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
        this.ctx = null;

        // Everything that will be updated and drawn each frame
        this.entities = [];

        this.uniqueEId = 0;

        this.camera = this;
        this.player;

        this.playerLocation = {x: params.screenWidth/2, y: params.screenHeight/2};


        this.enemies = [];
        

        // Information on the input
        this.click = null;
        this.mouse = null;
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
    

    draw() {
        // Clear the whole canvas with transparent color (rgba(0, 0, 0, 0))
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);



        // Draw latest things first
        

        for (let i = this.entities.length - 1; i >= 0; i--) {
            this.entities[i].draw(this.ctx, this);
        }
        

        for (let i = this.enemies.length - 1; i >= 0; i--) {
            this.enemies[i].draw(this.ctx, this);
        }
        this.player.draw(this.ctx);


        //added draw camera after entities
        //this.camera.draw(this.ctx);



        
    };

    update() {
        let entitiesCount = this.entities.length;

        this.player.update();

        for (let i = 0; i < entitiesCount; i++) {
            let entity = this.entities[i];

            
            
            entity.update();
           
        }
        for (let i = 0; i < this.enemies.length; i++) {
            let enemy = this.enemies[i];
            if (!enemy.removeFromWorld) {
                enemy.update();
            }

            

        }
        

        


        //added camera update
        this.camera.update();


        //mouse control
        


        /* for (let i = this.entities.length - 1; i >= 0; --i) { */
        /*     if (this.entities[i].removeFromWorld) { */
        /*         this.entities.splice(i, 1); */
        /*     } */
        /* } */
        /* for (let i = this.enemies.length - 1; i >= 0; --i) { */
        /*     if (this.enemies[i].removeFromWorld) { */
        /*         this.enemies.splice(i, 1); */
        /*     } */
        /* } */
        
    };

    loop() {
        this.clockTick = this.timer.tick();
        this.update();
        this.draw();
    };

};
