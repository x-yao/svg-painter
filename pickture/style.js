$(document).ready(function($) {
	$(".right").on('click', function(event) {
		event.preventDefault();
		left();
	});
	function left() {
		var left = $("ul").position().left;
		$("ul").css('left', left-300+"px");
	}
});