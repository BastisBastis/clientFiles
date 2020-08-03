import * as UIConst from './uiConstants';
import Window from './window';

export default class ChatWindow extends Window {
    constructor (scene) {
        
        const width = scene.cameras.main.width-300;
        const height = 200;
        const x = 0;
        const y = scene.cameras.main.height-height;
        
        console.log(width,height,x,y,scene);
        
        super({
            scene:scene,
            x:x+width/2,
            y:y+height/2,
            width:width,
            height:height
        });
        
        
        
        
        
    }
    
    
}
