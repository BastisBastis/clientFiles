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
            width: ${width-10}px;
            height: ${height-inputHeight}px;
            margin: 0 0px;
            padding: 0 10px;
            
            `;
        
        let self = this;

        this.messageBox = scene.add.dom(x+width/2,y+(height-inputHeight)/2,'div',messageBoxStyle,'').setScrollFactor(0);
        console.log('width: '+width, 'boxWidth: '+this.messageBox.node.style.width);

        let currTap = false;
        let tapTimer = false;
        const tapTime=500;
        this.messageBox.addListener('pointerdown');
        this.messageBox.addListener('pointerup');
        this.messageBox.on('pointerdown', function (event) {
            if (event.x > width)
                return;
            
            if (tapTimer)
                clearTimeout(tapTimer);
            
            tapTimer = setTimeout(() => {
                tapTimer=false;
                if (currTap)
                    currTap.tap=false;
            },tapTime);
            
            currTap = {
                tap:true,
                x:event.x,
                y:event.y
                };
            
                
        });  
        this.messageBox.on('pointerup', (event) => {
            if (event.x > width)
                return;
            if (tapTimer) {
                clearTimeout(tapTimer);
                tapTimer=false;
            }
            if (!currTap.tap)
                return;
                 
            self.chatLine.getChildByName('chatLine').click();
            self.chatLine.getChildByName('chatLine').focus();
            
        });

        this.chatLine = scene.add.dom(width/2,y+height-inputHeight/2).createFromCache('chatLine').setScrollFactor(0);
        //this.printObject(window.getComputedStyle(this.messageBox.getChildByName('messageBox'), null).getPropertyValue('font-size'));
        
        this.chatLine.getChildByName('chatLine').addEventListener("keyup", function(event) {
            // Number 13 is the "Enter" key on the keyboard
            if (event.keyCode === 13) {
              // Cancel the default action, if needed
              event.preventDefault();
              self.submitInputLine(self)
            }
          });
    }
    
    

    addMessage(message) {
        if (this.chatLog.length > 0)
            this.chatLog+='<br>'+message;
        else
            this.chatLog+=message; 
        this.messageBox.setHTML(this.chatLog);
        
        
    }
    
    submitInputLine(self) {
        const message = self.chatLine.getChildByName('chatLine').value;
        if (message.length > 0) {
            self.addMessage(message);
        }
        self.chatLine.getChildByName('chatLine').blur();
        self.chatLine.getChildByName('chatLine').value = "";
        
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
