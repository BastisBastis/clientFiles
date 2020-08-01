export default class Character {
    constructor({
    scene, 
    x=200, 
    y=200, 
    sprite_key='arrow', 
    scale=0.5, 
    angle=0, 
    id, 
    maxHp=100,
    hp,
    movementSpeed=20,
    damage=5,
    attackRating=10,
    defense=5,
    delay=10,
    name='JohnDoe',
    tint="#000000",
    bodyRadius=6,
    target=false,
    attacking = false,
    alive = true, //handle what happens with this being false
    spawnPoint = {x:100, y:100},
    level = 1,
    experience = 0,
    equipmentSlots={
    		chest:false,
    		legs:false,
    		main:false},
    inventorySlots={
    		inv1:false,
    		inv2:false,
    		inv3:false,
    		inv4:false},
    physicsGroup
    }) {
        this.scene = scene;    
        this.maxHp=maxHp;
        this.hp=(hp?hp:maxHp);
        
        this.damage=damage;
        this.attackRating=attackRating;
        this.defense=defense;
        this.delay=delay;
        this.name=name;
        this.tint=tint;
        this.target=this.setTarget(target);
        this.attacking = attacking;
        this.alive=alive;
        this.spawnPoint = spawnPoint;
        this.level=level;
        this.experience=experience;
        this.equipmentSlots = equipmentSlots;
        this.inventorySlots = inventorySlots;
        this.type = 'character';
            
        
        //Set up visible graphics
        this.sprite = scene.add.sprite(x, y, sprite_key);
        this.sprite.setScale(scale);
        this.sprite.angle = angle;
        //this.sprite.setTint(tint);
        this.id = id;
        
        //Set up the physics body 
        this.body = scene.add.circle(x, y, bodyRadius);
        
        scene.physics.add.existing(this.body);
        physicsGroup.add(this.body);
        this.body.body.setCircle(bodyRadius);
        
        //Character variables
        this.isMovingForward = false;
        this.isMovingBackward = false;
        this.isTurningLeft = false;
        this.isTurningRight = false;
        this.movementSpeed = movementSpeed;
        this.turningSpeed = 1;
        
        if (!alive) this.die();
      
    }
    
    updateWithData(data) {
    	if (data.x && data.y) {
    		this.body.setPosition(data.x,data.y);
    		this.sprite.x = this.body.x;
      	this.sprite.y = this.body.y;
    	}
    	if (data.angle)
    		this.sprite.angle=data.angle;
      
      	if (Object.keys(data).includes('target')) //target can be false, so must check if key is included.
          	this.setTarget(data.target);
        if (Object.keys(data).includes('attacking'))
            this.setAttacking(data.attacking);
      	if (data.hp)
          	this.hp=data.hp;
        if (Object.keys(data).includes('alive')) {
            if (!data.alive && this.alive)
              this.die();
        }
        if (data.level) {
        	console.log('Congratulations! You are now level '+data.level);
        	this.level=data.level;
        }
        if (data.experience)
        	this.experience=data.experience;
      
      	if (data.items) {
        	for (const [slot, item] of Object.entries(data.items)) {
            	let container = this.equipmentSlots;
              	if (slot.startsWith('inv'))
            		container = this.inventorySlots; 
          		container[slot]=item;
              
            }
        }
    }
  
  	setAttacking(attacking) {
    	this.attacking = attacking;
    }
  
  	setTarget(id) {
     	if (!id)
          	this.target=false;
      	else if (Object.keys(this.scene.characters).includes(id))
            this.target=this.scene.characters[id]; 
        else if (Object.keys(this.scene.corpses).includes(id))
            this.target=this.scene.corpses[id];      
      	else
          	console.log("Client: Invalid target id");
    }
  
  	destroy() {
    	this.sprite.destroy();
      	this.body.destroy();
    }
  
    die() {
        this.sprite.setActive(false).setVisible(false);
        this.body.body.velocity.x=0;
        this.body.body.velocity.y=0;
        this.alive= false;
    }
  
  	respawn() {
      this.sprite.setActive(true).setVisible(true);
      this.alive = true;
    }
  
  	update (delta) {
        if (!this.alive)
  		  return
      	const deltaFactor = delta/10;
      	this.sprite.x = this.body.x;
      	this.sprite.y = this.body.y;
      	if (this.isTurningLeft) 
        	this.sprite.angle -= this.turningSpeed*deltaFactor;
      	else if (this.isTurningRight) 
         	this.sprite.angle += this.turningSpeed*deltaFactor;
       	
      	if (this.isMovingForward || this.isMovingBackward) {
          	let dist = this.movementSpeed*deltaFactor;
         	if (this.isMovingBackward)
            	dist *= -0.5;
          	const {x, y} = this.getLocationDelta(dist, this.sprite.angle);
 			this.body.body.velocity.x = x;
          	this.body.body.velocity.y = y;
        }
      	else {
         	this.body.body.velocity.x = 0;
          	this.body.body.velocity.y = 0;
        }
         
    }
  
  	//returns the deltaX and deltaY. 
  	getLocationDelta(dist, angle) {
    	const radians = Phaser.Math.DegToRad(angle);
    	const x = dist * Math.cos(radians);
      	const y = dist * Math.sin(radians);
      	return {x:x, y:y};
    }
  	
  	moveForward () {
    	this.isMovingForward = true;
      	this.isMovingBackward = false;
    }
  
  	moveBackward () {
    	this.isMovingBackward = true; 
      	this.isMovingFoward = false;
    }
  
  	stopMoving () {
     	this.isMovingForward = this.isMovingBackward = false; 
      	//this.body.body.setVelocity(0,0);
    }
  
  	stopTurning () {
    	this.isTurningLeft = this.isTurningRight = false; 
    }
  
  	turnLeft () {
    	this.isTurningLeft = true;
      	this.isTurningRight = false;
    }
  
  	turnRight () {
    	this.isTurningRight = true;
      	this.isTurningLeft = false;
    }
  
  	
}
