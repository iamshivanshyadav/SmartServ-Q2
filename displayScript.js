document.addEventListener('DOMContentLoaded', function () {
  displayAllData();
});

function displayAllData() {
  const displayedData = JSON.parse(localStorage.getItem('displayedData'));
  const displayTable = document.getElementById('displayTable');
  displayTable.innerHTML = ''; // Clear previous data

  const table = document.createElement('table');
  table.classList.add('dataTable');

  if (displayedData && displayedData.length > 0) {
    // Table header based on keys of the first object
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    Object.keys(displayedData[0]).forEach(key => {
      const th = document.createElement('th');
      th.textContent = key;
      headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Table body with all data
    const tbody = document.createElement('tbody');
    displayedData.forEach(item => {
      const row = document.createElement('tr');
      Object.values(item).forEach(value => {
        const cell = document.createElement('td');
        cell.textContent = value;
        row.appendChild(cell);
      });
      tbody.appendChild(row);
    });
    table.appendChild(tbody);
  } else {
    // No data available message
    const messageRow = document.createElement('tr');
    const messageCell = document.createElement('td');
    messageCell.textContent = 'No data available.';
    messageCell.colSpan = Object.keys(displayedData[0]).length || 1;
    messageRow.appendChild(messageCell);
    table.appendChild(messageRow);
  }

  displayTable.appendChild(table);
}
