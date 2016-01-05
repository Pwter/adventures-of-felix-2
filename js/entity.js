function Entity(filepath, posx, posy, width=0, height=0)
{
	var _id = entities.length;
	var _posx = posx;
	var _posy = posy;
	
	var _speed = 5;
	
	var _entityReady = false;
	var _entityImage = new Image();
	var _actualsprite = new Image();
	var _animated = false;
	var _imgcropstartx;
	var _imgcropstarty;
	var _damageable=false;
	var _hp=0;
	var _maxhp=0;
	if (filepath!="") _entityImage.src = filepath;
	var _entitywidth = width;
	var _entityheight = height;
	var _type;
	var _lootable=false;
	var _kills=0;
	
	_entityImage.onload = function () 
	{
		_entityReady = true;
		if (_entitywidth==0)
		{
			_entitywidth = _entityImage.naturalWidth;
			_entityheight = _entityImage.naturalHeight;
		}
		
		if(_entitywidth==144)
		{
			_animated=true;
			_entitywidth/=3;
			_entityheight/=4;
			_imgcropstartx=_entitywidth;
			_imgcropstarty=_entityheight*2;

		}
		
		
	};

	this.isReady=function()
	{
		return _entityReady;
		
	}
	
	this.getId=function()
	{
		return _id;
		
	}
	
	this.setHealth=function(hp)
	{
		_hp=hp;
		
	}
	
	this.setMaxHealth=function(hp)
	{
		_maxhp=hp;
		
	}
	
	this.makeDamageable=function()
	{
		_damageable=true;
		
	}
	
	this.isDamageable=function()
	{
		return _damageable;
		
	}
	
	this.dealDamage=function(dmg)
	{
		var lethal=false;
		_hp-=dmg;
		if (_hp<=0)
		{
			lethal=true;
			this.destroy();

		}
		
		return lethal;
	}
	
	this.entityImage=function()
	{
		return _entityImage;
		
	}
	
	this.getPos=function()
	{
		return [_posx,_posy];
		
	}
	
	this.getWidth=function()
	{
		return  _entitywidth;
		
	}
	
	this.getHeight=function()
	{
		return  _entityheight;
		
	}
	
	this.getHp=function()
	{
		return _hp;
		
	}
	
	this.giveFrag=function()
	{
		_kills++;
		
	}
	
	this.getFrags=function()
	{
		return _kills;
		
	}
	
	this.isAnimated=function()
	{
		return _animated;
		
	}
	
	this.destroy=function()
	{
		for (var i=0; i<entities.length; i++)
		{
			if (entities[i].getId()==_id)
			{
				if (_lootable)
				{
					//document.title=_type;
					switch(_type)
					{
						case "skeleton":
							var skeleton = new Entity("img/charset/skeleton.png",-10*32,-10*32);
							skeleton.setType("skeleton");
							entities.push(skeleton);
							
							break;
						
					}
					
				}
				
				entities.splice(i,1);
				
			}
			
		}
		
	}
	
	this.setType=function(type)
	{
		switch(type)
		{
			case "skeleton":
				_type="skeleton";
				_damageable=true;
				_hp=60;
				_maxhp=60;
				_lootable=true;
				break;
			case "vendor":
				_type="vendor";
				_hp=1000;
				_maxhp=1000;
				break;
		}
		
	}
	
	this.moveAllowed=function(direction)
	{
		var movex=0;
		var movey=0;
		switch(direction)
		{
			case "up":
				movey-=_speed;
				break;
			case "down":
				movey+=_speed;
				break;
			case "left":
				movex-=_speed;
				break;
			case "right":
				movex+=_speed;
			
		}
		
		
		var moveallowed=true;
		for (var i=0; i<entities.length; i++)
		{
			
			if (i!=_id)
			{
				if (_posx+movex+_entitywidth > entities[i].getPos()[0]
					&& _posx+movex < entities[i].getPos()[0]+entities[i].getWidth()
					&& _posy+movey+_entityheight > entities[i].getPos()[1]
					&& _posy+movey < entities[i].getPos()[1]+entities[i].getHeight()
					
										
				)
				moveallowed=false;
			
				
			}
			
		}

		return moveallowed;
	}

	
	this.move=function(direction)
	{
		if (this.moveAllowed(direction))
		{
			// swapping sprite
			if (_animated)
			{
				switch(Math.floor(GAMEFRAME/10))
				{
					case 1:
						_imgcropstartx=0;
						break;
					case 2:
						_imgcropstartx=_entitywidth;
						break;
					case 3:
						_imgcropstartx=_entitywidth*2;
						break;
					case 4:
						_imgcropstartx=_entitywidth;
						break;
				}	
				
				switch (direction)
				{
					case "left":
						_imgcropstarty=_entityheight*3;
						break;
					case "right":
						_imgcropstarty=_entityheight;
						break;
					case "up":
						_imgcropstarty=0;
						break;
					case "down":
						_imgcropstarty=_entityheight*2;
						break;
									
				};
				
			}
			
			// moving
			switch (direction)
			{
				case "left":
					_posx -= _speed;
					break;
				case "right":
					_posx += _speed;
					break;
				case "up":
					_posy -= _speed;
					break;
				case "down":
					_posy += _speed;
					break;
					
			};
		}
		
	}
	
	this.draw=function(_ctx,entityoffsetx,entityoffsety)
	{
		if (!_animated)
			_ctx.drawImage(_entityImage,_posx+entityoffsetx,_posy+entityoffsety);
		else
			_ctx.drawImage(_entityImage,_imgcropstartx,_imgcropstarty,_entitywidth,_entityheight,_posx+entityoffsetx,_posy+entityoffsety,_entitywidth,_entityheight);
		
		//Draw health
		if (_damageable)
		{
			_ctx.fillStyle="black";
			_ctx.fillRect(_posx+entityoffsetx,_posy+entityoffsety-5,_entitywidth,7);
			_ctx.fillStyle="red";
			var hppercent=_hp/_maxhp;
			_ctx.fillRect(_posx+entityoffsetx+1,_posy+entityoffsety-4,(_entitywidth-2)*hppercent,5)
		}
			
	}
	
	this.drawHead=function(_ctx)
	{
		_ctx.drawImage(_entityImage,_entitywidth+10,_entityheight*2+10,28,28,10+80+(_posx*80/1600),10+60+(_posy*60/1200),14,14);
	
	}
	
	this.shoot=function(mousex,mousey)
	{
		var opposite = mousey;
		var hypotenuse = Math.sqrt(mousey*mousey + mousex*mousex);
		var a = Math.asin(mousey / hypotenuse);
		var alpha = Math.degrees(a)+90;
		if (mousex<0) alpha=-alpha;
		var alpharad = Math.radians(alpha);

		
		projectiles.push(new Projectile(_id,entities[0].getPos()[0],entities[0].getPos()[1],alpharad,3,type=0));
		
	}
}

