const spriteMaxWidth = 30;
const spriteMaxHeight = 30;

export default class Corpse {
	constructor ({
		scene,
		x,
		y,
		spriteKey,
      	name,
      	id,
        items
	}) {
		this.sprite = scene.add.image(x ,y,spriteKey);
		this.x=x;
		this.y=y;
      	this.name=name;
      	this.id = id;
        this.items=items;
      	if (this.sprite.width>this.sprite.height)
          this.sprite.setScale(spriteMaxWidth/this.sprite.width);
      	else
          this.sprite.setScale(spriteMaxHeight/this.sprite.height);
	}
  
  	remove () {
      this.sprite.destroy(); 
    }
}
