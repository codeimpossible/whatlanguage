define([
  'jquery',
  'underscore',
  'backbone',
  'handlebars',
  'showdown',
  'text!templates/dashboard/page.html',
  'text!/whatlanguage/README.md'
], function($, _, Backbone, Handlebars, Showdown, dashboardPageTemplate, readme){
  var DashboardPage = Backbone.View.extend({
    el: '.page',
    render: function () {
      var converter     = new Showdown.converter();
      var markdown_html = converter.makeHtml(readme);
      var template      = Handlebars.compile(dashboardPageTemplate);
      var html          = template({ readme: markdown_html });

      $(this.el).html( html );

      $('#boss_hog').val('Enter a github path e.g. "twitter/bootstrap" and press enter');
    }
  });
  return DashboardPage;
});
