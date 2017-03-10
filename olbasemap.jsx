/**
 * 基础地图模块
 * @Date 2017-3-8
 */
import React from 'react';
import ol from 'openlayers';

import util from '../../../common/util.jsx';

import 'openlayers/css/ol.css';
import './olbasemap.scss';

class Olbasemap extends React.Component{

	componentDidMount(){
		util.adaptHeight('map',105,300);//高度自适应

		let projection,attribution,coor,view,mousePositionControl;

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

		let map = new ol.Map({
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
            view: new ol.View({
              // projection: 'EPSG:4326',//WGS84
              center: ol.proj.fromLonLat([104, 30]),
              zoom: 5,
            }),
            controls: ol.control.defaults().extend([
                new ol.control.FullScreen(), //全屏控件
                new ol.control.ScaleLine(), //比例尺
                new ol.control.OverviewMap(), //鹰眼控件
                new ol.control.Rotate(),
                new ol.control.ZoomSlider(),
                mousePositionControl
             ]),
      	});
	}
	render(){
		return(
			<div id="map"></div>
		)
	}
}

export default Olbasemap;