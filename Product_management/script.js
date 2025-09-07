import {
  get,
  getDatabase,
  set,
  ref,
  onValue,
  update,
  remove,
  push,
  child,
} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js";

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";

const firebaseConfig = {
  apiKey: "AIzaSyBAVKNELcNgr3xY4CFSzQD87OGgyyzxRr0",
  authDomain: "huy-jsi41.firebaseapp.com",
  projectId: "huy-jsi41",
  storageBucket: "huy-jsi41.firebasestorage.app",
  messagingSenderId: "839045868452",
  appId: "1:839045868452:web:2a912c132e219471212f31",
  measurementId: "G-2DWT67ZVQ8",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

get(ref(database, "products/")).then((snapShot) => {
  if (snapShot.exists()) {
    let product = Object.values(snapShot.val());
    localStorage.setItem(`products`, JSON.stringify(product));
  }
});

let products = JSON.parse(localStorage.getItem(`products`));

products.forEach((product) => {
  set(ref(database, "products/" + product.id), {
    id: product.id,
    name: product.name,
    image: `https://picsum.photos/300/200?random=${product.id}`,
    price: product.price,
    category: product.category,
    description: product.description,
  });
});

let body = document.querySelector(`body`);
let search_bar = document.querySelector(`.search_bar`);
let button_container = document.querySelector(`.category`);

let categorySet = new Set(products.map((p) => p.category));
categorySet.forEach((cat) => {
  let button = document.createElement(`button`);
  button.name = cat;
  button.className = `category_button`;
  button.textContent = cat;
  button_container.appendChild(button);
});

products.forEach((product) => {
  let container = document.createElement(`div`);
  container.className = `container`;
  container.dataset.category = product.category;
  let product_item = document.createElement(`div`);
  product_item.className = `product_item`;
  product_item.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>Giá: ${product.price}</p>
        <p>${product.category}</p>
        <a href="./product_detail.html?product_id=${product.id}"?>Xem chi tiết tại đây</a>
        <button class="add"">Thêm vào giỏ hàng</button> </br>
        <button class="update" id="${product.id}">Cập nhật</button> <button class="delete" id="${product.id}">Xóa</button>
    `;
  container.appendChild(product_item);
  body.appendChild(container);
});

let containers = document.querySelectorAll(`.container`);

function getActiveCategories() {
  return Array.from(document.querySelectorAll(".category_button.active")).map(
    (b) => b.name
  );
}

function applyFilter() {
  let keyword = search_bar.value.toLowerCase().trim();
  let activeCategories = getActiveCategories();

  for (let i = 0; i < containers.length; i++) {
    let text = containers[i].textContent.toLowerCase();
    let categoryMatch =
      activeCategories.length === 0 ||
      activeCategories.includes(containers[i].dataset.category);
    let searchMatch = text.includes(keyword);

    if (categoryMatch && searchMatch) {
      containers[i].style.display = `flex`;
    } else {
      containers[i].style.display = `none`;
    }
  }
}

search_bar.addEventListener(`input`, applyFilter);

let buttons = document.querySelectorAll(`.category_button`);
for (let i = 0; i < buttons.length; i++) {
  let button = buttons[i];
  button.addEventListener(`click`, function () {
    button.classList.toggle("active");
    applyFilter();
  });
}

let update_form = document.querySelector(`.update_form`);
let updates = document.querySelectorAll(`.update`);
let product_id = null;
for (let i = 0; i < updates.length; i++) {
  let update = updates[i];
  update.addEventListener(`click`, function () {
    update_form.style.display = `flex`;
    product_id = update.id;
  });
}

let update_button = document.querySelector(`.update_button`);
update_button.addEventListener(`click`, function (e) {
  e.preventDefault();
  let name = document.querySelector(`.name_update`);
  let price = document.querySelector(`.price_update`);
  let category = document.querySelector(`.category_update`);
  let description = document.querySelector(`.description_update`);
  if (!name.value && !price.value && !category.value && !description.value) {
    alert(`Xin vui lòng không bỏ trống`);
  } else {
    products.forEach((product) => {
      if (product.id == product_id) {
        product.name = name.value;
        product.price = price.value;
        product.category = category.value;
        product.description = description.value;
      }
    });
    localStorage.setItem(`products`, JSON.stringify(products));
  }
  update_form.style.display = `none`;
  window.location.reload();
});

let delete_buttons = document.querySelectorAll(`.delete`);
product_id = null;
for (let i = 0; i < delete_buttons.length; i++) {
  let deleteBtn = delete_buttons[i];
  deleteBtn.addEventListener(`click`, function () {
    products.forEach((product) => {
      if (product.id == deleteBtn.id) {
        let confirmation = confirm(
          `ban có chắc muốn xóa sản phẩm này hay không?`
        );
        if (confirmation == true) {
          products = products.filter((item) => item !== product);
          localStorage.setItem(`products`, JSON.stringify(products));
          try {
            remove(ref(getDatabase(), `products/` + product.id))
          } catch (error) {
            alert(`Xóa thất bại`)
          };
          window.location.reload();
        }
      }
    });
  });
}
