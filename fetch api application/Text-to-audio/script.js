// script.js
document.addEventListener("DOMContentLoaded", () => {
    const searchBtn = document.getElementById("searchBtn");
    const searchWord = document.getElementById("searchWord");
    const resultSection = document.getElementById("resultSection");
    const wordElement = document.getElementById("word");
    const phoneticElement = document.getElementById("phonetic");
    const audioElement = document.getElementById("audio");
  
    document.getElementById('searchWord').addEventListener('keyup', function(event) {
      let key = event.key;
      if (key === "Enter") {
        search();
      }
    });
  
    searchBtn.addEventListener("click", function() {
      search();
    });
  
    async function search() {
      const word = searchWord.value.trim();
      if (!word) 
      
       return alert("please enter a word");
      
  
      try {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
       const  data= await response.json();
  
       
  
        const wordData = data[0];
        console.log(wordData)
        resultSection.classList.remove("d-none");
        wordElement.textContent = wordData.word;
        phoneticElement.textContent = `Phonetic: ${wordData.phonetic || "N/A"}`;
        audioElement.src = wordData.phonetics[0]?.audio || "";
        
  
      } catch (error) {
        console.error("Error fetching data:", error);
        resultSection.classList.add("d-none");
        alert("unable to get the word");
      }
    }
  });
  
  
  