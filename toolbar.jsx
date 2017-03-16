/**
 * 地图模块
 * @Date 2017-3-10
 */
import React from 'react';
import ol from 'openlayers';

import olConfig from './ol-config';
import Eventful from '../../../common/Eventful.js';

import './toolbar.scss';

// class Toolbar extends Olbasemap{
class Toolbar extends React.Component{
	constructor(props){
        super(props);
        /*this.map = map;
        this.view = view;*/

        this.handleClickOfPan = this.handleClickOfPan.bind(this);
        this.handleClickOfZoomtoall = this.handleClickOfZoomtoall.bind(this);
        this.handleClickOfDistance = this.handleClickOfDistance.bind(this);
        this.handleClickOfArea = this.handleClickOfArea.bind(this);
        this.handleClickOfPosition = this.handleClickOfPosition.bind(this);
        this.handleClickOfFind = this.handleClickOfFind.bind(this);
    }
    handleClickOfPan(){
    	Eventful.dispatch('pan');
    }
    handleClickOfZoomtoall(){
        Eventful.dispatch('zoomtoall');
    }
    handleClickOfDistance(){
    	Eventful.dispatch('distance');
    }
    handleClickOfArea(){
        Eventful.dispatch('area');
    }
    handleClickOfPosition(){
        Eventful.dispatch('position');
    }
    handleClickOfFind(){
    	Eventful.dispatch('find');
    }
	render(){
		return(
			<div id="toolbar" className="mapbar">
				<div id="pan" className="t-item" title="平移" onClick={this.handleClickOfPan}></div>
				<div id="zoomtoall" className="t-item" title="全图" onClick={this.handleClickOfZoomtoall}></div>
				<div id="distance" className="t-item" title="测距离" onClick={this.handleClickOfDistance}></div>
                <div id="area" className="t-item" title="测面积" onClick={this.handleClickOfArea}></div>
                <div id="myposition" className="t-item" title="定位" onClick={this.handleClickOfPosition}></div>
				<div id="click2find" className="t-item" title="点查询" onClick={this.handleClickOfFind}></div>
			</div>
		)
		
	}
}

export default Toolbar;