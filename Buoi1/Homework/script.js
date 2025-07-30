// Bài 1
alert(`Bài 1:`);

const List1 = [6, 89, 90, 23, 5, 9];

alert(`a)`);
let sum = 0;
for (let i = 0; i < List1.length; i++) {
  sum += List1[i];
}
alert(`Tổng các số là: ${sum}`);

alert(`b)`);
let evenList = [];
for (let i = 0; i < List1.length; i++) {
  if (List1[i] % 2 === 0) {
    evenList.push(List1[i]);
  }
}
alert(`Các số chẵn là: ${evenList}`);

alert(`c)`);
let oddList = [];
for (let i = 0; i < List1.length; i++) {
  if (List1[i] % 2 !== 0) {
    oddList.push(List1[i]);
  }
}
alert(`Các số lẻ là: ${oddList}`);

alert(`d)`);
let expression = List1.join(" + ");
alert(`${expression} = ${sum}`);

// Bài 2
function submitInfo() {
  const input = document.getElementById("inputText");
  const list = document.getElementById("infoList");
  const value = input.value.trim();

  if (value !== "") {
    const listItem = document.createElement("li");
    listItem.textContent = value;
    list.appendChild(listItem);
    input.value = "";
  }
}

// Bài 3
function toggleShape() {
  const shape = document.getElementById("shape");
  shape.classList.toggle("circle");
}
