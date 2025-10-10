import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  push,
  onValue,
  remove,
  get,
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
    description: "Crispy and buttery Danish cookies with a golden texture.",
  },
  {
    name: "Chocolate Chip Cookies",
    price: "$5.00",
    description: "Classic cookies filled with melting chocolate chips.",
  },
  {
    name: "Macarons",
    price: "$8.50",
    description: "French almond meringue cookies with colorful flavors.",
  },
  {
    name: "Tiramisu",
    price: "$6.00",
    description:
      "Italian dessert made with coffee-soaked biscuits and mascarpone cream.",
  },
  {
    name: "Cheesecake",
    price: "$7.00",
    description:
      "Rich, creamy New York-style cheesecake topped with strawberries.",
  },
  {
    name: "Cupcake",
    price: "$3.50",
    description: "Soft vanilla cupcake with colorful sprinkles and frosting.",
  },
  {
    name: "Croissant",
    price: "$2.80",
    description: "Flaky French pastry made with layers of buttery dough.",
  },
  {
    name: "Donut",
    price: "$2.50",
    description:
      "Soft ring donut coated in sweet glaze — simple and delicious.",
  },
  {
    name: "Brownie",
    price: "$4.00",
    description: "Moist and fudgy chocolate brownie with a rich cocoa flavor.",
  },
  {
    name: "Fruit Tart",
    price: "$6.80",
    description: "Sweet pastry crust topped with custard and fresh fruits.",
  },
  {
    name: "Mochi Ice Cream",
    price: "$6.50",
    description: "Japanese mochi stuffed with sweet ice cream filling.",
  },
  {
    name: "Pancakes",
    price: "$5.00",
    description: "Fluffy pancakes topped with syrup and butter.",
  },
];

const defaultGrid = document.querySelector(".default-products");
const myGrid = document.querySelector(".my-products");
const addBtn = document.querySelector("#addProduct");

function startStore() {
  const myProductsRef = ref(db, `user/${localStorage.getItem(`Id`)}/myProducts`);

  onValue(myProductsRef, (snapshot) => {
    const data = snapshot.val() || {};
    const myProducts = Object.entries(data).map(([id, value]) => ({
      id,
      ...value,
    }));
    renderAll(myProducts);
  });

  addBtn.addEventListener("click", async () => {
    const name = document.querySelector("#newName").value.trim();
    const price = document.querySelector("#newPrice").value.trim();
    const desc = document.querySelector("#newDesc").value.trim();

    if (!name || !price || !desc) {
      alert("Please fill all fields!");
      return;
    }

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

    document.querySelector("#newName").value = "";
    document.querySelector("#newPrice").value = "";
    document.querySelector("#newDesc").value = "";
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
    const emptyMsg = document.createElement("p");
    emptyMsg.textContent = "No user-added products yet.";
    myGrid.appendChild(emptyMsg);
  }
}

function createCard(dessert, isUser = false, id = null) {
  const card = document.createElement("div");
  card.className = "product-card";

  const img = document.createElement("img");
  img.src = dessert.image || randomImage();
  img.alt = dessert.name;

  const title = document.createElement("h2");
  title.textContent = dessert.name;

  const desc = document.createElement("p");
  desc.className = "product-description";
  desc.textContent = dessert.description;

  const price = document.createElement("p");
  price.className = "product-price";
  price.textContent = dessert.price;

  const buyBtn = document.createElement("button");
  buyBtn.className = "buy-btn";
  buyBtn.textContent = "Buy Now";
  buyBtn.addEventListener("click", () => {
    let cart = JSON.parse(localStorage.getItem("cart") || "[]");
    cart.push({ id: dessert.id, name: dessert.name, price: dessert.price });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`"${dessert.name}" added to cart!`);
  });

  card.append(img, title, desc, price, buyBtn);

  if (isUser) {
    const delBtn = document.createElement("button");
    delBtn.className = "delete-btn";
    delBtn.textContent = "Delete";
    delBtn.addEventListener("click", async () => {
      if (confirm(`Delete your product "${dessert.name}"?`)) {
        await remove(ref(db, `user/${localStorage.getItem(`Id`)}/myProducts/${id}`));
        alert(`"${dessert.name}" deleted successfully!`);
      }
    });
    card.appendChild(delBtn);
  }

  return card;
}

startStore();
