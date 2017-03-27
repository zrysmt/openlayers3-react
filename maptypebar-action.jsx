/**
 * 地图切换 的事件逻辑
 * @Date 2017-3-21
 */
import ol from 'openlayers';

import olConfig from './ol-config';
import olSourceBaiduMap from './ext/baidumap.js';//加载进来就行

console.log(new ol.source.BaiduMap());

let img,imgLabel,vecLayer,vecLabelLayer,baiduMap,baiduMapSat;

class MaptypebarAction{
	layerCtl(ctlType,map,layer){
            console.warn(ctlType);
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
                    source: new ol.source.XYZ({
                        url: olConfig.tianMap.vec||"http://t2.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}"
                    })
                });
                map.addLayer(vecLayer);
            break;
            case 'add-vec-label':
                if(vecLabelLayer) return;
                vecLabelLayer =  new ol.layer.Tile({
                    title: "天地图标注",
                    source: new ol.source.XYZ({
                        url: olConfig.tianMap.vecLabel||"http://t2.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}"
                    })
                });
                map.addLayer(vecLabelLayer);
            break;
            case 'remove-img':
                map.removeLayer(img);
                img = null;
            break;
            case 'add-img':
                if(img) return;
                img = new ol.layer.Tile({
                    title: "天地图卫星影像",
                    source: new ol.source.XYZ({
                        url: olConfig.tianMap.img||'http://t2.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}'
                    })
                });

                map.addLayer(img);
            break;
            case 'remove-img-label':
                map.removeLayer(imgLabel);
                imgLabel = null;
            break;
            case 'add-img-label':
                if(imgLabel) return;
                imgLabel = new ol.layer.Tile({
                    title: "天地图卫星影像标注",
                    source: new ol.source.XYZ({
                        url: olConfig.tianMap.imgLabel||'http://t2.tianditu.com/DataServer?T=cia_w&x={x}&y={y}&l={z}'
                    })
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
        }
    }

}


export default MaptypebarAction;