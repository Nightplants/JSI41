const input = document.querySelector(".search-input");
const button = document.querySelector(".search-button");
const resultBox = document.querySelector(".result-box");
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

const userName = document.querySelector("strong");
userName.textContent = `${localStorage.getItem("username") || "Guest"}`;

function normalizeQuery(query) {
  query = query.trim();
  return query.charAt(0).toUpperCase() + query.slice(1);
}

async function searchWikipedia(query) {
  const endpoint = `https:
    query
  )}&format=json&origin=*`;
  const response = await fetch(endpoint);
  const data = await response.json();
  return data.query.search;
}

async function getSummary(title) {
  const endpoint = `https:
    title
  )}`;
  const response = await fetch(endpoint);
  if (!response.ok)
    throw new Error("Failed to get information from Wikipedia.");
  return await response.json();
}

async function getCategories(title) {
  const endpoint = `https:
    title
  )}&format=json&origin=*`;
  const response = await fetch(endpoint);
  const data = await response.json();
  const pages = data.query.pages;
  let categories = [];
  for (let pageId in pages) {
    if (pages[pageId].categories) {
      categories = pages[pageId].categories.map((c) => c.title.toLowerCase());
    }
  }
  return categories;
}

async function findDessert() {
  const rawQuery = input.value;
  const query = normalizeQuery(rawQuery);
  resultBox.innerHTML = "<p>Searching...</p>";

  try {
    const results = await searchWikipedia(query);
    let foundDessert = null;

    for (const result of results) {
      const categories = await getCategories(result.title);
      if (
        categories.some(
          (c) =>
            c.includes("cookies") ||
            c.includes("desserts") ||
            c.includes("cakes") ||
            c.includes("biscuits") ||
            c.includes("sweets") ||
            c.includes("confectionery") ||
            c.includes("pastries")
        )
      ) {
        foundDessert = result.title;
        break;
      }
    }

    if (!foundDessert) {
      resultBox.innerHTML = `<p>No dessert found matching "${query}".</p>`;
      return;
    }

    const summary = await getSummary(foundDessert);
    resultBox.innerHTML = `
      <input type="checkbox" id="favorite" class="favorite-checkbox">
      <label for="favorite" class="favorite-label">❤</label>
      ${
        summary.thumbnail
          ? `<img src="${summary.thumbnail.source}" alt="${summary.title}">`
          : ""
      }
      <h2>${summary.title}</h2>
      <p><em>${summary.description || ""}</em></p>
      <p class="summary">${summary.extract}</p>
    `;

    const checkbox = document.querySelector(".favorite-checkbox");

    if (favorites.some((item) => item.name === summary.title)) {
      checkbox.checked = true;
    }

    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        const favoriteItem = {
          name: summary.title,
          image: summary.thumbnail ? summary.thumbnail.source : "",
          description: summary.description || "",
          extract: summary.extract || "",
        };

        if (!favorites.some((item) => item.name === favoriteItem.name)) {
          favorites.push(favoriteItem);
          localStorage.setItem("favorites", JSON.stringify(favorites));
        }
      } else {
        favorites = favorites.filter((item) => item.name !== summary.title);
        localStorage.setItem("favorites", JSON.stringify(favorites));
      }
      console.log("Favorites:", favorites);
    });
  } catch (err) {
    console.error("Error:", err);
    resultBox.innerHTML = `<p>${err.message}</p>`;
  }
}

button.addEventListener("click", findDessert);
input.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    findDessert();
  }
});
