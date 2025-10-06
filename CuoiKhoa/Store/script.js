const userName = document.querySelector("strong");
userName.textContent = `${localStorage.getItem("username") || "Guest"}`;

function randomImage() {
  const randomId = Math.floor(Math.random() * 1000);
  return `https://picsum.photos/300/200?random=${randomId}`;
}

const desserts = [
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
      "Italian dessert made with layers of coffee-soaked biscuits and mascarpone cream.",
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
    name: "Mochi Ice Cream",
    price: "$6.50",
    description: "Japanese mochi stuffed with sweet ice cream filling.",
  },
  {
    name: "Waffles",
    price: "$5.20",
    description: "Crispy waffles served with syrup and fruits.",
  },
  {
    name: "Pancakes",
    price: "$5.00",
    description: "Fluffy pancakes topped with syrup and butter.",
  },
  {
    name: "Fruit Tart",
    price: "$6.80",
    description: "Sweet pastry crust topped with custard and fresh fruits.",
  },
  {
    name: "Cinnamon Roll",
    price: "$4.80",
    description: "Soft roll with cinnamon sugar filling and cream icing.",
  },
  {
    name: "Eclair",
    price: "$3.80",
    description: "French pastry filled with cream and topped with chocolate.",
  },
  {
    name: "Pavlova",
    price: "$6.50",
    description:
      "Light meringue dessert topped with whipped cream and fresh berries.",
  },
  {
    name: "Baklava",
    price: "$6.20",
    description:
      "Middle Eastern dessert made of pastry layers filled with nuts and honey.",
  },
  {
    name: "Crème Brûlée",
    price: "$7.00",
    description:
      "French custard dessert topped with a layer of caramelized sugar.",
  },
];

const productGrid = document.querySelector(".product-grid");

desserts.forEach((dessert) => {
  const card = document.createElement("div");
  card.className = "product-card";

  const img = document.createElement("img");
  img.alt = dessert.name || "Dessert";
  img.src = randomImage();

  const title = document.createElement("h2");
  title.textContent = dessert.name;

  const desc = document.createElement("p");
  desc.className = "product-description";
  desc.textContent = dessert.description;

  const price = document.createElement("p");
  price.className = "product-price";
  price.textContent = dessert.price;

  const btn = document.createElement("button");
  btn.className = "buy-btn";
  btn.textContent = "Buy Now";
  btn.addEventListener("click", () => {
    let cart = JSON.parse(localStorage.getItem("cart") || "[]");
    cart.push({ name: dessert.name, price: dessert.price });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`"${dessert.name}" added to cart!`);
  });

  card.append(img, title, desc, price, btn);
  productGrid.appendChild(card);
});
