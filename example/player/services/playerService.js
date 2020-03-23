define(['Helper'], function (Helper) {
	//player
	Helper.service('player',
		['lyricService', 'musicService'],
		function (lyricService, musicService) {
			return {
				listen: ['play', 'stop', 'pause', 'next'],
				methods: {
					play: function () {
						console.log('play start!opopop');
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
});