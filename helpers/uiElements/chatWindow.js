import * as UIConst from './uiConstants';
import Window from './window';

export default class ChatWindow extends Window {
    constructor ({scene}) {
        
        const width = scene.cameras.main.width-300;
        const height = 200;
        const x = 0;
        const y = scene.cameras.main.height-width;
        
        super({
            scene:scene,
            x:x,
            y:y,
            width:width,
            height:height
        }});
        
        
        
        
        
    }
    
    
}
