const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./img/Navy.png");
ASSET_MANAGER.queueDownload("./img/Luffy7.png");
ASSET_MANAGER.queueDownload("./img/Doflamingo2.png");

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");
	var test = false;
	if(test){
		for( i = 0; i < 40; i++){
			for(j = 0; j < 40; j++){ 
				var enemy = new Enemy(gameEngine, gameEngine.uniqueEId++)
				enemy.x = 190 + (i*14)
				enemy.y = 50 + (j*14)
				gameEngine.addEnemy(enemy)
				idMaker++
			}
	
		}
		gameEngine.enemies[0].radius = 60
	}	else{
		var waveMaker = new Wave(gameEngine);

		waveMaker.spawnRand();




	}
	gameEngine.addEntity(new luffy(gameEngine, 0));




	gameEngine.init(ctx);

	


	gameEngine.start();
});

