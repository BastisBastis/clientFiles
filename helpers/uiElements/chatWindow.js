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
        
        this.chatLog='';
        
        const inputHeight=20;
        const messageBoxStyle = `
            box-sizing: border-box; 
            background-color:transparent; 
            overflow-y:auto; 
            width: ${width}px; 
            height: ${height-inputHeight}px;
            margin: 0px 10px;
            `
        
        this.messageBox = scene.add.dom(x+width/2,y+height/2,'div',messageBoxStyle,'');
        
    }
    
    addMessage(message) {
        
        this.chatLog+='<br>'+message;
        this.messageBox.setHTML(this.chatLog);
        
        this.chatLine = scene.add.dom(0,y+height-inputHeight/2).createFromCache('chatLine');
    }
    
    
    
    printObject(object,name = '', indention='') {
        
            
        
        const type = typeof object;
        if (type == 'string' || type == 'number' || type == 'bigint' || type == 'boolean' || type == 'symbol' || type=='undefined')
            this.addMessage(indention+name+': '+object)
        else if (object == null)
            this.addMessage(indention+name+': '+'null');
        else if (object.constructor == Object) {
            //Dictionary
            this.addMessage(indention+name+' (dictionary)');
            for (const [key,value] of Object.entries(object)) 
                this.printObject(value,key,indention+'--');
        }
        else if (object instanceof Array) {
            //Array
            this.addMessage(indention+name+' (array)');
            for (const [key,value] of Object.entries(object)) 
                this.printObject(value,key,indention+'--');
        }
        else if (type == 'object') {
            this.addMessage(indention+name+' ('+object.constructor.name+')');
            
        }
        else
            this.addMessage(indention+name +' ('+typeof object+')');
            
        
    }
    
}
