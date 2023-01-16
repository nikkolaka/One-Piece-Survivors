const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");

	var idMaker = 0;
	for( i = 0; i < 45; i++){
		for(j = 0; j < 45; j++){
			var enemy = new Enemy(gameEngine,idMaker)
			enemy.x = 250 + (i*11)
			enemy.y = 100 + (j*11)
			gameEngine.addEntity(enemy)
			idMaker++
		}

	}
	gameEngine.entities[0].radius = 20




	gameEngine.init(ctx);

	


	gameEngine.start();
});
// hello

