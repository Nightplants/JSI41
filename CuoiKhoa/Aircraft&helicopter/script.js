let input = document.querySelector(`.vehicle_input`);
let button = document.querySelector(`.find`);
let container = document.querySelector(`.container`);

function normalizeQuery(query) {
  query = query.trim();
  let match = query.match(/^([a-zA-Z]+)[\s-]?(\d+)$/);
  if (match) {
    let prefix = match[1];
    let number = match[2];
    prefix = prefix.charAt(0).toUpperCase() + prefix.slice(1);
    return `${prefix}-${number}`;
  }
  return query.charAt(0).toUpperCase() + query.slice(1);
}

async function searchWikipedia(query) {
  const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(
    query
  )}&format=json&origin=*`;
  const response = await fetch(endpoint);
  const data = await response.json();
  return data.query.search;
}

async function getSummary(title) {
  const endpoint = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
    title
  )}`;
  const response = await fetch(endpoint);
  if (!response.ok) throw new Error("Không lấy được thông tin từ Wikipedia.");
  return await response.json();
}

async function getCategories(title) {
  const endpoint = `https://en.wikipedia.org/w/api.php?action=query&prop=categories&titles=${encodeURIComponent(
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

button.addEventListener(`click`, async function () {
  let rawQuery = input.value;
  let query = normalizeQuery(rawQuery);
  container.innerHTML = "<p>Đang tìm kiếm...</p>";

  try {
    let results = await searchWikipedia(query);
    let foundAircraft = null;
    for (let result of results) {
      let categories = await getCategories(result.title);
      if (
        categories.some(
          (c) => c.includes("aircraft") || c.includes("airplanes")
        )
      ) {
        foundAircraft = result.title;
        break;
      }
    }

    if (!foundAircraft) {
      container.innerHTML = `<p>Không tìm thấy máy bay phù hợp với "${query}".</p>`;
      return;
    }

    let summary = await getSummary(foundAircraft);
    container.innerHTML = `
          ${
            summary.thumbnail
              ? `<img src="${summary.thumbnail.source}" alt="${summary.title}">`
              : ""
          }
      <h2>${summary.title}</h2>
      <p><em>${summary.description || ""}</em></p>
      <p class="extract">${summary.extract}</p>
    `;
  } catch (err) {
    console.error("Lỗi:", err);
    container.innerHTML = `<p>${err.message}</p>`;
  }
});
