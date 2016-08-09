(function() {
'use strict';

// let images = ['../images/space01.jpg',
//     '../images/space02.jpg',
//     '../images/space03.jpg'
// ];

// let loadImage = (url) => {
//     let img = new Image(200, 200);
//     img.src = url;

//     console.log(document.querySelectorAll('.app'));
//     document.querySelectorAll('.app')[0].appendChild(img);
// };

let loadImage = (url) => {
  return new Promise((resolve, reject) => {
    let img = new Image(200, 200);

    img.onload = () => {
      resolve(img);
    };

    img.onerror = () => {
      reject(new Error('Can\'t loaded image ' + url));
    };

    img.src = url;
  });
};

let addImage = (img) => {
  document.querySelector('.app').appendChild(img);
};

document.onreadystatechange = () => {
  if (document.readyState === 'complete') {
    Promise.all([
      loadImage('../images/space01.jpg'),
      loadImage('../images/space02.jpg'),
      loadImage('../images/space03.jpg')
    ])
    .then(images => {
      images.forEach((img) => {
        addImage(img);
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }
};
}());
