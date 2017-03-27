/**
 * 控制显示地图类型及是否显示标注
 * @Date 2017-3-15
 */
import React from 'react';
import ol from 'openlayers';

import Eventful from '../../../common/eventful.js';
import util from '../../../common/util.jsx';

import './maptypebar.scss';
let byClassName = util.byClassName;

class Maptypebar extends React.Component{
	constructor(props){
		super(props);
		this.handleMaptype = this.handleMaptype.bind(this);
	}
	handleMaptype(e){
    	Eventful.dispatch('removeEditDraw');
    	Eventful.dispatch('removeDistanceAreaDraw');

		let maptypebarPane = document.getElementsByClassName('maptypebar-pane')[0];
		if(maptypebarPane.style.display=="none"){
			maptypebarPane.style.display = "block";
		}else{
			maptypebarPane.style.display = "none";
		}
		let target = e.target || window.event.target;
		let className = target.getAttribute('class');
		if(className&&className.includes('mapbar-ctl')){
			let group1 = byClassName('group1');
			let group2 = byClassName('group2');

			if(!className.includes('unselected')){
				target.classList.remove('selected');
				target.classList.add('unselected');
				let type = 'remove-'+target.getAttribute('data-type');
				this.dispatch(type.trim());
			}else{
				target.classList.remove('unselected');
				target.classList.add('selected');
				let type = 'add-'+target.getAttribute('data-type');
				this.dispatch(type.trim());
			}
			// maptypebarPane.style.display = "none";

		}
	}
	dispatch(type){
		if(__DEV__)console.log(type);
		Eventful.dispatch(type);
	}
	render(){
		return(
			<div id ="maptypebar" className="mapbar" onClick={this.handleMaptype}>
				<span className="maptypebar-title">切换地图</span>
				<div className="maptypebar-pane" style={{display:"none"}}>
					<div className="mapbar-ctl vec  selected" data-type="vec">矢量地图</div>
					<div className="mapbar-ctl vec-label  selected" data-type="vec-label">矢量地图标注</div>
					<div className="mapbar-ctl img  unselected" data-type="img">影像地图</div>
					<div className="mapbar-ctl img-label  unselected" data-type="img-label">影像地图标注</div>
					<div className="mapbar-ctl baidumap  unselected" data-type="baidumap">百度地图</div>
					<div className="mapbar-ctl baidumap-sat  unselected" data-type="baidumap-sat">百度地图卫星图</div>
					<div className="mapbar-ctl amap  unselected" data-type="amap">高德地图</div>
					<div className="mapbar-ctl amap-sat  unselected" data-type="amap-sat">高德地图卫星图</div>
					<div className="mapbar-ctl osm  unselected" data-type="osm">OpenStreetMap地图</div>
					<div className="mapbar-ctl bingmap unselected" data-type="bingmap">Bing地图</div>
				</div>
			</div>
		)
	}
}


export default Maptypebar;