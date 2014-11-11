$(document).ready(function() {
	var paper = Raphael($('.svg4')[0], 600, 600);
	// var strokeWidthNum;
	function elHover(el) {
		el.hover(function() {
			this.attr({
				stroke: "yellow"
			});
		}, function() {
			this.attr({
				stroke: el.data("stroke")
			});
		});
	};
	function drowReset(){
		$('.svg4').off(); 
		$(document).off();//解除所有绑定事件
		paper.forEach(function(el) {
			el.unhover().undrag();
			el.attr({
				stroke: el.data("stroke"),
				fill: el.data("fill")
			}).data('click', false);
		});
	};
	function drowRect() {
		drowReset();
		$('.svg4').on("mousedown", function(event) {
			var data = getData();
			var x = event.clientX;
			var y = event.clientY;
			var c = paper.rect(x, y, 0, 0, data.radius).attr({
				fill: data.fill,
				stroke: data.stroke,
				"stroke-width": data.strokeWidth
			}).data({
				"fill": data.fill,
				"stroke": data.stroke,
				"stroke-width": data.strokeWidth
			});
			$('.svg4').on("mousemove", function(event) {
				var x2, y2;
				event.clientX < x ? x2 = event.clientX : x;
				event.clientY < y ? y2 = event.clientY : y;
				var w = Math.abs(event.clientX - x);
				var h = Math.abs(event.clientY - y);
				c.attr({
					x: x2 || x,
					y: y2 || y,
					"width": w,
					"height": h
				});
			})
		})
		$('.svg4').on("mouseup", function() {
			$('.svg4').off("mousemove");
		});
	};

	function drowCircle() {
		drowReset();
		$('.svg4').on("mousedown", function(event) {
			var data = getData();
			var x = event.clientX;
			var y = event.clientY;
			var c = paper.circle(x, y, 0).attr({
				fill: data.fill,
				stroke: data.stroke,
				"stroke-width": data.strokeWidth
			}).data({
				"fill": data.fill,
				"stroke": data.stroke,
				"stroke-width": data.strokeWidth
			});
			$('.svg4').on("mousemove", function(event) {
				var x2 = (event.clientX + x) / 2;
				var y2 = (event.clientY + y) / 2;
				var dx = event.clientX - x,
					dy = event.clientY - y;
				var r = Math.abs(Math.sqrt(dx*dx+dy*dy)) / 2;
				c.attr({
					cx: x2,
					cy: y2,
					r: r
				});
			})
		})
		$('.svg4').on("mouseup", function() {
			$('.svg4').off("mousemove");
		});
	};

	function drowLine() {
		drowReset();
		$('.svg4').on("mousedown", function(event) {
			var data = getData();
			var x = event.clientX;
			var y = event.clientY;
			var c = paper.path("M" + x + " " + y).attr({
				fill: data.fill,
				stroke: data.stroke,
				"stroke-width": data.strokeWidth
			}).data({
				"fill": data.fill,
				"stroke": data.stroke,
				"stroke-width": data.strokeWidth
			});
			$('.svg4').on("mousemove", function(event) {
				c.attr('path', "M" + x + " " + y + "L" + event.clientX + " " + event.clientY);
			})
		})
		$('.svg4').on("mouseup", function() {
			$('.svg4').off("mousemove");
		});
	};

	function drowBezier() {
		drowReset();
		var flag = 0;
		var sx, sy, c, sc, epx, epy, epxt, epyt, epath, epatht;
		$('.svg4').on("mousedown", function(event) {
			var data = getData();
			if (flag == 0) {
				sx = event.clientX;
				sy = event.clientY;
				c = paper.path("M" + sx + " " + sx).attr({
					fill: data.fill,
					stroke: data.stroke,
					"stroke-width": data.strokeWidth
				}).data({
					"fill": data.fill,
					"stroke": data.stroke,
					"stroke-width": data.strokeWidth
				});
				sc = paper.circle(sx, sy, 4).attr({
					fill: data.fill,
					stroke: data.stroke,
					"stroke-width": data.strokeWidth
				});
			} else if (flag == 1) {
				var x = event.clientX;
				var y = event.clientY;
				sc.remove();
				$('.svg4').on("mousemove", function(event) {
					epath = "M" + sx + " " + sy + "C" + (2 * x - event.clientX) + "," + (2 * y - event.clientY) + " " + (2 * x - event.clientX) + "," + (2 * y - event.clientY) + " " + x + "," + y;
					epx = event.clientX;
					epy = event.clientY;
					c.attr('path', epath);
				});
			} else {
				var x = event.clientX;
				var y = event.clientY;
				sc.remove();
				$('.svg4').on("mousemove", function(event) {
					epatht = epath + "C" + epx + "," + epy + " " + (2 * x - event.clientX) + "," + (2 * y - event.clientY) + " " + x + "," + y;
					epxt = event.clientX;
					epyt = event.clientY;
					c.attr('path', epatht);
				});
			}
			flag = flag + 1;
		})
		$('.svg4').on("mouseup", function() {
			$('.svg4').off("mousemove");
			if (flag > 2) {
				epx = epxt;
				epy = epyt;
				epath = epatht;
			};
		});

	};

	function consultLine() {

	};
	function getData() {
		var fill = typeof fillColor !== "undefined" && fillColor !== null ? fillColor: null;
		var stroke = typeof strokeColor !== "undefined" && strokeColor !== null ? strokeColor: "#CCC";
		var strokeWidth = typeof strokeWidthNum !== "undefined" && strokeWidthNum !== null ? strokeWidthNum: 1;
		var data = {
			"fill" : fill == "null" ? null : fill,
			"stroke" : stroke == "null" ? null : stroke,
			"strokeWidth" : strokeWidth
			}
		return data
	};
	function del() {
		$('.svg4').off();
		paper.forEach(function(el) {
			elHover(el);
			el.data("click", false);
			el.click(function(event) {
				if (this.data("click") == false) {
					this.attr('stroke', 'blue');
					this.data("click", true);
					this.unhover();
				} else {
					el.attr('stroke', 'yellow');
					elHover(el);
					this.data("click", false);
				}
			});
		});
		$(document).keyup(function(event) {
			if (event.keyCode == 8) {
				paper.forEach(function(el) {
					if (el.data("click") == true) {
						el.remove();
					}
				})
			}
		});
	};

	function drowDrag() {
		$('.svg4').off();
		paper.forEach(function(el) {
			elHover(el);
			var x1 = 0,
				y1 = 0,
				d1 = 0;
			var x2 = el["_"].dx,
				y2 = el["_"].dy,
				d = el["_"].deg;
			el.drag(function(x, y, dx, dy) {
				this.transform("t" +
					(x2 + x) + "," +
					(y2 + y) + "r" + d);
				x1 = x2 + x;
				y1 = y2 + y;
			}, function() {}, function() {
				x2 = x1;
				y2 = y1;
			})
		});
	};

	function drowBtn() {
		$(".drow_input").on('click', function(e) {
			var st = $(this).attr('name');
			switch (st) {
				case "drowLine":
					drowLine();
					break;
				case "drowCircle":
					drowCircle();
					break;
				case "drowRect":
					drowRect();
					break;
				case "drowBezier":
					drowBezier();
					break;
				case "clean":
					paper.clear();
					break;
				case "del":
					del();
					break;
				case "drag":
					drowDrag();
					break;
			}
		});
	}
	drowBtn();
	inputView();
	buttonSelect();
});