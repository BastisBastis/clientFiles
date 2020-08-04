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
            margin: 0px 10px;
            `
        
        this.messageBox = scene.add.dom(x+width/2,y+height/2,'div',messageBoxStyle,'Chatbox');
        
    }
    
    addMessage(message) {
        
        this.chatLog+='<br>'+message;
        this.messageBox.setHTML(this.chatLog);
    }
    
    
    
    printObject(object,name = '', indention='') {
        const type = typeof object;
        if (type == 'string' || type == 'number' || type == 'bigint' || type == 'boolean' || type == 'symbol')
            this.addMessage(indention+name+': '+object)
        else if (object.constructor == Object) {
            //Dictionary
            this.addMessage(indention+name+' (dictionary)');
            for (const [key,value] of Object.entries(object)) 
                this.printObject(value,key,indention+'  ');
        }
        else if (object instanceof Array) {
            //Array
            this.addMessage(indention+name+' (array)');
            for (const [key,value] of Object.entries(object)) 
                this.printObject(value,key,indention+'  ');
        }
        else
            this.addMessage(indention+name +' ('+typeof object+')');
            
        
    }
    
}
