/**
 * 地图模块
 * @Date 2017-3-10
 */
import React from 'react';

import './toolbar.scss';

class Toolbar extends React.Component{
	render(){
		return(
			<div id="toolbar">
				<div id="pan" className="t-item" title="平移"></div>
				<div id="zoomtoall" className="t-item" title="全图"></div>
				<div id="distance" className="t-item" title="测距离"></div>
				<div id="area" className="t-item" title="测面积"></div>
			</div>
		)
		
	}
}

export default Toolbar;