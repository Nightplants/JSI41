import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  push,
  onValue,
  remove,
  update,
} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBL9Ox9HNV3Mxg94fYAbDJxsplSmeXXa-E",
  authDomain: "jsi-cuoi-khoa-93fb2.firebaseapp.com",
  databaseURL: "https://jsi-cuoi-khoa-93fb2-default-rtdb.firebaseio.com",
  projectId: "jsi-cuoi-khoa-93fb2",
  storageBucket: "jsi-cuoi-khoa-93fb2.firebasestorage.app",
  messagingSenderId: "580788334009",
  appId: "1:580788334009:web:3494fd5fd6580ed75f5a68",
  measurementId: "G-7Q4R5RCRZ3",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

let username = document.querySelector("strong");
username.textContent = localStorage.getItem("username") || "Guest";

function randomImage() {
  const randomId = Math.floor(Math.random() * 1000);
  return `https://picsum.photos/300/200?random=${randomId}`;
}

const defaultDesserts = [
  {
    name: "Butter Cookies",
    price: "$4.50",
    description: "Crispy Danish cookies with golden texture.",
  },
  {
    name: "Chocolate Chip Cookies",
    price: "$5.00",
    description: "Classic cookies with chocolate chips.",
  },
  {
    name: "Macarons",
    price: "$8.50",
    description: "French almond meringue cookies with colorful flavors.",
  },
  {
    name: "Tiramisu",
    price: "$6.00",
    description: "Coffee-soaked biscuits with mascarpone cream.",
  },
  {
    name: "Cheesecake",
    price: "$7.00",
    description: "New York-style cheesecake with strawberries.",
  },
  {
    name: "Cupcake",
    price: "$3.50",
    description: "Vanilla cupcake with colorful frosting.",
  },
  {
    name: "Croissant",
    price: "$2.80",
    description: "Flaky buttery French pastry.",
  },
  { name: "Donut", price: "$2.50", description: "Sweet glazed donut." },
  { name: "Brownie", price: "$4.00", description: "Fudgy chocolate brownie." },
  {
    name: "Fruit Tart",
    price: "$6.80",
    description: "Custard-filled tart with fruits.",
  },
  {
    name: "Mochi Ice Cream",
    price: "$6.50",
    description: "Mochi filled with ice cream.",
  },
  {
    name: "Pancakes",
    price: "$5.00",
    description: "Fluffy pancakes with syrup.",
  },
];

const defaultGrid = document.querySelector(".default-products");
const myGrid = document.querySelector(".my-products");
const addBtn = document.querySelector("#addProduct");
const nameInput = document.querySelector("#newName");
const priceInput = document.querySelector("#newPrice");
const descInput = document.querySelector("#newDesc");

const myProductsRef = ref(db, `user/myProducts`);

let editingId = null;

function startStore() {
  onValue(myProductsRef, (snapshot) => {
    const data = snapshot.val() || {};
    const myProducts = Object.entries(data).map(([id, value]) => ({
      id,
      ...value,
    }));
    renderAll(myProducts);
  });

  addBtn.addEventListener("click", async () => {
    const name = nameInput.value.trim();
    const price = priceInput.value.trim();
    const desc = descInput.value.trim();

    if (!name || !price || !desc) {
      alert("Please fill all fields!");
      return;
    }

    if (editingId) {
      const productRef = ref(db, `user/myProducts/${editingId}`);
      await update(productRef, {
        name,
        price,
        description: desc,
      });
      alert(`"${name}" updated successfully!`);
      editingId = null;
      addBtn.textContent = "Add Product";
    } else {
      const newRef = push(myProductsRef);
      const newId = newRef.key;
      const newProduct = {
        id: newId,
        name,
        price,
        description: desc,
        image: randomImage(),
        addedBy: localStorage.getItem("username") || "Guest",
      };
      await set(newRef, newProduct);
      alert(`"${name}" added successfully!`);
    }

    nameInput.value = "";
    priceInput.value = "";
    descInput.value = "";
  });
}

function renderAll(myProducts) {
  defaultGrid.innerHTML = "";
  myGrid.innerHTML = "";

  defaultDesserts.forEach((dessert) => {
    const card = createCard(dessert, false);
    defaultGrid.appendChild(card);
  });

  if (myProducts.length > 0) {
    myProducts.forEach((dessert) => {
      const card = createCard(dessert, true, dessert.id);
      myGrid.appendChild(card);
    });
  } else {
    const msg = document.createElement("p");
    msg.textContent = "No user-added products yet.";
    myGrid.appendChild(msg);
  }
}

function createCard(dessert, isUser = false, id = null) {
  const card = document.createElement("div");
  card.className = "product-card";

  card.innerHTML = `
    <img src="${dessert.image || randomImage()}" alt="${dessert.name}">
    <h2>${dessert.name}</h2>
    <p class="product-description">${dessert.description}</p>
    <p class="product-price">${dessert.price}</p>
    <p style="font-size:14px;color:#7a5a2c;">ID: ${dessert.id || "N/A"}</p>
  `;

  const buyBtn = document.createElement("button");
  buyBtn.className = "buy-btn";
  buyBtn.textContent = "Buy Now";
  buyBtn.addEventListener("click", () => {
    let cart = JSON.parse(localStorage.getItem("cart") || "[]");
    cart.push({ id: dessert.id, name: dessert.name, price: dessert.price });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`"${dessert.name}" added to cart!`);
  });
  card.appendChild(buyBtn);

  if (isUser) {
    const editBtn = document.createElement("button");
    editBtn.className = "edit-btn";
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", () => {
      nameInput.value = dessert.name;
      priceInput.value = dessert.price;
      descInput.value = dessert.description;
      editingId = id;
      addBtn.textContent = "Save Changes";
    });

    const delBtn = document.createElement("button");
    delBtn.className = "delete-btn";
    delBtn.textContent = "Delete";
    delBtn.addEventListener("click", async () => {
      if (confirm(`Delete your product "${dessert.name}"?`)) {
        await remove(ref(db, `user/myProducts/${id}`));
        alert(`"${dessert.name}" deleted successfully!`);
      }
    });

    card.append(editBtn, delBtn);
  }

  return card;
}

startStore();
