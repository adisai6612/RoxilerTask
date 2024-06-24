// API endpoints
const transactionsAPI = 'https://example.com/transactions';
const statisticsAPI = 'https://example.com/statistics';
const chartAPI = 'https://example.com/chart';

// Selectors
const searchInput = document.getElementById('searchInput');
const monthSelect = document.getElementById('monthSelect');
const transactionsTable = document.getElementById('transactionsTable');
const tableBody = document.getElementById('tableBody');
const prevPage = document.getElementById('prevPage');
const nextPage = document.getElementById('nextPage');
const pageNo = document.getElementById('pageNo');
const perPage = document.getElementById('perPage');
const totalSale = document.getElementById('totalSale');
const totalSoldItems = document.getElementById('totalSoldItems');
const totalNotSoldItems = document.getElementById('totalNotSoldItems');
const barChart = document.getElementById('barChart');

// Initial page load
loadTransactions();

// Event listeners
searchInput.addEventListener('input', searchTransactions);
monthSelect.addEventListener('change', loadTransactions);
prevPage.addEventListener('click', prevPageHandler);
nextPage.addEventListener('click', nextPageHandler);

// Functions
function loadTransactions() {
  const month = monthSelect.value;
  const searchQuery = searchInput.value.trim();
  const params = `month=${month}&search=${searchQuery}`;
  fetch(`${transactionsAPI}?${params}`)
    .then(response => response.json())
    .then(data => renderTransactions(data));
}

function searchTransactions() {
  loadTransactions();
}

function prevPageHandler() {
  // implement previous page logic
}

function nextPageHandler() {
  // implement next page logic
}

function renderTransactions(data) {
  tableBody.innerHTML = '';
  data.forEach(transaction => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${transaction.id}</td>
      <td>${transaction.title}</td>
      <td>${transaction.description}</td>
      <td>${transaction.price}</td>
      <td>${transaction.category}</td>
      <td>${transaction.sold}</td>
      <td><img src="${transaction.image}" alt="${transaction.title}"></td>
    `;
    tableBody.appendChild(row);
  });
  
  // Update statistics
  fetch(`${statisticsAPI}?month=${monthSelect.value}`)
    .then(response => response.json())
    .then(data => {
      totalSale.textContent = `Total sale: ${data.totalSale}`;
      totalSoldItems.textContent = `Total sold items: ${data.totalSoldItems}`;
      totalNotSoldItems.textContent = `Total not sold items: ${data.totalNotSoldItems}`;
    });
  
  // Update chart
  fetch(`${chartAPI}?month=${monthSelect.value}`)
    .then(response => response.json())
    .then(data => {
      const ctx = barChart.getContext('2d');
      new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    });
}