let inputText = document.querySelector(".inputText");
let convert = document.querySelector(".convert");
let array = [];

convert.addEventListener("click", function (e) {
  e.defaultPrevented;

  let value = inputText.value.toUpperCase();
  inputText.value = "";
  let result = document.createElement("p");
  result.textContent = value;
  document.body.appendChild(result);
  array.push(value);
  console.log(array);

  localStorage.setItem("Array:", JSON.stringify(array))
});
