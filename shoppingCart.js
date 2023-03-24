const cartButton = document.querySelector('[data-cart-button]');
const cartItemWrapper = document.querySelector('[data-cart-item-wrapper]');
let shoppingCart = [];

export function setUpShoppingcart() {
    cartButton.addEventListener('click', () => {
        cartItemWrapper.classList.toggle('invisible')
    })
}

export default function addToCart(id) {
    shoppingCart.push({id: id, quantity: 1});
    console.log(shoppingCart);
}
