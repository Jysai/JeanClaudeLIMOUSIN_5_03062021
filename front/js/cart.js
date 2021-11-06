const cartItems = document.getElementById("cart__items");
let basket = JSON.parse(localStorage.getItem("Sofas")); //localStorage
const totalQuantity = document.getElementById("totalQuantity");
const totalPrice = document.getElementById("totalPrice");
const orderId = document.getElementById("orderId");
const cartOrder = document.querySelector(".cart__order");
const cartPrice = document.querySelector(".cart__price");
const h1 = document.querySelector("h1");
const order = document.getElementById("order");

let urlParams = new URLSearchParams(location.search);
let idProduct = urlParams.get("orderId");

function addOrderNumber() {
  orderId.textContent = idProduct;
}

function basketEmpty() {
  if (basket.length === 0) {
    window.location.reload();
  }
}

function getArticleHTML(id, color) {
  return document.querySelector(
    `article[data-color="${color}"][data-id="${id}"]`
  );
}

// Permet de changer la quantité d'un produit dans le panier
function onChangeClick(id, color) {
  const article = document.querySelector(
    `article[data-color="${color}"][data-id="${id}"]`
  );
  const input = article.querySelector("input.itemQuantity");

  for (const product of basket) {
    if (product.color == color && product.id == id) {
      modificationProduct = basket.indexOf(product);
    }
  }
  basket[modificationProduct].quantity = +input.value;

  localStorage.setItem("Sofas", JSON.stringify(basket));

  attachTotalQuantityBasket();
  attachTotalPriceBasket();
}

// Permet de supprimer un produit du panier
function onClickDelete(id, color) {
  for (const product of basket) {
    if (product.color == color && product.id == id) {
      modificationProduct = basket.indexOf(product);
    }
  }
  basket.splice(modificationProduct, 1);

  localStorage.setItem("Sofas", JSON.stringify(basket));

  attachTotalQuantityBasket();
  attachTotalPriceBasket();
  getArticleHTML(id, color).remove();
  basketEmpty();
}

if (orderId) {
  addOrderNumber();
} else {
  addBasketFill();
  attachTotalQuantityBasket();
  attachTotalPriceBasket();
  formValidation();
  sendOrderBasket();
}

// Permet d'additionner la quantité total des produits
function attachTotalQuantityBasket() {
  let arrayQuantitys = [];
  for (const product of basket) {
    let itemQuantity = product.quantity;
    arrayQuantitys.push(itemQuantity);
    totalQuantity.textContent = arrayQuantitys.reduce(
      (previousValue, currentValue) => previousValue + currentValue
    );
  }
}

// Le total du panier
function attachTotalPriceBasket() {
  const arrayPrices = [];
  for (let i = 0; i < basket.length; i++) {
    fetch("http://localhost:3000/api/products/" + basket[i].id)
      .then((response) => response.json())
      .then((data) => {
        const totalPriceBasket = data.price * basket[i].quantity;
        arrayPrices.push(totalPriceBasket);
        totalPrice.textContent = arrayPrices.reduce(
          (previousValue, currentValue) => previousValue + currentValue
        );
      });
  }
}

