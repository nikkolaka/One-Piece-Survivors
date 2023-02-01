const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./img/Navy.png");
ASSET_MANAGER.queueDownload("./img/luffy7.png");
ASSET_MANAGER.queueDownload("./img/Doflamingo.png");
ASSET_MANAGER.queueDownload("./img/One_Piece_Survivors_Map.png");

ASSET_MANAGER.downloadAll(() => {
    const canvas = document.getElementById("gameWorld");
    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;

	params.screenWidth = 1024;
	params.screenHeight = 768;

    //gameEngine.addEntity(new SceneManager(gameEngine));
	

    gameEngine.init(ctx);

	/* var waveMaker = new Wave(gameEngine); */
	/* waveMaker.spawnRand(); */
	new SceneManager(gameEngine);

    gameEngine.start();
	


});

