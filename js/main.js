$(function() {
   $.getJSON('js/json/daniel_11.json', function(data) {
      var $menu = $('.menu');
      $menu.append("<h3 id='bibleBookChapter'>" + data.book + ' ' + data.chapter + "</h3>");
      $menu.append("<li id='link-outline'><a href='#outline'><span class='fa fa-bars'></span> OUTLINE</a></li><br>");
      for (var i = 0; i < data.verses.length + 1; i++) {
         var link = "<li><a href='#verse-group-" + data.verses[i].num + "'>" + data.verses[i].num + "</a></li>";
         $menu.append(link);
         if ((i + 1) % 5 === 0) {
            $menu.append("<br>");
         }
      }

      var $ChapterText = $('#chapter-text');
      $ChapterText.append('hello world');
   });


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

   // move king into place and fade in
   new ScrollMagic.Scene({
      triggerElement: "#verse-group-5",
      offset: 200
   })
   .setTween("#ks_1", {alpha: 1, y: 200, x: 400})
   .addTo(ctrl);

   // hide king
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