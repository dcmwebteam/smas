// When the user scrolls down 20px from the top of the document, slide down the navbar
// When the user scrolls to the top of the page, slide up the navbar (50px out of the top view)
// window.onscroll = function() {scrollFunction()};

// function scrollFunction() {
//   if (document.body.scrollTop > 140 || document.documentElement.scrollTop > 140) {
//     document.getElementById("secondNav").style.top = "0";
//   } else {
//     document.getElementById("secondNav").style.top = "-340px";
//     // document.getElementById("nav2Toggler").
//     $('#nav2Toggler').removeClass('collapsed');
//     $('#navbarNav2').removeClass('show');
//   }
// }





$(document).ready(function(){
  $(window).resize(function(){

    marginClass = "margin-left:2%;";
    width = $(window).width();
    console.log(width);
    if(width <= 576){
      $('.flip-card').addClass('mx-auto');
    }
    if(width > 576 && width < 767){
      $('.card-div').addClass(marginClass);
    }
  });

})

