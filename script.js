// Ensure "gameId" is set in localStorage if not already defined
console.log("Current gameId:", localStorage.getItem("gameId"));

  // Get necessary DOM elements
  const gameFrame = document.getElementById('game-frame');
  const gameDescription = document.getElementById('gamediscription');
  const gameName = document.getElementById('gameName');
  const controls = document.getElementById('controls');
  // Define the path to the JSON file
  const filePath = '../games.json';
  


  // Fetch data and update elements
  fetch(filePath)
    .then(response => response.json())
    .then(data => {
      const gameId = localStorage.getItem("gameId");
      
      if (gameId !== null && data.games[gameId]) {
        //problem(fixed)
        const gameData = data.games[gameId];
  

        gameFrame.src = gameData.gamelink || "about:blank"; 
  

        gameDescription.innerHTML = gameData.info || "Game description not available.";


        controls.innerHTML = "[" + gameData.controls + "]" || "game description not availible.";
        gameName.innerHTML = gameData.gamename || "Game Name not avalible";
        
        
      } else {
        console.error("Invalid gameId or missing game data.");
        gameFrame.src = "about:blank";
        gameDescription.innerHTML = "Game description not available.";
      }
    })
    .catch(error => {
      console.error("Error fetching game data:", error);
  

      gameFrame.src = "about:blank";
      gameDescription.innerHTML = "Error loading game data.";
    });
  



    function savedProject(id) {
      let savedProjects = JSON.parse(localStorage.getItem("savedProjects")) || [];
      if (savedProjects.includes(id)) {
          savedProjects.push(id);
          localStorage.setItem("savedProjects", JSON.stringify(savedProjects));
      }
  }
    document.addEventListener("DOMContentLoaded", function() {
      let p = document.getElementById('noProjects');
      const container = document.getElementById('favoriteDiv');
      const filePath = '../games.json';
  
      if (!p || !container) {
          console.error("Required DOM elements not found.");
          return;
      }
  
      fetch(filePath)
          .then(response => response.json())
          .then(data => {
              if (!localStorage.getItem("savedProjects")) {
                  console.log("no projects");
                  p.textContent = "You don't have any favorited games.";
              } else {
                  console.log("yes projects");
                  p.textContent = ""; // Clear the message about no projects
  
                  let storedArray = JSON.parse(localStorage.getItem("savedProjects"));
                  for (let i = 0; i < storedArray.length; i++) {
                      const gameId = storedArray[i];
                      const gameInfo = data.games[gameId]; // Access game data from the JSON
  
                      if (gameInfo) {
                          // Create the parent <a> element
                          let favGameDiv = document.createElement("a");
                          favGameDiv.id = "div" + i;
                          favGameDiv.className = "game-block";
                          localStorage.setItem("","");
                          favGameDiv.href = "games/game-page.html";
                          //gameInfo.gamelink || "#"; // Set the game link
  
                          // Create a nested <span> element for the game name
                          let gameNameSpan = document.createElement("span");
                          gameNameSpan.className = "game-name-favorite";
                          gameNameSpan.textContent = gameInfo.gamename || "Unknown Game";
  
                          // Add a background image to the <span>
                          if (gameInfo.img) {
                              gameNameSpan.style.backgroundImage = `url('game-img/${gameInfo.img}')`;
                              gameNameSpan.style.backgroundSize = "cover"; // Ensure proper image scaling
                              gameNameSpan.style.backgroundPosition = "center";
                              gameNameSpan.style.display = "block"; 
                              gameNameSpan.style.height = "100px"; // Example height
                              gameNameSpan.style.width = "100px"; // Example width
                          } else {
                              console.error(`Image not found for game ID: ${gameId}`);
                          }
  
                          // Append the <span> to the <a>
                          favGameDiv.appendChild(gameNameSpan);
  
                          // Append the <a> to the container
                          container.appendChild(favGameDiv);
                      } else {
                          console.error(`Game data not found for ID: ${gameId}`);
                      }
                  }
              }
          })
          .catch(error => {
              console.error("Error fetching game data:", error);
              p.textContent = "Error loading favorite games.";
          });
  });
  
  function deleteAllFav() {
    localStorage.clear("savedProjects");
  }