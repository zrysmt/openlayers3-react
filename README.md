## **Openlayers 3 使用React 组件化+wepack+ES6实践**

### 文件说明
+ `common` 公共的函数和引入的类库
+ `component/content/olmap` 源码位置

其实这样做的目的就是为了能直接用到项目中组织

### 组件介绍
`olmap.jsx`作为入口

```javascript
class Olmap extends React.Component{
	render(){
		return(
			<div id="olmap">
				<div id="mapbar-div">
					<Toolbar/>
					<Editbar/>
					<Printbar/>
					<Maptypebar/>
				</div>
				<Olbasemap ref="olbasemap">
				</Olbasemap>
			</div>
		)
	}
}
export default Olmap;
```

主要的组件有
+ `Olbasemap`   
	地图组件，作为其余组件的基础，包含重要的公用属性，比如：`map`,、view`等
	**说明：**这里其余组件和地图组件通信，用到发布-订阅的模式，关于发布订阅的模式可以参考文章末尾的博客
+ `Toolbar`   
	工具栏组件,包括平移、全图、距离量算、面积量算、定位、点查询等功能；
+ `Editbar`    
    编辑栏组件包括点选、绘制点、线、矩形、多边形、修改、删除和保存；
+ `Printbar`   
	打印组件包括打印成PDF和打印成图片，打印成PDF可以选择尺寸和分辨率；
+ `Maptypebar`   
	地图切换组件，可以切换天地图，天地图影像地图及其标注，百度地图，百度地图卫星图像，高德地图，
	高德地图卫星图，Bing地图，OSM等；

### 关于openlayers 3 扩展
   `component/content/olmap/ext`包含使用openlayers 3 扩展百度地图、高德地图、天地图

### 关于博客 

一篇[博文](http://blog.csdn.net/future_todo/article/details/61206783)进行简单的介绍，地址:
> http://blog.csdn.net/future_todo/article/details/61206783


大约一年前我写过一个系列的Openlayers 3的简单的源码结构的分析，代码以及说明在我的[github](https://github.com/zrysmt/openlayers-3)中有，需要的同学出门右转。
> Openlayers 3的简单的源码结构的分析 https://github.com/zrysmt/openlayers-3 

我在github上看到一些人将openlayers彻底组件化，属性通过props传入进来，例如:
```
<layer.Tile>
    <source.OSM />
  </layer.Tile>
```
这样做的好处是高度组件化，看起来很和谐。但是这样无形中增加了学习成本和时间成本，我们要看到ol3的API，然后再考虑到转化为组件化的书写的对应形式，导致了多走一步。
本博文的思想很简单，就是外壳用react组件封装，内部的源码实现使用ol3的API完全没有改变，这样就简单清晰而且避免多走一步。具体例子见博文给出的Demo