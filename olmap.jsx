/**
 * 地图模块整体入口
 * @Data 2017-3-14
 */
import React from 'react';
import ol from 'openlayers';

import Olbasemap from './olbasemap';
import Toolbar from './toolbar';

import './olmap.scss';

class Olmap extends React.Component{
	componentDidMount(){

	}
	render(){
		return(
			<div id="olmap">
				<div id="toolbar-div"><Toolbar/></div>
				<Olbasemap ref="olbasemap">
				</Olbasemap>
			</div>
		)
	}
}

export default Olmap;