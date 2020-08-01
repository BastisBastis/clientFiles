import Window from './window';
import * as UIConst from './uiConstants';
import Slot from './slot';


export default class InventoryWindow {
	constructor(scene,player, x=100,y=100) {
      	this.scene = scene;
      	this.player=player;
		const equipmentRows=1;
		const equipmentColumns = 3;
		
		const equipmentWindowWidth=equipmentColumns*UIConst.slotWidth+(equipmentColumns+1)*UIConst.slotMargin;
		const equipmentWindowHeight=equipmentRows*UIConst.slotHeight+(equipmentRows+1)*UIConst.slotMargin;
		
		this.equipmentWindow=new Window({
		scene:scene,
		x:x+equipmentWindowWidth/2,
		y:y+equipmentWindowHeight/2,
		width:equipmentWindowWidth,
		height:equipmentWindowHeight
		});
		//Create equipment Slots
		const equipmentKeys = [{key:'chest', label:'Chest'}, {key:'legs', label:'Legs'}, {key:'main', label:'Main hand'}];
      	let self = this;
      	this.equipmentSlots = {};
      	for (const [i, slot] of equipmentKeys.entries()) {
          this.equipmentSlots[slot.key] = new Slot({
            
          	x:(x+(i+0.5)*UIConst.slotWidth+(i+1)*UIConst.slotMargin),
            y:y+UIConst.slotHeight/2+UIConst.slotMargin,
            scene:scene,
            player:player,
            itemContainer:player.equipmentSlots,
            key:slot.key,
            label:slot.label,
            callback:self.slotAction,
            ctx : this
          });
        }
		
		const inventoryRows=2;
		const inventoryColumns=2;
		const inventoryWidth= inventoryColumns*UIConst.slotWidth+(inventoryColumns+1)*UIConst.slotMargin;
		const inventoryHeight= inventoryRows*UIConst.slotHeight+(inventoryRows+1)*UIConst.slotMargin;
		const inventoryX = x+equipmentWindowWidth-inventoryWidth;
      	const inventoryY = y+equipmentWindowHeight;
      	const inventoryButtonHeight = 40;
      	const inventoryButtonWidth = 80;
        
		this.inventoryWindow=new Window({
          scene:scene,
          player:player,
          x: inventoryX + inventoryWidth/2,
          y: inventoryY + inventoryWidth/2,
          width:inventoryWidth,
          height:inventoryHeight
		});
		
      	this.inventorySlots = {};
        
      	for (let i = 0;i<inventoryRows;i++) {
        	for (let j = 0;j<inventoryColumns;j++) {
            	this.inventorySlots['inv'+ (1+Object.keys(this.inventorySlots).length)] = new Slot({
                	x: inventoryX + (j+0.5)*UIConst.slotWidth+(j+1)*UIConst.slotMargin,
                  	y: inventoryY + (i+0.5)*UIConst.slotHeight+(i+1)*UIConst.slotMargin,
                  	scene:scene,
                    player:player,
                    itemContainer:player.inventorySlots,
                    key:'inv'+(Object.keys(this.inventorySlots).length+1),
                    label:Object.keys(this.inventorySlots).length+1,
                    callback:this.slotAction,
                  	ctx:this
                });
              
            }
        }
      //this.visible=false;
      this.hide();
  
	}

  slotAction(slot, self) {
    
    if (!slot.selected) {
      	let selectedSlot = false;
      	for (const [_, equipmentSlot] of Object.entries(self.equipmentSlots)) {
          	if (equipmentSlot != slot && equipmentSlot.selected) {
              selectedSlot = equipmentSlot;
              equipmentSlot.deselect();
            }
        }
      	for (const [_, inventorySlot] of Object.entries(self.inventorySlots)) {
          	if (inventorySlot != slot && inventorySlot.selected) {
              selectedSlot = inventorySlot;
              inventorySlot.deselect();
              //console.log(selectedSlot);
            }
        }
      	if (selectedSlot) {
          self.scene.socket.emit("proposeItemSwitch", {playerId:self.player.id, a:slot.key, b:selectedSlot.key});
          //console.log(slot.key,selectedSlot.key);
        }
//proposeItemSwitch(this.player,slot.key, selectedSlot.key)
      	else
    	  slot.select(); 
    }
    else {
    	slot.deselect();
      	
    }
  }

  updateWithData(data) {
    for (const slot of Object.keys(data)) {
      
      let container = this.equipmentSlots;
      if (slot.startsWith('inv'))
        container=this.inventorySlots;
      
      container[slot].updateItem();
      if (!this.visible)
        slot.hide();
     
    }
  }
  
  hide() {
    this.visible=false;
    this.equipmentWindow.hide()
    this.inventoryWindow.hide()
    for (const slot of Object.values(this.equipmentSlots))
      slot.hide();
    for (const slot of Object.values(this.inventorySlots))
      slot.hide();
  }
  
  show() {
    this.visible=true;
    this.equipmentWindow.show()
    this.inventoryWindow.show()
    for (const slot of Object.values(this.equipmentSlots))
      slot.show();
    for (const slot of Object.values(this.inventorySlots))
      slot.show();
  }
  
  toggleVisible() {
    console.log('invWin: toggle');
    this.visible ? this.hide() : this.show();
  }

}
