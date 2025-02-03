const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./ricecooker2.png");
ASSET_MANAGER.queueDownload("./bar.png");

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");

	const timerBar = new TimerBar(gameEngine, 10);
	const riceCooker = new RiceCooker(gameEngine);

	gameEngine.addEntity(riceCooker);
  gameEngine.addEntity(timerBar);

	gameEngine.init(ctx);
	gameEngine.start();

});
