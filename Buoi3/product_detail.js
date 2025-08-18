let url_string = window.location.href;
let url = new URL(url_string);
let product_id = url.searchParams.get(`product_id`);
let products = JSON.parse(localStorage.getItem(`products`));
let back = document.querySelector(`.back`);

products.forEach((product) => {
  if (product.id == product_id) {
    let container = document.querySelector(`.container`);
    container.innerHTML = `        
        <img src="${product.image}" alt="${product.name}">
        <h1 class="product name">${product.name}</h1>
        <p class="product description">${product.description}</p>
        <p class="product category">Thể loại: ${product.category}</p>
        <p class="product price">Giá: ${product.price} VNĐ</p>
        <button class="product button">Add to cart</button>
    `;
  }
});

back.addEventListener(`click`, function () {
  window.location.href = `./index.html`;
});
