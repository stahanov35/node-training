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

let loadImageCallback = (url, callback) => {
  let img = new Image(200, 200);

  img.onload = () => {
    callback(null, img);
  };

  img.onerror = () => {
    let message = 'Can\'t loaded image ' + url;
    callback(new Error(message));
  };

  img.src = url;
};

let addImage = (src) => {
  document.querySelector('.app').appendChild(src);
};

document.onreadystatechange = () => {
  if (document.readyState === 'complete') {
    loadImageCallback('../images/space01.jpg', (error, img) => {
      if (error) {
        throw error;
      }
      addImage(img);
      loadImageCallback('../images/space02.jpg', (error, img) => {
        if (error) {
          throw error;
        }
        addImage(img);
        loadImageCallback('../images/space03.jpg', (error, img) => {
          if (error) {
            throw error;
          }
          addImage(img);
        });
      });
    });
  }
};
}());
