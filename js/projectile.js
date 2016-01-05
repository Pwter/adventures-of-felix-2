function Projectile(ownerid,posx,posy,alpharad,speed,type=0)
{
	var _posx = posx;
	var _posy = posy;
	
	var _ownerid = ownerid;
	
	var _id = projectiles.length;
	
	var _speed = speed;
	var _projectilewidth;
	var _projectileheight;
	var _alpharad=alpharad;
	var _damage=0;
	
	var _projectileReady = false;
	var _projectileImage = new Image();
	
	
	_projectileImage.onload = function () 
	{
		_projectileReady = true;
		_projectilewidth = _projectileImage.naturalWidth;
		_projectileheight = _projectileImage.naturalHeight;
	}
	
	if (type==0)
	{
		_projectileImage.src = "img/arcanemissile.png";
		_damage=20;
		
	}
	
	this.getId=function()
	{
		return _id;
		
	}
	
	this.getWidth=function()
	{
		return _projectilewidth;
		
	}
	
	this.getHeight=function()
	{
		return _projectileheight;
		
	}
	
	this.getPos=function()
	{
		return [_posx,_posy];
		
	}
	
	this.isReady=function()
	{
		return _projectileReady;
		
	}
	
	this.move=function()
	{
		_posx+=Math.sin(alpharad)*speed;
		_posy+=-Math.cos(alpharad)*speed;
		
		for (var i=0; i<entities.length; i++)
		{
			if (entities[i].getId() != _ownerid)
			{
				if (_posx+_projectilewidth > entities[i].getPos()[0]
					&& _posx < entities[i].getPos()[0]+entities[i].getWidth()
					&& _posy+_projectileheight > entities[i].getPos()[1]
					&& _posy < entities[i].getPos()[1]+entities[i].getHeight()
					)
				{
					speed=0;
					if (entities[i].isDamageable())
					{
						if (entities[i].dealDamage(_damage)) // if return is lethal=true
						{
							entities[_ownerid].giveFrag();
							
						}
						
					}
					this.destroy();
				}
				
			}
			
		}
		
	}
	
	this.destroy=function()
	{
		for (var i=0; i<projectiles.length; i++)
		{
			if (projectiles[i].getId()==_id)
			{
				projectiles.splice(i,1);
				
			}
			
		}
		
	}
	
	
	
	this.draw=function(_ctx,projectileoffsetx,projectileoffsety)
	{
		_ctx.drawImage(_projectileImage,_posx+projectileoffsetx,_posy+projectileoffsety);
	
		
	}
	
}