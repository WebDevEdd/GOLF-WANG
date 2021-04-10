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
                  <div class="card-img-container">
                  <img class="product-img" src="${img}" alt="">
                  <button class="add-to-cart">ADD TO CART</button>
                  </div>
                  <div class="product-info">
                        <p class="product-name">${name}</p>
                        <p class="product-price">$<span>${price}</span></p>
                  </div>
            </div>
            `;

            productsSection.innerHTML += newCard;
            pushToCartStorage();


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

const cartItems = document.querySelector('.cart-items-container');





function makeCartItems(id, image, name, price, qty) {
      let newItem = document.createElement('div');
      newItem.classList.add('cart-item');
      newItem.setAttribute('id', id);

      let card = `
      <img id="${id}" class="cart-item-img" src="${image}" alt="">
      <div class="cart-item-info">
            <div class="cart-item-info-container">
                  <p class="cart-item-name">${name}</p>
                  <p class="cart-item-price">$<span>${price}</span></p>
            </div>

            <div class="cart-item-qty-container">
                  <button class="qty-btn less-btn">-</button>
                  <span class="cart-item-qty">${qty}</span>
                  <button class="qty-btn more-btn">+</button>
            </div>
            <div class="cart-item-remove">
                  <p class="remove-from-cart">REMOVE</p>
            </div>
      </div>
      `

      newItem.innerHTML = card;

      cartItems.appendChild(newItem);


}

// push items to cart
let cartList = [];

function pushToCartStorage() {
      const addToCart = document.querySelectorAll('.add-to-cart');
      addToCart.forEach(btn => {
            btn.addEventListener('click', () => {

                  let card = btn.parentElement.parentElement;
                  let id = card.id;
                  let img = JSON.stringify(card.children[0].children[0].src);
                  let name = JSON.stringify(card.children[1].children[0].textContent);
                  let price = card.children[1].children[1].children[0].textContent;

                  let cartItem = {
                        "id": JSON.parse(id),
                        "img": img,
                        "name": name,
                        "price": JSON.parse(price),
                        "qty": 1
                  }
                  localStorage.setItem(id, JSON.stringify(cartItem));

                  cartRows();

            })
      })
}

function cartRows() {
      cartItems.innerHTML = '';
      const storedItems = localStorage;
      const storedItemKeys = Object.keys(storedItems);

      storedItemKeys.forEach(key => {
            const storedItemKeys = parseInt(key);

            const storedItemsProps = JSON.parse(storedItems.getItem(storedItemKeys));

            let id = storedItemsProps.id;
            let image = JSON.parse(storedItemsProps.img);
            let name = storedItemsProps.name;
            let price = storedItemsProps.price;
            let qty = storedItemsProps.qty;

            makeCartItems(id, image, name, price, qty);

      })
      changeQuantity();
      removeFromCart();
      updateCartTotal();
}

function removeFromCart() {
      const remove = document.querySelectorAll('.remove-from-cart');

      remove.forEach(btn => {
            btn.addEventListener('click', () => {
                  localStorage.removeItem(btn.parentElement.parentElement.parentElement.id);
                  let item = btn.parentElement.parentElement.parentElement;
                  item.remove();
                  updateCartTotal();
            })
      })

}
function changeQuantity() {
      const more = document.querySelectorAll('.more-btn');
      const less = document.querySelectorAll('.less-btn');
      more.forEach(btn => {
            btn.addEventListener('click', () => {
                  let quantity = btn.parentElement.children[1].textContent;
                  quantity++;
                  btn.parentElement.children[1].textContent = quantity;

                  updateCartTotal();

            })
      })
      less.forEach(btn => {
            btn.addEventListener('click', () => {
                  let cartItemId = btn.parentElement.parentElement.parentElement.id;
                  let cartItem = btn.parentElement.parentElement.parentElement;
                  let quantity = btn.parentElement.children[1].textContent;

                  quantity--;
                  if (quantity < 1) {
                        localStorage.removeItem(cartItemId);
                        cartItem.style.display = 'none';
                        cartItem.remove();
                        updateCartTotal();

                  } else {
                        btn.parentElement.children[1].textContent = quantity;

                  }
                  updateCartTotal();



            })
      })
}

function updateCartTotal() {
      const total = document.querySelector('.total-span');
      let calculatedPrices = [];
      const cartRow = document.querySelectorAll('.cart-item');
      cartRow.forEach(row => {
            let quantity = row.children[1].children[1].children[1].textContent;
            let currentPrice = row.children[1].children[0].children[1].children[0].textContent;

            let newPrice = quantity * currentPrice;

            calculatedPrices.push(newPrice);

      })
      const cartTotal = calculatedPrices.reduce((acc, cur) => {
            return acc + cur;
      }, 0);
      total.innerHTML = cartTotal;
      console.log(cartTotal);

}
updateCartTotal2();


window.onload = cartRows;








