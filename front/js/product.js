const imageProduct = document.querySelector(".item__img");
const titleProduct = document.getElementById("title");
const priceProduct = document.getElementById("price");
const descriptionProduct = document.getElementById("description");
const colorProduct = document.getElementById("colors");
const quantityProduct = document.getElementById("quantity");
const btnAddBasket = document.getElementById("addToCart");
let basket = JSON.parse(localStorage.getItem("Sofas")) || [];


console.log(btnAddBasket);

let urlParams = new URLSearchParams(location.search);
let idProduct = urlParams.get("id");

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

      let modificationProduct;

      for (product of basket) {
        console.log(product.color , product.id);
        if (product.color == newProduct.color && product.id == newProduct.id) {
            modificationProduct = basket.indexOf(product);
        }
      }
     
      if (modificationProduct == null) {
        basket.push(newProduct);
      } else {
        basket[modificationProduct].quantity =
        basket[modificationProduct].quantity + newProduct.quantity;
      }
      localStorage.setItem("Sofas", JSON.stringify(basket));
    });
  });
