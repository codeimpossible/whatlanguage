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
          window.location = "#/" + $(this).val().replace(/\s/g, "");
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
