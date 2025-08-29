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

let productName = document.querySelector(`.name`);
let productPrice = document.querySelector(`.price`);
let productCategory = document.querySelector(`.category`);
let productDescription = document.querySelector(`.description`);
let addBtn = document.querySelector(`.addBtn`);
addBtn.addEventListener(`click`, function () {
  let productId = window.uuidv4();

  set(ref(database, "products/" + productId), {
    id: productId,
    name: productName.value,
    price: productPrice.value,
    category: productCategory.value,
    description: productDescription.value,
  });

  productName.value = ``;
  productPrice.value = ``;
  productCategory.value = ``;
  productDescription.value = ``;
});

let getAllBtn = document.querySelector(".getAllBtn");
getAllBtn.addEventListener("click", function () {
  get(ref(database, "products/")).then((snapShot) => {
    if (snapShot.exists()) {
      let product = Object.values(snapShot.val())
      localStorage.setItem(`additionProducts`, JSON.stringify(product))
    }
  });
});
