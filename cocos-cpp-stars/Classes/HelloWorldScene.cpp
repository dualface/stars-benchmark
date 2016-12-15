
#include "HelloWorldScene.h"
#include <string>

USING_NS_CC;

Scene* HelloWorld::createScene()
{
    // 'scene' is an autorelease object
    auto scene = Scene::create();

    // 'layer' is an autorelease object
    auto layer = HelloWorld::create();

    // add layer as a child to scene
    scene->addChild(layer);

    // return the scene
    return scene;
}

// on "init" you need to initialize your instance
bool HelloWorld::init()
{
    if ( !Layer::init() )
    {
        return false;
    }

    Size visibleSize = Director::getInstance()->getVisibleSize();
    Vec2 origin = Director::getInstance()->getVisibleOrigin();

    _starsLayer = Node::create();
    addChild(_starsLayer);

    _countLabel = Label::createWithSystemFont("0 stars", "sans", 24);
    _countLabel->setTextColor(Color4B(255, 0, 0, 255));
    _countLabel->setPosition(Vec2(origin.x + visibleSize.width / 2,
                                  origin.y + visibleSize.height / 2));
    addChild(_countLabel);

    auto listener = EventListenerTouchOneByOne::create();
    listener->setSwallowTouches(true);
    listener->onTouchBegan = [this](Touch* touch, Event* event)
    {
        addStars(100);
        return true;
    };
    getEventDispatcher()->addEventListenerWithSceneGraphPriority(listener, this);

    addStars(100);
    scheduleUpdate();

    return true;
}

void HelloWorld::update(float dt)
{
    ssize_t count = _stars.size();
    Sprite *star;
    for (ssize_t i = 0; i < count; i++)
    {
        star = _stars.at(i);
        star->setRotation(star->getRotation() + 1);
    }
}

void HelloWorld::addStars(int count)
{
    Size visibleSize = Director::getInstance()->getVisibleSize();
    for (int i = 0; i < count; i++)
    {
        auto star = Sprite::create("res/star.png");
        star->setPosition(Vec2(rand_0_1() * visibleSize.width, rand_0_1() * visibleSize.height));
        _starsLayer->addChild(star);
        _stars.pushBack(star);
    }

    std::string countString = std::to_string(_stars.size()) + " stars";
    _countLabel->setString(countString);
}

