//=||= jQuery Multiple Select plugin -------------------------------------------\\
// This plugins transforms an HTML select element into a multiple select box
// Author: Federico Ramírez <fedra.arg@gmail.com>
// Licence: MIT
// -------------------------------------------------------------------------=||=//
(function($) {
  "use strict";

  // default language strings
  var LANG = {
    'Confirm': 'Confirm'
  },

  // plugin methods
  methods = {
    init: function(options) {

      var settings = $.extend({
        'LANG' : LANG
      }, options);

      return this.each(function(index, element) {
        // Check for correct element
        if(this.nodeName.toLowerCase() !== 'select') {
          $.error('jQuery.multipleSelect can only be used on <select /> elements.');
        }

        var items = [],
        i, container, btn;

        // Find all option elements and store them
        $(element).find('option').each(function(index, elem){
          elem = $(elem);
          var item = { value: elem.val(), name: elem.html() };
          items.push(item);
        });

        // Bind for click event using bind(event.namespace)
        $(element).bind('click.multipleselect', methods.selectClicked);

        // Append html
        container = $('<div class="multiple-select-container"></div>');
        for(i = 0; i < items.length; i++) {
          container.append('<p><input type="checkbox" value="' + items[i].value + '" /> ' + items[i].name + '</p>');
        }

        btn = $('<input type="button" value="' + settings.LANG.Confirm + '" />');
        btn.bind('click.multipleselect', methods.confirmClicked);

        container.append(btn).hide();
        $(element).after(container);
      });
    },

    destroy : function() {
      return this.each(function(){
      });
    },

    // custom methods

    selectClicked: function(e) {
      // get the checkbox container
      var container = $(this).next(); 

      $(this).hide();
      container.show();
    },

    confirmClicked: function() {
      var select = $(this).parent().prev();
      
      $(this).parent().hide();
      select.show();
    },

    values: function() {
      var container = this.next(),
      values = [];

      // find all checked inputs in the container, and add the value
      container.find('input:checked').each(function(index, item){
        values.push($(item).val());
      });

      // finally return all values
      return values;
    }
  };

  $.fn.multipleSelect = function(method) {
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === 'object' || ! method) {
      return methods.init.apply(this, arguments);
    } else {
      $.error('Method ' +  method + ' does not exist on jQuery.multipleselect');
    }
  };
})(jQuery);