var slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
  showDivs(slideIndex += n);
}

function showDivs(n) {
  var i;
  var x = document.getElementsByClassName("mySlides");
  if (n > x.length) {slideIndex = 1}
  if (n < 1) {slideIndex = x.length}
  for (i = 0; i < x.length; i++) {
     x[i].style.display = "none";
  }
  if (x.length) {
    x[slideIndex-1].style.display = "block";
  }
}
$(document).on("turbolinks:load",function() {
  return setTimeout((function() {
    return $('.alert').slideUp();
  }), 3000);
});
$(document).on("turbolinks:load",function() {
  $(document).on('click', '#showLeft', function(e) {
      $(this).toggleClass('open');
    });
  var menuLeft = document.getElementById( 'cbp-spmenu-s1' ),
    menuTop = document.getElementById( 'cbp-spmenu-s3' )
    showLeft = document.getElementById( 'showLeft' ),
    content = document.getElementById( 'content' )

    body = document.body;
  showLeft.onclick = function() {
    classie.toggle( this, 'active' );
    classie.toggle( menuLeft, 'cbp-spmenu-open' );
    classie.toggle( content, 'content-full-width');
    disableOther( 'showLeft' );
  };
  function disableOther( button ) {
    if( button !== 'showLeft' ) {
      classie.toggle( showLeft, 'disabled' );
    }
  }
});
