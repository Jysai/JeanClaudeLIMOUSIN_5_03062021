const itemImg = document.querySelector(".item__img");
const description = document.getElementById("description");
const price = document.getElementById("price");
const title = document.getElementById("title");
const option = document.getElementById("colors");

let urlParams = new URLSearchParams(location.search);
let id = urlParams.get("id");

fetch("http://localhost:3000/api/products/" + id)
  .then((response) => response.json())
  .then((data) => {
    let imgSofa = document.createElement("img");
    let titleSofa = document.createElement("h1");
    let priceSofa = document.createElement("span");
    let descriptionSofa = document.createElement("p");

    imgSofa.src = data.imageUrl;
    titleSofa.innerText = data.name;
    priceSofa.innerText = data.price;
    descriptionSofa.innerText = data.description;

    itemImg.appendChild(imgSofa);
    title.appendChild(titleSofa);
    price.appendChild(priceSofa);
    description.appendChild(descriptionSofa);

    function choiceColorOption(color) {
      let optionSofa = document.createElement("option");
      optionSofa.innerText = color;
      option.appendChild(optionSofa);
    }

    for (i = 0; i < data.colors.length; i++) {
      choiceColorOption(data.colors[i]);
    }
  });
