import * as UIConst from './uiConstants';
import Window from './window';

export default class ChatWindow extends Window {
    constructor (scene) {
        
        const width = scene.cameras.main.width-300;
        const height = 200;
        const x = 0;
        const y = scene.cameras.main.height-height;
        
        
        super({
            scene:scene,
            x:x+width/2,
            y:y+height/2,
            width:width,
            height:height
        });
        
        this.chatLog='Chatbox';
        
        const inputHeight=20;
        const messageBoxStyle = `
            box-sizing: border-box; 
            background-color:transparent; 
            overflow-y:auto; 
            width: ${width}px; 
            height: ${height-inputHeight}px;
            margin: 2px 0px;
            `
        
        this.messageBox = scene.add.dom(x+width/2,y+height/2,'div',messageBoxStyle,'Chatbox');
        
    }
    
    addMessage(message) {
        
        this.chatLog+='<br>'+message;
        this.messageBox.setHTML(this.chatLog);
    }
    
    
}
