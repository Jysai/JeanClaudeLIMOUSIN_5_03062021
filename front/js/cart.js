const cartItems = document.getElementById("cart__items");
let basket = JSON.parse(localStorage.getItem("Sofas"));

function onChangeClick(i, color) {
  const article = document.querySelector(
    `article[data-color=${color}][data-id="${i}"]`
  );
  const input = article.querySelector("input.itemQuantity");
  console.log(input.value);

  for (const product of basket) {
  }
}

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
        cartItems.innerHTML += `<article class="cart__item" data-id=${basket[i].id} data-color=${basket[i].color}>
          <div class="cart__item__img">
          <img src=${data.imageUrl}>
          </div>
          <div class="cart__item__content">
            <div class="cart__item__content__titlePrice">
              <h2>${data.name}</h2>
              <p>${data.price}€</p>
            </div>
            <div class="cart__item__content__settings">
              <p>Couleur : ${basket[i].color}</p>
              <div class="cart__item__content__settings__quantity">
                <p>Qté : </p>
                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${basket[i].quantity} onchange=onChangeClick('${basket[i].id}','${basket[i].color}')>
              </div>
              <div class="cart__item__content__settings__delete">
                <p class="deleteItem" onclick=onDeleteClick('${basket[i].id}')>Supprimer</p>
              </div>
            </div>
          </div>
          </article>`;
      });
  }
}

// // function onDeleteClick(id) {
// //   const index = id;
// //   basket.splice(index, 1);

// //   localStorage.setItem("Sofas", JSON.stringify(basket));
// //   location.reload();
// // }

// // function onChangeClick() {
// //   for (let i = 0; i < basket.length; i++) {
// //     let index = item.findIndex(findIdItem => findIdItem['_id'] == items._id);
// //     const result = document.querySelector(".itemQuantity");
// //     const indexQ = result.closest("input");

// //     indexQ.addEventListener("change", (event) => {
// //       result.innerHTML += ` <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${event.target.value}">`;

// //       basket[i].quantity = Number(result.value);

// //       localStorage.setItem("Sofas", JSON.stringify(basket));
// //     });
// //   }
// // }
