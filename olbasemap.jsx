/**
 * 基础地图模块
 * @Date 2017-3-8
 */
import React from 'react';
import ol from 'openlayers';

import util from '../../../common/util.jsx';
import Eventful from '../../../common/Eventful.js';
import olConfig from './ol-config';
import ToolbarAction from './toolbar-action';
import EditbarAction from './editbar-action';

import 'openlayers/css/ol.css';
import './olbasemap.scss';

let toolbarAction = new ToolbarAction();
let editbarAction = new EditbarAction();

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
        this.map = map = new ol.Map({
            target: 'map',
            layers: [
                new ol.layer.Tile({
                    source: new ol.source.XYZ({
                        attributions: [attribution],
                        url: "http://t2.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}"
                    })
                }),
                new ol.layer.Tile({
                    source: new ol.source.XYZ({
                        url: "http://t2.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}"
                    })
                })
            ],
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

        Eventful.subscribe('pan',()=>this.handleClickOfPan());//订阅
        Eventful.subscribe('zoomtoall',()=>this.handleClickOfZoomtoall());
        Eventful.subscribe('distance',()=>this.handleClickOfDistance());
        Eventful.subscribe('area',()=>this.handleClickOfArea());
        Eventful.subscribe('position',()=>this.handleClickOfPosition());
        Eventful.subscribe('find',()=>this.handleClickOfFind());
        Eventful.subscribe('draw-select',()=>this.handleDrawSelect());
        Eventful.subscribe('draw-point',()=>this.handleDrawPoint());
        Eventful.subscribe('draw-line',()=>this.handleDrawLine());
        Eventful.subscribe('draw-rect',()=>this.handleDrawRect());
        Eventful.subscribe('draw-plygon',()=>this.handleDrawPlygon());
        Eventful.subscribe('draw-edit',()=>this.handleDrawEdit());
        Eventful.subscribe('draw-delete',()=>this.handleDrawDelete());
        Eventful.subscribe('draw-save',()=>this.handleDrawSave());
    }
    handleDrawSelect(){
        editbarAction.handleDrawSelect(this.map);
    }
    handleDrawPoint(){
        toolbarAction.removeDistanceAreaDraw(this.map);
        editbarAction.handleDrawPoint(this.map);
    }
    handleDrawLine(){
        toolbarAction.removeDistanceAreaDraw(this.map);
        editbarAction.handleDrawLine(this.map);
    }
    handleDrawRect(){
        toolbarAction.removeDistanceAreaDraw(this.map);
        editbarAction.handleDrawRect(this.map);
    }
    handleDrawPlygon(){
        toolbarAction.removeDistanceAreaDraw(this.map);
        editbarAction.handleDrawPlygon(this.map);
    }
    handleDrawEdit(){
        toolbarAction.removeDistanceAreaDraw(this.map);
        editbarAction.handleDrawEdit(this.map);
    }
    handleDrawDelete(){
        toolbarAction.removeDistanceAreaDraw(this.map);
        editbarAction.handleDrawDelete(this.map);
    }
    handleDrawSave(){
        toolbarAction.removeDistanceAreaDraw(this.map);
        editbarAction.handleDrawSave(this.map);
    }
    /********************/
    handleClickOfPan(){
        editbarAction.removeEditDraw(this.map);
        toolbarAction.handleClickOfPan(this.map);
    }
    handleClickOfZoomtoall(){
        editbarAction.removeEditDraw(this.map);
        toolbarAction.handleClickOfZoomtoall(this.map,this.view);
    }
    handleClickOfDistance(){
        editbarAction.removeEditDraw(this.map);
        toolbarAction.handleClickOfDistance(this.map);
    }
    handleClickOfArea(){
        editbarAction.removeEditDraw(this.map);
        toolbarAction.handleClickOfArea(this.map);
    }
    handleClickOfPosition(){
        editbarAction.removeEditDraw(this.map);
        toolbarAction.handleClickOfPosition(this.map,this.view);
    }
    handleClickOfFind(){
        editbarAction.removeEditDraw(this.map);
        toolbarAction.handleClickOfFind(this.map);
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