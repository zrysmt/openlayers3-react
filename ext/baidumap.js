/**
 * 扩展ol百度地图
 * 使用ES5语法书写
 * @Date 2017-3-23
 */
import ol from 'openlayers';

ol.source.BaiduMap = function(options){
	var options = options ? options : {};

  	var attributions;
  	if(options.attributions !== undefined){
  		attributions = option.attributions;
  	}else{
  		attributions = [ol.source.BaiduMap.ATTRIBUTION];
  	}

  	var resolutions = [];
    for(var i=0; i<19; i++){
        resolutions[i] = Math.pow(2, 18-i);
    }
    var tilegrid  = new ol.tilegrid.TileGrid({
        origin: [0,0],
        resolutions: resolutions
    });

  	/*var url = options.url  !== undefined ?
  	 options.url:'http://online3.map.bdimg.com/onlinelabel/?qt=tile&x={x}&y={y}&z={z}&styles=pl&udt=20170301&scaler=1&p=1';*/
  	ol.source.TileImage.call(this, {
  		crossOrigin: 'anonymous',   //跨域
	    cacheSize: options.cacheSize,
  		projection: ol.proj.get('EPSG:3857'),
  		tileGrid: tilegrid,
  		tileUrlFunction: function(tileCoord, pixelRatio, proj){
            if(!tileCoord) return "";

            var z = tileCoord[0];
            var x = tileCoord[1];
            var y = tileCoord[2];

            if(x<0)  x = "M"+(-x);
            if(y<0)  y = "M"+(-y);
            if(options.mapType == "sat"){
  				return "http://shangetu2.map.bdimg.com/it/u=x="+x+";y="+y+";z="+z+";v=009;type=sate&fm=46&udt=20150504&app=webearth2&v=009&udt=20150601";
  			}

            return "http://online3.map.bdimg.com/onlinelabel/?qt=tile&x="+x+"&y="+y+"&z="+z+"&styles=pl&udt=20170301&scaler=1&p=1";
            

        },
    	wrapX: options.wrapX !== undefined ? options.wrapX : true

  	});

  	// ol.net.jsonp(url, this.handleResponse.bind(this), undefined,'jsonp');
}

ol.inherits(ol.source.BaiduMap,ol.source.TileImage);


ol.source.BaiduMap.ATTRIBUTION = new ol.Attribution({
  	html: '&copy; <a class="ol-attribution-baidumap" ' +
      'href="http://map.baidu.com/">' +
      '百度地图</a>'
});

module.exports = ol.source.BaiduMap;