let key1 = document.querySelector(`.key1`);
let value1 = document.querySelector(`.value1`);
let key2 = document.querySelector(`.key2`);
let value2 = document.querySelector(`.value2`);
let convert = document.querySelector(`.convert`);

convert.addEventListener(`click`, function (e) {
  e.defaultPrevented;

  console.log(key1.value);

  let array = localStorage.getItem(`Array`);
  array = JSON.parse(array);
  if (array === null) {
    array = [];
  }
  key1.value = ``;
  value1.value = ``;
  key2.value = ``;
  value2.value = ``;

  let Obj = {};

  Obj[key1.value] = value1.value;
  Obj[key2.value] = value2.value;

  console.log(Obj);

  //   array.push(value);
  //   console.log(array);

  //   localStorage.setItem(`Array`, JSON.stringify(array));
});
