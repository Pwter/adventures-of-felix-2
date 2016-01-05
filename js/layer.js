function Layer(filepath,arr,tilex,tiley,entitylayer)
{	
	if (typeof(entitylayer)==='undefined') entitylayer=false;

	var _layerCanvas = document.createElement("canvas");
	_layerCanvas.width = tilex*32;
	_layerCanvas.height = tiley*32;
	var _layerCtx = _layerCanvas.getContext("2d");
	
	var tileindex=0;
	var _chipsetimage = new Image();
	var _imagewidth = 0;

	var _layerwidth = tilex*32;
	var _layerheight = tiley*32;
	_chipsetimage.src=filepath;
	
	_chipsetimage.onload = function () 
	{
		
		_imagewidth=_chipsetimage.naturalWidth;

		for (var i=0; i<tiley; i++)
		{
			for (var j=0; j<tilex; j++)
			{
				if (arr[tileindex]!=0)
				{
					var startx = arr[tileindex]%(_imagewidth/32)-1;
					var starty = Math.floor(arr[tileindex]/(_imagewidth/32));
					if (startx==-1)
					{
						startx=_imagewidth/32-1;
						starty--;
					}						
					
					_layerCtx.drawImage(_chipsetimage,startx*32,starty*32,32,32,j*32,i*32,32,32);
					if (entitylayer==true)
					{
						//function Entity(filepath, posx, posy, width=0, height=0)
						var offsetx=-_layerwidth/2+24;
						var offsety=-_layerheight/2+32;
						entities.push(new Entity("",j*32+offsetx,i*32+offsety,32,32));
					}
					
				}
				
				tileindex++;
		}
		
	}
		
	};
	
	this.getCanvas=function()
	{
		return _layerCanvas;
		
	}
	
	this.getWidth=function()
	{
		return _layerwidth;
	}
	
	this.getHeight=function()
	{
		return _layerheight;
	}
	

}