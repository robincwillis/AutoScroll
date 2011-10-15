/**
 * @author Robin Willis
 */



(function( $ ){
			
	$.fn.autoScroll = function( entry ){
		 
		return this.each(function() { 
			
			

			var $this = $(this);
			//Get our elements for faster access and set overlay width
			var projList = $this;
			var projItem = $(entry);
			//hide elements, just in case
			projList.css({overflow: 'hidden'});
			//adding 1 pixel for borders of my entry elements (i'll fix it so it grabs css values)
			var margin = 1;
			var divHeight = projList.height();
			var projItemHeight = margin + parseFloat(projItem.height());
			var listHeight = projItem.length * projItemHeight;
			var totalScrollDistance=listHeight-divHeight;
			var pos =0;
			var lastPos=0;

			var mouseY;
			var exitMouseY=0;
			var enterMouseY=0;
		
			projList.mouseleave(function(e){
				exitMouseY=e.pageY-projList.offset().top;
				lastPos = pos;
			});
			
			projList.mouseenter(function(e){
				enterMouseY=e.pageY-projList.offset().top;
			});
			
			projList.mousemove(function(e){
				
				//keep it from freaking out when we mouseenter from Top of div
				if(enterMouseY > divHeight){
					enterMouseY = divHeight;
				}
				
				mouseY = e.pageY-projList.offset().top;
				
				//try to keep it from freaking out when we mouseenter from Top of div
				if (mouseY > divHeight){
					mouseY = divHeight;
				}
				
				//distnace from top of container div to where our mouse Entered
				var distToTop = divHeight - enterMouseY;
					
				//here is the calculation, I parameterize the mouseY pos as a value between 0-1
				//0 being where we entered and 1 being the top or bottom of the div
				//then multiply that by how much we have to scroll to get to the end of the list
				
				//are we moving up or down
				if(mouseY>enterMouseY){
					//if up calculate based on Top
					var dist  =totalScrollDistance * ((mouseY-enterMouseY-projList.offset().top)/(distToTop));
				}else if(mouseY<enterMouseY){
					//if up calculate based on Bottom 
					var dist  =totalScrollDistance * ((mouseY-enterMouseY-projList.offset().top)/(enterMouseY));
				}else if(mouseY = enterMouseY){
					var dist = 0;
				}
				
					
					//set the position of the list offsetting wherever we left it
					pos =  dist+lastPos;
					//scroll to that position
					projList.scrollTop(pos);	

					//are we trying to scroll past the scrollable amount
					if(pos<0){
						pos = 0;
					}
					if(pos>totalScrollDistance){
						pos = totalScrollDistance;
					
					}

			$('#div1').text("mouseY: "+ mouseY +" enterMouseY: "+ enterMouseY +" distance:"+ dist.toFixed(1) + " pos:"+ pos.toFixed(1));	

					
			});
	});
	};
})( jQuery );
		
