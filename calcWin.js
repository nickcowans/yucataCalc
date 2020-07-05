// Code By Webdevtrick ( https://webdevtrick.com )
// Listen for Submit
document.getElementById("loan-form").addEventListener("submit", function(e) {
  // Hide Results
  document.getElementById("result").style.display = "none";

  // Show Loader
  document.getElementById("loading").style.display = "block";

  setTimeout(calculateResults, 2000);

  e.preventDefault();
});

// Calculate Results
function calculateResults() {
    
    const maxTS = document.getElementById("max-ts");
    const myTS = document.getElementById("my-ts");
    const theirTS = document.getElementById("their-ts");
    const diffTS = document.getElementById("diff-ts");
    const youWin = document.getElementById("you-win");
    const youLose = document.getElementById("you-lose");
    
    // Compute difference
    // Won: Points = Max(10; 50 - TsDiff/TsMax*100)
    // Lost: Points = Min(-10; (-50 - TsDiff/TsMax*100) * 0.8)
    var diff = myTS.value - theirTS.value;
    var win = Math.max(10, 50 - diff / maxTS.value * 100);
    var lose = Math.min(-10, (-50 + diff / maxTS.value * 100) * 0.8);

    if (isFinite(diff)) {
	diffTS.value = diff.toFixed(0);
	youWin.value = win.toFixed(0);
	youLose.value = lose.toFixed(0);

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
