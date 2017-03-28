/**
 * 打印地图控件
 * @Date 2017-3-22
 */
import React from 'react';
import ol from 'openlayers';

import Eventful from '../../../common/eventful.js';
import util from '../../../common/util.jsx';

import './printbar.scss';
let byClassName = util.byClassName;

class Printbar extends React.Component{
	constructor(props){
		super(props);
		this.handlePrintSetting = this.handlePrintSetting.bind(this);
		this.handlePrint2Pdf = this.handlePrint2Pdf.bind(this);
		this.handlePrint2Img = this.handlePrint2Img.bind(this);
	}
	handlePrintSetting(e){
    	Eventful.dispatch('removeEditDraw');
    	Eventful.dispatch('removeDistanceAreaDraw');

		let target = e.target || window.event.target;
		let className = target.getAttribute('class');

		if(className&&className.includes('printbar-title')){
			let printbarPane = document.getElementsByClassName('printbar-pane')[0];
			if(printbarPane.style.display=="none"){
				printbarPane.style.display = "block";
			}else{
				printbarPane.style.display = "none";
			}
		}
	}
	handlePrint2Img(){
		Eventful.dispatch('print-img');
	}
	handlePrint2Pdf(){
		Eventful.dispatch('print');
	}
	render(){
		return(
			<div id ="printbar" className="mapbar" onClick={this.handlePrintSetting}>
				<div className="printbar-title">打印</div>
				<div className="printbar-pane" style={{display:"none"}}>
        			<label>尺&nbsp;&nbsp;&nbsp;&nbsp;寸:&nbsp;&nbsp;</label>
					<select id="format">
        			    <option value="a0">A0 (slow)</option>
        			    <option value="a1">A1</option>
        			    <option value="a2">A2</option>
        			    <option value="a3">A3</option>
        			    <option value="a4" selected= "selected">A4</option>
        			    <option value="a5">A5 (fast)</option>
        			</select>
        			<br/>
        			<label>分辨率:&nbsp;&nbsp;</label>
        			<select id="resolution">
        			    <option value="72">72 dpi (fast)</option>
        			    <option value="150">150 dpi</option>
        			    <option value="300">300 dpi (slow)</option>
        			</select>
        			<br/>
        			<input type="button" className="btn print-btn" value="打印" onClick={this.handlePrint2Pdf} />
        			<br/>
        			<input type="button" className="btn print-img-btn" value="打印出视窗大小图片" onClick={this.handlePrint2Img} />
				</div>
			</div>
		)
	}
}


export default Printbar;