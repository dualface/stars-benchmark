
local MainScene = class("MainScene", cc.load("mvc").ViewBase)

function MainScene:onCreate()
    math.newrandomseed()

    self.starsLayer = cc.Node:create()
    self:addChild(self.starsLayer)

    self.countLabel = cc.Label:createWithSystemFont("0 stars", "sans", 24)
    self.countLabel:setColor(cc.c4b(255, 0, 0, 255))
    self.countLabel:setPosition(display.cx, display.cy)
    self:addChild(self.countLabel)

    local listener = cc.EventListenerTouchOneByOne:create()
    listener:setSwallowTouches(true)
    listener:registerScriptHandler(function(touch, event)
        self:addStars(100)
        return true
    end, cc.Handler.EVENT_TOUCH_BEGAN)
    local eventDispatcher = self:getEventDispatcher()
    eventDispatcher:addEventListenerWithSceneGraphPriority(listener, self)

    self.stars = {}
    self:addStars(100)
    self:scheduleUpdate(function(dt) self:update(dt) end)
end

function MainScene:update(dt)
    local star
    for i = 1, #self.stars do
        star = self.stars[i]
        star:setRotation(star:getRotation() + 1)
    end
end

function MainScene:addStars(count)
    for i = 1, count do
        local star = cc.Sprite:create("res/star.png")
        star:setPosition(math.random() * display.width, math.random() * display.height)
        self.starsLayer:addChild(star)

        self.stars[#self.stars + 1] = star
    end

    self.countLabel:setString(string.format("%d stars", #self.stars))
end

return MainScene
