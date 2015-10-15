$(function() {
   var json = $.getJSON('js/json/daniel_11.json');
   // var json = $.getJSON('js/json/1_timothy_3.json');
   json.done(function(data){
      var $menu = $('.menu');
      $menu.append("<h3 id='bibleBookChapter'>" + data.book + ' ' + data.chapter + "</h3>");
      $menu.append("<li id='link-outline'><a href='#outline'><span class='fa fa-bars'></span> OUTLINE</a></li><br>");
      var $ChapterText = $('#chapter-text');
      var $Outline = $('#outline');
      for (var i = 0; i < data.outline.length; i++) {
         var outlineLine = createOutlineLink(data.outline[i].start, data.outline[i].end, data.outline[i].text);
         $Outline.append(outlineLine);
         for (var j = 0; j < data.outline[i].subtext.length; j++) {
            var outlineLine = createOutlineLink(data.outline[i].subtext[j].start, data.outline[i].subtext[j].end, data.outline[i].subtext[j].text, true);
            $Outline.append(outlineLine);
         }
      }

      for (var i = 0; i < data.verses.length; i++) {
         var link = "<li><a href='#verse-group-" + data.verses[i].num + "'>" + data.verses[i].num + "</a></li>";
         $menu.append(link);
         if ((i + 1) % 5 === 0) {
            $menu.append("<br>");
         }

         var verseBody = "<div id='verse-group-" + data.verses[i].num + "' class='verse-group'><div><div><div class='verse-num'>" + data.verses[i].num + "</div>" + data.verses[i].text + "</div></div></div>";
         $ChapterText.append(verseBody);
      }

      $ChapterText.append("<div id='end' class='verse-group'><div><div><h1 style='text-align: center; font-size:150px;'>THE END</h1></div></div></div>");

      setTimeout(loadAnimations, 2000);
   });

   function createOutlineLink(start, end, text, blIsSubtext) {
      var para = (blIsSubtext) ? 'para' : '';
      var link = (start === end) ? start : start + '-' + end;
      var outlineDIV = "<div class='" + para + "'>" + text + " <a href='#verse-group-" + start +  "'>(" + link + ")</a></div>";
      return outlineDIV;
   }


   function loadAnimations() {
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
   }

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