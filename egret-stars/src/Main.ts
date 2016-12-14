
class Main extends egret.DisplayObjectContainer {

    private starTexture: egret.Texture;
    private starAnchorX: number;
    private starAnchorY: number;

    private stars: Array<egret.Bitmap>;
    private countLabel: egret.TextField;

    public constructor() {
        super();
        this.stars = new Array<egret.Bitmap>();

        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {
        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    }

    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    private onConfigComplete(event: RES.ResourceEvent): void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.loadGroup("preload");
    }

    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    private onResourceLoadComplete(event: RES.ResourceEvent): void {
        if (event.groupName == "preload") {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);

            this.starTexture = RES.getRes("star_png");
            this.starAnchorX = this.starTexture.textureWidth / 2;
            this.starAnchorY = this.starTexture.textureHeight / 2;

            this.createGameScene();
        }
    }

    private createGameScene(): void {
        this.countLabel = new egret.TextField();
        this.countLabel.textColor = 0x000000;
        this.stage.addChild(this.countLabel);

        this.addStars(100);

        this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
    }

    private addStars(count: number) {
        let stageW: number = this.stage.stageWidth;
        let stageH: number = this.stage.stageHeight;

        for (let i: number = 0; i < count; i++) {
            let star: egret.Bitmap = this.createStar();
            this.addChild(star);

            star.x = Math.random() * stageW;
            star.y = Math.random() * stageH;
            this.stars.push(star);
        }

        this.countLabel.text = this.stars.length.toString() + " stars";
        this.countLabel.anchorOffsetX = this.countLabel.width / 2;
        this.countLabel.anchorOffsetY = this.countLabel.height / 2;
        this.countLabel.x = this.stage.stageWidth / 2;
        this.countLabel.y = this.stage.stageHeight / 2;
    }

    private onTouchTap(e: egret.TouchEvent) {
        this.addStars(100);
    }

    private onEnterFrame(e: egret.Event) {
        let count: number = this.stars.length;
        for (let i: number = 0; i < count; i++) {
            let star: egret.Bitmap = this.stars[i];
            star.rotation++;
        }
    }

    private createStar(): egret.Bitmap {
        let star = new egret.Bitmap();
        star.texture = this.starTexture;
        star.anchorOffsetX = this.starAnchorX;
        star.anchorOffsetY = this.starAnchorY;
        return star;
    }
}

