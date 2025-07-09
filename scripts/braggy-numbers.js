/* Version via fetch.then
############################################################################ 
const initBraggyNumbers = () => {
  const target = document.querySelector("[data-js-braggy-numbers]");
  if (!target) return;

  const dataUrl = "/assets/data/specs.json";

  fetch(dataUrl)
    .then(response => response.json())
    .then(data => {
      const numbers = data.results.map((item, index) => {
        const rowspan = index === 0 ? 12 : 6;
        const niceNumber = item.count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

        return `
          <li class="masonry-item" data-colspan="4" data-rowspan="${rowspan}">
            <dl>
              <dt>
                <span class="icon">${item.icon}</span>
                <span class="text">${item.name}</span>
              </dt>
              <dd>${niceNumber}</dd>
            </dl>
          </li>`;
      }).join("");

      target.innerHTML = numbers;
    })
    .catch(error => {
      console.error("Error fetching data:", error);
    });
};

const fetchData = url => {
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .catch(error => {
      console.error("Error fetching data:", error);
      throw error;
    });
}
*/

/* Version via async/await
############################################################################ */
// This version uses async/await for better readability and error handling.
// It is more modern and easier to follow, especially for complex asynchronous operations.

const initBraggyNumbersAsync = async () => {
  const target = document.querySelector("[data-js-braggy-numbers]");
  if (!target) return;

  const dataUrl = "/assets/data/specs.json";

  fetchDataAsync(dataUrl)
    .then(data => {
      const numbers = data.results.map((item, index) => {
        const rowspan = index === 0 ? 12 : 6;
        const niceNumber = item.count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

        return `
          <li class="masonry-item" data-colspan="4" data-rowspan="${rowspan}">
            <dl>
              <dt>
                <span class="icon">${item.icon}</span>
                <span class="text">${item.name}</span>
              </dt>
              <dd>${niceNumber}</dd>
            </dl>
          </li>`;
      }).join("");

      target.innerHTML = numbers;
    })
    .catch(error => {
      console.error("Error fetching data:", error);
    });
};

const fetchDataAsync = async url => {

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}



/* Main
############################################################################ */

document.addEventListener('DOMContentLoaded', () => {
  initBraggyNumbersAsync();
});