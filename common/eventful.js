/**
 * 观察者(发布-订阅)模式
 * @Date 2017-3-14
 */
let Eventful = {
	_events:{},
	/**
	 * [dispatch 发布]
	 * @param  {[String]}    evtName [关键字名]
	 * @param  {...[Any]} args    [传递的参数]
	 */
	dispatch(evtName,...args){
		if(!this._events[evtName]) return;
		this._events[evtName].forEach(
			func => func.apply(Object.create(null),args));
	},
	/**
	 * [subscribe 订阅]
	 * @param  {[String]}    evtName [关键字名]
	 * @param  {Function} callback [回掉函数]
	 */
	subscribe(evtName,callback){
		if(!this._events[evtName]){
			this._events[evtName] = [];
		}
		this._events[evtName].push(callback);
	},
	/**
	 * [unSubscribe 取消订阅]
	 * @param  {[String]}    evtName [关键字名]
	 */
	unSubscribe(evtName){
		if(!this._events[evtName]) return;
		delete this._events[evtName];
	}
}


export default Eventful;