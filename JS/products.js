const productsSection = document.querySelector('.products-container');

function allProducts() {
      fetch('../JSONdatabases/products.json')
            .then(res => res.json())
            .then(data => {
                  const btn = document.getElementById('all');

                  if (btn.classList.contains('filter-selected')) {
                        const products = data.products;

                        pagination(products);
                  }

            });
}
allProducts();

// changing category banner
function categoryBanner(category) {
      const banner = document.getElementById('filter-banner-span');

      banner.innerHTML = category;
}
//Product filter functionality
function filters() {
      const filters = document.querySelectorAll('.filter-button');
      //add listeners to filter selectors
      filters.forEach(btn => {
            btn.addEventListener('click', () => {
                  let button = btn.textContent;
                  //remove current selected filter (highlighted filter)
                  filters.forEach((e) => {
                        e.classList.remove('filter-selected');
                  });
                  //add highlight to current or newly selected filter
                  btn.classList.add('filter-selected');
                  categoryBanner(button);
                  //Remove all products from container
                  productsSection.innerHTML = '';

                  //if button is new check to see if new is true
                  if (button === 'new') {
                        getNewProducts();
                  }
                  else {
                        //add in filtered products
                        getProducts(button);
                  }

                  if (button === 'all') {
                        allProducts();
                  }


            })
      })
}
filters();

function getProducts(filter) {
      //fetch json products
      fetch('../JSONdatabases/products.json')
            .then(res => res.json())
            .then(data => {
                  const products = data.products;
                  let type = filter;
                  //created array where filtered array will be pushed
                  let filteredResult = []

                  //for loop loops through json products and only pushes items with corresponding category
                  for (let i = 0; i < products.length; i++) {
                        if (products[i].productType === type) {
                              filteredResult.push(products[i]);
                        }
                  }

                  pagination(filteredResult);
            });
}

//this function creates the product cards
function makeProductCards(filteredItems) {
      const items = filteredItems;

      items.forEach((e) => {
            let id = e.id;
            let price = e.productPrice;
            let category = e.productType;
            let name = e.productName;
            let img = e.productImgUrl;

            let newCard = `
            <div class="product-card" data-category="${category}" id="${id}">
                  <img class="product-img" src="${img}" alt="">
                  <div class="product-info">
                        <p class="product-name">
                              ${name}
                        </p>
                        <p class="product-price">
                              $${price}
                        </p>
                  </div>
            </div>
            `;

            productsSection.innerHTML += newCard;

      })
}

function getNewProducts() {
      fetch('../JSONdatabases/products.json')
            .then(res => res.json())
            .then(data => {
                  const products = data.products;
                  //created array where filtered array will be pushed
                  let newProducts = []

                  //for loop loops through json products and only pushes items with corresponding category
                  for (let i = 0; i < products.length; i++) {
                        if (products[i].productNew === true) {
                              newProducts.push(products[i]);
                        }
                  }

                  pagination(newProducts);
            });
}

function pagination(list) {
      const productsList = list;
      const numOfPages = Math.ceil(productsList.length / 12);
      let currentPage = 1;
      const pages = document.querySelector('.page-numbers');

      let perPage = 12;
      let end = currentPage * perPage;
      let start = (currentPage * perPage) - perPage;

      let newList = productsList.slice(start, end);

      const pageNumbers = [];


      //remove previous page numbers
      pages.innerHTML = '';

      //this will turn the page numbers into p elements
      for (let i = 1; i < numOfPages + 1; i++) {
            pageNumbers.push(i);
      }
      pageNumbers.forEach(num => {
            let newNum = document.createElement('p');
            newNum.classList.add('page-number');
            newNum.innerHTML = num;

            pages.appendChild(newNum);
      });

      //change current page with given page numbers... Algorithm
      const pageNumber = document.querySelectorAll('.page-number');

      pageNumber.forEach(e => {
            e.addEventListener('click', btn => {

                  productsSection.innerHTML = '';
                  currentPage = btn.target.innerHTML;
                  let end = currentPage * perPage;
                  let start = (currentPage * perPage) - perPage;
                  let newList = productsList.slice(start, end);

                  makeProductCards(newList);

            })
      })

      makeProductCards(newList);
}








