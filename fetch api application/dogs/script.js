const messageElement = document.getElementById('message');
const breedSelectElement = document.getElementById('breedSelect');
const showImageButton = document.getElementById('showImageButton');
const dogImageContainer = document.getElementById('dogImageContainer');
const refreshMessage = document.getElementById('refreshMessage');
const explanation=document.getElementById('explanation');
const apiUrl = 'https://dog.ceo/api/';

// Fetch the list of dog breeds and populate the dropdown
fetch(apiUrl + 'breeds/list')
  .then(response => response.json())
  .then(data => {
    const breeds = data.message;
    breeds.forEach(breed => {
      const optionElement = document.createElement('option');
      optionElement.value = breed;
      optionElement.textContent = breed;
      breedSelectElement.appendChild(optionElement);
    });
  })
  .catch(error => console.log('Error fetching dog breeds:', error));

// Event listener for the " Image" button
showImageButton.addEventListener('click', () => {
  const selectedBreed = breedSelectElement.value;

  if (!selectedBreed) {
    alert('Please select a dog breed from the list.');
    return;
  }

  dogImageContainer.innerHTML = '';
  explanation.style.display = 'none';

  fetch(apiUrl + `breed/${selectedBreed}/images/random`)
    .then(response => response.json())
    .then(data => {
      const imageUrl = data.message;
      const imgElement = document.createElement('img');
      imgElement.src = imageUrl;
      dogImageContainer.appendChild(imgElement);
      dogImageContainer.style.display = 'block';
      refreshMessage.style.display = 'block';
    })
    .catch(error => console.log('Error fetching dog image:', error));
});
