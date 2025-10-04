const userName = document.querySelector("strong");
userName.textContent = `${localStorage.getItem("username") || "Guest"}`;

const PLACEHOLDER = "https://via.placeholder.com/400x240?text=No+Image";

// helper để tạo URL ảnh từ Unsplash (theo từ khóa)
function unsplash(query) {
  return `https://source.unsplash.com/600x400/?${encodeURIComponent(query)}`;
}

const desserts = [
  {
    name: "Butter Cookies",
    image: unsplash("butter cookies"),
    price: "$4.50",
    description: "Crispy and buttery Danish cookies with a golden texture.",
  },
  {
    name: "Chocolate Chip Cookies",
    image: unsplash("chocolate chip cookies"),
    price: "$5.00",
    description: "Classic cookies filled with melting chocolate chips.",
  },
  {
    name: "Macarons",
    image: unsplash("macarons"),
    price: "$8.50",
    description: "French almond meringue cookies with colorful flavors.",
  },
  {
    name: "Tiramisu",
    image: unsplash("tiramisu dessert"),
    price: "$6.00",
    description:
      "Italian dessert with layers of coffee-soaked biscuits and mascarpone cream.",
  },
  {
    name: "Cheesecake",
    image: unsplash("cheesecake"),
    price: "$7.00",
    description:
      "Rich, creamy New York-style cheesecake topped with strawberries.",
  },
  {
    name: "Cupcake",
    image: unsplash("cupcake dessert"),
    price: "$3.50",
    description: "Soft vanilla cupcake with colorful sprinkles and frosting.",
  },
  {
    name: "Croissant",
    image: unsplash("croissant"),
    price: "$2.80",
    description: "Flaky French pastry made with layers of buttery dough.",
  },
  {
    name: "Donut",
    image: unsplash("donut glazed"),
    price: "$2.50",
    description:
      "Soft ring donut coated in sweet glaze — simple and delicious.",
  },
  {
    name: "Brownie",
    image: unsplash("chocolate brownie"),
    price: "$4.00",
    description: "Moist and fudgy chocolate brownie with a rich cocoa flavor.",
  },
  {
    name: "Mochi Ice Cream",
    image: unsplash("mochi ice cream"),
    price: "$6.50",
    description: "Japanese mochi stuffed with sweet ice cream filling.",
  },
  {
    name: "Pancakes",
    image: unsplash("pancakes"),
    price: "$5.00",
    description: "Fluffy golden pancakes served with syrup and butter.",
  },
  {
    name: "Waffles",
    image: unsplash("waffles"),
    price: "$5.50",
    description: "Crispy waffles with maple syrup and fruits.",
  },
  {
    name: "Fruit Tart",
    image: unsplash("fruit tart"),
    price: "$6.00",
    description: "Sweet pastry crust topped with custard and fresh fruits.",
  },
  {
    name: "Apple Pie",
    image: unsplash("apple pie"),
    price: "$5.50",
    description: "Classic pie filled with sweet apples and cinnamon.",
  },
  {
    name: "Lemon Cake",
    image: unsplash("lemon cake"),
    price: "$4.80",
    description: "Moist lemon cake with a tangy glaze.",
  },
  {
    name: "Eclair",
    image: unsplash("chocolate eclair"),
    price: "$3.80",
    description:
      "French pastry filled with cream and topped with chocolate icing.",
  },
  {
    name: "Pudding",
    image: unsplash("pudding dessert"),
    price: "$3.00",
    description: "Silky smooth pudding with a creamy vanilla flavor.",
  },
  {
    name: "Banoffee Pie",
    image: unsplash("banoffee pie"),
    price: "$5.20",
    description: "Pie made with banana, cream, and toffee on a biscuit base.",
  },
  {
    name: "Mousse",
    image: unsplash("chocolate mousse"),
    price: "$4.20",
    description: "Light and airy chocolate mousse served chilled.",
  },
  {
    name: "Baklava",
    image: unsplash("baklava dessert"),
    price: "$6.00",
    description:
      "Middle Eastern dessert made with nuts and honey between layers of pastry.",
  },
  {
    name: "Crème Brûlée",
    image: unsplash("creme brulee"),
    price: "$7.50",
    description:
      "French custard dessert topped with a caramelized sugar crust.",
  },
  {
    name: "Danish Pastry",
    image: unsplash("danish pastry"),
    price: "$3.80",
    description: "Buttery layered pastry filled with cream or fruit jam.",
  },
  {
    name: "Cinnamon Roll",
    image: unsplash("cinnamon roll"),
    price: "$3.90",
    description: "Soft sweet roll with cinnamon sugar filling and icing.",
  },
  {
    name: "Cupcake Trio",
    image: unsplash("cupcake assorted"),
    price: "$6.50",
    description: "A set of three cupcakes with different frosting flavors.",
  },
  {
    name: "Carrot Cake",
    image: unsplash("carrot cake"),
    price: "$5.20",
    description: "Moist carrot cake with cream cheese frosting.",
  },
  {
    name: "Profiteroles",
    image: unsplash("profiteroles"),
    price: "$4.80",
    description: "Small cream-filled choux pastry balls covered in chocolate.",
  },
  {
    name: "Churros",
    image: unsplash("churros"),
    price: "$3.50",
    description: "Spanish fried dough sticks dusted with cinnamon sugar.",
  },
  {
    name: "Jelly Dessert",
    image: unsplash("fruit jelly dessert"),
    price: "$2.50",
    description: "Colorful fruit jelly served chilled.",
  },
  {
    name: "Ice Cream Sundae",
    image: unsplash("ice cream sundae"),
    price: "$5.80",
    description:
      "Scoops of ice cream topped with syrup, nuts, and whipped cream.",
  },
  {
    name: "Pavlova",
    image: unsplash("pavlova dessert"),
    price: "$6.50",
    description: "Meringue-based dessert topped with whipped cream and fruit.",
  },
  {
    name: "Strawberry Shortcake",
    image: unsplash("strawberry shortcake"),
    price: "$5.90",
    description: "Soft sponge cake layered with cream and fresh strawberries.",
  },
  {
    name: "Oreo Cheesecake",
    image: unsplash("oreo cheesecake"),
    price: "$6.70",
    description: "Creamy cheesecake with crushed Oreo cookies.",
  },
  {
    name: "Cupcake Deluxe",
    image: unsplash("cupcake frosting"),
    price: "$4.20",
    description: "Gourmet cupcake with thick buttercream swirl.",
  },
  {
    name: "Chocolate Lava Cake",
    image: unsplash("chocolate lava cake"),
    price: "$6.00",
    description: "Warm chocolate cake with molten center.",
  },
  {
    name: "Tartlets",
    image: unsplash("mini tartlets"),
    price: "$5.00",
    description: "Mini tarts with creamy fillings and fruits.",
  },
  {
    name: "Soufflé",
    image: unsplash("souffle dessert"),
    price: "$7.20",
    description: "Fluffy baked dessert made with egg whites and chocolate.",
  },
];

const productGrid = document.querySelector(".product-grid");

// tạo card sản phẩm
desserts.forEach((dessert) => {
  const card = document.createElement("div");
  card.className = "product-card";

  const img = document.createElement("img");
  img.alt = dessert.name || "Dessert";
  img.src = dessert.image;
  img.addEventListener("error", function () {
    console.warn(`Image failed to load for "${dessert.name}"`);
    if (img.src !== PLACEHOLDER) img.src = PLACEHOLDER;
  });

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

  card.appendChild(img);
  card.appendChild(title);
  card.appendChild(desc);
  card.appendChild(price);
  card.appendChild(btn);

  productGrid.appendChild(card);
});
