

// ACCORDION.js
// Requires jquery.js and velocity.js (optional but recommended).
// Copy the below function, add to your JS, and simply add a list <ul class=ACCORDION> ... </ul>
;(function ($, window, document, undefined) {
  
  // Only apply if ACCORDION list exists
  if($('ul.ACCORDION').length) { 
  
    
  // Settings
  var collapsed = true; // Start with collapsed menu (only level 1 items visible)
  var close_same_level = false; // Close elements on same level when opening new node.
  var duration = 400; // Animation duration should be tweaked according to easing.
  var listAnim = true; // Animate separate list items on open/close element (velocity.js only).
  var easing = 'easeOutQuart'; // Velocity.js only, defaults to 'swing' with jquery animation.
    
  
  // Set initial styles 
  $('.ACCORDION ul').css({'overflow':'hidden', 'height': (collapsed) ? 0 : 'auto', 'display': (collapsed) ? 'none' : 'block' });
  
  // Get node elements, and add classes for styling
  var node = $('.ACCORDION li:has(ul)');  
  node.each(function(index, val) {
    $(this).children(':first-child').css('cursor', 'pointer')
    $(this).addClass('ACCORDION-node ACCORDION-' + ((collapsed) ? 'closed' : 'open'));
    $(this).children('ul').addClass('ACCORDION-level-' + ($(this).parentsUntil($('ul.ACCORDION'), 'ul').length + 1));
  });
  
  // Set ACCORDION-active class on list items for last opened element
  $('.ACCORDION li > *:first-child').on('click.ACCORDION-active', function(e){
    if($(this).parent().hasClass('ACCORDION-closed')) {
      $('.ACCORDION-active').not($(this).parent()).removeClass('ACCORDION-active');
      $(this).parent().addClass('ACCORDION-active');
    } else if($(this).parent().hasClass('ACCORDION-open')){
      $(this).parent().removeClass('ACCORDION-active'); 
    } else {
      $('.ACCORDION-active').not($(this).parent()).removeClass('ACCORDION-active');
      $(this).parent().toggleClass('ACCORDION-active'); 
    }
  });

  // Set node click elements, preferably <a> but node links can be <span> also
  node.children(':first-child').on('click.ACCORDION', function(e){
    
    // element vars
    var el = $(this).parent().children('ul').first();
    var isOpen = $(this).parent().hasClass('ACCORDION-open');
    
    // close other elements on same level if opening 
    if((close_same_level || $('.csl').hasClass('active')) && !isOpen) {
      var close_items = $(this).closest('ul').children('.ACCORDION-open').not($(this).parent()).children('ul');
      
      // Velocity.js
      if($.Velocity) {
        close_items.velocity({
          height: 0
        }, {
          duration: duration,
          easing: easing,
          display: 'none',
          delay: 100,
          complete: function(){
            setNodeClass($(this).parent(), true)
          }
        });
        
      // jQuery fallback
      } else {
        close_items.delay(100).slideToggle(duration, function(){
          setNodeClass($(this).parent(), true);
        });
      }
    }
    
    // force auto height of element so actual height can be extracted
    el.css({'height': 'auto'}); 
    
    // listAnim: animate child elements when opening
    if(!isOpen && $.Velocity && listAnim) el.find(' > li, li.ACCORDION-open > ul > li').css({'opacity':0}).velocity('stop').velocity('list');
    
    // Velocity.js animate element
    if($.Velocity) {
      el.velocity('stop').velocity({
        //translateZ: 0, // optional hardware-acceleration is automatic on mobile
        height: isOpen ? [0, el.outerHeight()] : [el.outerHeight(), 0]
      },{
        queue: false,
        duration: duration,
        easing: easing,
        display: isOpen ? 'none' : 'block',
        begin: setNodeClass($(this).parent(), isOpen),
        complete: function(){
          if(!isOpen) $(this).css('height', 'auto');
        }
      });
    
    // jQuery fallback animate element
    } else {
      setNodeClass($(this).parent(), isOpen);
      el.slideToggle(duration);
    }
    
    // We can't have nodes as links unfortunately
    e.preventDefault();
  });
  
  // Function for updating node class
  function setNodeClass(el, isOpen) {
    if(isOpen) {
      el.removeClass('ACCORDION-open').addClass('ACCORDION-closed');
    } else {
      el.removeClass('ACCORDION-closed').addClass('ACCORDION-open');
    }
  }
  
  // List animation sequence
  if($.Velocity && listAnim) {
    $.Velocity.Sequences.list = function (element, options, index, size) {
      $.Velocity.animate(element, { 
        opacity: [1,0],
        translateY: [0, -(index+1)]
      }, {
        delay: index*(duration/size/2),
        duration: duration,
        easing: easing
      });
    };
  }
    
    // Fade in ACCORDION after classes are added.
    // Useful if you have set collapsed = true or applied styles that change the structure so the menu doesn't jump between states after the function executes.
    if($('.ACCORDION').css('opacity') == 0) {
      if($.Velocity) {
        $('.ACCORDION').css('opacity', 1).children().css('opacity', 0).velocity('list');
      } else {
        $('.ACCORDION').show(200);
      }
    }
  }
}(jQuery, this, this.document));