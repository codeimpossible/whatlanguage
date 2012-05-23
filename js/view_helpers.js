define([
  'handlebars'
], function(Handlebars){
  var helpers = {
    getLanguagePercent: function(languages, name) {
      var max = 0;
      console.log(languages);
      console.log(name);
      if(languages && languages.data) {
        for(var l in languages.data) {
          if( languages.data.hasOwnProperty(l) ) {
            max += languages.data[l];
          }
        }
        return (languages.data[name] /  max * 100);
      }
      return null;
    },
    languageBreakdown: function(languages) {
      var language_tmpl = "<div class='{{lower_name}} language' rel='tooltip' title='{{name}}' style='width: {{width}}px;'></div>",
            max         = 0,
            langs       = [],
            html        = "";

      if(languages && languages.data) {
        for(var l in languages.data) {
          if( languages.data.hasOwnProperty(l) ) {
            max += languages.data[l]
            langs.push({ name: l, width: languages.data[l] });
          }
        }

        for(var i = -1, l = langs.length; ++i < l;) {
          fnTmpl = Handlebars.compile(language_tmpl);
          percentage = (langs[i].width / max) * 940;
          html += fnTmpl({
            name:       langs[i].name,
            lower_name: langs[i].name.toLowerCase()
                                .replace(/\+/ig, 'p')
                                .replace(/\#/ig, 'sharp')
                                .replace(/\W/ig, '-'),
            width:      percentage
          });
        }
      }
      return html;
    }
  };

  return {
    registerHelpers: function() {
      for(var p in helpers) {
        if( helpers.hasOwnProperty(p) ) {
          Handlebars.registerHelper(p.toString(), helpers[p]);
        }
      }
    }
  }
});
