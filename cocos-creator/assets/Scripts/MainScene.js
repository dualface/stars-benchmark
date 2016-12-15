cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
        
        starPrefab: {
            default: null,
            type: cc.Prefab
        },
        
        countLabel: {
            default: null,
            type: cc.Label
        },
        
        starsLayer: {
            default: null,
            type: cc.Node
        }
    },
    
    // use this for initialization
    onLoad: function () {
        this.stars = [];
        
        cc.director.setDisplayStats(true);
        var size = cc.director.getWinSize();
        this.screenWidth = size.width;
        this.screenHeight = size.height;
        this.screenLeft = -this.screenWidth / 2;
        this.screenBottom = -this.screenHeight / 2;
        
        this.addStars(100);
        
        var self = this;
        this.node.on(cc.Node.EventType.TOUCH_START, function() {
            self.addStars(100); 
        });
    },
    
    addStars: function(count) {
        for (var i = 0; i < count; i++) {
            var star = cc.instantiate(this.starPrefab);
            star.x = this.screenLeft + Math.random() * this.screenWidth;
            star.y = this.screenBottom + Math.random() * this.screenHeight;
            this.starsLayer.addChild(star);
            
            this.stars.push(star);
        }
        
        this.countLabel.string = this.stars.length.toString() + " stars";
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {
    //     var count = this.stars.length;
    //     for (var i = 0; i < count; i++) {
    //         this.stars[i].rotation++;
    //     }
    // }
});
