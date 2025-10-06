const userName = document.querySelector("strong");
userName.textContent = `${localStorage.getItem("username") || "Guest"}`;

let cart = JSON.parse(localStorage.getItem("cart") || "[]");

const cartList = document.querySelector(".cart-list");
const totalText = document.querySelector(".total strong");
const clearBtn = document.querySelector(".clear-cart");
const checkoutBtn = document.querySelector(".checkout");

function renderCart() {
  cartList.innerHTML = "";

  if (cart.length === 0) {
    cartList.innerHTML = `<p style="text-align:center;">Your cart is empty 🛒</p>`;
    totalText.textContent = "$0.00";
    return;
  }

  let total = 0;

  cart.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "cart-item";

    const name = document.createElement("h3");
    name.textContent = item.name;

    const price = document.createElement("p");
    price.textContent = item.price;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.addEventListener("click", () => {
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
    });

    div.append(name, price, removeBtn);
    cartList.appendChild(div);

    total += parseFloat(item.price.replace("$", ""));
  });

  totalText.textContent = `${total.toFixed(2)}`;
}

clearBtn.addEventListener("click", () => {
  if (confirm("Are you sure you want to clear your cart?")) {
    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  }
});

checkoutBtn.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  alert("Thank you for your purchase! 🍰");
  cart = [];
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
});

renderCart();
