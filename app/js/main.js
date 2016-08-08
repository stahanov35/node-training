let images = ['../images/space01.jpg', '../images/space02.jpg', '../images/space03.jpg'];

loadImage = (url) => {
	let img = new Image(200, 200);
	img.src = url;

	console.log(document.querySelectorAll('.app'));
	document.querySelectorAll('.app')[0].appendChild(img);
}

loadImageCallback = (url, callback) => {
	let img = new Image(200, 200);

	img.onload = () => {
		callback(null, img);
	}

	img.onerror = () =>{
		let message = 'Can\'t loaded image ' + url;
		callback(new Error(message));
	}

	img.src = url;
}

addImage = (src) => {
	document.querySelector('.app').appendChild(src);
}

document.onreadystatechange = () => {
  if (document.readyState === 'complete') {
    	loadImageCallback('../images/space01.jpg', (error, img) =>{
    		if(error) throw error;
    		addImage(img);
    	});
  }
};