const cartItems = document.getElementById("cart__items"); 
let basket = JSON.parse(localStorage.getItem("Sofas")); //localStorage


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
function onDeleteClick(id, color) {
  const article = document.querySelector(
    `article[data-color="${color}"][data-id="${id}"]`
  );
  const deleteItem = article.querySelector("p.deleteItem");
  console.log(deleteItem);

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

function totalPrice() {
  //creation d'un tableau qui contiendra chaque prix du panier
  let prixPanier = [];
  //On boucle sur tout les produit trouver dans le panier
  for (produit of userPanier) {
    //On transforme les string prix en number
    let prixTotal = parseInt(produit.prix) * parseInt(produit.quantite);
    prixPanier.push(prixTotal);
  }
  //On utilise la méthode reduce pour additioner tout nos prix du panier
  const calculTotal = (acc, curr) => acc + curr;
  document.getElementById("totalPrice").textContent =
    prixPanier.reduce(calculTotal);
}






// Boucle qui permet de récuperer les informations dans le localstorage puis affiche un récapitulatif dans la page Panier
if (basket === null || basket === []) {
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
        const productPriceAndQuantity = data.price * basket[i].quantity
        cartItems.innerHTML += `<article class="cart__item" data-id=${basket[i].id} data-color=${basket[i].color}>
          <div class="cart__item__img">
          <img src=${data.imageUrl}>
          </div>
          <div class="cart__item__content">
            <div class="cart__item__content__titlePrice">
              <h2>${data.name}</h2>
              <p>${productPriceAndQuantity}€</p>
            </div>
            <div class="cart__item__content__settings">
              <p>Couleur : ${basket[i].color}</p>
              <div class="cart__item__content__settings__quantity">
                <p>Qté : </p>
                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${basket[i].quantity} onchange=onChangeClick('${basket[i].id}','${basket[i].color}')>
              </div>
              <div class="cart__item__content__settings__delete">
                <p class="deleteItem" onclick=onDeleteClick('${basket[i].id}','${basket[i].color}')>Supprimer</p>
              </div>
            </div>
          </div>
          </article>`;
      });
  }
}
