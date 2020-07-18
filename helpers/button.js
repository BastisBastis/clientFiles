export default class Button extends Phaser.GameObjects.Rectangle {
    //Toggle:
    //0: Hold to keep it selected
    //1: Press to select, press again to deselecr
    //2: No automatic selection
    
    constructor ({
      scene,
      x=50,
      y=50,
      width = 100,
      height = 100,
      text,
      fontStyle = {fontSize:"18px"},
      textColor = 0x000000,
      backgroundColor= 0xffffff,
      strokeWidth = 2,
      strokeColor = 0x000000,
      imageKey,
      imageScale = 1,
      imageAngle = 0,
      imageTint = 0x999999,
      onButtonDown = [],
      onButtonUp = [],
      selectedColor = 0x999999,
      alpha = 1,
      stopPropagation = true,
      toggle=1
    }) {
      if (!scene) {
          console.log('Scene invalid'); 
      }
        
      super(scene,x, y, width, height, backgroundColor);
      scene.add.existing(this);
      this.alpha = alpha;
      this.setStrokeStyle(strokeWidth, strokeColor);
      //this.setAlpha(alpha);
      this.setInteractive();
      this.setScrollFactor(0);
      
      this.selected=false;
      this.selectedColor=selectedColor;
      this.backgroundColor=backgroundColor;
      
      if (imageKey)
        scene.add.image(x,y,imageKey).setScale(imageScale).setAngle(imageAngle).setScrollFactor(0);
      if (text)
        scene.add.text(x, y, text, fontStyle).setTint(textColor).setOrigin(0.5,0.5).setAlign("center").setScrollFactor(0);
      
      let self=this;
      this.on('pointerdown', function (_,__,___, event) {    
        console.log(toggle);
        if (toggle===1)
            self.toggleSelected();
        else if (toggle===0)
            self.select();    
        onButtonDown.forEach( function (callback) {
           console.log(callback);
          if (callback.emit)
              self.scene.socket.emit(callback.emit);
          if (callback.func) {
            if (Object.keys(callback).includes('arg'))
                 callback.func(callback.arg);
             else
                 callback.func();
          }
        });    
        if (stopPropagation)
          event.stopPropagation();
      });
      
      this.on('pointerup', function (_,__,___, event) {    
        if (toggle===0)
            self.deselect();    
        onButtonUp.forEach(function (callback) {
           if (callback.emit)
                 self.scene.socket.emit(callback.emit);
           if (callback.func) {
             if (Object.keys(callback).includes('arg')) {
                console.log(arg);
                callback.func(callback.arg);
             }
             else
                 callback.func();
           }
        });    
        if (stopPropagation)
          event.stopPropagation();
      });
    }
    
    select() {
      this.selected=true;
      this.setFillStyle(this.selectedColor, this.alpha);
    }
    
    deselect() {
      this.selected=false;
      this.setFillStyle(this.backgroundColor,this.alpha);
    }
    
    toggleSelected() {
      if (this.selected) this.deselect();
      else this.select();
    }
  
  }
