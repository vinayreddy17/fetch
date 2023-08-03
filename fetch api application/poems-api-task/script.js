
fetch('https://poetrydb.org/author')
  .then(response => response.json())
  .then(data => displayAuthors(data.authors.slice(0, 15)))
  .catch(error => console.log('Error fetching author names:', error));

function displayAuthors(authors) {
  const authorNamesContainer = document.querySelector('.author-names-container');
  authorNamesContainer.innerHTML = '';

  authors.forEach(author => {
    const authorHtml = `
      <button class="author-name">${author}</button>
    `;
    authorNamesContainer.innerHTML += authorHtml;
  });

  
  const authorNameElements = document.querySelectorAll('.author-name');
  authorNameElements.forEach(element => {
    element.addEventListener('click', function () {
      document.getElementById('authorNameInput').value = element.innerText;
      showPoemsPage();
    });
  });
}

function showPoemsPage() {
  // 
  document.querySelector('.author-names-container').style.display = 'none';//hiding the author names
  document.getElementById('getPoemsBtn').style.display = 'none';

  // Show the new page with poem titles
  const poemsContainer = document.getElementById('poemsContainer');
  poemsContainer.innerHTML = '';

  const authorName = document.getElementById('authorNameInput').value.trim();//for taking out blank spaces useful when comparing data
  const apiUrl = `https://poetrydb.org/author/${authorName}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      if (data.status === 404) {
        poemsContainer.innerHTML = '<p class="text-danger">Author not found.</p>';
      } else {
        data.slice(0, 10).forEach(poem => {
          const poemHtml = `
            <button class="poem-title">${poem.title}</button>
          `;
          poemsContainer.innerHTML += poemHtml;
        });
        attachPoemTitleClickHandlers();
      }
    })
    .catch(error => console.log('Error fetching poems:', error));
}

function attachPoemTitleClickHandlers() {
  // Add click event listeners to the displayed poem titles
  const poemTitleElements = document.querySelectorAll('.poem-title');
  poemTitleElements.forEach(element => {
    element.addEventListener('click', function () {
      fetchPoemByTitle(element.innerText);
    });
  });
}

function fetchPoemByTitle(poemTitle) {
  const apiUrl = `https://poetrydb.org/title/${poemTitle}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => displayPoem(data[0]))
    .catch(error => console.log('Error fetching poem:', error));
}

function displayPoem(poem) {
  const poemsContainer = document.getElementById('poemsContainer');
  poemsContainer.innerHTML = '';

  const poemHtml = `
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">${poem.title}</h5>
        <p class="card-text">${poem.lines.join('<br>')}</p>
      </div>
    </div>
  `;
  poemsContainer.innerHTML = poemHtml;

  // Show the refresh message after displaying the poem
  const refreshMessage = document.querySelector('.explanation');
  refreshMessage.innerHTML=' <p >Refresh the page to get the authors again.</p>'
  refreshMessage.style.display = 'block';
}
