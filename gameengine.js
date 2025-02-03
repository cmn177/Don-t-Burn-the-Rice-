class GameEngine {
    constructor(options) {
        // What you will use to draw
        // Documentation: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
        this.ctx = null;

        // Everything that will be updated and drawn each frame
        this.entities = [];

        // Information on the input
        this.move = null;
        this.down = null;

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
        var getXandY = function (e) {
            var x = e.clientX - that.ctx.canvas.getBoundingClientRect().left;
            var y = e.clientY - that.ctx.canvas.getBoundingClientRect().top;

            return { x: x , y: y };
        }

        var that = this;
        
        this.ctx.canvas.addEventListener("mousemove", (e) => {
            that.move = getXandY(e);
        }, false);
    
        this.ctx.canvas.addEventListener("mousedown", (e) => {
            that.down = true;

            // Check if the pitcher was clicked and start dragging
            that.entities.forEach((entity) => {
                if (entity instanceof RiceCooker && entity.isClicked(getXandY(e).x, getXandY(e).y)) {
                  entity.handleClick(); // Trigger the click handler
                }
                if (entity instanceof TimerBar && entity.isClicked(getXandY(e).x, getXandY(e).y)) {
                    entity.handleClick();
                }
              });

            console.log("Mouse Down");  // Check if this is firing
        }, false);
    
        this.ctx.canvas.addEventListener("mouseup", (e) => {
            that.down = false;

            // Stop dragging
            that.entities.forEach((entity) => {
                if (entity instanceof RiceCooker && entity.isClicked(getXandY(e).x, getXandY(e).y)) {
                  entity.handleClick(); // Trigger the click handler
                }
              });

            console.log("Mouse Up");  // Check if this is firing
        }, false);

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

    loop() {
        this.clockTick = this.timer.tick();
        this.update();
        this.draw();
    };

};