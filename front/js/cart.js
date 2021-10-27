const cartItems = document.getElementById("cart__items");
let basket = JSON.parse(localStorage.getItem("Sofas")); //localStorage
const totalQuantity = document.getElementById("totalQuantity");
const totalPrice = document.getElementById("totalPrice");
const orderId = document.getElementById("orderId");

let urlParams = new URLSearchParams(location.search);
let idProduct = urlParams.get("orderId");

function addOrderNumber() {
  orderId.textContent = idProduct;
}

function getArticleHTML(id, color) {
  return  document.querySelector(
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
  attachTotalPriceBasket()
}

// Permet de supprimer un produit du panier
function onClickDelete(id, color) {
  for (const product of basket) {
    if (product.color == color && product.id == id) {
      modificationProduct = basket.indexOf(product);
    }
  }
  getArticleHTML(id, color).remove()
  basket.splice(modificationProduct, 1);


  localStorage.setItem("Sofas", JSON.stringify(basket));
  attachTotalQuantityBasket();
}

if (orderId) {
  addOrderNumber();
} else {
  attachTotalQuantityBasket();
  attachTotalPriceBasket();
  addBasketFill();
  checkFields();
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

function checkFields() {
  const order = document.getElementById("order");

  function firstAndLastName(data) {
    let letters =
      /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
    if (letters.test(data)) {
      return true;
    }
    return false;
  }

  function postalAdress(data) {
    let letters = /^([0-9]*)?([a-zA-Z, \.]*)?([0-9]{5})?([a-zA-Z]*)+$/;
    if (letters.test(data)) {
      return true;
    }
    return false;
  }

  function validateEmail(data) {
    let testData = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (testData.test(data)) {
      return true;
    }
    return false;
  }

  document.getElementById("lastName").onblur = function () {
    let status = document.getElementById("lastName").value;
    if (status.length <= 0) {
      document.getElementById("lastNameErrorMsg").innerHTML =
        "Le champ Nom est vide!";
    } else if (!firstAndLastName(status)) {
      document.getElementById("lastNameErrorMsg").innerHTML =
        "Caractères invalides!";
    } else {
      document.getElementById("lastNameErrorMsg").innerHTML = "";
    }
  };

  document.getElementById("firstName").onblur = function () {
    let status = document.getElementById("firstName").value;
    if (status.length <= 0) {
      document.getElementById("firstNameErrorMsg").innerHTML =
        "Le champ Prénom est vide!";
    } else if (!firstAndLastName(status)) {
      document.getElementById("firstNameErrorMsg").innerHTML =
        "Caractères invalides!";
    } else {
      document.getElementById("firstNameErrorMsg").innerHTML = "";
    }
  };

  document.getElementById("address").onblur = function () {
    let status = document.getElementById("address").value;
    if (status.length <= 0) {
      document.getElementById("addressErrorMsg").innerHTML =
        "Le champ Adresse est vide!";
    } else if (!postalAdress(status)) {
      document.getElementById("addressErrorMsg").innerHTML =
        "Caractères invalides!";
    } else {
      document.getElementById("addressErrorMsg").innerHTML = "";
    }
  };

  document.getElementById("city").onblur = function () {
    let status = document.getElementById("city").value;
    if (status.length <= 0) {
      document.getElementById("cityErrorMsg").innerHTML =
        "Le champ Ville est vide!";
    } else if (!postalAdress(status)) {
      document.getElementById("cityErrorMsg").innerHTML =
        "Caractères invalides!";
    } else {
      document.getElementById("cityErrorMsg").innerHTML = "";
    }
  };

  document.getElementById("email").onblur = function () {
    let status = document.getElementById("email").value;
    if (status.length <= 0) {
      document.getElementById("emailErrorMsg").innerHTML =
        "Le champ Email est vide!";
    } else if (!validateEmail(status)) {
      document.getElementById("emailErrorMsg").innerHTML =
        "Adresse e-mail invalide!";
    } else {
      document.getElementById("emailErrorMsg").innerHTML = "";
    }
  }; 
}

function sendOrderBasket() {
  order.addEventListener("click", () => {
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
        localStorage.setItem("Contact", JSON.stringify(data.contact));
        localStorage.setItem("Produits", JSON.stringify(data.products));
        window.location = `confirmation.html?orderId=${data.orderId}`;
      });
  });
}
