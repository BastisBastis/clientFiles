import * as UIConst from './uiConstants';

export default class Window {
  constructor ({
  	scene,
  	x=0,
  	y=0,
  	width=0,
  	height=0,
  	backgroundColor=UIConst.backgroundColor,
  	alpha=UIConst.alpha,
  	strokeColor=UIConst.strokeColor,
  	strokeWidth=UIConst.strokeWidth
  	}) {
  		this.rect = scene.add.rectangle(
          x,
          y,
          width,
          height, 
          backgroundColor
          ).setStrokeStyle(strokeWidth,strokeColor).setAlpha(alpha).setScrollFactor(0);
  	}
	
  	hide() {
    	this.rect.setVisible(false); 
    }
  
  	show() {
    	this.rect.setVisible(true); 
    }


}
