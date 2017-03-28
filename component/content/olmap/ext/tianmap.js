/**
 * 扩展ol天地图
 * 使用ES5语法书写
 * @Date 2017-3-27
 */
/**
 * 天地图的服务其实可以直接调用
   ```
    vecLayer = new ol.layer.Tile({
        title: "天地图",
        source: new ol.source.XYZ({
            url: olConfig.tianMap.vec||"http://t2.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}"
        })
    });
    map.addLayer(vecLayer);
   ```
   但是这样就不能做到跨域
 */
/**
 * Usage：使用
   ```
    var tianMapSat = new ol.layer.Tile({
        title: "天地图卫星",
        source: new ol.source.TianMap({mapType:"sat"})
    });
    map.addLayer(tianMapSat);
   ```
 */

import ol from 'openlayers';

ol.source.TianMap = function(options){
	var options = options ? options : {};

  	var attributions;
  	if(options.attributions !== undefined){
  		attributions = option.attributions;
  	}else{
  		attributions = [ol.source.BaiduMap.ATTRIBUTION];
  	}

    var url;
    if(options.mapType == "sat"){
    	url = "http://t{0-4}.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}";
    }else if(options.mapType == "satLabel"){
    	url = "http://t{0-4}.tianditu.com/DataServer?T=cia_w&x={x}&y={y}&l={z}";
    }else if(options.mapType == "label"){
    	url = "http://t{0-4}.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}";
    }else{
    	url = "http://t{0-4}.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}";
    }
  	
	
  	ol.source.XYZ.call(this, {
  	  attributions: attributions,
      projection: ol.proj.get('EPSG:3857'),
  	  cacheSize: options.cacheSize,
  	  crossOrigin: 'anonymous',
  	  opaque: options.opaque !== undefined ? options.opaque : true,
  	  maxZoom: options.maxZoom !== undefined ? options.maxZoom : 19,
  	  reprojectionErrorThreshold: options.reprojectionErrorThreshold,
  	  tileLoadFunction: options.tileLoadFunction,
  	  url: url,
  	  wrapX: options.wrapX
  	});
}

ol.inherits(ol.source.TianMap, ol.source.XYZ);


ol.source.TianMap.ATTRIBUTION = new ol.Attribution({
  	html: '&copy; <a class="ol-attribution-tianmap" ' +
      'href="http://www.tianditu.cn/">' +
      '天地图</a>'
});

module.exports = ol.source.TianMap;