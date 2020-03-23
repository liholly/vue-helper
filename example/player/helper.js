define(['VueHelper', 'models'], function (VueHelper, models) {
	var Helper = VueHelper(Vue);

	Helper.setModels(models);

	return Helper
});