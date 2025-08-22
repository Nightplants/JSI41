fetch(`https://jsonplaceholder.typicode.com/albums`)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    let body = document.querySelector(`body`);
    for (i = 0; i < 5; i++) {
      let content = document.createElement(`div`);
      content.className = `content`;
      content.innerHTML = `       
        <p class="ID_number">ID: 1</p>
        <h2 class="Title">${data[i].title}</h2>
        <button class="save">Save</button>
      `;
      let container = document.createElement(`div`);
      container.className = `container`;
      container.appendChild(content);
      body.appendChild(container);
    }
  });
