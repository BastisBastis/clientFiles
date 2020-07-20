import Button from './button';
import PlayerWindow from './uiElements/playerWindow';
import TargetWindow from './uiElements/targetWindow';
import InventoryWindow from './uiElements/inventoryWindow';
import LootWindow from './uiElements/lootWindow';

export default class UI { 
 	constructor (scene, player) {
    	this.scene = scene;
      	this.player = player;
      	this.scene=scene;
      	
      	this.playerWindow = new PlayerWindow(scene, player);
      	this.targetWindow = new TargetWindow(scene, player);
        //ActionButtons
        this.setupActionButtons();
      
      	this.inventoryWindow = new InventoryWindow(scene, player,100,200);
        
        this.lootWindow = new LootWindow({
          scene:scene
        }); 
      	
    }
   
  update () { 
  	//Room for optimization
    this.playerWindow.update();
    this.targetWindow.update();
   
    this.updateButtons();
  }
  
  updateWithData(data) {
    
    for (const id of Object.keys(data)) {
      if (id === this.player.id && data[id].items) {
        this.inventoryWindow.updateWithData(data[id].items);
      }
      
    }
  }
  
  toggleInventoryWindow(self) {
    console.log('ui: toggle');
    self.inventoryWindow.toggleVisible();
  }

  updateButtons () {
    if (this.player.attacking != this.attackBtn.selected)
      if (this.player.attacking)
        this.attackBtn.select();
      else
        this.attackBtn.deselect();
  }

  openLootWindow(corpseId) {
    console.log('UI: Should open corpse window for corpse: '+corpseId);

  }
  
  setupActionButtons() {
  	const movementBtnSize=100;
    const actionBtnSize = 100;
    const spriteScale=0.1;
    let self = this;
     
    this.turnRightBtn= new Button({
      scene:this.scene,
      x: this.scene.cameras.main.width-movementBtnSize/2,
      y: this.scene.cameras.main.height-movementBtnSize/2,
      alpha: 0.7,
      imageScale: 0.1,
      imageKey:'arrow',
      onButtonDown:[{func:self.player.turnRight, emit: 'turnRight'}],
      onButtonUp:[{func:self.player.stopTurning, emit: 'stopTurning'}],
      toggle:0
    });
    
    this.moveBackBtn = new Button({
      scene:this.scene,
      x: this.turnRightBtn.x- movementBtnSize,
      y: this.turnRightBtn.y,
      alpha: 0.7,
      imageScale: 0.1,
      imageKey:'arrow',
      imageAngle: 90,
      onButtonDown:[{func:self.player.moveBackward, emit: 'moveBackward'}],
      onButtonUp:[{func:self.player.stopMoving, emit: 'stopMoving'}],
      toggle:0
    });
    
    this.turnLeftBtn = new Button({
      scene:this.scene,
      x: this.moveBackBtn.x- movementBtnSize,
      y: this.turnRightBtn.y,
      alpha: 0.7,
      imageScale: 0.1,
      imageKey:'arrow',
      imageAngle: 180,
      onButtonDown:[{func:self.player.turnLeft, emit: 'turnLeft'}],
      onButtonUp:[{func:self.player.stopTurning, emit: 'stopTurning'}],
      toggle:0
    });
    
    this.moveForwardBtn = new Button({
      scene:this.scene,
      x: this.turnRightBtn.x- movementBtnSize,
      y: this.turnRightBtn.y- movementBtnSize,
      alpha: 0.7,
      imageScale: 0.1,
      imageKey:'arrow',
      imageAngle: 270,
      onButtonDown:[{func:self.player.moveForward, emit: 'moveForward'}],
      onButtonUp:[{func:self.player.stopMoving, emit: 'stopMoving'}],
      toggle:0
    });
    
    this.autoRunBtn = new Button({
      scene:this.scene,
      x: this.turnRightBtn.x,
      y: this.turnRightBtn.y - movementBtnSize,
      alpha: 0.7,
      text: ['AUTO','RUN'],
      onButtonDown:[{func:self.player.moveForward, emit: 'moveForward'}],
      toggle:0
    });
    
    this.attackBtn = new Button({
      scene:this.scene,
      x: this.turnRightBtn.x,
      y: this.autoRunBtn.y - movementBtnSize,
      alpha: 0.7,
      text: 'ATTACK',
      onButtonDown:[{emit: 'toggleAttacking'}],
      toggle:2
    });
    
    this.inventoryBtn = new Button({
      scene:this.scene,
      x: this.moveForwardBtn.x,
      y: this.attackBtn.y,
      alpha: 0.7,
      text: 'INVENTORY',
      onButtonDown:[{func:self.toggleInventoryWindow,arg:self}],
      toggle:0
    });

    this.useBtn = new Button({
        scene:this.scene,
        x: this.turnLeftBtn.x,
        y: this.moveForwardBtn.y,
        alpha: 0.7,
        text: 'USE/LOOT',
        onButtonDown:[{func:self.scene.useAction,arg:self.scene}],
        toggle:0
      });
 		
  }
}
