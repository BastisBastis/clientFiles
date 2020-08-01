import ExpManager from '../expManager';
import Window from './window';
import * as UIConst from './uiConstants';

export default class PlayerWindow extends Window {
	constructor (scene, player) {
	  
	
	  //const fontSize=UIConst.fontSize;
		//const lineSpacing=;
    //const labelYMargin = 10;
    //const labelXMargin = 5;
    const height=8*UIConst.lineSpacing+UIConst.labelYMargin*2;
    const width= 250;

    const x = scene.cameras.main.width-width;
    const y = 0;
    
    super({
    x:x+width/2,
    y:y+height/2,
    width:width,
    height:height,
    scene:scene
    });
    this.scene=scene;
	this.player=player;
    
    const labelNames = ['name', 'hp', 'damage', 'attackRating', 'defense', 'delay','level','experience'];
   	this.playerLabels = {}
    const labels = [player.name, 
      	`HP: ${player.hp}/${player.maxHp}`, 
      	`Damage:${player.damage}`, 
      	`ATK: ${player.attackRating}`, 
      	`Defense: ${player.defense}`, 
      	`Delay: ${player.delay}`,
      	`Level: ${player.level}`,
      	`Exp: ${player.experience}/${ExpManager.getExpNeededForLevel(player.level+1)}`
         ];
    for (const [i, label] of labels.entries()) {
      this.playerLabels[labelNames[i]]=scene.add.text(
         x+UIConst.labelXMargin, 
         UIConst.labelYMargin + UIConst.lineSpacing*i,
         labels[i], 
         {fontSize:UIConst.fontSize}).setTint("#000000").setScrollFactor(0);
    }
	}

	update() {
		this.playerLabels.hp.setText(`HP: ${this.player.hp}/${this.player.maxHp}`);
        this.playerLabels.damage.setText(`Damage:${this.player.damage}`);
        this.playerLabels.attackRating.setText(`ATK: ${this.player.attackRating}`);
        this.playerLabels.defense.setText(`Defense: ${this.player.defense}`);
        this.playerLabels.delay.setText(`Delay: ${this.player.delay}`);
        this.playerLabels.level.setText(`Level: ${this.player.level}`);
        this.playerLabels.experience.setText(`Exp: ${this.player.experience}/${ExpManager.getExpNeededForLevel(this.player.level+1)}`);
	}

}
