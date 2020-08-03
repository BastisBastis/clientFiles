import Phaser from "phaser";
import Game from "./scenes/game";

const config = {
		scale: {
    	mode: Phaser.Scale.FIT,
    	autoCenter: Phaser.Scale.CENTER_BOTH,
  	},
    type: Phaser.AUTO,
    parent: "phaser-example",
    width: 800,
    height: 500,
  	physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    dom: {
        createContainer: true
    },
    scene: [
        Game
    ]
};

const game = new Phaser.Game(config);  
