// Filename: router.js
define([
  'jquery',
  'underscore',
  'backbone',
	'vm'
], function ($, _, Backbone, Vm) {
  var AppRouter = Backbone.Router.extend({
    routes: {
      // Pages
      '/:owner/:name': 'project',

      // Default - catch all
      '*actions': 'defaultAction'
    }
  });

  var initialize = function(options){
		var appView = options.appView;
    var router = new AppRouter(options);
    router.on('route:project', function (owner, name) {
      require(['views/project/page'], function (Project) {
        var projectPage = Vm.create(appView, 'Project', Project);
        projectPage.render(owner, name);
      });
    });
		router.on('route:defaultAction', function (actions) {
			require(['views/dashboard/page'], function (DashboardPage) {
        var dashboardPage = Vm.create(appView, 'DashboardPage', DashboardPage);
        dashboardPage.render();
      });
		});
    Backbone.history.start();
  };
  return {
    initialize: initialize
  };
});
