
var imgArray = [];
var images;
  
$(document).ready(function () {

  $(function () {
    $('a[href*="#"]')
      // Remove links that don't actually link to anything
      .not('[href="#"]')
      .not('[href="#0"]')
      .click(function (event) {
        // On-page links
        if (
          location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
          &&
          location.hostname == this.hostname
        ) {
          // Figure out element to scroll to
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
          // Does a scroll target exist?
          if (target.length) {
            // Only prevent default if animation is actually gonna happen
            event.preventDefault();
            $('html, body').animate({
              scrollTop: target.offset().top
            }, 1000);
            return false;
          }
        }
      });
  })

  $('.about-me').waypoint(function (direction) {

    if (direction == 'down') {

      $('nav').addClass('sticky');

    } else {
      $('nav').removeClass('sticky');
    }
  }, {
    offset: '60px'
  });

  $('#js-navbar-toggle').click(function () {
    $('#js-menu').toggleClass("open");
    $('#js-menu li').each(function () {
      $(this).toggleClass('fade');
    })

    $('#js-menu li a').click(function () {
      $('#js-navbar-toggle').click();
    })

    var icon = $('.navbar-toggle i');
    if (icon.hasClass('fa fa-bars')) {
      icon.addClass('fas fa-times');
      icon.removeClass('fas fa-bars')

    } else {
      icon.addClass('fas fa-bars');
      icon.removeClass('fas fa-times');
    }
  });

  $('.contactBtn').click(function () {
    $('.close').click();
  })

  images = $('.grid img');


  images.each(function () {
    $(this).click(function () {

      var src = $(this).attr('src').split('/');
      var file = src[src.length - 1];
      var imagePath = 'http://krystalickalaska.cz/img/' + file;
      imgArray.push(imagePath);
      let imgIndex = imgArray.length - 1;
      var imgArrayString = JSON.stringify(imgArray);

      $('.images_urls').attr('value', imgArrayString)
      let newImage = $(`<div class="image-form-container"><span class="btn-close-form"><i class="fa fa-times"></i></span> <img class="image" id="image" src=${$(this).attr('src')} index=${$(this).attr('imgIndex')} alt="Your order"></div>`)
      $('.images_show_urls').append(newImage);
      let btnClose = newImage.find(".btn-close-form")
      btnClose.click(function(){
        
        imgArray.splice(imgIndex, 1);
        var imgArrayString = JSON.stringify(imgArray);
        $('.images_urls').attr('value', imgArrayString)
        newImage.remove();
      });
    })
  })
})