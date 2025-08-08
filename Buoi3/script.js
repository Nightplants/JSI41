const products = [
  {
    id: 1,
    name: `Áo Thun Nam Cotton`,
    price: 199000,
    category: `Thời trang`,
    description: `Áo thun nam chất liệu cotton mềm mại, thoáng mát.`,
    image: `https://picsum.photos/300/200?random=1`,
  },
  {
    id: 2,
    name: `Giày Thể Thao Unisex`,
    price: 450000,
    category: `Giày dép`,
    description: `Giày thể thao unisex phong cách trẻ trung, năng động.`,
    image: `https://picsum.photos/300/200?random=2`,
  },
  {
    id: 3,
    name: `Tai Nghe Bluetooth`,
    price: 350000,
    category: `Điện tử`,
    description: `Tai nghe Bluetooth âm thanh sống động, pin lâu.`,
    image: `https://picsum.photos/300/200?random=3`,
  },
  {
    id: 4,
    name: `Túi Xách Da Nữ`,
    price: 599000,
    category: `Phụ kiện`,
    description: `Túi xách da nữ sang trọng, phù hợp mọi dịp.`,
    image: `https://picsum.photos/300/200?random=4`,
  },
  {
    id: 5,
    name: `Bình Giữ Nhiệt 500ml`,
    price: 150000,
    category: `Gia dụng`,
    description: `Bình giữ nhiệt 500ml giữ nóng/lạnh lên đến 12 giờ.`,
    image: `https://picsum.photos/300/200?random=5`,
  },
];

let body = document.querySelector(`body`);
let containers = document.getElementsByClassName(`container`);
let search_bar = document.querySelector(`.search_bar`);
let category_search = document.querySelector(`.category_search`);

products.forEach((product) => {
  let container = document.createElement(`div`);
  container.className = `container`;
  let product_item = document.createElement(`div`);
  product_item.className = `product_item`;
  product_item.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>Giá: ${product.price}</p>
        <p>${product.category}</p>
        <button>Thêm vào giỏ hàng</button>
    `;
  container.appendChild(product_item);
  body.appendChild(container);
});

search_bar.addEventListener(`input`, function () {
  let keyword = search_bar.value.toLowerCase().trim();

  for (let i = 0; i < containers.length; i++) {
    let text = containers[i].textContent.toLowerCase();
    if (text.includes(keyword)) {
      containers[i].style.display = `flex`;
    } else {
      containers[i].style.display = `none`;
    }
  }
});

category_search.addEventListener(`input`, function () {
  let keyword = category_search.value.toLowerCase().trim();

  for (let i = 0; i < containers.length; i++) {
    let text = containers[i].children[0].children[3].textContent.toLowerCase();

    if (text.includes(keyword)) {
      containers[i].style.display = `flex`;
    } else {
      containers[i].style.display = `none`;
    }
  }
});
