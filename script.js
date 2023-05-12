window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = 800;
  canvas.height = 720;

  class InputHandler {
    constructor() {
      this.keys = [];
      window.addEventListener("keydown", (e) => {
        if (
          (e.key === "ArrowDown" ||
            e.key === "ArrowUp" ||
            e.key === "ArrowLeft" ||
            e.key === "ArrowRight") &&
          this.keys.indexOf(e.key) === -1
        ) {
          this.keys.push(e.key);
        }
      });
      window.addEventListener("keyup", (e) => {
        if (
          e.key === "ArrowDown" ||
          e.key === "ArrowUp" ||
          e.key === "ArrowLeft" ||
          e.key === "ArrowRight"
        ) {
          this.keys.splice(this.keys.indexOf(e.key), 1);
        }
      });
    }
  }

  class Player {
    constructor(gameWidth, gameHeight) {
      this.gameWidth = gameWidth;
      this.gameHeight = gameHeight;
      this.width = 200; //1800 divided by 9 sprites in a row
      this.height = 200; // 400 divided by 2 sprites in a column
      this.x = 0;
      this.y = this.gameHeight - this.height;
      this.image = playerImage; //<--We learn that in subclassing video. You can use document.getElementById() if you want to
    }
    draw(context) {
      context.fillStyle = "white";
      context.fillRect(this.x, this.y, this.width, this.height);
      context.drawImage(
        this.image,
        0,
        0,
        this.width,
        this.height,
        this.x,
        this.y,
        this.width,
        this.height
      );
    }
    update() {
      this.x++;
    }
  }

  class Background {}

  class Enemy {}

  function handleEnemies() {}

  function displayStatusText() {}

  const input = new InputHandler();
  const player = new Player(canvas.width, canvas.height);

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.draw(ctx);
    player.update();
    requestAnimationFrame(animate);
  }
  animate();
});
