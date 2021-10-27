const imageProduct = document.querySelector(".item__img");
const titleProduct = document.getElementById("title");
const priceProduct = document.getElementById("price");
const descriptionProduct = document.getElementById("description");
const colorProduct = document.getElementById("colors");
const quantityProduct = document.getElementById("quantity");
const btnAddBasket = document.getElementById("addToCart");
let basket = JSON.parse(localStorage.getItem("Sofas")) || []; //localStorage

let urlParams = new URLSearchParams(location.search);
let idProduct = urlParams.get("id");
console.log(idProduct);

// fetch pour afficher les informations du produit concerné avec URLSearchParams
fetch("http://localhost:3000/api/products/" + idProduct)
  .then((response) => response.json())
  .then((data) => {
    imageProduct.innerHTML = `<img src="${data.imageUrl}">`;
    titleProduct.textContent = `${data.name}`;
    priceProduct.textContent = `${data.price}`;
    descriptionProduct.textContent = `${data.description}`;
    colorProduct.innerHTML = data.colors
      .map((a) => `<option>${a}</option>`)
      .reduce((acc, item) => acc + item);
    quantityProduct.setAttribute("value", 1);

    btnAddBasket.addEventListener("click", (e) => {
      class Sofa {
        constructor(id, color, quantity) {
          this.id = id;
          this.color = color;
          this.quantity = +quantity;
        }
      }

      let newProduct = new Sofa(
        idProduct,
        colorProduct.value,
        quantityProduct.value
      );

      let productIndex;

      //boucle qui permet de connaitre l'id et la couleur du produit présent dans le localStorage pour modifier la quantité dans la condition ligne 56
      for (product of basket) {
        console.log(product.color, product.id);
        if (product.color == newProduct.color && product.id == newProduct.id) {
          productIndex = basket.indexOf(product);
        }
      }

      //Condition pour push le produit dans le localStorage, si déjà présent dans le localStorage on modifie seulement la quantité
      if (productIndex == null) {
        basket.push(newProduct);
      } else {
        basket[productIndex].quantity =
          basket[productIndex].quantity + newProduct.quantity;
      }
      localStorage.setItem("Sofas", JSON.stringify(basket));
    });
  });
