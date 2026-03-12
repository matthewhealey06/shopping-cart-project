fetch('https://fakestoreapi.com/products')
  .then(res => res.json())
  .then(json => {
          console.log(json)
    json.slice(0, 5).forEach(product => {
      const productDiv = document.createElement('div');
      productDiv.classList.add('product');
      const left = document.createElement('div');
      left.classList.add('left');
      const title = document.createElement('h4');
      title.textContent = `${product.title}`;
      left.appendChild(title);
      const description = document.createElement('p');
      description.classList.add('item-description');
      left.appendChild(description)
      description.textContent = `${product.description}`
      const price = document.createElement('p');
      price.classList.add('item-price');
      left.appendChild(price);
      price.textContent = `£${product.price}`

      const quantityP = document.createElement('p');
      quantityP.classList.add('item-quantity');

      const minusBtn = document.createElement('button');
      minusBtn.textContent = '-';
      quantityP.appendChild(minusBtn);

      const quantityText = document.createElement('span');
      quantityText.textContent = ' 1 '
      quantityP.appendChild(quantityText);

      const plusBtn = document.createElement('button');
      plusBtn.textContent = '+';
      quantityP.appendChild(plusBtn);

      left.appendChild(quantityP);

      const right = document.createElement('div');
      right.classList.add('right');
      const image = document.createElement('img');
      image.src = `${product.image}`
      right.appendChild(image)
      productDiv.appendChild(left)
      productDiv.appendChild(right)
      const cart = document.getElementById('cart-items')
      cart.appendChild(productDiv)
    })
    updateOrderSummary()
  })
const cart = document.getElementById('cart-items');
cart.addEventListener('click', (event) => {
  const productDiv = event.target.parentElement.parentElement.parentElement;
  if (event.target.tagName === 'BUTTON') {
    const parent = event.target.parentElement;
    const span = parent.querySelector('span')
    let currentQuantity = parseInt(span.textContent)
    if (event.target.textContent === '+'){
      currentQuantity = currentQuantity + 1
    }
    else if (event.target.textContent === '-'){
      currentQuantity = currentQuantity - 1
    }
    if (currentQuantity === 0){
    productDiv.remove()
    }
    span.textContent = `${currentQuantity}`
    updateOrderSummary()
  }
});
function updateOrderSummary(){
  const subTotalElement = document.getElementById('sub-total');
  const shippingElement = document.getElementById('shipping');
  const totalElement = document.getElementById('total');
  const products = document.querySelectorAll('.product')


if(products.length === 0){
  const empty = document.createElement('h2')
  const cart = document.getElementById('cart-items')
  empty.classList.add('empty-cart-message')
  cart.appendChild(empty)
  empty.textContent = 'CART IS EMPTY. (refresh page)'

  subTotalElement.innerHTML = `SUB-TOTAL: <span>£0.00</span>`;
  shippingElement.innerHTML = `SHIPPING: <span>£0.00</span>`;
  totalElement.innerHTML = `TOTAL: <span>£0.00</span>`;

} else{

  let cartTotal = 0 
  products.forEach(product => {
    const priceElement = product.querySelector('.item-price')
    const priceValue = parseFloat(priceElement.textContent.replace('£', ''));
    const span = product.querySelector('span')
    const quantityValue = parseInt(span.textContent)

    const itemTotal = priceValue * quantityValue
    cartTotal += itemTotal
 })
  let shipping = cartTotal > 100 ? 0 : 5.99

    const totalValue = cartTotal + shipping

 subTotalElement.innerHTML = `SUB-TOTAL: <span>£${cartTotal.toFixed(2)}</span>`
 shippingElement.innerHTML = `SHIPPING: <span>£${shipping}</span>`
 totalElement.innerHTML = `TOTAL: <span>£${totalValue.toFixed(2)}</span>`
}
}