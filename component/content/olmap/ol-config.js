/**
 * openLayers 的配置
 * @Date 2017-3-14
 */
let olConfig ={
	initialView:{
		center:[104, 30],
		zoom:5
	},
	tianMap:{
		"vec":"http://t2.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}",
		"vecLabel":"http://t2.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}",
		"img":"http://t2.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}",
		"imgLabel":"http://t2.tianditu.com/DataServer?T=cia_w&x={x}&y={y}&l={z}"
	}
}

export default olConfig;