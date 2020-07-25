import ItemManager from '../itemManager';
import * as UIConst from './uiConstants';

export default class Slot {
	constructor ({
		scene,
		x=100,
		y=100,
		player,
		itemContainer,
		key,
      	label,
		callback,
		backgroundColor=UIConst.slotBackgroundColor,
      	width=UIConst.slotWidth,
		height=UIConst.slotHeight,
		alpha=0.7,
		strokeWidth=2,
		strokeColor=0x000000,
		active=true,
      	ctx
		}) {
		this.box = scene.add.rectangle(
          x,
          y,
          width,
          height, 
          backgroundColor
          ).setStrokeStyle(strokeWidth,strokeColor).setAlpha(alpha).setScrollFactor(0);
        this.box.setInteractive();
        let self = this;
        this.box.on('pointerdown', function (_,__,___, event) {
            callback(self, ctx);
          	event.stopPropagation();
        });
        this.backgroundColor=backgroundColor;
      
      	this.label = scene.add.text(x, y, label, {fontSize:UIConst.slotFontSize}).setTint("#000000").setOrigin(0.5,0.5).setAlign("center").setScrollFactor(0);
		this.key=key;
		this.player=player;
		this.itemContainer=itemContainer;
		this.image=scene.add.image(x,y,'').setScrollFactor(0);
		this.updateItem();
		this.selected=false;
		
	}

	updateItem() {
      
		if (this.itemContainer[this.key]) {
            
			this.image.setTexture(ItemManager.getItemData(this.itemContainer[this.key]).spriteKey)
			let scale=1;
            
			if (this.image.width > this.image.height)
				scale = (0.9*this.box.width)/this.image.width;
			else
				scale = (0.9*this.box.height)/this.image.height;
		    
            this.image.setScale(scale);
            this.image.setVisible(true);
		}
		else {
          	this.image.setVisible(false);
			this.image.setTexture('');
        }
      		
	}

	select() {
		this.selected=true;
		this.box.setFillStyle(UIConst.slotSelectedColor,this.box.alpha);
	}
	
	deselect() {
		this.selected = false;
		this.box.setFillStyle(this.backgroundColor,this.box.alpha);
	}
	
  	hide() {
    	this.box.setVisible(false);
      	this.box.setInteractive(false);
      	this.image.setVisible(false);
      	this.label.setVisible(false);
      	this.deselect();
    }
  
  	show() {
    	this.box.setVisible(true);
      	this.box.setInteractive();
      	this.label.setVisible(true);
      	this.updateItem();
    }
    
    destroy() {
        this.box.destroy();
        this.label.destroy();
        this.image.destroy();
    }

}
