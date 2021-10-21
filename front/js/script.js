const items = document.querySelector(".items");

fetch("http://localhost:3000/api/products")
  .then((response) => response.json())
  .then((data) => {
    for (i = 0; i < data.length; i++) {
      let article = document.createElement("article");
      let nameSofa = document.createElement("h3");
      let descriptionSofa = document.createElement("p");
      let imgSofa = document.createElement("img");
      let urlSofa = document.createElement("a");

      urlSofa.href = "product.html?id=" + data[i]._id;
      imgSofa.src = data[i].imageUrl;
      nameSofa.innerText = data[i].name;
      descriptionSofa.innerText = data[i].description;

      items.appendChild(urlSofa);

      urlSofa.appendChild(article);

      article.appendChild(nameSofa);
      article.appendChild(imgSofa);
      article.appendChild(descriptionSofa);
    }
  });
