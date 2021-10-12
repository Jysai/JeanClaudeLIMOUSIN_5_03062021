const basket = JSON.parse(localStorage.getItem("Sofas")) || [];
const cartItems = document.getElementById("cart__items");

contentsBasket = [];

for (let i = 0; i < basket.length; i++) {
  fetch("http://localhost:3000/api/products/" + basket[i].idSofa)
    .then((response) => response.json())
    .then((data) => {
      contentsBasket =
        contentsBasket +
        `<article class="cart__item" data-id=${basket[i].idSofa}>
      <div class="cart__item__img">
      <img src=${data.imageUrl}>
      </div>
      <div class="cart__item__content">
        <div class="cart__item__content__titlePrice">
          <h2>${data.name}</h2>
          <p>${data.price}€</p>
        </div>
        <div class="cart__item__content__settings">
          <div class="cart__item__content__settings__quantity">
            <p>Qté : </p>
            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${basket[i].quantitySofa}>
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

// cartItemContentTitlePrice.insertAdjacentHTML("beforeend", `<p> €</p>`);
// cartItemContent.append(cartItemContentSettings);
// cartItemContentSettings.append(cartItemContentSettingsQuantity);
// cartItemContentSettingsQuantity.append(itemQuantity)
// cartItemContentSettingsQuantity.insertAdjacentHTML(
//     "afterbegin",
//     `<p>Qté : </p>`
// )
// cartItemContentSettings.append(cartItemContentSettingsDelete);
// cartItemContentSettingsDelete.insertAdjacentHTML(
//   "afterbegin",
//   `<p class="deleteItem">Supprimer</p>`
// );

// itemQuantity.innerHTML = `<input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${basket[i].quantitySofa }>`
