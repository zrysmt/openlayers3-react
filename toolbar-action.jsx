/**
 * toolbar 的事件逻辑
 * @Date 2017-3-15
 */
import ol from 'openlayers';

import olConfig from './ol-config';

let draw,helpTooltipElement;

class toolbarAction{
	/**
	 * [handleClickOfPan 浏览]
     * @param  {[ol.Map]}  map       [ol 地图]
	 */
	handleClickOfPan(map){
    	let dragPan;
    	
    	this.removeDistanceAreaDraw();

    	dragPan = new ol.interaction.DragPan();
    	if(!dragPan.getActive()) dragPan.setActive(true);
    	document.getElementById("map").style.cursor = "pointer";
    }
	/**
	 * [handleClickOfZoomtoall 全图]
     * @param  {[ol.Map]}  map       [ol 地图]
	 * @param  {[ol.View]} view [视图]
	 */
	handleClickOfZoomtoall(map,view){
    	this.removeDistanceAreaDraw();

        view.animate({zoom:olConfig.initialView.zoom || 5,
            center:ol.proj.fromLonLat(olConfig.initialView.center||[104, 30])});
    }
    /**
     * [handleClickOfDistance 计算距离]
     * @param  {[ol.Map]}  map       [ol 地图]
     */
	handleClickOfDistance(map){
    	map.removeInteraction(draw);

        this._handleClickOfDistanceArea(map,'LineString',true);
    }
    /**
     * [handleClickOfArea 计算面积]
     * @param  {[ol.Map]}  map       [ol 地图]
     */
    handleClickOfArea(map){
    	map.removeInteraction(draw);

        this._handleClickOfDistanceArea(map,'Polygon',true);
    }
	/**
     * [_handleClickOfDistanceArea description]
     * @param  {[ol.Map]}  map       [ol 地图]
     * @param  {[String]}  type       [类型'LineString'或者'Polygon' ]
     * @param  {Boolean} isGeodesic [是否精细计算,默认是]
     */
    _handleClickOfDistanceArea(map,type,isGeodesic=true){
        let wgs84Sphere,pointerMoveHandler,sketch,
        helpTooltip,measureTooltipElement,measureTooltip,source,
        vector,formatLength,formatArea;

        wgs84Sphere = new ol.Sphere(6378137);

        source =  new ol.source.Vector();
        vector = new ol.layer.Vector({
            source: source,
            style: new ol.style.Style({
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

        pointerMoveHandler = (evt)=>{
            if(evt.dragging) return;
            let helpMsg = 'Click to start drawing';
            if(sketch){
                let geom = (sketch.getGeometry());
                if(geom instanceof ol.geom.Polygon){
                    helpMsg = "Click to continue drawing the polygon";
                }else if(geom instanceof ol.geom.LineString){
                    helpMsg = "Click to continue drawing the line";
                }
            }
            helpTooltipElement.innerHTML = helpMsg;
            helpTooltip.setPosition(evt.coordinate);

            if(draw) helpTooltipElement.classList.remove('hidden');
        }

        map.on('pointermove',pointerMoveHandler);
        map.getViewport().addEventListener('mouseout', function() {
            helpTooltipElement.classList.add('hidden');
        });
        formatLength = function(line) {
            let length;
            if (isGeodesic) {
              let coordinates = line.getCoordinates();
              length = 0;
              let sourceProj = map.getView().getProjection();
              for (let i = 0, ii = coordinates.length - 1; i < ii; ++i) {
                let c1 = ol.proj.transform(coordinates[i], sourceProj, 'EPSG:4326');
                let c2 = ol.proj.transform(coordinates[i + 1], sourceProj, 'EPSG:4326');
                length += wgs84Sphere.haversineDistance(c1, c2);
              }
            } else {
              length = Math.round(line.getLength() * 100) / 100;
            }
            let output;
            if (length > 100) {
              output = (Math.round(length / 1000 * 100) / 100) +
                  ' ' + 'km';
            } else {
              output = (Math.round(length * 100) / 100) +
                  ' ' + 'm';
            }
            return output;
        };


       /**
       * Format area output.
       * @param {ol.geom.Polygon} polygon The polygon.
       * @return {string} Formatted area.
       */
        formatArea = function(polygon) {
            let area;
            if (isGeodesic) {
              let sourceProj = map.getView().getProjection();
              let geom = /** @type {ol.geom.Polygon} */(polygon.clone().transform(
                  sourceProj, 'EPSG:4326'));
              let coordinates = geom.getLinearRing(0).getCoordinates();
              area = Math.abs(wgs84Sphere.geodesicArea(coordinates));
            } else {
              area = polygon.getArea();
            }
            let output;
            if (area > 10000) {
              output = (Math.round(area / 1000000 * 100) / 100) +
                  ' ' + 'km<sup>2</sup>';
            } else {
              output = (Math.round(area * 100) / 100) +
                  ' ' + 'm<sup>2</sup>';
            }
            return output;
        };

        addInteraction();
    
        function addInteraction(){
            draw = new ol.interaction.Draw({
                source: source,
                type: /** @type {ol.geom.GeometryType} */ (type),
                style: new ol.style.Style({
                  fill: new ol.style.Fill({
                    color: 'rgba(255, 255, 255, 0.2)'
                  }),
                  stroke: new ol.style.Stroke({
                    color: 'rgba(0, 0, 0, 0.5)',
                    lineDash: [10, 10],
                    width: 2
                  }),
                  image: new ol.style.Circle({
                    radius: 5,
                    stroke: new ol.style.Stroke({
                      color: 'rgba(0, 0, 0, 0.7)'
                    }),
                    fill: new ol.style.Fill({
                      color: 'rgba(255, 255, 255, 0.2)'
                    })
                  })
                })
            });
            map.addInteraction(draw);
            createMeasureTooltip();
            createHelpTooltip();

            let listener;
            draw.on('drawstart', function(evt) {
                  // set sketch
                  sketch = evt.feature;
                  /** @type {ol.Coordinate|undefined} */
                  let tooltipCoord = evt.coordinate;

                  listener = sketch.getGeometry().on('change', function(evt) {
                    let geom = evt.target;
                    let output;
                    if (geom instanceof ol.geom.Polygon) {
                      output = formatArea(geom);
                      tooltipCoord = geom.getInteriorPoint().getCoordinates();
                    } else if (geom instanceof ol.geom.LineString) {
                      output = formatLength(geom);
                      tooltipCoord = geom.getLastCoordinate();
                    }
                    measureTooltipElement.innerHTML = output;
                    measureTooltip.setPosition(tooltipCoord);
                  });
                }, this);

            draw.on('drawend',function() {
                  measureTooltipElement.className = 'tooltip tooltip-static';
                  measureTooltip.setOffset([0, -7]);
                  // unset sketch
                  sketch = null;
                  // unset tooltip so that a new one can be created
                  measureTooltipElement = null;
                  createMeasureTooltip();
                  ol.Observable.unByKey(listener);
                }, this);
            
            // this.draw = draw;
        }
              /**
       * Creates a new help tooltip
       */
      function createHelpTooltip() {
        if (helpTooltipElement) {
          helpTooltipElement.parentNode.removeChild(helpTooltipElement);
        }
        helpTooltipElement = document.createElement('div');
        helpTooltipElement.className = 'tooltip hidden';
        helpTooltip = new ol.Overlay({
          element: helpTooltipElement,
          offset: [15, 0],
          positioning: 'center-left'
        });
        map.addOverlay(helpTooltip);
      }


      /**
       * Creates a new measure tooltip
       */
      function createMeasureTooltip() {
        if (measureTooltipElement) {
          measureTooltipElement.parentNode.removeChild(measureTooltipElement);
        }
        measureTooltipElement = document.createElement('div');
        measureTooltipElement.className = 'tooltip tooltip-measure';
        measureTooltip = new ol.Overlay({
          element: measureTooltipElement,
          offset: [0, -15],
          positioning: 'bottom-center'
        });
        map.addOverlay(measureTooltip);
      }
    }
    removeDistanceAreaDraw(){
    	if(draw){
    		map.removeInteraction(draw);
    		draw = null;
    	} 
    	if(helpTooltipElement)helpTooltipElement.classList.add("hidden");
    }
}

export default toolbarAction;