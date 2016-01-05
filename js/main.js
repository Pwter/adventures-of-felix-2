var WIDTH=800;
var HEIGHT=600;
var GAMEFRAME=0;

var engine=new Engine(WIDTH,HEIGHT);
var entities=[];
var layers=[];
var projectiles=[];

// The main game loop
var main = function () 
{
	now = Date.now();
	delta = now - then;

	update(delta/1000);
	engine.render();
	GAMEFRAME++;
	if (GAMEFRAME>40) GAMEFRAME=1;
	then = now;

	// Request to do this again ASAP
	requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
var then = Date.now();

game_init = function()
{
	var felix = new Entity("img/charset/felix.png",0,0);
	felix.makeDamageable();
	felix.setHealth(60);
	felix.setMaxHealth(60);
	entities.push(felix);

	var vendor = new Entity("img/charset/npc1.png",31*32,21*32);
	vendor.setType("vendor");
	entities.push(vendor);

	var skeleton = new Entity("img/charset/skeleton.png",-10*32,-10*32);
	skeleton.setType("skeleton");
	entities.push(skeleton);

	/*
	layers.push(new Layer("img/chipset/town.png",map_town[0],12,8)); // baselayer
	layers.push(new Layer("img/chipset/town.png",map_town[1],12,8,true)); // entitylayer==playerlevel
	layers.push(new Layer("img/chipset/town.png",map_town[2],12,8)); // toplayer
	*/

	layers.push(new Layer("img/chipset/outside.png",map_outside[0],80,60));
	layers.push(new Layer("img/chipset/outside.png",map_outside[1],80,60,true));
	layers.push(new Layer("img/chipset/outside.png",map_outside[2],80,60));

	
	main();
	
	
}
