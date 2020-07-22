import Window from './window';
import * as UIConst from './uiConstants';
import Slot from './slot';

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
        const height = rows * UIConst.slotHeight + (rows+1) * UIConst.slotMargin;
        super({
            scene:scene,
            x:x,
            y:y,
            width:width,
            height:height
        })
        this.corpseId = corpseId || 'someId';
        this.corpseName = corpseName || 'a corpse';
        
        this.items = items;
          
        
         
        this.slots = {};
        let slotIndex = 0;
        for (const row = 0; row<rows;row++) {
            for (const col = 0; col<columns;col++) {
                const slotX = x+(col+1)*UIConst.slotMargin + (col+0.5)*UIConst.slotWidth;
                const slotY = y+(row+1)*UIConst.slotMargin + (row+0.5)*UIConst.slotHeight;
                this.slots['slot'+slotIndex] = new Slot({
                    scene:scene,
                    x:slotX,
                    y:slotY,
                    player:corpseId,
                    itemContainer:this.items,
                    key:'corpse'+slotIndex++,
                    label: '',
                    callback:this.slotTouched,
                    ctx:this
                });
            }
        }
        

    }

    slotTouched(slot, self) {
        console.log(slot.key);
    }

}
