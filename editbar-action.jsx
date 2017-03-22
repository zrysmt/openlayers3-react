/**
 * edit 的事件逻辑
 * @Date 2017-3-15
 */
import ol from 'openlayers';

// let editDraw,select,modify,source;//全局变量，改到属性中

class EditbarAction{
	handleDrawSelect(map){
		this.setModifyIsActive(false);
		this.setEditDrawIsActive(false);
		if(this.select2Del) this.select2Del.setActive(false);
		// if(this.select2Del) map.removeInteraction(this.select2Del);
		this.select2Del = new ol.interaction.Select({
           	wrapX: false
        });
       	map.addInteraction(this.select2Del);	
	}
	handleDrawPoint(map){
		this._handleDraw(map,"Point");
	}
	handleDrawLine(map){
		this._handleDraw(map,"LineString");
	}
	handleDrawRect(map){
		this._handleDraw(map,"rect");
	}
	handleDrawPlygon(map){
		this._handleDraw(map,"Polygon");
	}
	handleDrawEdit(map){
		this.setEditDrawIsActive(false);

		this.select = new ol.interaction.Select({
            wrapX: false
        });

        this.modify = new ol.interaction.Modify({
            features: this.select.getFeatures()
        });
        // var selectModify = new ol.interaction.defaults().extend([select, modify]);
        map.addInteraction(this.select);
        map.addInteraction(this.modify);
		this.setModifyIsActive(true);
	}
	handleDrawDelete(map){
		if(__DEV__) console.log("删除",this.select2Del);
		if(!this.select2Del) return;
		this.select2Del.setActive(true);
		let features = this.select2Del.getFeatures();
		if(__DEV__) console.log(features);

		if(!features) return;

		features.forEach((feature)=>{
			this.source.removeFeature(feature);
		})
		
		/*this.select2Del.on('select', (e)=> {
            let features = e.target.getFeatures();
			features.forEach((feature)=>{
				if(__DEV__) console.log(feature);
				this.source.removeFeature(feature);
			})
        });*/
	}
	/**
	 * [handleDrawSave 保存数据到数据库中]
	 */
	handleDrawSave(map){
		let features4Save = this.source&&this.source.getFeatures();
		if(!features4Save) return;
		features4Save.forEach((feature)=>{
			let coordinates = feature.getGeometry().getCoordinates();
			console.info(coordinates);
			//TODO 存放到数据库中
		})
	}
	_handleDraw(map,type){
		let shapeName,geometryFunction,maxPoints;

		this.setModifyIsActive(false);
		this.setEditDrawIsActive(false);
		if(!this.source){//一定要判断，否者每次点击绘制工具栏，均会新建
			this.source = new ol.source.Vector({ wrapX: false });
			//绘图绘在此矢量图层
			this.vector = new ol.layer.Vector({
			    source: this.source,
			    style: new ol.style.Style({ //修改绘制的样式
			        fill: new ol.style.Fill({
			            color: 'rgba(255, 255, 255, 0.2)'
			        }),
			        stroke: new ol.style.Stroke({
			            color: '#ffcc33',
			            width: 2
			        }),
			        image: new ol.style.Circle({
			            radius: 7,
			            fill: new ol.style.Fill({
			                color: '#ffcc33'
			            })
			        })
			    })
			});
			map.addLayer(this.vector);
		}
		if(type =="rect"){
			shapeName = "LineString";
			maxPoints = 2;
            geometryFunction = (coordinates, geometry)=>{
                if (!geometry) {
                    geometry = new ol.geom.Polygon(null);
                }
                let start = coordinates[0];
                let end = coordinates[1];
                geometry.setCoordinates([
                    [start, [start[0], end[1]], end, [end[0], start[1]], start]
                ]);

                return geometry;
            };
		}else{
			shapeName = type;
		}
		this.editDraw = new ol.interaction.Draw({
        	source: this.source,
        	type: /** @type {ol.geom.GeometryType} */ (shapeName),
        	geometryFunction: geometryFunction,
        	maxPoints: maxPoints
    	});
    	map.addInteraction(this.editDraw);
    	this.setEditDrawIsActive(true);
    	//绘制完成后
    	/*this.editDraw.on('drawend', (evt)=> {
    	});*/
	}
	setModifyIsActive(active){
		if(this.select) this.select.setActive(active);
        if(this.modify) this.modify.setActive(active);
	}
	setEditDrawIsActive(active){
		if(this.editDraw) this.editDraw.setActive(active);
	}
	removeEditDraw(map){
		if(this.editDraw){
			map.removeInteraction(this.editDraw);
			this.editDraw = null;
		} 
		if(this.select){
		 	map.removeInteraction(this.select);
			this.select = null;
		}
		if(this.modify){
			map.removeInteraction(this.modify);
			this.modify = null;
		} 
		if(this.select2Del){
			map.removeInteraction(this.select2Del);
			this.select2Del = null;
		} 
		
	}
}

export default EditbarAction;