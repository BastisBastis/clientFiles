export default class Controller {
    constructor(scene) {
        this.scene=scene;
        this.setupKeyboardControls(scene);
        this.setupPointerControls(scene);

	}
		
    setupPointerControls(scene) {
        let self=this;
        scene.input.on('pointerdown', function (pointer) {
            //TRANSLATE X & Y
            let closestTarget = false;
            let distToClosest = 1000;
            for (const character of Object.values(scene.characters)) {
            if (character.alive) {
                let dist = Math.sqrt(Math.abs(character.sprite.x-pointer.x)**2+Math.abs(character.sprite.y-pointer.y)**2);
            
                if (!closestTarget || distToClosest>dist) {
                closestTarget=character;
                distToClosest=dist;
                        
                }
            }
            }
            for (const corpse of Object.values(scene.corpses)) {
                let dist = Math.sqrt(Math.abs(corpse.x-pointer.x)**2+Math.abs(corpse.y-pointer.y)**2);
            
                if (!closestTarget || distToClosest>dist) {
                closestTarget=corpse;
                distToClosest=dist;
                        
                }
            }
            const maxDist = 40;
            if (distToClosest < maxDist){
                scene.setPlayerTarget(closestTarget);
                /*scene.socket.emit('setTarget',character.id);
                        scene.player.target=character;
                        console.log('gash');
                        scene.ui.updateWithData(['target']);
                        */
            
            }
        });

    }
		
    setupKeyboardControls(scene) {
		scene.input.keyboard.on('keydown', function (event) { 
          	if ((event.code == 'ArrowUp' || event.code == 'KeyW' || event.code == 'KeyR') && !scene.player.isMovingForward) {
            	scene.player.moveForward(); 
              	scene.socket.emit('moveForward');
            }
          	else if ((event.code == 'ArrowDown' || event.code == 'KeyS') && !scene.player.isMovingBackward) {
             	scene.player.moveBackward(); 
              	scene.socket.emit('moveBackward');
            }
          	else if ((event.code == 'ArrowLeft' || event.code == 'KeyA') && !scene.player.isTurningLeft)  {
             	scene.player.turnLeft(); 
              	scene.socket.emit('turnLeft');
            }
          	else if ((event.code == 'ArrowRight' || event.code == 'KeyD') && !scene.player.isTurningRight) {
             	scene.player.turnRight(); 
             	 scene.socket.emit('turnRight');
            }
          	else if (event.code == 'Equal')
              	scene.toggleAttacking();
			//else
              //console.log('keydown: '+event.code);
			
		});
		
		scene.input.keyboard.on('keyup', function (event) { 
			if (event.code == 'ArrowUp' || event.code == 'ArrowDown' || event.code == 'KeyW' || event.code == 'KeyS') {
            	scene.player.stopMoving(); 
              	scene.socket.emit('stopMoving');
            }
          	else if (event.code == 'ArrowLeft' || event.code == 'ArrowRight' || event.code == 'KeyA' || event.code == 'KeyD') {
             	scene.player.stopTurning(); 
              	scene.socket.emit('stopTurning');
            }
			//else
              //console.log('keydown: '+event.code);
			
		});
		
	}
}
