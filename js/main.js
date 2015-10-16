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

         var verseBody = "<div id='trigger_" + data.verses[i].num + "'></div><div id='verse-group-" + data.verses[i].num + "' class='verse-group'><div><div><div class='verse-num'>" + data.verses[i].num + "</div>" + data.verses[i].text + "</div></div></div>";
         $ChapterText.append(verseBody);
      }

      $ChapterText.append("<div id='end' class='verse-group'><div><div><h1 style='text-align: center; font-size:150px;'>THE END</h1></div></div></div>");

      setTimeout(loadAnimations, 1000);
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

         // move timeline dot across timeline
         var _fadein = new TimelineMax().to(element, 1, { alpha: 1 });
         var _timedot = new TimelineMax().to("#time-dot", 1, { x: i * ($(window).width()/56) });

         // pin verse to top of screen
         new ScrollMagic.Scene({
            triggerElement: '#trigger_' + i,//element,
            duration: 3000,
            offset: 450
         })
         .setPin(element)
         .addIndicators({ name: "PIN"})
         .addTo(ctrl);

         // make verse visible
         new ScrollMagic.Scene({
            triggerElement: element,
            duration: 500,
            offset: 220
         })
         .setTween(_fadein)
         .addIndicators({ name: "fade"})
         .addTo(ctrl);

         // move dot
         new ScrollMagic.Scene({
            triggerElement: element,
            duration: 400,
            offset: 400
         })
         .setTween(_timedot)
         .addIndicators({ name: "dot"})
         .addTo(ctrl);
      }

      var trigger = '#trigger_5';

      // underline a descriptive text
      new ScrollMagic.Scene({
         triggerElement: trigger,
         offset: 700
      })
      .setClassToggle("#verse-desc-5-1", "underline")
      .addIndicators({ name: "underline"})
      .addTo(ctrl);

      // move king into place and fade in
      new ScrollMagic.Scene({
         triggerElement: trigger,
         offset: 500
      })
      .setTween("#ks_1", {alpha: 1, y: 200, x: 400})
      .addIndicators({ name: "kingPic"})
      .addTo(ctrl);

      // hide king
      new ScrollMagic.Scene({
         triggerElement: trigger,
         offset: 2500
      })
      .setTween("#ks_1", {alpha: 0})
      .addIndicators({ name: "hideKing"})
      .addTo(ctrl);
   }
});