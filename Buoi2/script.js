let textInput = document.querySelector(`.textInput`);
let add = document.querySelector(`.add`);
let addObj = document.querySelector(`.addObj`);
let array = JSON.parse(localStorage.getItem(`array`)) || [];

add.addEventListener(`click`, function (e) {
  e.defaultPrevented;

  let text = textInput.value;
  if (text === ``) {
    alert(`Xin vui lòng nhập gì đó trước khi lưu!`);
    return;
  }
  textInput.value = ``;

  array.push(text);
  localStorage.setItem(`array`, JSON.stringify(array));
});

addObj.addEventListener(`click`, function (a) {
  a.defaultPrevented;

  let Obj = {};
  let pairs = Number(prompt(`Bạn muốn bao nhiêu cặp key-value?`));
  for (i = 1; i <= pairs; i++) {
    let key = prompt(`Key${i} là:`);
    let value = prompt(`Value${i} là:`);
    Obj[key] = value;
  }

  array.push(Obj);
  localStorage.setItem(`array`, JSON.stringify(array));
});
