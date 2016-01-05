function Engine(width, height)
{
	var _canvas = document.createElement("canvas");
	var _ctx = _canvas.getContext("2d");
	_canvas.width = width;
	_canvas.height = height;
	
	_canvas.addEventListener('mousemove', mouseMove, false);
	_canvas.addEventListener('click', mouseClick, false);
	_canvas.addEventListener('mouseout', mouseOut, false);

	document.getElementById("wrapper").style.width=width;
	document.getElementById("wrapper").style.height=height;
	document.getElementById("wrapper").appendChild(_canvas);
	
	var _mousePosX;
	var _mousePosY;
	
	function mouseMove(ev) 
	{
		_mousePosX = ev.clientX - _canvas.offsetLeft - WIDTH/2;
		_mousePosY = ev.clientY - _canvas.offsetTop - HEIGHT/2;
		
		//document.title=_mousePosX+" "+_mousePosY;
		
	}

	function mouseClick(ev)
	{
		entities[0].shoot(_mousePosX,_mousePosY);
		
	}

	function mouseOut(ev)
	{
		_mousePosX = -1;
		_mousePosY = -1;
		
	}
		
	this.write=function(text)
	{
		
		_ctx.fillText(text, 32, 32);
		
	}
	
	this.render=function()
	{
		var heroposx = entities[0].getPos()[0];
		var heroposy = entities[0].getPos()[1];
		var offsetx = heroposx - (WIDTH/2-layers[0].getWidth()/2);
		var offsety = heroposy - (HEIGHT/2-layers[0].getHeight()/2);

		//baselayer
		_ctx.drawImage(layers[0].getCanvas(),-offsetx,-offsety);
		
		//unitlayer
		_ctx.drawImage(layers[1].getCanvas(),-offsetx,-offsety);
		
		for (var i=0; i<entities.length; i++)
		{
			var entity=entities[i];
			if (entity.isReady())
			{
				var entityoffsetx = -offsetx+layers[0].getWidth()/2-entity.getWidth()/2;
				var entityoffsety = -offsety+layers[0].getHeight()/2-entity.getHeight()/2;
				
				entity.draw(_ctx,entityoffsetx,entityoffsety);
			}
			
		}
		
		for (var i=0; i<projectiles.length; i++)
		{
			var projectile=projectiles[i];
			
			// Calculating new position
			projectile.move();
			
			// Drawing it
			if (projectile.isReady())
			{
				var projectileoffsetx = -offsetx+layers[0].getWidth()/2-projectile.getWidth()/2;
				var projectileoffsety = -offsety+layers[0].getHeight()/2-projectile.getHeight()/2;
				projectile.draw(_ctx,projectileoffsetx,projectileoffsety);
				//document.title=entities[1].getHp();
			}
			
		}

		//toplayer
		_ctx.drawImage(layers[2].getCanvas(),-offsetx,-offsety);
		
		//minimap
		_ctx.globalAlpha = 0.9;
		_ctx.drawImage(layers[0].getCanvas(),0,0,layers[0].getWidth(),layers[0].getHeight(),10,10,160,120);
		_ctx.drawImage(layers[1].getCanvas(),0,0,layers[1].getWidth(),layers[1].getHeight(),10,10,160,120);
		for (var i=0; i<entities.length; i++)
		{
			var entity=entities[i];
			if (entity.isReady() && entity.isAnimated())
			{
				entity.drawHead(_ctx);
				
			}
			
		}
		_ctx.globalAlpha = 1;
		
		
		
		_ctx.fillStyle="black";
		_ctx.font = "15px Arial";
		_ctx.fillText("kills: " + entities[0].getFrags(),WIDTH-60,30);
		
		
	}
	
}