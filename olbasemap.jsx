/**
 * 基础地图模块
 * @Date 2017-3-8
 */
import React from 'react';
import ol from 'openlayers';

import util from '../../../common/util.jsx';
import Eventful from '../../../common/Eventful.js';
import olConfig from './ol-config';
import toolbarAction from './toolbar-action';

import 'openlayers/css/ol.css';
import './olbasemap.scss';

let toolbarActionClass = new toolbarAction();

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
    }
    handleClickOfPan(){
        toolbarActionClass.handleClickOfPan(this.map);
    }
    handleClickOfZoomtoall(){
        toolbarActionClass.handleClickOfZoomtoall(this.map,this.view);
    }
    handleClickOfDistance(){
        toolbarActionClass.handleClickOfDistance(this.map);
    }
    handleClickOfArea(){
        toolbarActionClass.handleClickOfArea(this.map);
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