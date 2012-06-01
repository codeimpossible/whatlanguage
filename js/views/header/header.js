define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/header/header.html'
], function($, _, Backbone, headerMenuTemplate){
  var HeaderMenuView = Backbone.View.extend({
    el: '.header',
    intialize: function () {
    },
    render: function () {
      $(this.el).html(headerMenuTemplate);
      $('a[href="' + window.location.hash + '"]').addClass('active');


      $('#boss_hog').keydown(function(e){
        if(e.keyCode === 13) {
          // get rid of useless data
          var url = $(this).val();
          url = url.replace(/https?:\/\/w{0,3}\.?github\.com\//ig, "")  // incase someone uses a github URL
                   .replace(/\.git$/i, "")                              // incase someone uses .git
                   .replace(/\s/g, "");                                 // remove whitespace
          window.location = "#/" + url;
        }
      }).click(function(){
        this.select();
      });
    },
    events: {
      'click a': 'highlightMenuItem'
    },
    highlightMenuItem: function (ev) {
      $('.active').removeClass('active');
      $(ev.currentTarget).addClass('active');
    }
  })

  return HeaderMenuView;
});
