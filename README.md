AutoScroll
==========

jQuery plugin to scroll overflowing elements based on mouse position
-------------

Version Beta 0.1.0
Updated January 27th, 2011

###Description

AutoScroll is an incredibly small and simple JQuery plugin that allows overflowing elements with lists scrollable based on the vertical mouse position within that element. One simply needs to attach the plugin to the container element and pass it a JQuery selector for its child list elements.

###Further Developments

*	Option to scroll horizontally as well as vertically
*	Option to set a buffer to tweak scrolling behavior

###Project Page

[AutoScroll](http://robincwillis.github.io/AutoScroll/ "Project Page")

###HTML

	<div id="demo_scroll">
		<div class="entry" ></div>
		<div class="entry" ></div>
		<div class="entry" ></div>
	</div>

###CSS

	#demo_scroll{
		height:400px;
		width:250px;
		overflow:hidden;
	}

	.entry{
		height:100px;
		width:250px;
	}

###Javascript

	$(document).ready(function(){
		$('#demo_scroll').autoScroll('.entry');
	});
