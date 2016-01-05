var keysDown = {};

addEventListener("keydown", function (e) 
{
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) 
{
	delete keysDown[e.keyCode];
}, false);

var update = function () 
{
	if (38 in keysDown || 87 in keysDown) { // Player holding up or w
		entities[0].move("up");
		
	}
	if (40 in keysDown || 83 in keysDown) { // Player holding down or s
		entities[0].move("down");
		
	}
	if (37 in keysDown || 65 in keysDown) { // Player holding left or a
		entities[0].move("left");
		
	}
	if (39 in keysDown || 68 in keysDown) { // Player holding right or d
		entities[0].move("right");
		
	}
	
	
	
}