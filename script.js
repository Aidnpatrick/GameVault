// Ensure "gameId" is set in localStorage if not already defined
console.log("Current gameId:", localStorage.getItem("gameId"));

  // Get necessary DOM elements
  const gameFrame = document.getElementById('game-frame');
  const gameDescription = document.getElementById('gamediscription');
  const gameName = document.getElementById('gameName');
  // Define the path to the JSON file
  const filePath = '../games.json';
  


  // Fetch data and update elements
  fetch(filePath)
    .then(response => response.json())
    .then(data => {
      const gameId = localStorage.getItem("gameId");
      
      
      // Validate gameId and update iframe and description
      if (gameId !== null && data.games[gameId]) {
        //problem
        const gameData = data.games[gameId];
  
        // Update iframe source with the gamelink (fallback to blank page if link is missing)
        gameFrame.src = gameData.gamelink || "about:blank"; 
  
        // Update game description (fallback message if info is missing)
        gameDescription.innerHTML = gameData.info || "Game description not available.";

        gameName.innerHTML = gameData.gamename || "Game Name not avalible";
        
        
      } else {
        console.error("Invalid gameId or missing game data.");
        gameFrame.src = "about:blank";
        gameDescription.innerHTML = "Game description not available.";
      }
    })
    .catch(error => {
      console.error("Error fetching game data:", error);
  
      // Provide fallback content in case of an error
      gameFrame.src = "about:blank";
      gameDescription.innerHTML = "Error loading game data.";
    });
  
  // Log the current gameId for debugging

  