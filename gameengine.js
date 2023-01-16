// This game shell was happily modified from Googler Seth Ladd's "Bad Aliens" game and his Google IO talk in 2011

class GameEngine {
    constructor(options) {
        // What you will use to draw
        // Documentation: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
        this.ctx = null;

        // Everything that will be updated and drawn each frame
        this.entities = [];
        this.prunedCollisions = [];

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

    draw() {
        // Clear the whole canvas with transparent color (rgba(0, 0, 0, 0))
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        // Draw latest things first
        for (let i = this.entities.length - 1; i >= 0; i--) {
            this.entities[i].draw(this.ctx, this);
        }
    };

    update() {




        let entitiesCount = this.entities.length;



        this.sweepAndPrune();




        
        for (let i = 0; i < entitiesCount; i++) {
            let entity = this.entities[i];

            if (!entity.removeFromWorld) {
                entity.update();
            }
        }

        for (let i = this.entities.length - 1; i >= 0; --i) {
            if (this.entities[i].removeFromWorld) {
                this.entities.splice(i, 1);
            }
        }
    };

    sweepAndPrune(){
        
        this.entities.sort((a, b) => (a.x > b.x) ? 1 : -1)

        var activeInterval = []
        
        for(i = 0; i < this.entities.length -1 ; i++){

            var firstEntityRight = (this.entities[i].x+this.entities[i].radius)
            var secondEntityLeft = (this.entities[i+1].x-this.entities[i+1].radius)
            
            if((firstEntityRight >= secondEntityLeft)){
                activeInterval.push(this.entities[i])
                activeInterval.push(this.entities[i+1])
            } else {
                for (let j = activeInterval.length-1; j > 0; j--) {
                    for (let k = 0; k < activeInterval.length-1; k++) {


                        activeInterval[j].checkCircleColliding(activeInterval[k])
                        activeInterval[k].checkCircleColliding(activeInterval[j])
                    }
                    activeInterval.pop()
                }

                activeInterval = [];
                
            }
        }
        if(activeInterval.length != 0){
            for (let j = activeInterval.length-1; j > 0; j--) {
                for (let k = 0; k < activeInterval.length-1; k++) {


                    activeInterval[j].checkCircleColliding(activeInterval[k])
                    activeInterval[k].checkCircleColliding(activeInterval[j])
                }
                activeInterval.pop()
            }

            activeInterval = [];
        }
    }

    loop() {
        this.clockTick = this.timer.tick();
        this.update();
        this.draw();
    };

};

// KV Le was here :)