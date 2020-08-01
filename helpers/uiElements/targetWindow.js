import Window from './window';
import * as UIConst from './uiConstants';

export default class TargetWindow extends Window {
	constructor (scene,player) {
		
		
		
		const height = UIConst.labelYMargin*2+UIConst.lineSpacing;
		const width= 150;
		const x = scene.cameras.main.centerX;
		super({scene:scene,
					x:x,
          y:height/2, 
          width:width, 
          height:height});
      		this.player=player;

    	this.targetLabel =          
    	scene.add.text(
    	x, 
    	UIConst.labelYMargin, (player.target?player.target.name:"No target"), {fontSize:UIConst.fontSize}).setTint("#000000").setOrigin(0.5,0.5).setScrollFactor(0);
	
		this.targetHpLabel = 
    	scene.add.text(
      x, 
      UIConst.labelYMargin +UIConst.lineSpacing, 
      "", 
      {fontSize:UIConst.fontSize}).setTint("#000000").setOrigin(0.5,0.5).setScrollFactor(0);
		
	}
	
	update() {
  	if (this.player.target) {
			this.targetLabel.setText(this.player.target.name);
			const hpString = this.player.target.type==='character'?`${this.player.target.hp}/${this.player.target.maxHp}`:"";
  			this.targetHpLabel.setText(hpString);
  		}
  		else {
  			this.targetLabel.setText('No target');
  			this.targetHpLabel.setText('');
  		}
  }
	
}
