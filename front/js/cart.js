const cartItems = document.getElementById("cart__items");
let basket = JSON.parse(localStorage.getItem("Sofas")); //localStorage
const totalQuantity = document.getElementById("totalQuantity");
const totalPrice = document.getElementById("totalPrice");

// Fonction pour changer la quantité d'un produit dans le panier
function onChangeClick(id, color) {
  const article = document.querySelector(
    `article[data-color="${color}"][data-id="${id}"]`
  );
  const input = article.querySelector("input.itemQuantity");

  for (const product of basket) {
    if (product.color == color && product.id == id) {
      modificationProduct = basket.indexOf(product);
      console.log(modificationProduct);
    }
  }
  basket[modificationProduct].quantity = +input.value;
  localStorage.setItem("Sofas", JSON.stringify(basket));
  window.location.reload();
}

// Fonction pour supprimer un produit dans le panier
function onClickDelete(id, color) {
  for (const product of basket) {
    if (product.color == color && product.id == id) {
      modificationProduct = basket.indexOf(product);
      console.log(modificationProduct);
    }
  }

  basket.splice(modificationProduct, 1);

  localStorage.setItem("Sofas", JSON.stringify(basket));
  window.location.reload();
}

// Boucle qui permet de récuperer les informations dans le localstorage puis affiche un récapitulatif dans la page Panier
if (basket === null) {
  cartItems.innerHTML = `
    <article class="cart__item">    
                <h1>Votre panier est vide</h1>
    </article> 
`;
} else {
  for (let i = 0; i < basket.length; i++) {
    fetch("http://localhost:3000/api/products/" + basket[i].id)
      .then((response) => response.json())
      .then((data) => {
        cartItems.innerHTML += `<article class="cart__item" data-id=${
          basket[i].id
        } data-color=${basket[i].color} data-price=${
          data.price * basket[i].quantity
        } data-quantity=${basket[i].quantity}>
          <div class="cart__item__img">
          <img src=${data.imageUrl}>
          </div>
          <div class="cart__item__content">
            <div class="cart__item__content__titlePrice">
              <h2>${data.name}</h2>
              <p >${data.price * basket[i].quantity}€</p>
            </div>
            <div class="cart__item__content__settings">
              <p>Couleur : ${basket[i].color}</p>
              <div class="cart__item__content__settings__quantity">
                <p>Qté : </p>
                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${
                  basket[i].quantity
                } onchange=onChangeClick('${basket[i].id}','${
          basket[i].color
        }')>
              </div>
              <div class="cart__item__content__settings__delete">
                <p class="deleteItem" onclick=onClickDelete('${
                  basket[i].id
                }','${basket[i].color}')>Supprimer</p>
              </div>
            </div>
          </div>
          </article>`;
      });
  }
}

// Permet d'additioner la quantité total des produits dans le panier sous forme d'un tableau avec la méthode reduce()
let arrayQ = [];
for (const product of basket) {
  let itemQuant = product.quantity;
  arrayQ.push(itemQuant);
}
totalQuantity.textContent = arrayQ.reduce(
  (accumulator, curr) => accumulator + curr
);

// Le total du panier
const arrayP = [];
for (let i = 0; i < basket.length; i++) {
  fetch("http://localhost:3000/api/products/" + basket[i].id)
    .then((response) => response.json())
    .then((data) => {
      const totalPriceBasket = basket.reduce(() => {
        return data.price * basket[i].quantity;
      }, 0);
      arrayP.push(totalPriceBasket);
      totalPrice.textContent = arrayP.reduce(
        (accumulator, curr) => accumulator + curr
      );
    });
}
