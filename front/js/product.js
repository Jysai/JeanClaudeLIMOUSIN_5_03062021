const itemImg = document.querySelector(".item__img");
const title = document.getElementById("title");
const price = document.getElementById("price");
const description = document.getElementById("description");
const option = document.getElementById("colors");

let urlParams = new URLSearchParams(location.search);
let id = urlParams.get("id");

fetch("http://localhost:3000/api/products/" + id)
  .then((response) => response.json())
  .then((data) => {
    itemImg.innerHTML = `<img src="${data.imageUrl}">`;
    title.textContent = `${data.name}`;
    price.textContent = `${data.price}`;
    description.textContent = `${data.description}`;
    option.innerHTML = data.colors.map(c => `<option>${c}</option>`);

    // let imgSofa = document.createElement("img");
    // let titleSofa = document.createElement("h1");
    // let priceSofa = document.createElement("span");
    // let descriptionSofa = document.createElement("p");

    // imgSofa.src = data.imageUrl;
    // titleSofa.innerText = data.name;
    // priceSofa.innerText = data.price;
    // descriptionSofa.innerText = data.description;

    // itemImg.appendChild(imgSofa);
    // title.appendChild(titleSofa);
    // price.appendChild(priceSofa);
    // description.appendChild(descriptionSofa);

    // function addColorOption(color) {
    //   let optionProduct = document.createElement("option");
    //   optionProduct.innerText = color;
    //   option.appendChild(optionProduct);
    // }

    // for (i = 0; i < data.colors.length; i++) {
    //   addColorOption(data.colors[i]);
    // }
  });
