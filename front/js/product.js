const imageSofa = document.querySelector(".item__img");
const titleSofa = document.getElementById("title");
const priceSofa = document.getElementById("price");
const descriptionSofa = document.getElementById("description");
const colorSofa = document.getElementById("colors");
const quantitySofa = document.getElementById("quantity");
const btnAddBasket = document.getElementById("addToCart");

const basket = JSON.parse(localStorage.getItem("Sofas")) || [];

let urlParams = new URLSearchParams(location.search);
let idSofa = urlParams.get("id");

fetch("http://localhost:3000/api/products/" + idSofa)
  .then((response) => response.json())
  .then((data) => {
    imageSofa.innerHTML = `<img src="${data.imageUrl}">`;
    titleSofa.textContent = `${data.name}`;
    priceSofa.textContent = `${data.price}`;
    descriptionSofa.textContent = `${data.description}`;
    colorSofa.innerHTML = data.colors.map((a) => `<option>${a}</option>`);

    btnAddBasket.addEventListener("click", (e) => {
      
      class sofa {
        constructor(id, color, quantity, name, image, price) {
          this.idSofa = id;
          this.colorSofa = color;
          this.quantitySofa = +quantity;
          this.titleSofa = name;
          this.imageSofa = image;
          this.priceSofa = price;
        }
      }

      let newProduct = new sofa(idSofa, colorSofa.value, quantitySofa.value, titleSofa.textContent, imageSofa.innerHTML, priceSofa.textContent);
      
      let alreadyPresent = false;
      let modificationProduct;
      for (product of basket) {
        switch (product.colorSofa) {
          case newProduct.colorSofa:
            alreadyPresent = true;
            modificationProduct = basket.indexOf(product);
        }
      }

      if (alreadyPresent) {
        basket[modificationProduct].quantitySofa =
          basket[modificationProduct].quantitySofa + newProduct.quantitySofa;
        localStorage.setItem("Sofas", JSON.stringify(basket));
      } else {
        basket.push(newProduct);
        localStorage.setItem("Sofas", JSON.stringify(basket));
      }
    });
  });

// let imgSofa = document.createElement("img");
// let titleSofaSofa = document.createElement("h1");
// let priceSofaSofa = document.createElement("span");
// let descriptionSofaSofa = document.createElement("p");

// imgSofa.src = data.imageSofaUrl;
// titleSofaSofa.innerText = data.name;
// priceSofaSofa.innerText = data.priceSofa;
// descriptionSofaSofa.innerText = data.descriptionSofa;

// itemImg.appendChild(imgSofa);
// titleSofa.appendChild(titleSofaSofa);
// priceSofa.appendChild(priceSofaSofa);
// descriptionSofa.appendChild(descriptionSofaSofa);

// function addColorOption(color) {
//   let optionProduct = document.createElement("option");
//   optionProduct.innerText = color;
//   option.appendChild(optionProduct);
// }

// for (i = 0; i < data.colors.length; i++) {
//   addColorOption(data.colors[i]);
// }
