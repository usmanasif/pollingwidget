(function() {

// Localize jQuery variable
var jQuery;

/******** Load jQuery if not present *********/
if (window.jQuery === undefined || window.jQuery.fn.jquery !== '3.2.1') {
    var script_tag = document.createElement('script');
    script_tag.setAttribute("type","text/javascript");
    script_tag.setAttribute("src",
        "https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js");
    if (script_tag.readyState) {
      script_tag.onreadystatechange = function () { // For old versions of IE
          if (this.readyState == 'complete' || this.readyState == 'loaded') {
              scriptLoadHandler();
          }
      };
    } else {
      script_tag.onload = scriptLoadHandler;
    }
    // Try to find the head, otherwise default to the documentElement
    (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(script_tag);
} else {
    // The jQuery version on the window is the one we want to use
    jQuery = window.jQuery;
    main();
}

/******** Called once jQuery has loaded ******/
function scriptLoadHandler() {
    // Restore $ and window.jQuery to their previous values and store the
    // new jQuery in our local jQuery variable
    jQuery = window.jQuery.noConflict(true);
    // Call our main function
    main();
}

/******** Our main function ********/
function main() {
    jQuery(document).ready(function($) {
        /******* Load CSS *******/
        var css_link = $("<link>", {
            rel: "stylesheet",
            type: "text/css",
            href: "http://c17cfaa4.ngrok.io/assets/widget.css"
        });
        css_link.appendTo('head');

        /******* Load HTML *******/
        if ($('#widget-container').length) {
          var pollId = $('#widget-container').data("value")
          var jsonp_url = "http://c17cfaa4.ngrok.io/polls/get_widget?id="+pollId+"&callback=?";
          $.getJSON(jsonp_url, function(data) {
            $('#widget-container').html("This data comes from another server: " + data.html);
          });
        }
    });
}

})();

var slideIndex = 1;
  pollingWidgetShowDivs(slideIndex);

  function pollingWidgetPlusDivs(n) {
    pollingWidgetShowDivs(slideIndex += n);
  }

  function  pollingWidgetShowDivs(n) {
    var i;
    var x = document.getElementsByClassName("polling-widget-slides");
    if (n > x.length) {slideIndex = 1}
    if (n < 1) {slideIndex = x.length}
    for (i = 0; i < x.length; i++) {
       x[i].style.display = "none";
    }
    if (x.length) {
      x[slideIndex-1].style.display = "block";
    }
  }

$(document).on('click', '#polling-widget-slide-left , #polling-widget-slide-right', function(e) {
    var sections = $('.polling-widget-slides');
    var index = sections.index($(".polling-widget-slides:visible"))+1;
   $('#question-number').html((index)+'/'+sections.length);
   if (index == sections.length) {
    if (index == 1) {
      $('#polling-widget-slide-left').attr("disabled", true);
    }
    else {
      $('#polling-widget-slide-left').attr("disabled", false);
    }
    $('#polling-widget-slide-right').attr("disabled", true);
   }
   else if (index == 1) {
    if (index == sections.length) {
      $('#polling-widget-slide-right').attr("disabled", true);
    }
    else {
      $('#polling-widget-slide-right').attr("disabled", false);
    }
    $('#polling-widget-slide-left').attr("disabled", true);
   }
   else{
    $('#polling-widget-slide-right').attr("disabled", false);
    $('#polling-widget-slide-left').attr("disabled", false);
   }
  });
