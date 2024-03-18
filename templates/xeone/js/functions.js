//LOADER
jQuery(window).on("load", function () {
   "use strict";
   jQuery(".loader").fadeOut(800);

});


jQuery(function ($) {
   "use strict";
   var $window = $(window);
   var windowsize = $(window).width();
   var $root = $("html, body");
   var $this = $(this);
 /* -----
   $(document).on('contextmenu', function() {
     return false;
   });
 ----- */


$('.icon-angle-double-left').html('<i class="fa fa-angle-double-left"></i>');
	$('.icon-angle-left').html('<i class="fa fa-angle-left"></i>');
	$('.icon-angle-right').html('<i class="fa fa-angle-right"></i>');
	$('.icon-angle-double-right').html('<i class="fa fa-angle-double-right"></i>');

   /* ----- Back to Top ----- */
   $("body").append('<a href="#" class="back-top"><i class="fa fa-angle-up"></i></a>');
   var amountScrolled = 700;
   var backBtn = $("a.back-top");
   $window.on("scroll", function () {
      if ($window.scrollTop() > amountScrolled) {
         backBtn.addClass("back-top-visible");
      } else {
         backBtn.removeClass("back-top-visible");
      }
   });
   backBtn.on("click", function () {
      $root.animate({
         scrollTop: 0
      }, 700);
      return false;
   });

   
   if($(".just-sidemenu").length){
      var anchor_point = $(".rotating-words").height();
      var side_toggle = $(".just-sidemenu #sidemenu_toggle");
      side_toggle.addClass("toggle_white");
      $window.on("scroll", function () {
      if ($window.scrollTop() >= anchor_point) {
         side_toggle.removeClass("toggle_white");
      } else {
         side_toggle.addClass("toggle_white");
      }
   });
   }
   


   /*----- Menu On click -----*/
    if ($("#sidemenu_toggle").length) {
       $("body").addClass("pushwrap");
       $("#sidemenu_toggle").on("click", function () {
          $(".pushwrap").toggleClass("active");
          $(".side-menu").addClass("side-menu-active"), $("#close_side_menu").fadeIn(700)
       }), $("#close_side_menu").on("click", function () {
          $(".side-menu").removeClass("side-menu-active"), $(this).fadeOut(200), $(".pushwrap").removeClass("active")
       }), $("#btn_sideNavClose").on("click", function () {
          $(".side-menu").removeClass("side-menu-active"), $("#close_side_menu").fadeOut(200), $(".pushwrap").removeClass("active")
       });
    }
   

   /* ------- Smooth scroll ------- */
   $("a.pagescroll").on("click", function (event) {
      event.preventDefault();
      $("html,body").animate({
         scrollTop: $(this.hash).offset().top
      }, 1200);
   });
    /*hide menu on mobile click*/
   $(".navbar-nav>li>a").on("click", function(){
    $(".navbar-collapse").collapse("hide");
   });
   
   /*$(".dl-menu >.menu-item >a").on("click", function(){
    $(".pushmenu-right").collapse("hide");
   });*/
   

   
   /*------ MENU Fixed ------*/
   if ($("nav.navbar").hasClass("static-nav")) {
      $window.scroll(function () {
         var $scroll = $window.scrollTop();
         var $navbar = $(".static-nav");
         if ($scroll > 200) {
            $navbar.addClass("fixedmenu");
         } else {
            $navbar.removeClass("fixedmenu");
         }
      });
   }
   
   /*bottom menu fix*/
   if ($("nav.navbar").hasClass("fixed-bottom")) {
      var navHeight = $(".fixed-bottom").offset().top;
      $window.scroll(function () {
         if ($window.scrollTop() > navHeight) {
            $('.fixed-bottom').addClass('fixedmenu');
         } else {
            $('.fixed-bottom').removeClass('fixedmenu');
         }
      });
   }

    

   /* ----- Full Screen ----- */
   function resizebanner() {
      var $fullscreen = $(".full-screen");
      $fullscreen.css("height", $window.height());
      $fullscreen.css("width", $window.width());
   }
   resizebanner();
   $window.resize(function () {
      resizebanner();
   });
   
   
    /*----- Replace Images on Mobile -----*/
   fiximBlocks();
   porfoliofix();
   $window.resize(function () {
      fiximBlocks();
      porfoliofix();
   });

   function fiximBlocks() {
      if (windowsize < 993) {
         $(".half-section").each(function () {
            $(".img-container", this).insertAfter($(".split-box > .heading-title h2", this));
         });
      }
   }

   function porfoliofix() {
      if (windowsize < 768) {
            $("#portfolio_top .cbp-item:nth-child(2)", this).insertBefore($("#portfolio_top .cbp-item:nth-child(1)", this));
      }
   }
    
   /* -------- SKILL BARS -------- */
   //For Skills Bar on Different Pages
   $('.progress').each(function () {
      $(this).appear(function () {
         $(this).animate({opacity:1,left:"0px"},800);  
         var b = jQuery(this).find(".progress-bar").attr("data-value");
         $(this).find(".progress-bar").animate({
            width: b + "%"
         }, 500);
      });
   });


   /* --------Equal Heights -------- */
   checheight();
   $window.on("resize", function () {
      checheight();
   });

   function checheight() {
      var $smae_height = $(".equalheight");
      if ($smae_height.length) {
         if (windowsize > 767) {
            $smae_height.matchHeight({
               property: "height",
            });
         }
      }
   }
   

   /* -------BG Video banner -------*/
   $(function () {
      if ($(".my-background-video").length) {
         $('.my-background-video').bgVideo();
      }
   });
   

   /* ------ OWL Slider ------ */
   /*Partners / LOgo*/
   $("#partners-slider").owlCarousel({
      items: 5,
      autoplay: 1500,
      smartSpeed: 1500,
      autoplayHoverPause: true,
      slideBy: 1,
      loop: true,
      margin: 30,
      dots: false,
      nav: false,
      responsive: {
         1200: {
            items: 5,
         },
         900: {
            items: 4,
         },
         768: {
            items: 3,
         },
         480: {
            items: 2,
         },
         320: {
            items: 1,
         },
      }
   });

   
   /*Testimonials 3columns*/
   $("#testimonial-slider").owlCarousel({
      items: 3,
      autoplay: 2500,
      autoplayHoverPause: true,
      loop: true,
      margin: 30,
      dots: true,
      nav: false,
      responsive: {
         1280: {
            items: 3,
         },
         600: {
            items: 2,
         },
         320: {
            items: 1,
         },
      }
   });
   
   /*Testimonial one slide fade*/
   $("#testimonial-quote").owlCarousel({
      items: 1,
      autoplay: 2500,
      autoplayHoverPause: true,
      mouseDrag: false,
      loop: true,
      margin: 30,
      dots: true,
      dotsContainer: "#owl-thumbs", 
      nav: false,
      animateIn: "fadeIn",
      animateOut: "fadeOut",
      responsive: {
         1280: {
            items: 1,
         },
         600: {
            items: 1,
         },
         320: {
            items: 1,
         },
      }
   });
   
   $("#testimonial-quote-nav").owlCarousel({
      items: 1,
      autoplay: 2500,
      autoplayHoverPause: true,
      mouseDrag: false,
      loop: true,
      margin: 30,
      animateIn: "fadeIn",
      animateOut: "fadeOut",
      dots: true,
      dotsContainer: "#owl-thumbs", 
      nav: true,
      navText: ["<i class='fa fa-arrow-left'></i>", "<i class='fa fa-arrow-right'></i>"],
      responsive: {
         1280: {
            items: 1,
         },
         600: {
            items: 1,
         },
         320: {
            items: 1,
         },
      }
   });
   

   /*Our Team*/
   $("#ourteam-slider").owlCarousel({
      items: 3,
      margin: 30,
      dots: false,
      nav: false,
      responsive: {
         1280: {
            items: 3,
         },
         600: {
            items: 2,
         },
         320: {
            items: 1,
         },
      }
   });

   /*Simple text fadng banner*/
   $("#text-fading").owlCarousel({
      items: 1,
      autoplay: true,
      autoplayHoverPause: true,
      loop: true,
      mouseDrag: false,
      animateIn: "fadeIn",
      animateOut: "fadeOut",
      dots: true,
      nav: false,
      responsive: {
         0: {
            items: 1
         }
      }
   });
   
   
   /*Services Box Slider*/
   $("#services-slider").owlCarousel({
      autoplay: true,
      autoplayTimeout: 3000,
      autoplayHoverPause: true,
      smartSpeed: 1200,
      loop: true,
      nav: false,
      navText: false,
      dots: false,
      mouseDrag: true,
      touchDrag: true,
      center: true,
      responsive: {
         0: {
            items: 1
         },
         640: {
            items: 3
         }
      }
   });
   

   /* ----------- Counters ---------- */
   $(".value_formatter").data("countToOptions", {
      formatter: function (value, options) {
         return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
      }
   });
   $(".counters").appear(function () {
      $(".count_nums").each(count);
   });

   function count(options) {
      var $this = $(this);
      options = $.extend({}, options || {}, $this.data("countToOptions") || {});
      $this.countTo(options);
   }


   /* ---------- Parallax Backgrounds ---------- */
   if (windowsize > 992) {
      $(".parallaxie").parallaxie({
         speed: 0.55,
         offset: 0,
      });
   }


   /* ------ CubePortfolio ------ */
   /*main gallery*/
   $("#portfolio-measonry").cubeportfolio({
      filters: '#measonry-filters',
      loadMoreAction: 'click',
      layoutMode: 'grid',
      defaultFilter: '*',
      animationType: "scaleSides",
      gapHorizontal: 30,
      gapVertical: 30,
      gridAdjustment: "responsive",
      mediaQueries: [{
         width: 1500,
         cols: 2
          }, {
         width: 1100,
         cols: 2
          }, {
         width: 768,
         cols: 2
          }, {
         width: 480,
         cols: 1
          }, {
         width: 320,
         cols: 1
          }],
   });

   /*Blog Measonry*/
   $("#blog-measonry").cubeportfolio({
      layoutMode: 'grid',
      defaultFilter: '*',
      animationType: "scaleSides",
      gapHorizontal: 30,
      gapVertical: 30,
      gridAdjustment: "responsive",
      mediaQueries: [{
         width: 1500,
         cols: 3
          }, {
         width: 1100,
         cols: 3
          }, {
         width: 992,
         cols: 3
          }, {
         width: 768,
         cols: 3
          }, {
         width: 480,
         cols: 1
          },{
         width: 320,
         cols: 1
          }],
   });
   
   /*Flat three columns*/
   $("#flat-gallery").cubeportfolio({
      layoutMode: 'grid',
      filters: '#flat-filters',
      defaultFilter: '*',
      animationType: "quicksand",
      gapHorizontal: 30,
      gapVertical: 30,
      gridAdjustment: "responsive",
      mediaQueries: [{
         width: 1500,
         cols: 3
          }, {
         width: 1100,
         cols: 3
          }, {
         width: 768,
         cols: 2
          }, {
         width: 480,
         cols: 1
          },{
         width: 320,
         cols: 1
          }],
   });
   
   
   /*----- Type Writter Effect -----*/
   if ($("#typewriting").length) {
      var app = document.getElementById("typewriting");
      var typewriter = new Typewriter(app, {
         loop: true
      });
      typewriter.typeString('Educator').pauseFor(2000).deleteAll()
         .typeString('Friend').start();
   }
   
   
   /*----- FancyBox -----*/
   $('[data-fancybox]').fancybox({
      protect: true,
      animationEffect: "fade",
      hash: null,
   });

  
   
   /* Initializing Particles */
   if ($("#particles-js").length) {
      window.onload = function () {
         Particles.init({
            selector: '#particles-js',
            color: '#ffffff',
            connectParticles: false,
            sizeVariations: 14,
            maxParticles: 140,
         });
      };
   }
   
   /*Wow Animations*/
   if ($(".wow").length) {
      var wow = new WOW({
         boxClass: 'wow',
         animateClass: 'animated',
         offset: 0,
         mobile: false,
         live: true
      });
      new WOW().init();
   }
   

});

/*
jQuery(function () {
   jQuery("#bgndVideo").vimeo_player();
});
*/





