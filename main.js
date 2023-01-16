const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");

	var idMaker = 0;
	for( i = 0; i < 35; i++){
		for(j = 0; j < 35; j++){
			var enemy = new Enemy(gameEngine,idMaker)
			enemy.x = 400 + (i*6)
			enemy.y = 400 + (j*6)
			gameEngine.addEntity(enemy)
			idMaker++
		}

	}
	gameEngine.entities[0].radius = 15




	gameEngine.init(ctx);

	


	gameEngine.start();
});
// hello

