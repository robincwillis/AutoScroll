/************************************************************************
*************************************************************************
@Name :       AutoScroll - jQuery Plugin
@Revison :    0.2.0
@Date :       01/25/2012
@Author:      Robin Willis
@License :    Open Source - MIT License : http://www.opensource.org/licenses/mit-license.php
**************************************************************************
*************************************************************************/
(function( $ ){

	var methods = {
    
	    init : function( options ) { 
		
			return this.each(function() {		
	 
				$(this).data('settings',{
					el	 				: $(this),
					entry				: '',
					elHeight			: 0,
					entryHeight			: 0,
					listHeight			: 0,
					totalScrollDistance	: 0,
					pos 				: 0,
					lastPos 			: 0,
					dist 				: 0,
					buffer 				: 0,
					mouseY 				: 0,
					enterMouseY 		: 0
				});
			
			$.extend($(this).data('settings'), options);
				
			var data = $(this).data('settings');
			data.entry = $(data.entry);
			
			methods.update.call(this);

			//make sure overflow is set to hidden
			data.el.css({overflow: 'hidden'});

			$(this).mouseenter(function(e){
				methods.enter.call(this,e);
			});
			
			$(this).mouseleave(function(e){
				methods.exit.call(this,e);
			});
			
			$(this).mousemove(function(e){
				methods.scroll.call(this,e);
			});
			
			});
		},

		enter : function(e){
			
			var data = $(this).data('settings');

			data.enterMouseY=e.pageY-data.el.offset().top;
			//keep it from freaking out when we mouseenter from Top of div
			if(data.enterMouseY > data.elHeight){
				data.enterMouseY = data.elHeight;
			}
			if(data.enterMouseY < 0){
				data.enterMouseY = 0;
			}
			
		},

		exit : function(e){
		
			var data = $(this).data('settings');
			data.lastPos = data.pos;
		},

		scroll : function(e){
			var data = $(this).data('settings');

				//get mouse coord relative to container
				data.mouseY = e.pageY-data.el.offset().top;

				//try to keep it from freaking out when we mouseenter from Top or Bottom of div
				if (data.mouseY > data.elHeight){
					data.mouseY = data.elHeight;
				}
				if (data.mouseY < 0){
					data.mouseY = 0;
				}
				
				//ratio container to list top
				var rTop = (data.totalScrollDistance-data.lastPos+data.buffer)/(data.elHeight - data.enterMouseY);
				//ratio container to list bottom
				var rBot =(data.lastPos+data.buffer) /data.enterMouseY;

				//calc distance based on whether we are scrolling up or down
				if(data.mouseY>data.enterMouseY){	
					data.dist = (data.mouseY-data.enterMouseY)*rTop;
				}else if(data.mouseY<data.enterMouseY){
					data.dist = (data.mouseY-data.enterMouseY)*rBot;	
				}else if(data.mouseY = data.enterMouseY){
					data.dist = 0;
				}
				//calculate and keep pos inbounds
				data.pos =  data.dist+data.lastPos;
				if(data.pos<0){
					data.pos = 0;
				}
				if(data.pos>data.totalScrollDistance){
					data.pos = data.totalScrollDistance;
				}	
				//scroll list
				data.el.scrollTop(data.pos);
				
		},
		//update height
		update : function (){
			var  data = $(this).data('settings');
			
			data.elHeight = data.el.height();
			var listHeight = 0;

			for(var i=0;i<data.entry.length;i++){
				//if($(data.entry[i]).is(':visible')){
				if(!$(data.entry[i]).hasClass('filtered')){
				
					var entryHeight = $(data.entry[i]).outerHeight(true);
					
					listHeight += 140// entryHeight;	

				}
				
			}
			
			data.listHeight = listHeight+100;
			data.totalScrollDistance	= data.listHeight - data.elHeight;

		},

		destroy : function () {
			return this.each(function(){

				$(window).unbind("resize");
				$(this).unbind("mouseenter");
				$(this).unbind("mouseleave");
				$(this).unbind("mousemove");

			});

		}
	};

  $.fn.autoScroll = function( method ) {
    
    // Method calling logic
    if ( methods[method] ) {
      return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.autoScroll' );
    }    
  
  };

})( jQuery );