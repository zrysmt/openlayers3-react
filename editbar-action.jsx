/**
 * edit 的事件逻辑
 * @Date 2017-3-15
 */
import ol from 'openlayers';

let editDraw,select,modify;

class EditbarAction{
	handleDrawPoint(map){
		console.log("绘制点");
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

	}
	handleDrawDelete(map){

	}
	handleDrawSave(map){

	}
	_handleDraw(map,type){
		let shapeName,geometryFunction,maxPoints;

		this.removeEditDraw(map);

		let source = new ol.source.Vector({ wrapX: false });
		//绘图绘在此矢量图层
		let vector = new ol.layer.Vector({
		    source: source,
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
		map.addLayer(vector);

		if(type =="rect"){
			shapeName = "LineString";
			maxPoints = 2;
            geometryFunction = function(coordinates, geometry) {
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
		editDraw = new ol.interaction.Draw({
        	source: source,
        	type: /** @type {ol.geom.GeometryType} */ (shapeName),
        	geometryFunction: geometryFunction,
        	maxPoints: maxPoints
    	});
    	map.addInteraction(editDraw);
	}
	removeEditDraw(map){
		if(editDraw) map.removeInteraction(editDraw);
		if(select) map.removeInteraction(select);
		if(modify) map.removeInteraction(modify);
	}
}

export default EditbarAction;