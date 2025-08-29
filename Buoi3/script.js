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

  {
    id: 6,
    name: `Mũ Lưỡi Trai Nam`,
    price: 99000,
    category: `Phụ kiện`,
    description: `Mũ lưỡi trai thời trang cho nam.`,
    image: `https://picsum.photos/300/200?random=6`,
  },
  {
    id: 7,
    name: `Balo Laptop Chống Nước`,
    price: 350000,
    category: `Phụ kiện`,
    description: `Balo laptop chống nước, nhiều ngăn tiện lợi.`,
    image: `https://picsum.photos/300/200?random=7`,
  },
  {
    id: 8,
    name: `Điện Thoại Android A1`,
    price: 2990000,
    category: `Điện tử`,
    description: `Điện thoại Android giá rẻ, hiệu năng ổn định.`,
    image: `https://picsum.photos/300/200?random=8`,
  },
  {
    id: 9,
    name: `Loa Bluetooth Mini`,
    price: 250000,
    category: `Điện tử`,
    description: `Loa Bluetooth nhỏ gọn, âm thanh sống động.`,
    image: `https://picsum.photos/300/200?random=9`,
  },
  {
    id: 10,
    name: `Bộ LEGO City`,
    price: 899000,
    category: `Đồ chơi`,
    description: `Bộ LEGO City cho trẻ em từ 6 tuổi trở lên.`,
    image: `https://picsum.photos/300/200?random=10`,
  },
  {
    id: 11,
    name: `Búp Bê Barbie`,
    price: 499000,
    category: `Đồ chơi`,
    description: `Búp bê Barbie với phụ kiện thời trang.`,
    image: `https://picsum.photos/300/200?random=11`,
  },
  {
    id: 12,
    name: `Sách Kỹ Năng Sống`,
    price: 120000,
    category: `Sách`,
    description: `Cuốn sách dạy kỹ năng sống cho mọi lứa tuổi.`,
    image: `https://picsum.photos/300/200?random=12`,
  },
  {
    id: 13,
    name: `Tiểu Thuyết Lãng Mạn`,
    price: 95000,
    category: `Sách`,
    description: `Tiểu thuyết tình cảm nhẹ nhàng, sâu lắng.`,
    image: `https://picsum.photos/300/200?random=13`,
  },
  {
    id: 14,
    name: `Bàn Học Gấp Gọn`,
    price: 450000,
    category: `Gia dụng`,
    description: `Bàn học gấp gọn tiết kiệm diện tích.`,
    image: `https://picsum.photos/300/200?random=14`,
  },
  {
    id: 15,
    name: `Máy Xay Sinh Tố Mini`,
    price: 380000,
    category: `Gia dụng`,
    description: `Máy xay mini nhỏ gọn, dễ vệ sinh.`,
    image: `https://picsum.photos/300/200?random=15`,
  },
];

localStorage.setItem(`products`, JSON.stringify(products));

let additionProducts = JSON.parse(localStorage.getItem(`additionProducts`));
console.log(additionProducts);
additionProducts.forEach((product) => {
  productItem = {
    id: product.id,
    name: product.name,
    price: product.price,
    category: product.category,
    description: product.description,
    image: `https://picsum.photos/300/200?random=1`,
  };
  products.push(product);
  console.log(products);
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
        <a href="./product_detail.html?product_id=${product.id}">Xem chi tiết tại đây</a>
        <button>Thêm vào giỏ hàng</button>
    `;
  container.appendChild(product_item);
  body.appendChild(container);
});

let containers = document.getElementsByClassName(`container`);

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

let buttons = document.getElementsByClassName(`category_button`);
for (let i = 0; i < buttons.length; i++) {
  let button = buttons[i];
  button.addEventListener(`click`, function () {
    button.classList.toggle("active");
    applyFilter();
  });
}
