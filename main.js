const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");
	var idMaker = 0;
	
/* 	for( i = 0; i < 3; i++){
		var enemy = new Enemy(gameEngine, idMaker)
			enemy.x = 400 + (i*50)

			gameEngine.addEntity(enemy)
			idMaker++;

	} */

	for( i = 0; i < 35; i++){
		for(j = 0; j < 35; j++){
			var enemy = new Enemy(gameEngine, idMaker)
			enemy.x = 400 + (i*5)
			enemy.y = 400 + (j*5)
			gameEngine.addEntity(enemy)
			idMaker++;
		}

	}
	gameEngine.entities[0].radius = 10



	
	gameEngine.init(ctx);

	


	gameEngine.start();
});



// hello

