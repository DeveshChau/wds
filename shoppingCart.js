import items from './items.json';
import formatCurrency from './util/formatCurrency.js';

const cartButton = document.querySelector('[data-cart-button]');
const cartItemWrapper = document.querySelector('[data-cart-item-wrapper]');
let shoppingCart = [];
const cartItemTemplate = document.querySelector('#cart-item-template');
const cartItemContainer = document.querySelector('[data-cart-items]');
const IMAGE_URL = 'https://dummyimage.com/210x130';
const cartQuantity = document.querySelector('[data-cart-quantity]');

export function setUpShoppingcart() {
    cartButton.addEventListener('click', () => {
        cartItemWrapper.classList.toggle('invisible');
    })
}

export function addToCart(id) {
    const existingItem = shoppingCart.find(entry => entry.id === id);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        shoppingCart.push({id: id, quantity: 1});        
    }
    renderCart();
}

function renderCart() {
    cartItemContainer.innerHTML = '';
    cartQuantity.innerHTML = shoppingCart.length;
    
    shoppingCart.forEach(entry => {
        const item = items.find(i => entry.id === i.id)
        const cartItem = cartItemTemplate.content.cloneNode(true)

        const container = cartItem.querySelector("[data-item]")
        container.dataset.itemId = item.id

        const name = cartItem.querySelector("[data-name]")
        name.innerText = item.name

        const image = cartItem.querySelector("[data-image]")
        image.src = `${IMAGE_URL}/${item.imageColor}/${item.imageColor}`

        if (entry.quantity > 1) {
            const quantity = cartItem.querySelector("[data-quantity]")
            quantity.innerText = `x${entry.quantity}`            
        }

        const price = cartItem.querySelector("[data-price]")
        price.innerText = formatCurrency((item.priceCents * entry.quantity) / 100)

        cartItemContainer.appendChild(cartItem)
    });
}
