define([
  'jquery',
  'underscore',
  'backbone',
  'handlebars',
  'text!templates/project/page.html',
  'github'
], function($, _, Backbone, Handlebars, userProjectTemplate, github){
  var UserProjectPage = Backbone.View.extend({
    el: '.page',
    render: function (user, name) {
      var parent = this, // scope "this" so our API callback can use it
          repo_url = 'repos/'+ user + '/' + name,
          api_calls = [
            { method: repo_url, key: "project" },
            { method: repo_url + '/languages', key: "languages" },
          ];

      github.get(api_calls, function( m ) {
        var template = Handlebars.compile(userProjectTemplate);

        parent.$el.html( template( m ) );
      });

      $('#boss_hog').val(user + "/" + name);
    }
  });
  return UserProjectPage;
});
