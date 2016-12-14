(function()
{
	var Sprite  = Laya.Sprite;
    var Text    = Laya.Text;
	var Stage   = Laya.Stage;
	var Texture = Laya.Texture;
	var Browser = Laya.Browser;
	var Handler = Laya.Handler;
	var WebGL   = Laya.WebGL;
    var Stat    = Laya.Stat;

    var stars = [];
    var starsLayer;
    var countLabel;

	(function()
	{
		// 不支持WebGL时自动切换至Canvas
		Laya.init(640, 1136, WebGL);
        Stat.show(0, 0);

		Laya.stage.alignV = Stage.ALIGN_MIDDLE;
		Laya.stage.alignH = Stage.ALIGN_CENTER;

		Laya.stage.scaleMode = "fixedwidth";
        Laya.stage.screenMode = Stage.SCREEN_VERTICAL;
		Laya.stage.bgColor = "#232628";

        starsLayer = new Sprite();
        Laya.stage.addChild(starsLayer);

        countLabel = new Text();
        countLabel.overflow = Text.VISIBLE;
        countLabel.color = "#ff0000";
        countLabel.font = "sans";
        countLabel.fontSize = 24;
        countLabel.pos(320, 480);
        countLabel.rotation = 0;
        countLabel.text = "0 stars";
        Laya.stage.addChild(countLabel);

        addStars(100);

        Laya.stage.on("click", this, onMouseDown);

        Laya.timer.frameLoop(1, this, update);
	})();

    function onMouseDown()
    {
        addStars(100);
    }

    function addStars(count)
    {
        for (var i = 0; i < count; i++)
        {
            var star = new Sprite();
            star.loadImage("res/star.png");
            star.pivot(16, 16);
            star.pos(Math.random() * Laya.stage.width, Math.random() * Laya.stage.height);
            starsLayer.addChild(star);

            stars.push(star);
        }

        countLabel.text = stars.length.toString() + " stars";
    }

    function update()
    {
        var count = stars.length;
        for (var i = 0; i < count; i++)
        {
            stars[i].rotation++;
        }
    }
})();
