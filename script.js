$(document).ready(function () {

  ; (function ($, window, document, undefined) {
    Owl2row = function (scope) {
      this.owl = scope;
      this.owl.options = $.extend({}, Owl2row.Defaults, this.owl.options);
      //link callback events with owl carousel here

      this.handlers = {
        'initialize.owl.carousel': $.proxy(function (e) {
          if (this.owl.settings.owl2row) {
            this.build2row(this);
          }
        }, this)
      };

      this.owl.$element.on(this.handlers);
    };

    Owl2row.Defaults = {
      owl2row: false,
      owl2rowTarget: 'item',
      owl2rowContainer: 'owl2row-item',
      owl2rowDirection: 'utd' // ltr
    };

    //mehtods:
    Owl2row.prototype.build2row = function (thisScope) {

      var carousel = $(thisScope.owl.$element);
      var carouselItems = carousel.find('.' + thisScope.owl.options.owl2rowTarget);

      var aEvenElements = [];
      var aOddElements = [];

      $.each(carouselItems, function (index, item) {
        if (index % 2 === 0) {
          aEvenElements.push(item);
        } else {
          aOddElements.push(item);
        }
      });

      carousel.empty();

      switch (thisScope.owl.options.owl2rowDirection) {
        case 'ltr':
          thisScope.leftToright(thisScope, carousel, carouselItems);
          break;

        default:
          thisScope.upTodown(thisScope, aEvenElements, aOddElements, carousel);
      }
    };

    Owl2row.prototype.leftToright = function (thisScope, carousel, carouselItems) {

      var o2wContainerClass = thisScope.owl.options.owl2rowContainer;
      var owlMargin = thisScope.owl.options.margin;

      var carouselItemsLength = carouselItems.length;

      var firsArr = [];
      var secondArr = [];

      //console.log(carouselItemsLength);

      if (carouselItemsLength % 2 === 1) {
        carouselItemsLength = ((carouselItemsLength - 1) / 2) + 1;
      } else {
        carouselItemsLength = carouselItemsLength / 2;
      }

      //console.log(carouselItemsLength);

      $.each(carouselItems, function (index, item) {


        if (index < carouselItemsLength) {
          firsArr.push(item);
        } else {
          secondArr.push(item);
        }
      });

      $.each(firsArr, function (index, item) {
        var rowContainer = $('<div class="' + o2wContainerClass + '"/>');

        var firstRowElement = firsArr[index];
        firstRowElement.style.marginBottom = owlMargin + 'px';

        rowContainer
          .append(firstRowElement)
          .append(secondArr[index]);

        carousel.append(rowContainer);
      });
    };

    Owl2row.prototype.upTodown = function (thisScope, aEvenElements, aOddElements, carousel) {

      var o2wContainerClass = thisScope.owl.options.owl2rowContainer;
      var owlMargin = thisScope.owl.options.margin;

      $.each(aEvenElements, function (index, item) {

        var rowContainer = $('<div class="' + o2wContainerClass + '"/>');
        var evenElement = aEvenElements[index];

        evenElement.style.marginBottom = owlMargin + 'px';

        rowContainer
          .append(evenElement)
          .append(aOddElements[index]);

        carousel.append(rowContainer);
      });
    };

    /**
     * Destroys the plugin.
     */
    Owl2row.prototype.destroy = function () {
      var handler, property;

      for (handler in this.handlers) {
        this.owl.dom.$el.off(handler, this.handlers[handler]);
      }
      for (property in Object.getOwnPropertyNames(this)) {
        typeof this[property] !== 'function' && (this[property] = null);
      }
    };

    $.fn.owlCarousel.Constructor.Plugins['owl2row'] = Owl2row;
  })(window.Zepto || window.jQuery, window, document);
  //end of owl2row plugin

  $('.owl-carousel').owlCarousel({
    loop: true,
    owl2row: true,
    margin: 10,
    nav: true,
    navText: [
      "<i class='fa fa-caret-left'></i>",
      "<i class='fa fa-caret-right'></i>"
    ],
    // autoplay: true,
    // autoplayHoverPause: true,
    responsive: {
      0: {
        items: 2,
      },
      600: {
        items: 3,
      },
      1000: {
        items: 5,
      }
    }
  });

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

  // var $images = $('.owl-carousel img');
  // $images.each(function () {
  //   $(this).click(function () {
  //     $('#image-input').append(`<label class="label" for="image">Tvoje objednávka</label> <input type="image" name="image" class="image" id="image" src=${$(this).attr('src')} alt="Your order" width="30%" height="30%">`);
  //   })
  // })



  var imgArray = [];
  var images = $('.owl-carousel img');
  images.each(function () {
    $(this).click(function () {
      var src = $(this).attr('src').split('/');
      var file = src[src.length - 1];
      var imagePath = 'http://krystalickalaska.cz/img/' + file;
      imgArray.push(imagePath);
      var imgArrayString = JSON.stringify(imgArray);
      
      $('.images_urls').attr('value', imgArrayString)
    })
  })
});


