/**
 * 扩展ol高德
 * 使用ES5语法书写
 * @Date 2017-3-27
 */

/**
 * Usage：使用
   ```
    var aMapSat = new ol.layer.Tile({
        title: "天地图卫星",
        source: new ol.source.AMap({mapType:"sat"})
    });
    map.addLayer(aMapSat);
   ```
 */
import ol from 'openlayers';

ol.source.AMap = function(options){
	var options = options ? options : {};

  	var attributions;
  	if(options.attributions !== undefined){
  		attributions = option.attributions;
  	}else{
  		attributions = [ol.source.AMap.ATTRIBUTION];
  	}

  	var url;
  	if(options.mapType == "sat"){
  		url ="http://webst0{1-4}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}";
  	}else{
  		url = "http://webrd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}";
  	}
    
    ol.source.XYZ.call(this, {
  		crossOrigin: 'anonymous',   //跨域
	    cacheSize: options.cacheSize,
        projection: ol.proj.get('EPSG:3857'),
        // urls:urls,
        url:url,
    	wrapX: options.wrapX !== undefined ? options.wrapX : true

  	});

}

ol.inherits(ol.source.AMap,ol.source.XYZ);


ol.source.AMap.ATTRIBUTION = new ol.Attribution({
  	html: '&copy; <a class="ol-attribution-amap" ' +
      'href="http://ditu.amap.com/">' +
      '高德地图</a>'
});

module.exports = ol.source.AMap;