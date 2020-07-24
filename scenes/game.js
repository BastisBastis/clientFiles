import Character from '../helpers/character';
import Controller from '../helpers/controller'; 
import Map from '../helpers/map';
import UI from '../helpers/ui';
import io from 'socket.io-client';
import Corpse from '../helpers/corpse';



export default class Game extends Phaser.Scene {
	constructor() {
		super({
			key: 'Game'
		});
     	this.loading = true;
     	this.player =undefined;
     	this.characters = {};
      	this.corpses = {};
     	
     	//Store physics bodies
     	this.physicsChars = undefined;
     	this.obstacles = undefined;
	}

	preload() {
		this.load.image('arrow', 'src/assets/arrow.png');
        this.load.image('redArrow', 'src/assets/redArrow.png');
      	this.load.image('sword_1', 'src/assets/sword.png');
      	this.load.image('cross', 'src/assets/cross.png');
	}

	create() {
		//Background
		this.physicsChars = this.physics.add.group();
		this.obstacles = this.physics.add.staticGroup();
		this.physics.add.collider(this.physicsChars,this.obstacles);
		this.cameras.main.setBackgroundColor('#ffffff');
      	//this.add.text("LOADING", this.cameras.main.centerX, this.cameras.main.centerY, { font: '"Press Start 2P"', fontSize:"40px"}).setTint("#ffff00");

      //Set up socket
		this.socket = io('http://game.bastismusic.se');
		this.socket.on('connect', function () {
			console.log('Connected!');
		});
		
		//Save this to access the scope in socket functions
		let self = this;

		
		//Create player
      	this.socket.on('load', function(data) {
          //Draw map from loaded map data
          //console.log(data);
          
          self.map = new Map(data.map, data.mapWidth, data.mapHeight);
    	  self.drawMap();
		  self.cameras.main.setBounds(0, 0, data.mapWidth, data.mapHeight);
          
          
          //Load characters
          for (const [_, pl] of Object.entries(data.characters)) {
              
          	  self.characters[pl.id] = self.getNewCharacterFromData(pl);
          }
          
          self.player=self.characters[data.playerId];
          self.cameras.main.startFollow(self.player.sprite);
          
          //UI
          self.ui = new UI(self, self.player);
          
          //Controls
          self.controller = new Controller(self);
          self.loading = false;
        });
      
        this.socket.on('newCharacter', function (charData) {
        	self.characters[charData.id] = self.getNewCharacterFromData(charData); 
        });
      
      	this.socket.on('characterRespawned', function (id) {
          	console.log("charRespawn recieved");
        	self.characters[id].respawn(); 
        });
      
      	this.socket.on('newCorpse', function(data) {
        	self.corpses[data.id] = new Corpse({
            x:data.x,
            y:data.y,
            spriteKey:data.spriteKey,
            name:data.name,
            id: data.id,
            scene:self,
            items:data.items
          });
        });
        
      	//Update characters with data from server
        this.socket.on('updateCharacters', function (playerData) {
          	if (!self.loading) {
              	for (const [id, pl] of Object.entries(playerData)) {
                	 if (self.characters[id]){
                       	self.characters[id].updateWithData(pl);
                        
                     }
                }
                self.ui.updateWithData(playerData);
            }
        });
      
      	//Remove a character
      	this.socket.on('removePlayer', function(id) {
          	
          	if (self.characters[id]) {
          		self.characters[id].destroy();
              	delete self.characters[id];
            }
            
        });

        //Remove a corpse
        this.socket.on('removeCorpse', function(id) {
            self.corpses[id].remove();
            delete self.corpses[id];

        });

        //Start looting a corpse
        this.socket.on('lootCorpse', function(data) {
            console.log(data);
        });
	}
	
  	getNewCharacterFromData (data) {
      /*
      console.log('scene:this,',
              'x:',data.x,
              'y:',data.y,
              'sprite_key:',data.sprite_key,
              'scale:',data.scale,
              'angle:',data.angle,
              'id:',data.id,
              'maxHp:',data.maxHp,
              'hp:',data.hp,
              'movementSpeed:',data.movementSpeed,
              'damage:',data.damage,
              'attackRating:',data.attackRating,
              'defense:',data.defense,
              'delay:',data.delay,
              'name:',data.name,
              'tint:',data.tint,
              'bodyRadius:',data.bodyRadius,
              'target:',data.target,
        	  'attacking:',data.attacking,
        	  'alive:',data.alive,
        	  'experience:',data.experience,
        	  'level:',data.level,
              'physicsGroup',this.physicsChar);
      */
      return new Character({
              scene:this,
              x:data.x,
              y:data.y,
              sprite_key:data.sprite_key,
              scale:data.scale,
              angle:data.angle,
              id:data.id,
              maxHp:data.maxHp,
              hp:data.hp,
              movementSpeed:data.movementSpeed,
              damage:data.damage,
              attackRating:data.attackRating,
              defense:data.defense,
              delay:data.delay,
              name:data.name,
              tint:data.tint,
              bodyRadius:data.bodyRadius,
              target:data.target,
        	  attacking:data.attacking,
        	  alive:data.alive,
        	  experience:data.experience,
        	  level:data.level,
        	  equipmentSlots:data.equipmentSlots,
              inventorySlots:data.inventorySlots,
              physicsGroup: this.physicsChars
              });
      
    }
  
	getCharacters() {
		return this.characters;
	}
  
  	toggleAttacking() {
      	console.log("emit toggleAttacking");
    	this.socket.emit('toggleAttacking');  
    }
	
	setPlayerTarget(target) {
		this.socket.emit('setTarget',target.id);	
	}
  
  	movePlayerForward() {
     	this.player.moveForward()
      	this.socket.emit('moveForward');
    }

    useAction(self) {
        console.log('game.js: useAction')
        if (self.player.target && self.corpses[self.player.target]) {
            self.socket.emit('requestCorpseLooting',self.player.target.id);          	
        }
        else
            console.log('corpse or target not found');
    }
	
	drawMap() {
		//const cellWidth = this.cameras.main.centerX*2/this.map.mapData.length;
		//const cellHeight = this.cameras.main.centerY*2/this.map.mapData[0].length;
		const terrainColors = [0xf9e4b7,0x009909];
      	
		for (let col = 0; col < this.map.mapData.length; col++) {
			for (let row = 0; row < this.map.mapData[col].length; row++) {
				let rect = this.add.rectangle(
				this.map.cellWidth/2+this.map.cellWidth*col,
				this.map.cellHeight/2+this.map.cellHeight*row,
				this.map.cellWidth,
				this.map.cellHeight,
				terrainColors[this.map.mapData[col][row]]
				).setStrokeStyle(2,0x000000);
				
				if (this.map.mapData[col][row]===1) {
					this.physics.add.existing(rect, 1);
					this.obstacles.add(rect);
				}
			}
		}
	}
	
	setDebugText(str) {
		this.lbl.setText(str)
	}

	update(time, delta) {
      	if (this.loading)
          return;
      	//Update movement and more in the player class
		
      	this.player.update(delta);
      	this.ui.update();
	}
	
	
}
