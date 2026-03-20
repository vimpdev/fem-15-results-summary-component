const $summaryList = document.getElementById('summaryList');

async function loadData() {
  try {
    // Make HTTP request to fetch the JSON data
    const response = await fetch('../data/data.json');

    // Check if the response was successful (status 200–299)
    // If not, throw an error to be caught in the catch block
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    // Parse the response body as JSON
    const data = await response.json();

    // Pass the data to the render function
    renderSummary(data);

  } catch (error) {
    // Handle any errors (network issues, bad response, etc.)
    console.error(error);
  }
}


// Render summary items dynamically into the DOM
function renderSummary(items) {
  // Create a DocumentFragment to improve performance
  // (avoids multiple reflows by batching DOM updates)
  const fragment = document.createDocumentFragment();

  // Loop through each item and create a list element
  items.forEach(item => {
    const li = document.createElement('li');
    li.className = `summary-item summary-item-${item.category.toLowerCase()}`;

    // Insert content using template literals
    li.innerHTML = `
      <img src="${item.icon}" alt="" class="summary-icon">
      <span class="summary-category">${item.category}</span>
      <span class="summary-score">${item.score} <span class="summary-score-range">/ 100</span></span>
    `;

    // Append each <li> to the fragment (not directly to the DOM)
    fragment.appendChild(li)
  });

  // Append all items to the DOM in a single operation
  $summaryList.appendChild(fragment);
}

// Initialize the app by loading data
loadData();