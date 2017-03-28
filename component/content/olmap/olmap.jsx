/**
 * 地图模块整体入口，这里主要是视图层
 * @Data 2017-3-14
 */
import React from 'react';
import ol from 'openlayers';

import Olbasemap from './olbasemap';
import Toolbar from './toolbar';
import Editbar from './editbar';
import Maptypebar from './maptypebar';
import Printbar from './printbar';

import './olmap.scss';

class Olmap extends React.Component{
	componentDidMount(){

	}
	render(){
		return(
			<div id="olmap">
				<div id="mapbar-div">
					<Toolbar/>
					<Editbar/>
					<Printbar/>
					<Maptypebar/>
				</div>
				{/*<img src="http://t2.tianditu.com/DataServer?T=vec_c&x=3233&y=673&l=12" crossOrigin="anonymous" style={{display:"none"}}/>*/}
				<Olbasemap ref="olbasemap">
				</Olbasemap>
			</div>
		)
	}
}

export default Olmap;