/**
 * 地图切换 的事件逻辑
 * @Date 2017-3-21
 */
import ol from 'openlayers';

import olConfig from './ol-config';
import BaiduMapSource from './ext/baidumap.js';//加载进来就行
import TianMapSource from './ext/tianmap.js'; 
import AMapSource from './ext/amap.js'; 

let img,imgLabel,vecLayer,vecLabelLayer,baiduMap,baiduMapSat,
    aMap,aMapSat,osm,bingMap;

class MaptypebarAction{
    /**
     * [layerCtl 图层控制]
     * @param  {[String]} ctlType [控制类型]
     * @param  {[ol.Map]} map     [ol.Map]
     * @param  {[ol.Layer]} layer   [图层]
     */
	layerCtl(ctlType,map,layer){
            
        switch(ctlType){
            case 'remove-vec':
                map.removeLayer(layer);
                if(vecLayer){
                    map.removeLayer(vecLayer);
                    vecLayer = null;
                }
            break;
            case 'remove-vec-label': 
                map.removeLayer(layer);
                if(vecLabelLayer){
                    map.removeLayer(vecLabelLayer);
                    vecLabelLayer = null;
                }
            break;
            case 'add-vec':
                if(vecLayer) return;
                vecLayer = new ol.layer.Tile({
                    title: "天地图",
                    source: new ol.source.TianMap()/*new ol.source.XYZ({
                        url: olConfig.tianMap.vec||"http://t2.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}"
                    })*/
                });
                map.addLayer(vecLayer);
            break;
            case 'add-vec-label':
                if(vecLabelLayer) return;
                vecLabelLayer =  new ol.layer.Tile({
                    title: "天地图标注",
                    source: new ol.source.TianMap({mapType:"label"})/*new ol.source.XYZ({
                        url: olConfig.tianMap.vecLabel||"http://t2.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}"
                    })*/
                });
                map.addLayer(vecLabelLayer);
            break;
            case 'remove-img':
                if(img){
                    map.removeLayer(img);
                    img = null;
                }
            break;
            case 'add-img':
                if(img) return;
                img = new ol.layer.Tile({
                    title: "天地图卫星影像",
                    source: new ol.source.TianMap({mapType:"sat"})/*new ol.source.XYZ({
                        url: olConfig.tianMap.img||'http://t2.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}'
                    })*/
                });

                map.addLayer(img);
            break;
            case 'remove-img-label':
                if(imgLabel){
                    map.removeLayer(imgLabel);
                    imgLabel = null;  
                }
            break;
            case 'add-img-label':
                if(imgLabel) return;
                imgLabel = new ol.layer.Tile({
                    title: "天地图卫星影像标注",
                    source: new ol.source.TianMap({mapType:"satLabel"})/*new ol.source.XYZ({
                        url: olConfig.tianMap.imgLabel||'http://t2.tianditu.com/DataServer?T=cia_w&x={x}&y={y}&l={z}'
                    })*/
                });
                imgLabel.setZIndex(999);
                map.addLayer(imgLabel);
            break;
            case "add-baidumap":
                if(baiduMap) return;
                baiduMap = new ol.layer.Tile({
                    title: "百度地图",
                    source: new ol.source.BaiduMap()
                });
                map.addLayer(baiduMap);
            break;
            case "remove-baidumap":
                if(baiduMap){
                    map.removeLayer(baiduMap);
                    baiduMap = null;
                } 
            break;
            case "add-baidumap-sat":
                if(baiduMapSat) return;
                baiduMapSat = new ol.layer.Tile({
                    title: "百度地图卫星",
                    source: new ol.source.BaiduMap({mapType:"sat"})
                });
                map.addLayer(baiduMapSat);
            break;
            case "remove-baidumap-sat":
                if(baiduMapSat){
                    map.removeLayer(baiduMapSat);
                    baiduMapSat = null;
                } 
            break;
            case "add-amap":
                if(aMap) return;
                aMap = new ol.layer.Tile({
                    title: "高德地图",
                    source: new ol.source.AMap({"map":map})
                });
                map.addLayer(aMap);
            break;
            case "remove-amap":
                if(aMap){
                    map.removeLayer(aMap);
                    aMap = null;
                } 
            break;
            case "add-amap-sat":
                if(aMapSat) return;
                aMapSat = new ol.layer.Tile({
                    title: "高德地图",
                    source: new ol.source.AMap({mapType:"sat"})
                });
                map.addLayer(aMapSat);
            break;
            case "remove-amap-sat":
                if(aMapSat){
                    map.removeLayer(aMapSat);
                    aMapSat = null;
                } 
            break;
            case "add-osm":
                if(osm) return;
                osm = new ol.layer.Tile({
                    title: "OSM",
                    source: new ol.source.OSM()
                });
                map.addLayer(osm);
            break;
            case "remove-osm":
                if(osm){
                    map.removeLayer(osm);
                    osm = null;
                } 
            break;
            case "add-bingmap":
                if(bingMap) return;
                bingMap = new ol.layer.Tile({
                    title: "Bing地图",
                    source: new ol.source.BingMaps({
                        key: 'AgiU9gCjKNfaR2yFSDfLw8e9zUlAYisRvRC2_L-LsGYN2bII5ZUvorfP3QJvxmjn', //自己申请的key
                        imagerySet: 'Road'// Aerial, AerialWithLabels, or Road.
                    })
                });
                map.addLayer(bingMap);
            break;
            case "remove-bingmap":
                if(bingMap){
                    map.removeLayer(bingMap);
                    bingMap = null;
                } 
            break;
        }
    }

}


export default MaptypebarAction;