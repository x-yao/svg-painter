(function() {
	Raphael.prototype.radius = function(x, y, l, h, c1, c2, c3, c4) {
		var x2 = x + l,
			y2 = y + h,
			r1 = c1,
			r2 = c2 ? c2 : c1,
			r3 = c3 ? c3 : c1,
			r4 = c4 ? c4 : (c2 ? c2 : c1); //四个角圆角角度设置

		var a = 'M' + (x + r1) + ',' + y,
			b = 'L' + (x2 - r2) + ',' + y,
			c = 'Q' + x2 + ',' + y + ' ' + x2 + ',' + (y + r2),
			d = 'L' + x2 + ',' + (y2 - r3),
			e = 'Q' + x2 + ',' + y2 + ' ' + (x2 - r3) + ',' + y2,
			f = 'L' + (x + r4) + ',' + y2,
			g = 'Q' + x + ',' + y2 + ' ' + x + ',' + (y2 - r4),
			h = 'L' + x + ',' + (y + r1),
			i = 'Q' + x + ',' + y + ' ' + (x + r1) + ',' + y;
		var string = a + b + c + d + e + f + g + h + i;
		return this.path(a + b + c + d + e + f + g + h + i);
	}
	Raphael.prototype.ring = function(x, y,c,sw,r1,r2) {
		var a = this.circle(x, y, r1||10).attr({
			fill: "none",
			"stroke-width": sw||5,
			stroke: c||"#7ECCED"
		}).animate({
			r: r2||60,
			"stroke-opacity": 0
		}, 1000, "<>", function() {
			a.remove();
		});
	}
})();