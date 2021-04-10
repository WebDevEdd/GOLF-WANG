const cart = document.querySelector('.cart-wrapper');

const cartBtn = document.querySelector('.cart-btn');

const closeCart = document.querySelector('.cart-close-btn');

cartBtn.addEventListener('click', () => {
      cart.classList.toggle('cart-closed');
})
closeCart.addEventListener('click', () => {
      cart.classList.toggle('cart-closed');
})