const lookbook = document.querySelector('.lookbook-container');

let filter = document.querySelectorAll('.filters');


fetch('lookbook.json')
      .then(res => res.json())
      .then(data => {
            pageLoad(data);
            createImageElements(data);
      });

function createImageElements(arr) {
      filter.forEach(btn => {
            btn.addEventListener('click', () => {
                  for (let i = 0; i < filter.length; i++) {
                        if (filter[i].classList.contains('active')) {
                              filter[i].classList.remove('active');
                        }
                  }
                  lookbook.innerHTML = '';
                  btn.classList.add('active');

                  let season = btn.textContent;

                  let imgArr = arr[season];

                  imgArr.forEach(e => {
                        let key = e.key;
                        let photo = e.img;

                        if (key % 2 === 0) {
                              let photoCard = `
                                    <img src=${photo} class="big-photo">
                              `;

                              lookbook.innerHTML += photoCard;
                        } else {
                              let photoCard2 = `
                                    <img src=${photo} class="small-photo">
                              `;

                              lookbook.innerHTML += photoCard2;
                        }
                  })
            })
      })
}

function pageLoad(arr) {
      let photos = arr.winter2020;
      photos.forEach(e => {
            let key = e.key;
            let photo = e.img;
            if (key % 2 === 0) {
                  let photoCard = `
                                    <img src=${photo} class="big-photo">
                              `;
                  lookbook.innerHTML += photoCard;
            } else {
                  let photoCard2 = `
                                    <img src=${photo} class="small-photo">
                              `;
                  lookbook.innerHTML += photoCard2;
            }
      })
}








