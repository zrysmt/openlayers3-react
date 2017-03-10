**Openlayers 3 使用React 组件化+wepack+ES6实践**

[博文](http://blog.csdn.net/future_todo/article/details/61206783)地址:
> http://blog.csdn.net/future_todo/article/details/61206783

本博文不作深入研究内容，只用来记录使用React 组件化+wepack+ES6技术操作Openlayers 3 实践中遇到的问题，本博文作为开篇，所以只是简单的demo案例说明。后面还会有其他的一些博文分享我在项目中遇到的问题和总结的经验。

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