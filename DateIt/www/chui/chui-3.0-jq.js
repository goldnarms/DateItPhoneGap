/*
    pO\     
   6  /\
     /OO\
    /OOOO\
  /OOOOOOOO\
 ((OOOOOOOO))
  \:~=++=~:/    
 
ChocolateChip-UI
ChUI.ios.js
Copyright 2013 Sourcebits www.sourcebits.com
License: BSD
Version: 3.0
*/

var whichJavaScriptLibrary = window.$chocolatechip || window.jQuery;
(function($) {
   'use strict';
   $.fn.extend({
     Each : function ( fn, ctx ) {
         if (!this.length) return [];
         if (typeof fn !== "function") { return; }
         var i; 
         var l = this.length;
         ctx = arguments[1];
         for (i = 0; i < l; i++) {
            if (i in this) {
               fn.call(ctx, this[i], i, this);
            }
         }
         return this;
      }
   });
   
})(whichJavaScriptLibrary);