
const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./img/Navy.png");
ASSET_MANAGER.queueDownload("./img/Doflamingo.png");
ASSET_MANAGER.queueDownload("./img/blackbeard1.png");
ASSET_MANAGER.queueDownload("./img/akainu.png");

ASSET_MANAGER.queueDownload("./img/luffy7.png");
ASSET_MANAGER.queueDownload("./img/zoro1.png");

ASSET_MANAGER.queueDownload("./img/gomu.png");
ASSET_MANAGER.queueDownload("./img/sword.png");

ASSET_MANAGER.queueDownload("./img/OnePieceMap.png");

ASSET_MANAGER.downloadAll(() => {
    const canvas = document.getElementById("gameWorld");
    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;

	params.screenWidth = 1024;
	params.screenHeight = 768;
	

    gameEngine.init(ctx);

	new SceneManager(gameEngine);

    gameEngine.start();
	
});

