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
            overflow-y:scroll; 
            width: ${width-10}px;
            height: ${height-inputHeight}px;
            margin: 0 0px;
            padding: 0 10px;
            
            `;
        
        let self = this;

        this.messageBox = scene.add.dom(x+width/2,y+(height-inputHeight)/2,'div',messageBoxStyle,'').setScrollFactor(0);

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
            event.preventDefault();
            if (event.x > width)
                return;
            if (tapTimer) {
                clearTimeout(tapTimer);
                tapTimer=false;
            }
            if (!currTap.tap)
                return;
                 
            
            // device detection
            if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
                || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
                    //setTimeout(self.chatLine.getChildByName('chatLine').click,10);
                    
                    const fakeInput = document.createElement('input')
                    fakeInput.setAttribute('type', 'text')
                    fakeInput.style.position = 'absolute'
                    fakeInput.style.opacity = 0
                    fakeInput.style.height = 0
                    fakeInput.style.fontSize = '16px' // disable auto zoom

                    // you may need to append to another element depending on the browser's auto 
                    // zoom/scroll behavior
                    document.body.prepend(fakeInput)

                    // focus so that subsequent async focus will work
                    fakeInput.focus()

                    setTimeout(() => {

                        // now we can focus on the target input
                        self.chatLine.getChildByName('chatLine').click()

                        // cleanup
                        fakeInput.remove()

                    }, 1000)
                    
                    
                    //self.chatLine.getChildByName('chatLine').focus();
                    // self.addMessage("Hmm");
            }
            else
                self.chatLine.getChildByName('chatLine').focus();
            
        });

        this.chatLine = scene.add.dom(width/2,y+height-inputHeight/2).createFromCache('chatLine').setScrollFactor(0);
        
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
        //this.messageBox.node.scrollIntoView();
        this.messageBox.node.scrollTop = this.messageBox.node.scrollHeight;
        
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
