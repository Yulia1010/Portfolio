$(function () {

  let intro = $("#intro");
  let header = $("#header");
  let introH = intro.innerHeight();
  let headerH = header.innerHeight();
  let scrollTop = $(window).scrollTop();
  const worksSlider = $('[data-slider="slick"]');


  /* Header class on scroll
     =====================================*/

  headerScroll();

  $(window).on("scroll  resize", function () {
    headerScroll();
  });

  function headerScroll() {
    introH = intro.innerHeight();
    headerH = header.innerHeight();

    let scrollTop = $(this).scrollTop();

    if (scrollTop >= (introH - headerH)) {
      header.addClass("header--dark");
    } else {
      header.removeClass("header--dark");
    }
  }



  /* Smooth Scroll to sections
  =====================================*/

  $("[data-scroll]").on("click", function (event) {
    event.preventDefault();

    let scrollEl = $(this).data("scroll");
    let scrollElPos = $(scrollEl).offset().top;

    $("html, body").animate({
      scrollTop: scrollElPos - headerH
    }, 500)
  });




  /* ScrollSpy
  =====================================*/
  let windowH = $(window).height();
  scrollSpy(scrollTop);

  $(window).on("scroll", function () {
    scrollTop = $(this).scrollTop();
    scrollSpy(scrollTop);
  });

  function scrollSpy(scrollTop) {
    $("[data-scrollspy]").each(function () {
      let $this = $(this);
      let sectionId = $this.data('scrollspy');
      let sectionOffset = $this.offset().top;
      sectionOffset = sectionOffset - (windowH * 0.33333);

      if (scrollTop >= sectionOffset) {
        $('#nav [data-scroll]').removeClass('active');
        $('#nav [data-scroll="' + sectionId + '"]').addClass('active');
      }

      if (scrollTop == 0) {
        $('#nav [data-scroll]').removeClass('active');
      }
    });
  }

  /* Mobile nav
    ==================*/

  const navToggle = $("#navToggle");
  const nav = $("#nav");

  navToggle.on("click", function (event) {
    event.preventDefault();

    nav.toggleClass("show");
  });



  /* Filter
  ====================== */
  let filter = $("[data-filter]");

  filter.on("click",function(event) {
    event.preventDefault();

    let cat = $(this).data('filter');

    if(cat == 'all') {
      $("[data-cat]").removeClass("hide")
    } else {
      $("[data-cat]").each(function () {

        let workCat = $(this).data('cat');

        if (workCat != cat) {
          $(this).addClass('hide');
        } else {
          $(this).removeClass('hide')
        }

      });
    }
  });


  /* Modal
  ====================== */

  const modalCall = $("[data-modal]");
  const modalClose = $("[data-close]");

  modalCall.on("click", function (event) {
    event.preventDefault();

    let $this = $(this);
    let modalId = $this.data('modal');

    $(modalId).addClass('show');
    $("body").addClass('no-scroll');

    setTimeout(function() {
      $(modalId).find(".modal__dialog").css({
        transform: "rotateX(0)"
      });
    }, 200);

    worksSlider.slick('setPosition');

  });


    modalClose.on("click", function (event) {
      event.preventDefault();

      let $this = $(this);
      let modalParent = $this.parents('.modal');

      modalParent.find(".modal__dialog").css({
        transform: "rotateX(90deg)"
      });

      setTimeout(function () {
        modalParent.removeClass('show');
        $("body").removeClass('no-scroll');
      }, 200);

    });


    $(".modal").on("click", function (event) {
      let $this = $(this);

      $this.find(".modal__dialog").css({
        transform: "rotateX(90deg)"
      });

      setTimeout(function () {
        $this.removeClass('show');
        $("body").removeClass('no-scroll');
      }, 200);
    });

    $(".modal__dialog").on("click", function (event) {
      event.stopPropagation();
    });


  /* Slider:  https://kenwheeler.github.io/slick/
  ====================== */

  worksSlider.slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    arrows: false,
    dots: true
  });


  $(".slickPrev").on("click", function (event) {
    event.preventDefault();

    let currentSlider = $(this).parents(".modal").find('[data-slider="slick"]');

    currentSlider.slick("slickPrev");
  });

  $(".slickNext").on("click", function (event) {
    event.preventDefault();

    let currentSlider = $(this).parents(".modal").find('[data-slider="slick"]');

    currentSlider.slick("slickNext");
  });

});
