/**
 * 编辑栏
 * @Date 2017-2-15
 */
import React from 'react';
import ol from 'openlayers';

import Eventful from '../../../common/Eventful.js';

import './editbar.scss';

class Editbar extends React.Component{
    constructor(props){
        super(props);

        this.handleDrawSelect = this.handleDrawSelect.bind(this);
        this.handleDrawPoint = this.handleDrawPoint.bind(this);
        this.handleDrawLine = this.handleDrawLine.bind(this);
        this.handleDrawRect = this.handleDrawRect.bind(this);
        this.handleDrawPlygon = this.handleDrawPlygon.bind(this);
        this.handleDrawEdit = this.handleDrawEdit.bind(this);
        this.handleDrawDelete = this.handleDrawDelete.bind(this);
        this.handleDrawSave = this.handleDrawSave.bind(this);
    }
    handleDrawSelect(){
    	Eventful.dispatch('draw-select');
    }
    handleDrawPoint(){
        Eventful.dispatch('draw-point');
    }
    handleDrawLine(){
        Eventful.dispatch('draw-line');
    }
    handleDrawRect(){
        Eventful.dispatch('draw-rect');
    }
    handleDrawPlygon(){
    	Eventful.dispatch('draw-plygon');
    }
    handleDrawEdit(){
        Eventful.dispatch('draw-edit');
    }
    handleDrawDelete(){
        Eventful.dispatch('draw-delete');
    }
    handleDrawSave(){
    	Eventful.dispatch('draw-save');
    }
	render(){
		return(
			<div id="editbar" className="mapbar">
                <div id="e-select" className="e-item" title="选择" onClick={this.handleDrawSelect}>
                    <img src={require("./imgs/select.png")}/>
                </div>
				<div id="e-point" className="e-item" title="绘制点" onClick={this.handleDrawPoint}>
					<img src={require("./imgs/point.png")}/>
				</div>
				<div id="e-line" className="e-item" title="绘制线" onClick={this.handleDrawLine}>
					<img src={require("./imgs/line.png")}/>
				</div>
				<div id="e-rect" className="e-item" title="绘制矩形" onClick={this.handleDrawRect}>
                    <img src={require("./imgs/rect.png")}/>
                </div>
                <div id="e-rect" className="e-item" title="绘制多边形" onClick={this.handleDrawPlygon}>
					<img src={require("./imgs/polygon.png")}/>
				</div>
                <div id="e-edit" className="e-item" title="修改" onClick={this.handleDrawEdit}>
					<img src={require("./imgs/edit.png")}/>
                </div>
                <div id="e-delete" className="e-item" title="删除" onClick={this.handleDrawDelete}>
					<img src={require("./imgs/delete.png")}/>
                </div>
				<div id="e-save" className="e-item" title="保存" onClick={this.handleDrawSave}>
					<img src={require("./imgs/save.png")}/>
				</div>
			</div>
		)
		
	}
}

export default Editbar;