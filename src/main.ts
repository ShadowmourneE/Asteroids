enum Options {
    FPS = 30,
    TURN_SPEED = 360,
    SHIP_SIZE = 30,
    FRICTION = 0.7,
    SHIP_THRUST = 5
}
class Asteroid {
    private _ship : object;
    constructor (ship : any) {
        this._ship = ship;
    }

    public update(ctx : CanvasRenderingContext2D, canvas : HTMLCanvasElement, ship : any) : void {
        // drawing the space
        ctx.fillStyle = "black";
        ctx.fillRect(0 ,0, canvas.width, canvas.height);
        // drawing ship
        if (ship.thrusting) {
            ship.thrust.x += Options.SHIP_THRUST * Math.cos(ship.a) / Options.FPS;
            ship.thrust.y -= Options.SHIP_THRUST * Math.sin(ship.a) / Options.FPS;

            // draw the thruster
            ctx.fillStyle = "red";
            ctx.strokeStyle = "yellow";
            ctx.lineWidth = Options.SHIP_SIZE / 10;
            ctx.beginPath();
            ctx.moveTo( // rear left
                ship.x - ship.r * (2 / 3 * Math.cos(ship.a) + 0.5 * Math.sin(ship.a)),
                ship.y + ship.r * (2 / 3 * Math.sin(ship.a) - 0.5 * Math.cos(ship.a))
            );
            ctx.lineTo( // rear centre (behind the ship)
                ship.x - ship.r * 5 / 3 * Math.cos(ship.a),
                ship.y + ship.r * 5 / 3 * Math.sin(ship.a)
            );
            ctx.lineTo( // rear right
                ship.x - ship.r * (2 / 3 * Math.cos(ship.a) - 0.5 * Math.sin(ship.a)),
                ship.y + ship.r * (2 / 3 * Math.sin(ship.a) + 0.5 * Math.cos(ship.a))
            );
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
        } else {
            // apply friction (slow the ship down when not thrusting)
            ship.thrust.x -= Options.FRICTION * ship.thrust.x / Options.FPS;
            ship.thrust.y -= Options.FRICTION * ship.thrust.y / Options.FPS;
        }

        ctx.strokeStyle = "white";
        ctx.lineWidth = Options.SHIP_SIZE / 10;
        ctx.beginPath();
        ctx.moveTo(
            ship.x - ship.r * (2 / 3 * Math.cos(ship.a) + 0.5 * Math.sin(ship.a)),
            ship.y + ship.r * (2 / 3 * Math.sin(ship.a) - 0.5 * Math.cos(ship.a))
        );
        ctx.lineTo( //rear left
            ship.x - ship.r * 5 / 3 * Math.cos(ship.a),
            ship.y + ship.r * 5 / 3 * Math.sin(ship.a)
        );
        ctx.lineTo( //rear right
            ship.x - ship.r * (2 / 3 * Math.cos(ship.a) - 0.5 * Math.sin(ship.a)),
            ship.y + ship.r * (2 / 3 * Math.sin(ship.a) + 0.5 * Math.cos(ship.a))
        );
        ctx.closePath();
        ctx.stroke();
        // rotate the ship
        // rotate the ship
        ship.a += ship.rot;

        // move the ship
        ship.x += ship.thrust.x;
        ship.y += ship.thrust.y;

        // handle edge of screen
        if (ship.x < 0 - ship.r) {
            ship.x = canvas.width + ship.r;
        } else if (ship.x > canvas.width + ship.r) {
            ship.x = 0 - ship.r;
        }
        if (ship.y < 0 - ship.r) {
            ship.y = canvas.height + ship.r;
        } else if (ship.y > canvas.height + ship.r) {
            ship.y = 0 - ship.r;
        }
        //nove the ship

        //center dot
        ctx.fillStyle = "red";
        ctx.fillRect(ship.x - 1,ship.y -1,2,2);
    }
    public keyUp(ev : KeyboardEvent,ship : any) : void {
        switch(ev.keyCode) {
            case 37: //left arrow (stop rotating)
                ship.rot = 0;
                break;
            case 38:  // up arrow (stop)
                ship.thrusting = false;
                break;
            case 39: //right arrow (rotate ship right)
                ship.rot = 0;
                break;
        }
    }
    public keyDown(ev : KeyboardEvent, ship : any) : void {
         switch(ev.keyCode) {
             case 37: //left arrow (rotate ship left)
                 ship.rot = Options.TURN_SPEED / 180 * Math.PI / Options.FPS;
                 break;
             case 38:  // up arrow (thrust the ship forward)
                 ship.thrusting = true;
                 break;
             case 39: //right arrow (rotate ship right)
                 ship.rot = -Options.TURN_SPEED / 180 * Math.PI / Options.FPS;
                 break;
         }
    }
}
function gameLoop() {
    requestAnimationFrame(gameLoop);
}

window.onload = function() {
    let canvas : HTMLCanvasElement  = <HTMLCanvasElement> document.getElementById("gameCanvas");
    let ctx  : CanvasRenderingContext2D = canvas.getContext("2d");
    let ship : any = {
        x: canvas.width / 2,
        y: canvas.height / 2,
        r: Options.SHIP_SIZE / 2,
        a: 90 / 180 * Math.PI, // converting to radians
        rot: 0,
        thrusting : false,
        thrust : {
            x: 0,
            y: 0
        }
    };
    let aster : Asteroid = new Asteroid(ship);

    // set up event handlers

    document.addEventListener("keydown", aster.keyDown);
    document.addEventListener("keyup", aster.keyUp);

    aster.update(ctx, canvas, ship);
    gameLoop();

    //set up the game loop
     setInterval(aster.update, 1000 / Options.FPS);
};