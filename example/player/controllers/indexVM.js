define(['Helper', 'componentsVM', 'models'], function (Helper, components, models) {
	return {
		el: '#app',
		template: $('#indexTpl').html(),
		mixinModels: true,
		components: components,
		data: function () {
			return {
				aa: '66'
			}
		},
		listen: ['play', 'stop', 'pause', 'next'],
		watch: {
			'models.UI.title': function (v) {
				console.log(v);
			}
		},
		methods: {
			play: function () {
				console.log('play start!', models.UI.title);
			},
			stop: function () {

			},
			pause: function () {

			},
			next: function () {

			}
		}
	}
});