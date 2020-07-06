// Listen for Submit
document.getElementById("loan-form").addEventListener("submit", function(e) {
  // Hide Results
  document.getElementById("result").style.display = "none";

  // Show Loader
  document.getElementById("loading").style.display = "block";

  setTimeout(calculateResults, 2000);

  e.preventDefault();
});

// Populate drop down
var a = {
  Games: [{
    "game": "",
    "TS": ["", ""]
  }, {
    "game": "Can't Stop",
    "TS": ["970", "1303"]
  }, {
    "game": "Carcassonne",
    "TS": ["851", "1482"]
  }, {
    "game": "Chakra",
    "TS": ["951", "1414"]
  }, {
    "game": "Hey, that's my fish",
    "TS": ["780", "1802"]
  }, {
    "game": "Machi Koro",
    "TS": ["695", "1409"]
  }, {
    "game": "Port Royal",
    "TS": ["976", "1345"]
  }, {
    "game": "Snowdonia",
    "TS": ["643", "1516"]
  }, {
    "game": "Sticky Fingers",
    "TS": ["364", "1409"]
  }, {
    "game": "Tally Ho",
    "TS": ["546", "1492"]
  }, {
    "game": "The Castles of Burgundy",
    "TS": ["449", "1738"]
  }]
};

$.each(a.Games, (index, value) => $("#game-dropdown").append($(`<option value="${index}">${value.game}</option>`)));

const maxTS = document.getElementById("max-ts");
const myTS = document.getElementById("my-ts");


$('#game-dropdown').change((event) => {
  const index = event.currentTarget.value;
  myTS.value = a.Games[index].TS[0];
  maxTS.value = a.Games[index].TS[1];
});

// Calculate Results
function calculateResults() {

  const maxTS = document.getElementById("max-ts");
  const myTS = document.getElementById("my-ts");
  const theirTS = document.getElementById("their-ts");
  const diffTS = document.getElementById("diff-ts");
  const youWin = document.getElementById("you-win");
  const youWinThem = document.getElementById("you-win-them");
  const youLose = document.getElementById("you-lose");
  const youLoseThem = document.getElementById("you-lose-them");

  // Compute difference
  // Won: Points = Max(10; 50 - TsDiff/TsMax*100)
  // Lost: Points = Min(-10; (-50 - TsDiff/TsMax*100) * 0.8)
  var diff = myTS.value - theirTS.value;
  var win = Math.max(10, 50 - diff / maxTS.value * 100);
  var winT = Math.min(-10, (-50 + diff / maxTS.value * 100) * 0.8);
  var lose = Math.min(-10, (-50 - diff / maxTS.value * 100) * 0.8);
  var loseT = Math.max(10, 50 + diff / maxTS.value * 100);

  if (isFinite(diff)) {
    diffTS.value = diff.toFixed(0);
    youWin.value = win.toFixed(0);
    youWinThem.value = winT.toFixed(0);
    youLose.value = lose.toFixed(0);
    youLoseThem.value = loseT.toFixed(0);

    // Show Results
    document.getElementById("result").style.display = "block";

    // Hide Loader
    document.getElementById("loading").style.display = "none";
  } else {
    showError("Please check number inputs");
  }

}

// Show Error
function showError(error) {
  // Hide Results
  document.getElementById("result").style.display = "none";

  // Hide Loader
  document.getElementById("loading").style.display = "none";

  // Create a div
  const errorDiv = document.createElement("div");

  // Get Elements
  const card = document.querySelector(".card");
  const heading = document.querySelector(".heading");

  // Add class
  errorDiv.className = "alert alert-danger";

  // Create text node and append div
  errorDiv.appendChild(document.createTextNode(error));

  // Insert error above heading
  card.insertBefore(errorDiv, heading);

  // Clear Error after 3 seconds
  setTimeout(clearError, 3000);

  // Clear Error
  function clearError() {
    document.querySelector(".alert").remove();
  }
}
