const basket = JSON.parse(localStorage.getItem("Products")) || [];
const cartItems = document.getElementById("cart__items");
console.log(basket);
contentsBasket = [];

// function onQuantityChange(idProduct) {
//   console.log(idProduct);
// }

for (let i = 0; i < basket.length; i++) {
  
  
  fetch("http://localhost:3000/api/products/" + basket[i].id)
    .then((response) => response.json())
    .then((data) => { 
      
      let priceSofaQuantity = basket[i].quantity * data.price;

      contentsBasket =
        contentsBasket +
        `<article class="cart__item" data-id=${basket[i].id}>
      <div class="cart__item__img">
      <img src=${data.imageUrl}>
      </div>
      <div class="cart__item__content">
        <div class="cart__item__content__titlePrice">
          <h2>${data.name}</h2>
          <p>${priceSofaQuantity}€</p>
        </div>
        <div class="cart__item__content__settings">
          <p>Couleur : ${basket[i].color}</p>
          <div class="cart__item__content__settings__quantity">
            <p>Qté : </p>
            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${basket[i].quantity} onchange=onQuantityChange('${basket[i].id}')>
          </div>
          <div class="cart__item__content__settings__delete">
            <p class="deleteItem">Supprimer</p>
          </div>
        </div>
      </div>
      </article>`;

      if (basket.length) {
        cartItems.innerHTML = contentsBasket;
      }
    });
}



