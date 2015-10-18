$(function() {
   var ctrl = new ScrollMagic.Controller();
   var tween = new TimelineMax()
      .staggerFromTo(".circle", 2, {
         alpha: 0,
         x: "0"
      },{
         alpha: 1,
         x: "+=460",
         ease: Back.easeOut
      }, 0.15);
   var scene = new ScrollMagic.Scene({
      triggerElement: "#trigger_1",
      duration: 300
   })
   .setTween(tween)
   .addIndicators({name:"South 1"})
   .addTo(ctrl);

   var scene = new ScrollMagic.Scene({
      triggerElement: "#trigger_1",
      offset: 500,
      duration: 1000
   })
   .setPin("#circles")
   .addIndicators({name: "king pin"})
   .addTo(ctrl);

   var tween = new TimelineMax()
      .to("#c1", 1, {
         width: "10px",
         height: "10px",
         alpha: 0,
         ease: Back.easeOut
      });
   var scene = new ScrollMagic.Scene({
      triggerElement: "#trigger_2",
      offset: -600
   })
   .setTween(tween)
   .addIndicators("enlargen")
   .addTo(ctrl);
   var tween = new TimelineMax()
      .to("#c4", 1, {
         width: "10px",
         height: "10px",
         alpha: 0,
         ease: Back.easeOut
      });
   var scene = new ScrollMagic.Scene({
      triggerElement: "#trigger_2",
      offset: -600
   })
   .setTween(tween)
   .addIndicators("enlargen")
   .addTo(ctrl);

   var tween = new TimelineMax()
      .to("#c2 .king_pic", 1, {
         width: "150px",
         height: "150px"
      });
   var scene = new ScrollMagic.Scene({
      triggerElement: "#trigger_2",
      offset: -600
   })
   .setTween(tween)
   .addIndicators("enlargen")
   .addTo(ctrl);

   var tween = new TimelineMax()
      .to("#c3 .king_pic", 1, {
         width: "150px",
         height: "150px"
      });
   var scene = new ScrollMagic.Scene({
      triggerElement: "#trigger_2",
      offset: -600
   })
   .setTween(tween)
   .addIndicators("enlargen")
   .addTo(ctrl);

   var tween = new TimelineMax()
      .to("#title", 1, {
         ease: Back.easeOut,
         onStart: function () {$('#title').html("TWO KINGS");},
         onReverseComplete: function () {$('#title').html("FOUR KINGS");}
      });
   var scene = new ScrollMagic.Scene({
      triggerElement: "#trigger_2",
      offset: -600
   })
   .setTween(tween)
   .addTo(ctrl);
});