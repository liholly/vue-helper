define(['Helper', 'models'], function (Helper, models) {
	return {
		playBar: {
			template: $('#playBarTpl').html(),
			mixinModels: true,
			methods: {
				changeTitle: function (v) {
					models.UI.title = v;
					Helper.call('play');
				}
			}
		}
	}
});