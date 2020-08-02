import * as UIConst from './uiConstants';

export default class ChatWindow extends Phaser.GameObjects.Container {
    constructor ({
        scene,
        x=0,
        y,
        width,
        height=200,
        backgroundColor=UIConst.backgroundColor,
        alpha=UIConst.alpha,
        strokeColor=UIConst.strokeColor,
  	    strokeWidth=UIConst.strokeWidth
    }) {
        y=y || scene.cameras.main.height-height;
        width = width || scene.cameras.main.width-300;
        super(x,y)
        
        scene.add.existing(this);
        
        this.add(scene.add.rectangle(
          x,
          y,
          width,
          height, 
          backgroundColor
          ).setStrokeStyle(strokeWidth,strokeColor).setAlpha(alpha).setScrollFactor(0));
          
        
        
        
        
    }
    
    
}
