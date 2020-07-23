import Window from './window';
import * as UIConst from './uiConstants';
import Slot from './slot';
import Button from '../button';

const columns = 2;

export default class LootWindow extends Window {
    constructor ({
        scene,
        x = 10,
        y = 10,
        corpseId,
        corpseName, 
        items = {corpse1:'sword'}
    }) {
        const width = columns*UIConst.slotWidth + (columns+1)*UIConst.slotMargin;
        const rows = Math.floor((Object.values(items).length+1)/2)
        const height = (rows +0.5) * UIConst.slotHeight + (rows+1.5) * UIConst.slotMargin;
        super({
            scene:scene,
            x:x+width/2,
            y:y+height/2,
            width:width,
            height:height 
        })
        this.corpseId = corpseId || 'someId';
        this.corpseName = corpseName || 'a corpse';
        
        this.items = items;
          
        
         
        this.slots = {};
        let slotIndex = 1;
        for (let row = 0; row<rows;row++) {
            for (let col = 0; col<columns;col++) {
                const slotX = x+(col+1)*UIConst.slotMargin + (col+0.5)*UIConst.slotWidth;
                const slotY = y+(row+1)*UIConst.slotMargin + (row+0.5)*UIConst.slotHeight;
                this.slots['corpse'+slotIndex] = new Slot({
                    scene:scene,
                    x:slotX,
                    y:slotY,
                    player:corpseId,
                    itemContainer:this.items,
                    key:'corpse'+slotIndex++,
                    label: '',
                    callback:this.slotAction,
                    ctx:this
                });
            }
        }
        console.
        
        //console.log(x+UIConst.slotMargin + UIConst.slotWidth/2, y+height-UIConst.margin);//-UIConst.slotHeight/2);
        //Make this compatiboe eith other column counts
        this.lootBtn = new Button({
          scene:scene,
          x: x+UIConst.slotMargin + UIConst.slotWidth/2,
          y: y+height-UIConst.slotMargin-UIConst.slotHeight/4,
          width:UIConst.slotWidth,
          height:UIConst.slotHeight/2,
          alpha: 0.7,
          text: 'Loot',
          onButtonDown:[{func:this.lootItem,arg:this}],
          toggle:0
        });


    }
    
    lootItem(self){
        console.log('Loot '+self.corpseName);
    }

    slotAction(slot, self) {
        
        if (slot.selected)
            slot.deselect();
        else if (self.items[slot.key])
            slot.select();
            
        
            
        for (const [_,otherSlot] of Object.entries(self.slots)) {
            //console.log(otherSlot.key, otherSlot.selected);
            if (otherSlot.selected && otherSlot.key != slot.key)
                otherSlot.deselect();
        }
    }

}
