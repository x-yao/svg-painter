	function colorSelector() {
		var color = '000,800000,8B4513,2F4F4F,008080,000080,4B0082,696969,' +
			'B22222,A52A2A,DAA520,006400,40E0D0,0000CD,800080,808080,' +
			'F00,FF8C00,FFD700,008000,0FF,00F,EE82EE,A9A9A9,' +
			'FFA07A,FFA500,FFFF00,00FF00,AFEEEE,ADD8E6,DDA0DD,D3D3D3,' +
			'FFF0F5,FAEBD7,FFFFE0,F0FFF0,F0FFFF,F0F8FF,E6E6FA,FFF';
		var colors = color.split(",");
		var paperC = Raphael(0, 0, 200, 100);
		paperC.setStart()
		$.each(colors, function(index, val) {
			var x = index * 20;
			var y = 5;
			while (x >= 200) {
				x = x - 200;
				y = y + 20;
			}
			paperC.rect(x, y, 15, 15).attr({
				fill: '#' + val,
				stroke: null,
				opacity: .6
			});
		});
		var colorBox = paperC.setFinish();
		// colorBox.hide();
		colorBox.hover(function() {
			this.attr('opacity', 1);
		}, function(el) {
			this.attr('opacity', .6);
		});
	};

	function inputView() {
		var paperI = Raphael($('.svg5')[0], 200, 100);
		var input = paperI.rect(100, 20, 80, 20).attr({
			stroke: '#CCC',
			"stroke-width": 2,
			opacity: 1,
			fill: "#FFF"
		});
		var inputPoint = paperI.path("M110,24L110,36").attr('opacity', 1);
		var iAni = Raphael.animation({
			opacity: 0
		}, 1000, "<>").repeat(Infinity);
		input.click(function(event) {
			inputPoint.animate(iAni);
			inputPoint.data('animate', true);
		});
		var num = paperI.set();
		$(document).keydown(function(event) {
			event.preventDefault();
		});
		$(document).keyup(function(event) {
			var key = event.keyCode;
			switch (key) {
				case 48 || 96:
					numType(num,0);
					break
				case 49 || 97:
					numType(num,1);
					break
				case 50 || 98:
					numType(num,2);
					break
				case 51 || 99:
					numType(num,3);
					break
				case 52 || 100:
					numType(num,4);
					break
				case 53 || 101:
					numType(num,5);
					break
				case 54 || 102:
					numType(num,6);
					break
				case 55 || 103:
					numType(num,7);
					break
				case 56 || 104:
					numType(num,8);
					break
				case 57 || 105:
					numType(num,9);
					break
				case 8:
					var i = num.length - 1;
					num[i].remove();
					num.pop();
					if(i >= 0){
						inputPoint.transform("...t-10,0")
					}
					break
			}
		});

		function numType(el, num) {
			var l = el.length;
			if(l > 6) return
			el.push(
				paperI.text(110 + l * 10, 30, num).attr('stroke', '#CCC')
			);
			inputPoint.transform("...t10,0")
		}
	};