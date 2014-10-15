var fs = require('fs');
fs.readFile('./test.js','UTF-8',function(err, data) {
	if (err) {
		console.error(err);
	} else {
		console.log(data);
		var d = "123";
		var path = './hello2.txt';
		fs.writeFile(path,d,'UTF-8',function(){
			if (err) throw err;
			console.log('wrote');
		});
	}
});
// fs.rename('./test.txt', './hello.txt', function(err){
// 	if (err) throw err;
// 	console.log('renamed');
// });