const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();
//enemy
ASSET_MANAGER.queueDownload("./img/Navy.png");
ASSET_MANAGER.queueDownload("./img/Doflamingo.png");
ASSET_MANAGER.queueDownload("./img/blackbeard1.png");
ASSET_MANAGER.queueDownload("./img/akainu.png");

//player
ASSET_MANAGER.queueDownload("./img/luffy7.png");
ASSET_MANAGER.queueDownload("./img/zoro1.png");
ASSET_MANAGER.queueDownload("./img/brook.png");

//player projectiles
ASSET_MANAGER.queueDownload("./img/gomu.png");
ASSET_MANAGER.queueDownload("./img/big gomu.png");
ASSET_MANAGER.queueDownload("./img/sword.png");
ASSET_MANAGER.queueDownload("./img/firewheel.png");
ASSET_MANAGER.queueDownload("./img/axe.png");

//end screen image
ASSET_MANAGER.queueDownload("./img/endscreen.jpg");

//enemy projectiles
ASSET_MANAGER.queueDownload("./img/string.png");

//items
ASSET_MANAGER.queueDownload("./img/items.png");

//map
ASSET_MANAGER.queueDownload("./img/OnePieceMap.png");
ASSET_MANAGER.queueDownload("./img/titlescreen.jpg");

// music
ASSET_MANAGER.queueDownload("./music/Opening.mp3");
ASSET_MANAGER.queueDownload("./music/In_Game.mp3");
ASSET_MANAGER.queueDownload("./music/Death.mp3");

ASSET_MANAGER.downloadAll(() => {
    const canvas = document.getElementById("gameWorld");
    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;

	params.screenWidth = 1024;
	params.screenHeight = 768;

    gameEngine.init(ctx);

    
	this.scene = new SceneManager(gameEngine);
    gameEngine.addEntity(scene);
    this.scene.loadTitleScreen();
    gameEngine.start();
	
});

