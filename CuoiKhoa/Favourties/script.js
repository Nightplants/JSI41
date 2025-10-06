const userName = document.querySelector("strong");
userName.textContent = `${localStorage.getItem("username") || "Guest"}`;

let favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

const list = document.querySelector(".favorites-list");
const clearBtn = document.querySelector(".clear-favorites");

function renderFavorites() {
  list.innerHTML = "";

  if (favorites.length === 0) {
    list.innerHTML = `<p style="text-align:center;">You have no favorite desserts yet ❤️</p>`;
    return;
  }

  favorites.forEach((item, index) => {
    const card = document.createElement("div");
    card.className = "favorite-card";

    const img = document.createElement("img");
    img.src = item.image || `https://picsum.photos/300/200?random=${index}`;
    img.alt = item.name;

    const name = document.createElement("h3");
    name.textContent = item.name;

    const price = document.createElement("p");
    price.textContent = item.price;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.addEventListener("click", () => {
      favorites.splice(index, 1);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      renderFavorites();
    });

    card.append(img, name, price, removeBtn);
    list.appendChild(card);
  });
}

clearBtn.addEventListener("click", () => {
  if (confirm("Remove all favorites?")) {
    favorites = [];
    localStorage.setItem("favorites", JSON.stringify(favorites));
    renderFavorites();
  }
});

renderFavorites();
