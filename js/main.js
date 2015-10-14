$(function() {
   var ctrl = new ScrollMagic.Controller();

   for (i = 1; i < 46; i++) {
      var element = "#verse-group-" + i;

      // pin verse to top of screen
      new ScrollMagic.Scene({
         triggerElement: element,
         duration: 3000,
         offset: 300
      })
      .setPin(element)
      .addTo(ctrl);

      // make verse visible
      new ScrollMagic.Scene({
         triggerElement: element,
         duration: 500,
         offset: 200
      })
      .setTween(element, {alpha: 1})
      .addTo(ctrl);

      // move timeline dot across timeline
      new ScrollMagic.Scene({
         triggerElement: element,
         duration: 500,
         offset: 200
      })
      .setTween("#time-dot", {x: i * ($(window).width()/56)})
      .addTo(ctrl);

      // underline a descriptive text
      element = "#verse-desc-1-" + i;
      new ScrollMagic.Scene({
         triggerElement: element,
         duration: 500,
         offset: 400
      })
      .setClassToggle(element, "underline")
      .addTo(ctrl);
   }

   new ScrollMagic.Scene({
      triggerElement: "#verse-group-5",
      offset: 200
   })
   .setTween("#ks_1", {alpha: 1, y: 200, x: 400})
   .addTo(ctrl);

   new ScrollMagic.Scene({
      triggerElement: "#verse-group-6"
   })
   .setTween("#ks_1", {alpha: 0})
   .addTo(ctrl);

   $('a[href*=#]:not([href=#])').click(function() {
      if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
         var target = $(this.hash);
         target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
         if (target.length) {
            $('html,body').animate({
               scrollTop: target.offset().top
            }, 500);
            window.location.hash = this.hash;
            return false;
         }
      }
   });
});