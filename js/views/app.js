define([
  'jquery',
  'underscore',
  'backbone',
  'vm',
	'events',
  'text!templates/layout.html'
], function($, _, Backbone, Vm, Events, layoutTemplate){
  var AppView = Backbone.View.extend({
    el: '#app',
    initialize: function () {

      var NestedView2 = Backbone.View.extend({})
      var NestedView1 = Backbone.View.extend({
        initialize: function () {
          var nestedView2 = Vm.create(this, 'Nested View 2', NestedView2);
				}
      })
      var nestedView1 = Vm.create(this, 'Nested View 1', NestedView1);

    },
    render: function () {
			var that = this;

      $(this.el).html(layoutTemplate);

      require(['views/header/navbar'], function (HeaderNavBarView) {
        var headerMenuView = Vm.create(that, 'HeaderNavBarView', HeaderNavBarView);
        headerMenuView.render();
      });

      require(['views/header/header'], function (HeaderView) {
        var headerView = Vm.create(that, 'HeaderView', HeaderView);
        headerView.render();
      });

			require(['views/footer/footer'], function (FooterView) {
				// Pass the appView down into the footer so we can render the visualisation
        var footerView = Vm.create(that, 'FooterView', FooterView);
        footerView.render();
      });
		}
	});

  // simple jquery event bindings
  // these only need to happen once per app start
  $(function(){

  });

  return AppView;
});
