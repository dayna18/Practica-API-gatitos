const apiUrl = 'https://api.thecatapi.com/v1/images/search';
    const catNames = ["Luna", "Milo", "Simba", "Nala", "Bella", "Leo", "Salem", "Chloe", "Oliver", "Daisy"];

    function getRandomCatName() {
      return catNames[Math.floor(Math.random() * catNames.length)];
    }

    function fetchNewCat() {
      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          const catImage = data[0].url;
          const catName = getRandomCatName();
          displayCat(catName, catImage);
        })
        .catch(error => console.error('Error al obtener la imagen del gatito:', error));
    }

    function displayCat(name, imageUrl) {
      const catContainer = document.getElementById('cat-container');
      const catCard = document.createElement('div');
      catCard.classList.add('col-md-4', 'mb-4');

      catCard.innerHTML = `
        <div class="card shadow-sm" onclick="adoptCat('${name}', '${imageUrl}')">
          <img src="${imageUrl}" class="card-img-top" alt="Gatito adorable">
          <div class="card-body">
            <h5 class="card-title">${name}</h5>
            <p class="card-text">¡Adopta a ${name} hoy!</p>
          </div>
        </div>
      `;

      catContainer.appendChild(catCard);
    }

    function adoptCat(name, imageUrl) {
      alert(`Gracias por adoptar a ${name}!`);
      saveAdoptedCat(name, imageUrl);
      displayAdoptedCats();
    }

    // Guardar el gatito adoptado en localStorage
    function saveAdoptedCat(name, imageUrl) {
      const adoptedCats = JSON.parse(localStorage.getItem('adoptedCats')) || [];
      adoptedCats.push({ name, imageUrl });
      localStorage.setItem('adoptedCats', JSON.stringify(adoptedCats));
    }

    // Mostrar gatitos adoptados en la sección correspondiente
    function displayAdoptedCats() {
      const adoptedCatsContainer = document.getElementById('adopted-cats-container');
      adoptedCatsContainer.innerHTML = ''; // Limpiar contenedor

      const adoptedCats = JSON.parse(localStorage.getItem('adoptedCats')) || [];
      adoptedCats.forEach(cat => {
        const adoptedCatCard = document.createElement('div');
        adoptedCatCard.classList.add('col-md-4', 'mb-4');

        adoptedCatCard.innerHTML = `
          <div class="card shadow-sm">
            <img src="${cat.imageUrl}" class="card-img-top" alt="Gatito adorable">
            <div class="card-body">
              <h5 class="card-title">${cat.name}</h5>
              <p class="card-text text-success">¡Gracias por adoptarme!</p>
            </div>
          </div>
        `;

        adoptedCatsContainer.appendChild(adoptedCatCard);
      });
    }

    // Mostrar los gatitos adoptados al cargar la página
    document.addEventListener("DOMContentLoaded", displayAdoptedCats);
