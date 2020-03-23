//入口程序
function player(opts) {
	var __opts = opts || {};

	//模板配置
	var $tplDOM = $(__opts.tplDOM || 'body');
	var tplRoot = __opts.tplRoot || '/example/player/views/';
	var tpls = [
		'index_vuetpl.html',
		'lyric_vuetpl.html',
		'musicList_vuetpl.html',
		'playBar_vuetpl.html',
	];

	//模块配置
	require.config({
		urlArgs: 'v=' + __opts.urlArgs,
		paths: {
			VueHelper: '/dist/VueHelper',
			models: '/example/player/models',
			Helper: '/example/player/helper',

			playerService: '/example/player/services/playerService',
			lyricService: '/example/player/services/lyricService',
			musicService: '/example/player/services/musicService',

			indexVM: '/example/player/controllers/indexVM',
			componentsVM: '/example/player/controllers/componentsVM'
		}
	});

	//模板加载方法
	function loadTpl(fn) {
		function appendTpls(TplHtmls) {
			_.each(TplHtmls, function (tplHtml) {
				$tplDOM.append(tplHtml.data)
			});
		}

		function getTask(root, tpls) {
			return _.transform(tpls, function (res, tpl) {
				res.push(axios.get(root + tpl))
			}, [])
		}

		axios.all(getTask(tplRoot, tpls)).then(function (db) {
			appendTpls(db);
			fn && fn();
		});
	}

	/**
	 * 主程序加载原理
	 * 1.view要最先加载，模板文件加载完成之后，才开始执行应用初始化，目的是确保所有VM在实例化时都能抓到响应的模板
	 * 2.service要在主程序中引入，目的是触发Helper.service方法把注册service到Helper中，这样在执行Helper.app渲染的时候，所有服务都已经注册好了
	 * 3.models则要在Helper实例化时同步注册，目的是为了在注册service之前Helper已经绑定好models，因为vueHelper中的models是按引用指派给各个模块的
	 *
	 * 实例的执行过程：(Helper > Helper.setModels) > Helper.service > Helper.app > VM
	 *
	 */
	loadTpl(function () {
		require(
			['Helper', 'indexVM', 'playerService', 'lyricService', 'musicService'],
			function (Helper, indexVM, playerService, lyricService, musicService) {
				Helper.app('player', indexVM)
			}
		)
	})
}