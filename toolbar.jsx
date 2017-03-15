/**
 * 地图模块
 * @Date 2017-3-10
 */
import React from 'react';
import ol from 'openlayers';

import olConfig from './ol-config';
import Olbasemap from './olbasemap';
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

	render(){
		return(
			<div id="toolbar">
				<div id="pan" className="t-item" title="平移" onClick={this.handleClickOfPan}></div>
				<div id="zoomtoall" className="t-item" title="全图" onClick={this.handleClickOfZoomtoall}></div>
				<div id="distance" className="t-item" title="测距离" onClick={this.handleClickOfDistance}></div>
				<div id="area" className="t-item" title="测面积" onClick={this.handleClickOfArea}></div>
			</div>
		)
		
	}
}

export default Toolbar;