function addBasketFill() {
  // Boucle qui permet de récuperer les informations dans le localstorage puis affiche un récapitulatif dans la page Panier
  if (basket === null || basket.length === 0) {
    h1.textContent = "Votre panier est vide";
    cartOrder.style.display = "none";
    cartPrice.style.display = "none";
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
              <p >${data.price}€</p>
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
}

//------------------------------//
function formValidation() {
  let tick = true;

  //Verifie le champs Prénom
  if (document.getElementById("firstName").value.length == 0) {
    tick = false;
    document.getElementById("firstNameErrorMsg").innerHTML =
      "Le prénom est requis";
    document.getElementById("firstName").style.border = "1px solid red";
  } else if (
    !document
      .getElementById("firstName")
      .value.match(
        /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u
      )
  ) {
    tick = false;
    document.getElementById("firstNameErrorMsg").innerHTML =
      "Le prénom ne doit pas comporter de chiffres ni de caractères spéciaux";
    document.getElementById("firstName").style.border = "1px solid red";
  } else {
    document.getElementById("firstNameErrorMsg").innerHTML = "";
    document.getElementById("firstName").style.border = "1px solid green";
  }

  //Verifie le champs Nom
  if (document.getElementById("lastName").value.length == 0) {
    tick = false;
    document.getElementById("lastNameErrorMsg").innerHTML = "Le nom est requis";
    document.getElementById("lastName").style.border = "1px solid red";
  } else if (
    !document
      .getElementById("lastName")
      .value.match(
        /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u
      )
  ) {
    tick = false;
    document.getElementById("lastNameErrorMsg").innerHTML =
      "Le prénom ne doit pas comporter de chiffres ni de caractères spéciaux";
    document.getElementById("lastName").style.border = "1px solid red";
  } else {
    document.getElementById("lastNameErrorMsg").innerHTML = "";
    document.getElementById("lastName").style.border = "1px solid green";
  }

  //Verifie le champs Adresse
  if (document.getElementById("address").value.length == 0) {
    tick = false;
    document.getElementById("addressErrorMsg").innerHTML =
      "L'adresse est requise";
    document.getElementById("address").style.border = "1px solid red";
  } else if (
    !document
      .getElementById("address")
      .value.match(/^([0-9]*)?([a-zA-Z, \.]*)?([0-9]{5})?([a-zA-Z]*)+$/)
  ) {
    tick = false;
    document.getElementById("addressErrorMsg").innerHTML =
      "L'adresse ne doit pas comporter de caractères spéciaux";
    document.getElementById("address").style.border = "1px solid red";
  } else {
    document.getElementById("addressErrorMsg").innerHTML = "";
    document.getElementById("address").style.border = "1px solid green";
  }

  //Verifie le champs Ville
  if (document.getElementById("city").value.length == 0) {
    tick = false;
    document.getElementById("cityErrorMsg").innerHTML = "La ville est requise";
    document.getElementById("city").style.border = "1px solid red";
  } else if (
    !document
      .getElementById("city")
      .value.match(/^([0-9]*)?([a-zA-Z, \.]*)?([0-9]{5})?([a-zA-Z]*)+$/)
  ) {
    tick = false;
    document.getElementById("cityErrorMsg").innerHTML =
      "La ville ne doit pas comporter de caractères spéciaux";
    document.getElementById("city").style.border = "1px solid red";
  } else {
    document.getElementById("cityErrorMsg").innerHTML = "";
    document.getElementById("city").style.border = "1px solid green";
  }

  //Verifie le champs Email
  if (document.getElementById("email").value.length == 0) {
    tick = false;
    document.getElementById("emailErrorMsg").innerHTML = "L'email est requis";
    document.getElementById("email").style.border = "1px solid red";
  } else if (
    !document
      .getElementById("email")
      .value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
  ) {
    document.getElementById("emailErrorMsg").innerHTML =
      "Format de l'email non autorisé";
    document.getElementById("email").style.border = "1px solid red";
    tick = false;
  } else {
    document.getElementById("emailErrorMsg").innerHTML = "";
    document.getElementById("email").style.border = "1px solid green";
  }

  //Permet de débloquer le bouton Commander si tous les champs sont valides
  if (tick) {
    document.getElementById("order").disabled = false;
  } else {
    document.getElementById("order").disabled = true;
  }

  
}
onkeyup = formValidation;

function sendOrderBasket() {
  order.addEventListener("click", (event) => {
    let contact = {
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      address: document.getElementById("address").value,
      city: document.getElementById("city").value,
      email: document.getElementById("email").value,
    };

    const products = [];
    for (let product of basket) {
      products.push(product.id);
    }

    fetch("http://localhost:3000/api/products/order/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contact, products }),
    })
      .then((response) => response.json())
      .then((data) => {
        localStorage.clear();
        localStorage.setItem("Contact", JSON.stringify(data.contact));
        localStorage.setItem("Produits", JSON.stringify(data.products));

        window.location = `confirmation.html?orderId=${data.orderId}`;
      });
    event.preventDefault();
    checkFields();
  });
}
