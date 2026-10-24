jQuery(document).ready(function () {

  // jw_home_hero_section
  var swiper = new Swiper(".jw_home_hero_section .mySwiper", {
    slidesPerView: 1,
    loop: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
  });
  var mySwiper = new Swiper(".home-slider .swiper-container", {
    direction: "vertical",
    loop: true,
    pagination: {
      el: ".home-slider .jw_swiper-pagination",
      clickable: true,
    },
    grabCursor: true,
    parallax: true,
    effect: "slide",
    mousewheel: true,
    autoplay: {
      delay: 1000,
      disableOnInteraction: false,
    },
  });



  // jw_explore_section
  var swiper = new Swiper(".jw_explore_section .mySwiper", {
    slidesPerView: 1.2,
    spaceBetween: 10,
    loop: true,
    navigation: {
      nextEl: ".jw_explore_section .swiper-button-next",
      prevEl: ".jw_explore_section .swiper-button-prev"
    },
    breakpoints: {
      "576": {
        slidesPerView: 1.5,
        spaceBetween: 20,
      },
      "768": {
        slidesPerView: 2.5,
        spaceBetween: 20,
      },
      "1921": {
        slidesPerView: 3.5,
        spaceBetween: 30,
      },
      "2200": {
        slidesPerView: 4.5,
        spaceBetween: 30,
      },
    },
  });
  var container_width = jQuery('.jw_explore_section .jw_container').css("margin-right");
  jQuery('.jw_explore_wrap').css('width', 'calc(100% + ' + container_width + ')');
  // jw_explore_section


  // jw_shop_stores_section
  var swiper = new Swiper(".jw_shop_stores_section .mySwiper", {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    navigation: {
      nextEl: ".jw_shop_stores_section .swiper-button-next",
      prevEl: ".jw_shop_stores_section .swiper-button-prev"
    },
    breakpoints: {
      "576": {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      "768": {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      "1200": {
        slidesPerView: 4,
        spaceBetween: 30,
      },
    },
  });
  // jw_shop_stores_section


  // jw_blog_section
  var swiper = new Swiper(".jw_blog_section .mySwiper", {
    slidesPerView: 1.2,
    spaceBetween: 10,
    loop: true,
    navigation: {
      nextEl: ".jw_blog_section .swiper-button-next",
      prevEl: ".jw_blog_section .swiper-button-prev"
    },
    breakpoints: {
      "575": {
        slidesPerView: 1.5,
        spaceBetween: 20,
      },
      "767": {
        slidesPerView: 2.5,
        spaceBetween: 20,
      },
      "1921": {
        slidesPerView: 3.5,
        spaceBetween: 30,
      },
      "2200": {
        slidesPerView: 4.5,
        spaceBetween: 30,
      },
    },
  });
  var container_width = jQuery('.jw_blog_section .jw_container').css("margin-right");
  jQuery('.jw_blog_wrap').css('width', 'calc(100% + ' + container_width + ')');
  // jw_blog_section


  // jw_single_product_slider_wrap
  var swiper = new Swiper(".jw_single_product_slider_wrap .mySwiper", {
    spaceBetween: 10,
    slidesPerView: 3,
    freeMode: true,
    watchSlidesProgress: true,
    breakpoints: {
      "575": {
        slidesPerView: 5,
        spaceBetween: 10,
      },
    },
  });
  var swiper2 = new Swiper(".jw_single_product_slider_wrap .mySwiper2", {
    navigation: {
      nextEl: ".jw_single_product_slider_wrap .swiper-button-next",
      prevEl: ".jw_single_product_slider_wrap .swiper-button-prev",
    },
    thumbs: {
      swiper: swiper,
    },
  });
  // jw_single_product_slider_wrap


  // jw_releted_product_section
  var swiper = new Swiper(".jw_releted_product_section .mySwiper", {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    breakpoints: {
      "576": {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      "768": {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      "1200": {
        slidesPerView: 4,
        spaceBetween: 30,
      },
    },
  });
  // jw_releted_product_section



  // jw_features_section
  var swiper = new Swiper(".jw_features_section .mySwiper", {
    slidesPerView: 1.2,
    spaceBetween: 10,
    loop: true,
    navigation: {
      nextEl: ".jw_features_section .swiper-button-next",
      prevEl: ".jw_features_section .swiper-button-prev"
    },
    breakpoints: {
      "320": {
        slidesPerView: 1,
        spaceBetween: 15,
      },
      "576": {
        slidesPerView: 2,
        spaceBetween: 15,
      },
      "768": {
        slidesPerView: 3.5,
        spaceBetween: 24,
      },
      "1560": {
        slidesPerView: 3.5,
        spaceBetween: 24,
      },
      "1921": {
        slidesPerView: 3.5,
        spaceBetween: 24,
      },
      "2200": {
        slidesPerView: 3.5,
        spaceBetween: 24,
      },
    },
  });
  var container_width = jQuery('.jw_features_section .jw_container').css("margin-right");
  jQuery('.jw_features_wrap').css('width', 'calc(100% + ' + container_width + ')');
  // jw_features_section


  // jw_blog_two_section
  var swiper = new Swiper(".jw_blog_two_section .mySwiper", {
    slidesPerView: 1,
    spaceBetween: 10,
    loop: true,
    navigation: {
      nextEl: ".jw_blog_two_section .swiper-button-next",
      prevEl: ".jw_blog_two_section .swiper-button-prev"
    },
    breakpoints: {
      "575": {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      "575": {
        slidesPerView: 1.5,
        spaceBetween: 20,
      },
      "767": {
        slidesPerView: 2.5,
        spaceBetween: 20,
      },
      "1921": {
        slidesPerView: 3.5,
        spaceBetween: 30,
      },
      "2200": {
        slidesPerView: 4.5,
        spaceBetween: 30,
      },
    },
  });
  var container_width = jQuery('.jw_blog_two_section .jw_container').css("margin-right");
  jQuery('.jw_blog_two_wrap').css('width', 'calc(100% + ' + container_width + ')');
  // jw_blog_two_section



  // jw_featured-Product_section
  var swiper = new Swiper(".jw_featured-Product_section .mySwiper", {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    navigation: {
      nextEl: ".jw_featured-Product_section .swiper-button-next",
      prevEl: ".jw_featured-Product_section .swiper-button-prev"
    },
    breakpoints: {
      "576": {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      "768": {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      "1200": {
        slidesPerView: 4,
        spaceBetween: 30,
      },
    },
  });
  // jw_featured-Product_section


  // login_page
  jQuery('.jw_login_page_wrap .jw_login_click').click(function () {
    jQuery('.jw_regisiter_wrap, .jw_forgot_password_wrap, .jw_reset_password_wrap').removeClass('active');
    jQuery('.jw_login_wrap').addClass('active');
  });
  jQuery('.jw_login_page_wrap .jw_register_click').click(function () {
    jQuery('.jw_login_wrap, .jw_forgot_password_wrap, .jw_reset_password_wrap').removeClass('active');
    jQuery('.jw_regisiter_wrap').addClass('active');
  });
  jQuery('.jw_login_page_wrap .jw_forgot_cilck').click(function () {
    jQuery('.jw_login_wrap').removeClass('active');
    jQuery('.jw_forgot_password_wrap').addClass('active');
  });
  jQuery('.jw_login_page_wrap .jw_forgot_password_wrap a.jw_custom_buttom').click(function () {
    jQuery('.jw_forgot_password_wrap').removeClass('active');
    jQuery('.jw_reset_password_wrap').addClass('active');
  });
  // login_page


  // quantity
  jQuery('.plus').click(function () {
    if (jQuery(this).prev().val() < 10) {
      jQuery(this).prev().val(+jQuery(this).prev().val() + 1);
    }
  });
  jQuery('.minus').click(function () {
    if (jQuery(this).next().val() > 0) {
      if (jQuery(this).next().val() > 0) jQuery(this).next().val(+jQuery(this).next().val() - 1);
    }
  });
  // quantity


  // search_wrap
  jQuery(".jw_search_btn a span").click(function () {
    jQuery(".jw_search_wrap, .overlay").slideToggle();
    jQuery("body, .jw_main_body .page").toggleClass('noscroll');
    jQuery(".overlay").toggleClass('overlay_search');
  });
  jQuery(document).on("click", ".jw_search_btn a span", function () {
    var $this = jQuery(this);
    $this.toggleClass('search_icon');
    if ($this.hasClass('search_icon')) {
      $this.text('search');
    }
    else {
      $this.text('close');
    }
  });
  setTimeout(function () {
    jQuery("body").on("click", ".overlay_search", function () {
      jQuery(".jw_search_btn a span").click();
    });
  }, 1000);

  // mobile_search_wrap
  jQuery(".jw_mobile_search_btn a span").click(function () {
    jQuery(".jw_search_wrap, .overlay").slideToggle();
    jQuery("body, .jw_main_body .page").toggleClass('noscroll');
    jQuery(".overlay").toggleClass('overlay_mobile_search');
  });
  jQuery(document).on("click", ".jw_mobile_search_btn a span", function () {
    var $this = jQuery(this);
    $this.toggleClass('mobile_search_icon');
    if ($this.hasClass('mobile_search_icon')) {
      $this.text('search');
    }
    else {
      $this.text('close');
    }
  });
  setTimeout(function () {
    jQuery("body").on("click", ".overlay_mobile_search", function () {
      jQuery(".jw_mobile_search_btn a span").click();
    });
  }, 1000);
  // search_wrap


  // minicart
  jQuery(".jw_cart_btn, .jw_mini_crat_close").click(function () {
    jQuery(".jw_mini_crat_wrap, .overlay").slideToggle();
    jQuery("body, .jw_main_body .page").toggleClass('noscroll');
    jQuery(".overlay").toggleClass('overlay_mini_crat');
  });
  setTimeout(function () {
    jQuery("body").on("click", ".overlay_mini_crat", function () {
      jQuery(".jw_mini_crat_close").click();
    });
  }, 1000);
  // minicart


  jQuery(window).scroll(function () {
    if (jQuery(this).scrollTop() > 0) {
      jQuery('.jw_header').addClass("jw_sticky");
    }
    else {
      jQuery('.jw_header').removeClass("jw_sticky");
    }
  });


  $('.jw_drop_down_wrap').click(function () {
    $('.jw_drop_down_wrap .jw_dropdown_menu').slideToggle();
    $(this).toggleClass("active");
    $(this).find('.jw_dropdown_click').attr('aria-expanded', $(this).hasClass('active') ? 'true' : 'false');
  });


  jQuery('.jw_menu_toggle').click(function () {
    jQuery('.jw_menubar_wrap').addClass('open');
    jQuery(this).attr('aria-expanded', 'true');
  });
  jQuery('.jw_menubar_close').click(function () {
    jQuery('.jw_menubar_wrap').removeClass('open');
    jQuery('.jw_menu_toggle').attr('aria-expanded', 'false');
  });


  jQuery('ul.tabs li').click(function () {
    var tab_id = jQuery(this).attr('data-tab');

    jQuery('ul.tabs li').removeClass('current');
    jQuery('.tab-content').removeClass('current');

    jQuery(this).addClass('current');
    jQuery("#" + tab_id).addClass('current');
  })


  jQuery('.order .wc-order-view a').click(function () {
    jQuery('.order .table-section, .order .order-details').addClass('active');
  });
  jQuery('.account-tab-box .tab-link').click(function () {
    jQuery('.order .table-section, .order .order-details').removeClass('active');
  });


  jQuery('.mobile-menu-icon a.open-menu').click(function () {
    jQuery('.side-bar-content').addClass('active');
  });
  jQuery('.side-bar-close').click(function () {
    jQuery('.side-bar-content').removeClass('active');
  });


  jQuery("body").on("click", ".accordion .accordion-tabs", function () {
    jQuery(".accordion-content").slideUp(),
      jQuery(this).hasClass("acco-active") ? (jQuery(this).next(".accordion-content").slideUp(),
        jQuery(this).removeClass("acco-active")) : (

        jQuery(".accordion .accordion-tabs").removeClass("acco-active"),
        jQuery(this).addClass("acco-active"),
        jQuery(this).next(".accordion-content").slideDown())
  })


  jQuery('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
    disableOn: 700,
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,
    fixedContentPos: false
  });


  if (jQuery(window).width() < 768) {
    jQuery('.contact-wrapper.one h4').click(function () {
      jQuery('.contact-wrapper.one ul').slideToggle();
    });

    jQuery('.contact-wrapper.two h4').click(function () {
      jQuery('.contact-wrapper.two ul').slideToggle();
    });

    jQuery('.contact-wrapper.three h4').click(function () {
      jQuery('.contact-wrapper.three ul').slideToggle();
    });
  }


  jQuery(".jw_checkout_coupon_cord p a").click(function () {
    jQuery(".jw_checkout_coupon_cord input").toggle();
  });


  AOS.init({
    once: true,
  });

  if (jQuery.fn.ripples) {
    jQuery('.jw_ripples, .jw_main_body').ripples({
      resolution: 512,
      dropRadius: 15,
      perturbance: 0.04,
    });
  }



  jQuery(document).on("click", ".jw_account-detail .jw_input_wrap .jw_custom_col span", function () {
    var $this = jQuery(this);
    $this.toggleClass('visibility_icon');
    if ($this.hasClass('visibility_icon')) {
      $this.text('visibility');
    }
    else {
      $this.text('visibility_off');
    }
  });
  $(".jw_account-detail .jw_input_wrap .jw_custom_col span").click(function () {
    if ($("#current_password, #net_password, #confirm_password").attr("type") === "password") {
      $("#current_password, #net_password, #confirm_password").attr("type", "text");
    } else {
      $("#current_password, #net_password, #confirm_password").attr("type", "password");
    }
  });


  jQuery(document).on("click", ".jw_single_product_detail .accordion-tabs span.material-symbols-sharp", function () {
    var $this = jQuery(this);
    $this.toggleClass('accordion_icon');
    if ($this.hasClass('accordion_icon')) {
      $this.text('add');
    } else {
      $this.text('remove');
    }
  });


  jQuery("body").on('click', '.jw_order_details_view', function () {
    jQuery(".jw_order_details").show();
    jQuery(".jw_order .jw_table_wrap").hide();
  });


  jQuery('.jw_checkout_shopping_addres .jw_checkbox input[type="checkbox"]').click(function () {
    jQuery(this).toggleClass("option-checked", this.checked);
    jQuery('.jw_checkbox_address_wrap').slideToggle();
  });


});



$(document).ready(function () {

  const lerp = (a, b, n) => (1 - n) * a + n * b;
  const body = document.body;
  const getMousePos = (e) => {
    let posx = 0;
    let posy = 0;
    if (!e) e = window.event;
    if (e.pageX || e.pageY) {
      posx = e.pageX;
      posy = e.pageY;
    }
    else if (e.clientX || e.clientY) {
      posx = e.clientX + body.scrollLeft + document.documentElement.scrollLeft;
      posy = e.clientY + body.scrollTop + document.documentElement.scrollTop;
    }
    return { x: posx, y: posy }
  }

  class Cursor {
    constructor(el) {
      this.DOM = { el: el };
      this.DOM.dot = this.DOM.el.querySelector('.cursor__inner--dot');
      this.DOM.circle = this.DOM.el.querySelector('.cursor__inner--circle');
      this.bounds = { dot: this.DOM.dot.getBoundingClientRect(), circle: this.DOM.circle.getBoundingClientRect() };
      this.scale = 1;
      this.opacity = 1;
      this.mousePos = { x: 0, y: 0 };
      this.lastMousePos = { dot: { x: 0, y: 0 }, circle: { x: 0, y: 0 } };
      this.lastScale = 1;

      this.initEvents();
      requestAnimationFrame(() => this.render());
    }
    initEvents() {
      window.addEventListener('mousemove', ev => this.mousePos = getMousePos(ev));
    }
    render() {
      this.lastMousePos.dot.x = lerp(this.lastMousePos.dot.x, this.mousePos.x - this.bounds.dot.width / 2, 1);
      this.lastMousePos.dot.y = lerp(this.lastMousePos.dot.y, this.mousePos.y - this.bounds.dot.height / 2, 1);
      this.lastMousePos.circle.x = lerp(this.lastMousePos.circle.x, this.mousePos.x - this.bounds.circle.width / 2, 0.15);
      this.lastMousePos.circle.y = lerp(this.lastMousePos.circle.y, this.mousePos.y - this.bounds.circle.height / 2, 0.15);
      this.lastScale = lerp(this.lastScale, this.scale, 0.15);
      this.DOM.dot.style.transform = `translateX(${(this.lastMousePos.dot.x)}px) translateY(${this.lastMousePos.dot.y}px)`;
      this.DOM.circle.style.transform = `translateX(${(this.lastMousePos.circle.x)}px) translateY(${this.lastMousePos.circle.y}px) scale(${this.lastScale})`;
      requestAnimationFrame(() => this.render());
    }
    enter() {
      this.scale = 1.5;
      this.DOM.dot.style.display = 'none';
    }
    leave() {
      this.scale = 1;
      this.DOM.dot.style.display = '';
    }
  }

  const cursor = new Cursor(document.querySelector(".cursor"));

  // jQuery(".jw_data_title").hover( function(e){
  //    var mX = e.pageX + 'px';
  //    var mY = e.pageY + 'px';
  //    document.getElementsByClassName('cursor')[0].style.transform = 'translate3d(' + mX + ',' + mY  + ',' +  '0px)';
  //  });

  jQuery(".jw_data_title").hover(
    function () {
      var data = jQuery(this).attr('data-title');
      jQuery(".cursor span").text(data).show();
    },
    function () {
      var data = jQuery(this).attr('data-title');
      jQuery(".cursor span").text(data).hide();
    }
  );






});






