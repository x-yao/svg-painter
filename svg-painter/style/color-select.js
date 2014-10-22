	function colorSelector(paperC) {
		var color = '000,800000,8B4513,2F4F4F,008080,000080,4B0082,696969,' +
			'B22222,A52A2A,DAA520,006400,40E0D0,0000CD,800080,808080,' +
			'F00,FF8C00,FFD700,008000,0FF,00F,EE82EE,A9A9A9,' +
			'FFA07A,FFA500,FFFF00,00FF00,AFEEEE,ADD8E6,DDA0DD,D3D3D3,' +
			'FFF0F5,FAEBD7,FFFFE0,F0FFF0,F0FFFF,F0F8FF,E6E6FA,FFF';
		var colors = color.split(",");
		// var paperC = Raphael($('.svg6')[0], 210, 160);
		// var bac = paperC.rect(0, 100, 200, 51).attr('stroke', '#999');
		// var bac2 = paperC.rect(0, 0, 200, 85).attr('stroke', '#FFF');
		var strokeLabel = paperC.text(50, 140, "线条颜色").attr('fill', '#999');
		var fillLabel = paperC.text(135, 140, "填充颜色").attr('fill', '#999');
		var colorBtn = paperC.set();

		var strokeInput,strokeInput = paperC.rect(37, 110, 20, 20).attr('fill', '#CCC');
		var fillInput = paperC.rect(127, 110, 20, 20).attr('fill', '#CCC');
		colorBtn.push(strokeInput,fillInput);
		colorBtn.hover(function() {
			this.attr({
				stroke : "#3366FF"
			});
		}, function() {
			this.attr({
				stroke : "#000"
			})
		});
		colorBtn.click(function(event) {
			this.glow({color:'#3366FF',width:5});
		});
		paperC.setStart()
		$.each(colors, function(index, val) {
			var x = index * 20+2;
			var y = 5;
			while (x >= 200) {
				x = x - 200;
				y = y + 20;
			}
			paperC.rect(x, y, 15, 15).attr({
				fill: '#' + val,
				stroke: null,
				opacity: .6
			}).data("color", '#' + val);
		});
		paperC.rect(180, 65, 15, 15).attr({
			fill: '#FFF',
			stroke: null,
			opacity: .6
		}).data("color", "null");
		paperC.path("M180,65L195,80");
		var colorBox = paperC.setFinish();
		// colorBox.hide();
		colorBox.hover(function() {
			this.attr({
				'opacity': 1,
				'width': 17,
				'height': 17
			});
		}, function(el) {
			this.attr({
				'opacity': .6,
				'width': 15,
				'height': 15
			});
		});
	};

	function inputView() {
		var paperI = Raphael($('.svg5')[0], 200, 200);
		var bac = paperI.rect(0, -1, 200, 101).attr({
			fill: "#FFF",
			stroke: "#999"
		});
		var input = paperI.rect(90, 20, 80, 20).attr({
			fill: "#FFF",
			stroke: '#999',
			"stroke-width": 2,
			opacity: 1
		});
		debugger
		colorSelector(paperI);
		var inputLabel = paperI.text(50, 30, "线条宽度").attr('fill', '#999');
		// var strokeLabel = paperI.text(50, 55, "线条颜色").attr('fill', '#999');
		// var fillLabel = paperI.text(135, 55, "填充颜色").attr('fill', '#999');
		var inputPoint = paperI.path("M110,24L110,36").attr('opacity', 0).data({
			'status': 'blur'
		});
		// var strokeInput = paperI.rect(37,70,20,20).attr('fill', '#CCC');
		// var fillInput = paperI.rect(127,70,20,20).attr('fill', '#CCC');
		var num = [];
		var iAni = Raphael.animation({
			opacity: 1
		}, 1000, "<>").repeat(Infinity);
		bac.click(function(event) {
			if (inputPoint.data("status") == "focus") {
				inputPoint.data({
					'status': 'blur'
				});
				input.attr('stroke', '#999');
				inputLabel.attr('fill', '#999');
				inputPoint.hide();
				num.length ? num.attr('fill', '#999') : "";
			};
			$(document).unbind('keyup');
		});
		input.click(function(event) {
			// $(document).off("click");
			inputPoint.animate(iAni);
			inputPoint.show();
			if (inputPoint.data("status") == "blur") {
				input.attr('stroke', '#3366FF');
				inputLabel.attr('fill', '#3366FF');
				num.length ? num.attr('fill', '#3366FF') : num = paperI.set();
				$(document).keydown(function(event) {
					event.preventDefault();
				});
				$(document).keyup(function(event) {
					var key = event.keyCode;
					console.log(event.originalEvent.keyIdentifier);
					switch (key) {
						case 48 || 96:
							numType(num, 0);
							break
						case 49 || 97:
							numType(num, 1);
							break
						case 50 || 98:
							numType(num, 2);
							break
						case 51 || 99:
							numType(num, 3);
							break
						case 52 || 100:
							numType(num, 4);
							break
						case 53 || 101:
							numType(num, 5);
							break
						case 54 || 102:
							numType(num, 6);
							break
						case 55 || 103:
							numType(num, 7);
							break
						case 56 || 104:
							numType(num, 8);
							break
						case 57 || 105:
							numType(num, 9);
							break
						case 8:
							var i = num.length - 1;
							num[i].remove();
							num.pop();
							outputNum(num);
							if (i >= 0) {
								inputPoint.transform("...t-10,0")
							}
							break
					}
				});
				inputPoint.data({
					'animate': true,
					'status': 'focus'
				});
			}
		});

		function numType(el, num) {
			var l = el.length;
			if (l > 6) return
			el.push(
				paperI.text(110 + l * 10, 30, num).attr('fill', '#3366FF')
			);
			outputNum(el);
			inputPoint.transform("...t10,0")
		};

		function outputNum(el) {
			var a;
			$.each(el, function(index, val) {
				index == 0 ? a = val.attrs.text : a = a + val.attrs.text;
			});
			strokeWidthNum = a;
		};
	};