let List = document.querySelector(`.List`);
let array = JSON.parse(localStorage.getItem(`array`)) || [
  "You don't have anything yet!",
];

console.log(array);

for (i = 0; i < array.length; i++) {
  let index = array[i];
  if (typeof index === `object`) {
    let Name = document.createElement(`li`);
    Name.textContent = `Object:`;
    let display = document.createElement(`ul`);
    let keys = Object.keys(index);
    let values = Object.values(index);
    let length = Object.keys(index).length;
    for (_ = 0; _ < length; _++) {
      let display2 = document.createElement(`li`);
      display2.textContent = `${keys[_]}: ${values[_]}`;
      display.appendChild(display2);
    }
    List.appendChild(Name);
    List.appendChild(display);
  } else {
    let display = document.createElement(`li`);
    display.textContent = index;
    List.appendChild(display);
  }
}
