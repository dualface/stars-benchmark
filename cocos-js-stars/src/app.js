
var HelloWorldLayer = cc.Layer.extend({
    ctor:function () {
        this._super();

        var size = cc.winSize;

        this.starsLayer = new cc.Node();
        this.addChild(this.starsLayer);

        this.starsLabel = new cc.LabelTTF("0 stars", "sans", 24);
        this.starsLabel.setColor(cc.color(255, 0, 0, 255));
        this.starsLabel.setPosition(size.width / 2, size.height / 2);
        this.addChild(this.starsLabel);

        this.stars = [];
        this.scheduleUpdate();

        var self = this;
        var listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                self.addStars(100);
                return true;
            }
        });
        cc.eventManager.addListener(listener, this);

        this.addStars(100);

        return true;
    },

    addStars:function (count) {
        var size = cc.winSize;
        for (var i = 0; i < count; i++) {
            var star = new cc.Sprite("res/star.png");
            star.x = Math.random() * size.width;
            star.y = Math.random() * size.height;
            this.starsLayer.addChild(star);

            this.stars.push(star);
        }

        this.starsLabel.string = this.stars.length.toString() + " stars";
    },

    update:function (dt) {
        var count = this.stars.length;
        for (var i = 0; i < count; i++) {
            this.stars[i].rotation++;
        }
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});

