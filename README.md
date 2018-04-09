# Calendar 
# 日历

## 这是一个日历 插件
> 此插件支持 插件外部点击
> 包括 年月日周 切换

## 这个日历插件非常简单
> 一丢丢基础都可以使用

### 支持初始化功能

## 简单使用介绍
~~~
var myCalendar = Calendar({
	externalEl:'#id',//外部切换
	el:'#id',//内部切换
	clickCb：function(y,m,d){
		//回调事件，返回年月日参数
	},
	prevWeekCb:function(){

	}
})
~~~