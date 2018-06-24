class Asteroid {
    private  _fps : number;
    private  _SHIP_Size : number;
    constructor () {}

    get FPS() : number {
        return this._fps;
    }
    set FPS(value : number) {
        this._fps = value;
    }
    get SHIP_Size() : number {
        return this._SHIP_Size;
    }
    set SHIP_Size(value : number) {
        this._SHIP_Size = value;
    }

    public update(ctx : CanvasRenderingContext2D, canvas : HTMLCanvasElement, ship : object) : void {
        // drawing the space
        ctx.fillStyle = "black";
        ctx.fillRect(0 ,0, canvas.width, canvas.height);
        // drawing ship
        ctx.strokeStyle = "white";
        ctx.lineWidth = this._SHIP_Size / 20;
        ctx.beginPath();
        ctx.moveTo(
            ship.x + ship.r + Math.cos(ship.a),
            ship.y - ship.r + Math.sin(ship.a)
        );
        ctx.lineTo( //rear left
            ship.x - ship.r * (Math.cos(ship.a)) + (Math.sin(ship.a)),
            ship.y + ship.r * (Math.sin(ship.a) - Math.cos(ship.a))
        );
        ctx.lineTo( //rear right
            ship.x - ship.r * (Math.cos(ship.a)) - (Math.sin(ship.a)),
            ship.y + ship.r * (Math.sin(ship.a) + Math.cos(ship.a))
        );
        ctx.closePath();
        ctx.stroke();
        // rotate the ship

        //nove the ship

        //center dor
        ctx.fillStyle = "red";
        ctx.fillRect(ship.x - 1,ship.y -1,2,2);
    }
}
function gameLoop() {
    requestAnimationFrame(gameLoop);
}

window.onload = function() {

    let canvas : HTMLCanvasElement  = <HTMLCanvasElement>document.getElementById("gameCanvas");
    let ctx  : CanvasRenderingContext2D = canvas.getContext("2d");
    let aster : Asteroid = new Asteroid();
    aster.SHIP_Size = 30;
    aster.FPS = 30;
    let ship : object = {
        x: canvas.width / 2,
        y: canvas.height / 2,
        r: aster.SHIP_Size / 2,
        a: 90 / 180 * Math.PI // convering to radians
    };
    aster.update(ctx, canvas, ship);
    gameLoop();

    //set up the game loop
     setInterval(aster.update, 1000 / aster.FPS);
};