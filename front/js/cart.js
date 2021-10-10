const basket = JSON.parse(localStorage.getItem("Sofas")) || [];
const cartItems = document.getElementById("cart__items");
contentsBasket = []

for (let i = 0; i < basket.length; i++) {

    contentsBasket = contentsBasket + `<article class="cart__item" data-id=${basket[i].idSofa}>
<div class="cart__item__img">
    ${basket[i].imageSofa}
</div>
<div class="cart__item__content">
  <div class="cart__item__content__titlePrice">
    <h2>${basket[i].titleSofa}</h2>
    <p>${basket[i].priceSofa}€</p>
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
</article>`
}if(basket.length){
    cartItems.innerHTML = contentsBasket;
    
}

//               <article class="cart__item" data-id="{product-ID}">
//                 <div class="cart__item__img">
//                   <img src="../images/product01.jpg" alt="Photographie d'un canapé">
//                 </div>
//                 <div class="cart__item__content">
//                   <div class="cart__item__content__titlePrice">
//                     <h2>Nom du produit</h2>
//                     <p>42,00 €</p>
//                   </div>
//                   <div class="cart__item__content__settings">
//                     <div class="cart__item__content__settings__quantity">
//                       <p>Qté : </p>
//                       <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
//                     </div>
//                     <div class="cart__item__content__settings__delete">
//                       <p class="deleteItem">Supprimer</p>
//                     </div>
//                   </div>
//                 </div>
//               </article>
//

// let cartItem = document.createElement("article");
// let cartItemImg = document.createElement("div");
// let cartItemContent = document.createElement("div");
// let cartItemContentTitlePrice = document.createElement("div");
// let cartItemContentSettings = document.createElement("div");
// let cartItemContentSettingsQuantity = document.createElement("div");
// let itemQuantity = document.createElement("div")
// let cartItemContentSettingsDelete = document.createElement("div");

// cartItemImg.setAttribute("class", "cart__item__img");
// cartItemContent.setAttribute("class", "cart__item__content");
// cartItemContentTitlePrice.setAttribute(
//   "class",
//   "cart__item__content__titlePrice"
// );
// cartItemContentSettings.setAttribute("class", "cart__item__content__settings");
// cartItemContentSettingsQuantity.setAttribute(
//   "class",
//   "cart__item__content__settings__quantity"
// );
// cartItemContentSettingsDelete.setAttribute(
//   "class",
//   "cart__item__content__settings__delete",
// );
// cartItems.append(cartItem);
// cartItem.insertAdjacentHTML("afterbegin", `<article class="cart__item" data-id=${basket[i].idSofa }>`)
// cartItem.append(cartItemImg);
// cartItemImg.insertAdjacentHTML("afterbegin", `<img src="">`);
// cartItem.append(cartItemContent);
// cartItemContent.append(cartItemContentTitlePrice);
// cartItemContentTitlePrice.insertAdjacentHTML(
//   "afterbegin",
//   `<h2>Nom test</h2>`
// );
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
