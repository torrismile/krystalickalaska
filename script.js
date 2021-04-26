let imgArray = [];
let images;
let activeGalleryId;
let activeImageSource;
let index = 0;

let imagesCurent;
let modalCurent;
let modalImgCurrent;
let modalTxtCurrent;
let closeCurrent;
let nextBtnCurrent;
let prevBtnCurrent;

function showModal() {
  $(modalImgCurrent).attr('src', activeImageSource);
  $(modalTxtCurrent).html("Pokud se vám líbí, napište mi");
  modalCurent.addClass('appear');
}

function closeModal() {
  $(modalCurrent).removeClass('appear');
}

function updateImg() {
  let actualImage = $('#' + activeGalleryId + ' img')[index];
  activeImageSource = $(actualImage).attr('src')
  $(modalImgCurrent).attr('src', activeImageSource);
  // $('#' + activeGalleryId + ' img').each((ind, image) => {
  //   if (parseInt($(image).attr('alt')) === index) {
  //     activeImageSource = $(image).attr('src')
  //     $(modalImgCurrent).attr('src', activeImageSource);
  //   }
  // })
}

$(document).ready(function () {

  imagesCurent = $('.current .item-current img');
  modalCurent = $('#modalCurrent');
  modalImgCurrent = $('#modalImgCurrent');
  modalTxtCurrent = $('#modalTxtCurrent');
  closeCurrent = $('#closeCurrent');
  nextBtnCurrent = $('#nextBtnCurrent');
  prevBtnCurrent = $('#prevBtnCurrent');
  index = 0;

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
          let target = $(this.hash);
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

    let icon = $('.navbar-toggle i');
    if (icon.hasClass('fa fa-bars')) {
      icon.addClass('fas fa-times');
      icon.removeClass('fas fa-bars')

    } else {
      icon.addClass('fas fa-bars');
      icon.removeClass('fas fa-times');
    }
  });

  $(nextBtnCurrent).on('click', () => {
    maxIndex = $('#' + activeGalleryId + ' img').length - 1;
    index = index + 1;
    if (index > maxIndex) {
      index = maxIndex;
    }
    updateImg();
  })

  $(closeCurrent).on('click', () => {
    closeModal();
  })

  $(prevBtnCurrent).on('click', () => {
    index = index - 1;
    if (index < 0) {
      index = 0;
    }
    updateImg();
  })

  $('.contactBtn').click(function () {
    let src = activeImageSource.split('/');
    let file = src[src.length - 1];
    let imagePath = 'http://krystalickalaska.cz/img/' + file;
    imgArray.push(imagePath);
    let imgIndex = imgArray.length - 1;
    let imgArrayString = JSON.stringify(imgArray);

    $('.images_urls').attr('value', imgArrayString)
    let newImage = $(`<div class="image-form-container"><span class="btn-close-form"><i class="fa fa-times"></i></span> <img class="image" id="image" src=${activeImageSource} index=${index} alt="Your order"></div>`)
    $('.images_show_urls').append(newImage);
    let btnClose = newImage.find(".btn-close-form")
    btnClose.click(function () {

      imgArray.splice(imgIndex, 1);
      let imgArrayString = JSON.stringify(imgArray);
      $('.images_urls').attr('value', imgArrayString)
      newImage.remove();
    });
    $('.close').click();
  })

  let currentImages = $('#gallery_current img');
  let reservedImages = $('#gallery_reserved img');

  function addEventToImage(elem, galleryId, imageInd) {

    $(elem).click(function () {
      activeGalleryId = galleryId;
      index = imageInd;
      activeImageSource = $(this).attr('src');
      showModal();
    })
  }

  function addEventToCurrentGalleryImage(ind, elem) {
    addEventToImage(elem, 'gallery_current', ind);
  }

  function addEventToReservedGalleryImage(ind, elem) {
    addEventToImage(elem, 'gallery_reserved', ind);
  }


  currentImages.each(addEventToCurrentGalleryImage);
  reservedImages.each(addEventToReservedGalleryImage);
})