/**
 * 基础地图模块
 * @Date 2017-3-8
 */
import React from 'react';
import ol from 'openlayers';

import util from '../../../common/util.jsx';
import Eventful from '../../../common/eventful.js';
import olConfig from './ol-config';
import ToolbarAction from './toolbar-action';
import EditbarAction from './editbar-action';
import MaptypebarAction from './maptypebar-action';
import PrintbarAction from './printbar-action';

import TianMapSourcr from './ext/tianmap.js'; 

import 'openlayers/css/ol.css';
import './olbasemap.scss';

let toolbarAction = new ToolbarAction();
let editbarAction = new EditbarAction();
let maptypebarAction = new MaptypebarAction();
let printbarAction = new PrintbarAction();

class Olbasemap extends React.Component{
    constructor(props){
        super(props);
        let map,view,projection,attribution,coor,mousePositionControl;

        attribution = new ol.Attribution({
            html: '© <a href="http://www.chinaonmap.com/map/index.html">天地图</a>'
        });
        mousePositionControl = new ol.control.MousePosition({
            coordinateFormat: ol.coordinate.createStringXY(0),
            projection: 'EPSG:3857',//可以是4326 精度应该保留几个小数点
            // className: 'custom-mouse-position',
            // target: document.getElementById('mouse-position'),
            undefinedHTML: '&nbsp;'
        });
        this.view = view = new ol.View({
            // projection: 'EPSG:4326',//WGS84
            center: ol.proj.fromLonLat(olConfig.initialView.center||[104, 30]),
            zoom: olConfig.initialView.zoom || 5,
        });
        this.vecLayer = new ol.layer.Tile({
            source: new ol.source.TianMap() /*new ol.source.XYZ({
                attributions: [attribution],
                url: olConfig.tianMap.vec||"http://t2.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}"
            })*/
        });
        this.vecLabelLayer =  new ol.layer.Tile({
            source:  new ol.source.TianMap({mapType:"label"})/*new ol.source.XYZ({
                url: olConfig.tianMap.vecLabel||"http://t2.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}"
            })*/
        });
        this.vecLabelLayer.setZIndex(999);
        this.map = map = new ol.Map({
            target: 'map',
            layers: [this.vecLayer,this.vecLabelLayer],
            view: view,
            controls: ol.control.defaults().extend([
                new ol.control.FullScreen(), //全屏控件
                new ol.control.ScaleLine(), //比例尺
                new ol.control.OverviewMap(), //鹰眼控件
                new ol.control.Rotate(),
                new ol.control.ZoomSlider(),
                mousePositionControl
             ]),
        });
        //ToolbarAction
        this.handleToolbar();
        //EditbarAction
        this.handleEditbar();
        //Maptypebar
        this.handleMaptypebar();
        //Printbar
        this.handlePrintbar();
    }
    handlePrintbar(){
        let map = this.map;
        
        Eventful.subscribe('print-img',()=>printbarAction.print2Img(map,this.vecLayer));
        Eventful.subscribe('print',()=>printbarAction.print2Pdf(map,this.vecLayer));
    }
    handleMaptypebar(){
        let map = this.map;
        let vecLayer = this.vecLayer;
        let vecLabelLayer = this.vecLabelLayer;

        Eventful.subscribe('remove-vec',()=>maptypebarAction.layerCtl('remove-vec',map,vecLayer));
        Eventful.subscribe('add-vec',()=>maptypebarAction.layerCtl('add-vec',map,vecLayer));
        Eventful.subscribe('remove-vec-label',()=>maptypebarAction.layerCtl('remove-vec-label',map,vecLabelLayer));
        Eventful.subscribe('add-vec-label',()=>maptypebarAction.layerCtl('add-vec-label',map,vecLabelLayer));
        Eventful.subscribe('remove-img',()=>maptypebarAction.layerCtl('remove-img',map));
        Eventful.subscribe('add-img',()=>maptypebarAction.layerCtl('add-img',map));
        Eventful.subscribe('remove-img-label',()=>maptypebarAction.layerCtl('remove-img-label',map));
        Eventful.subscribe('add-img-label',()=>maptypebarAction.layerCtl('add-img-label',map));
        Eventful.subscribe('add-baidumap',()=>maptypebarAction.layerCtl('add-baidumap',map));
        Eventful.subscribe('remove-baidumap',()=>maptypebarAction.layerCtl('remove-baidumap',map));
        Eventful.subscribe('add-baidumap-sat',()=>maptypebarAction.layerCtl('add-baidumap-sat',map));
        Eventful.subscribe('remove-baidumap-sat',()=>maptypebarAction.layerCtl('remove-baidumap-sat',map));
        Eventful.subscribe('add-amap',()=>maptypebarAction.layerCtl('add-amap',map));
        Eventful.subscribe('remove-amap',()=>maptypebarAction.layerCtl('remove-amap',map));
        Eventful.subscribe('add-amap-sat',()=>maptypebarAction.layerCtl('add-amap-sat',map));
        Eventful.subscribe('remove-amap-sat',()=>maptypebarAction.layerCtl('remove-amap-sat',map));
    }
    /****************************************************************/
    handleEditbar(){
        let map = this.map;
        Eventful.subscribe('removeDistanceAreaDraw',()=>toolbarAction.removeDistanceAreaDraw(map));

        Eventful.subscribe('draw-select',()=>editbarAction.handleDrawSelect(map));
        Eventful.subscribe('draw-point',()=>editbarAction.handleDrawPoint(map));
        Eventful.subscribe('draw-line',()=>editbarAction.handleDrawLine(map));
        Eventful.subscribe('draw-rect',()=>editbarAction.handleDrawRect(map));
        Eventful.subscribe('draw-plygon',()=>editbarAction.handleDrawPlygon(map));
        Eventful.subscribe('draw-edit',()=>editbarAction.handleDrawEdit(map));
        Eventful.subscribe('draw-delete',()=>editbarAction.handleDrawDelete(map));
        Eventful.subscribe('draw-save',()=>editbarAction.handleDrawSave(map));
    }
    handleToolbar(){
        let map = this.map;
        let view = this.view;
        Eventful.subscribe('removeEditDraw',()=>editbarAction.removeEditDraw(map));

        Eventful.subscribe('pan',()=>toolbarAction.handleClickOfPan(map));//订阅
        Eventful.subscribe('zoomtoall',()=>toolbarAction.handleClickOfZoomtoall(map,view));
        Eventful.subscribe('distance',()=>toolbarAction.handleClickOfDistance(map));
        Eventful.subscribe('area',()=>toolbarAction.handleClickOfArea(map));
        Eventful.subscribe('position',()=>toolbarAction.handleClickOfPosition(map,view));
        Eventful.subscribe('find',()=>toolbarAction.handleClickOfFind(map));
    }
    
	componentDidMount(){
		util.adaptHeight('map',105,300);//高度自适应

        if(__DEV__) console.info("componentDidMount");

		this.map.setTarget(this.refs.map);
    }
    componentWillUnmount () {
        this.map.setTarget(undefined)
    }

    render(){
		return(
			<div id="map" ref="map" >
            </div>
		)
	}
}

export default Olbasemap;