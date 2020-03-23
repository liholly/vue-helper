```javascript
//传入Vue构造函数
var Helper = VueHelper(Vue);

//设置模型
Helper.setModels({
	lyric:[],
	music:[],
	UI:{}
});

//创建模块 模块创建无先后次序 使用依赖注入方式
Helper.service('player',
	['lyricService','musicService'],
	function(lyricService, musicService, models, me){
		return {
			listen:['play', 'stop', 'pause', 'next'],
			methods:{
				play:function(){
					
				},
				stop:function(){
					
				},
				pause:function(){
					
				},
                next:function(){
					
                }
			}
		}
	});

Helper.service('lyricService',
	function(models,me){
		
	});

Helper.service('musicService',
	function(models,me){
		
	});

```