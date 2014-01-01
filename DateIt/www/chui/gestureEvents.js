//////////////////////////////////////////////////////
// Swipe Gestures for ChocolateChip, jQuery and Zepto:
//////////////////////////////////////////////////////
/*
// Provides the following events:
tap,
singletap,
doubletap,
longTap (tap and hold),
swipe,
swipeleft,
swiperight,
swipeup,
swipedown

Use these events like normal events:

$('.link').on('longTap', function() {
   alert('You are hold on top of ' + $(this).attr('href'));
});
$('.panel').on('swipeleft', function() {
   $(this).css({'background-color': 'red'});
});
$('.panel').on('swiperight', function() {
   $(this).css({'background-color': 'yellow'});
});

*/
(function(){
   var _cc = window.$chocolatechip;
   var _jq = window.jQuery;
   var _zo = window.Zepto;
      
   var touch = {};
   var touchTimeout;
   var swipeTimeout;
   var tapTimeout;
   var longTapDelay = 750;
   var longTapTimeout;
   
   function parentIfText(node) {
      return 'tagName' in node ? node : node.parentNode;
   }

   function swipeDirection(x1, x2, y1, y2) {
      var xDelta = Math.abs(x1 - x2), yDelta = Math.abs(y1 - y2);
      return xDelta >= yDelta ? (x1 - x2 > 0 ? 'left' : 'right') : (y1 - y2 > 0 ? 'up' : 'down');
   }

   function longTap() {
      longTapTimeout = null;
      if (touch.last) {
         try {
            touch.el.trigger('longtap');
            touch = {};
         } catch(err) { }
      }
   }

   function cancelLongTap() {
      if (longTapTimeout) clearTimeout(longTapTimeout);
      longTapTimeout = null;
   }

   function cancelAll() {
      if (touchTimeout) clearTimeout(touchTimeout);
      if (tapTimeout) clearTimeout(tapTimeout);
      if (swipeTimeout) clearTimeout(swipeTimeout);
      if (longTapTimeout) clearTimeout(longTapTimeout);
      touchTimeout = tapTimeout = swipeTimeout = longTapTimeout = null;
      touch = {};
   }

   $(document).ready(function(){
      var now;
      var delta;
      var body = $(document.body);
      var twoTouches = false;
      body.on('touchstart', function(e){
         now = Date.now();
         delta = now - (touch.last || now);
         if (_jq) {
            // Event object for jQuery:
            touch.el = $(parentIfText(e.originalEvent.touches[0].target)); 
            touchTimeout && clearTimeout(touchTimeout);
            touch.x1 = e.originalEvent.touches[0].pageX;
            touch.y1 = e.originalEvent.touches[0].pageY;
         } else {
            // Mulit-finger gesture:
            if (e.touches.length == 2) { 
               console.log('two fingers'); 
               
            // One finger touch:
            } else {
               // Event object for ChocolateChip and Zepto:
               touch.el = $(parentIfText(e.touches[0].target));
               touchTimeout && clearTimeout(touchTimeout);
               touch.x1 = e.touches[0].pageX;
               touch.y1 = e.touches[0].pageY;
               if (e.targetTouches.length == 2) {
                  twoTouches = true;
               } else {
                  twoTouches = false;
               }
            }
         }
         if (delta > 0 && delta <= 250) {
            touch.isDoubleTap = true;
         }
         touch.last = now;
         longTapTimeout = setTimeout(longTap, longTapDelay);
      });
      body.on('touchmove', function(e){
         cancelLongTap();
         
         // One finger gesture:
         if (e.touches.length == 1) { 
            if (_jq) {
               // Event object for jQuery:
               touch.x2 = e.originalEvent.touches[0].pageX;
               touch.y2 = e.originalEvent.touches[0].pageY;
            } else {
               // Event object for ChocolateChip and Zepto:
               touch.x2 = e.touches[0].pageX;
               touch.y2 = e.touches[0].pageY;
            
            }
         }
      });
      body.on('touchend', function(e){
         cancelLongTap();
         if (!!touch.el) {
         // Swipe detection:
         if ((touch.x2 && Math.abs(touch.x1 - touch.x2) > 30) ||
         (touch.y2 && Math.abs(touch.y1 - touch.y2) > 30))  {
            swipeTimeout = setTimeout(function() {
               touch.el.trigger('swipe');
               touch.el.trigger('swipe' + (swipeDirection(touch.x1, touch.x2, touch.y1, touch.y2)));
               touch = {};
            }, 0);

         // Normal tap:
         } else if ('last' in touch) {

            // Delay by one tick so we can cancel the 'tap' event if 'scroll' fires:
            tapTimeout = setTimeout(function() {

               // Trigger universal 'tap' with the option to cancelTouch():
               touch.el.trigger('tap');

               // Trigger double tap immediately:
               if (touch.isDoubleTap) {
                  touch.el.trigger('doubletap');
                  touch = {};
               } else {
                  // Trigger single tap after 250ms of inactivity:
                  touchTimeout = setTimeout(function(){
                     touchTimeout = null;
                     touch.el.trigger('singletap');
                     touch = {};
                     return false;
                  }, 250);
               }

            }, 0);
         }
         } else { return; }
      });
      body.on('touchcancel', cancelAll);
   });

   ['swipe', 'swipeleft', 'swiperight', 'swipeup', 'swipedown', 'doubletap', 'tap', 'singletap', 'longtap'].forEach(function(m){
      if (_cc) {
         // Add gesture events to ChocolateChip:
         $.extend(HTMLElement.prototype,  {
            m : function(callback) { 
               return this.on(m, callback);
            }
         });      
      } else {
         // Add gesture events to Zepto and jQuery:
         $.fn[m] = function(callback){ return this.bind(m, callback); }
      }
   });
})();