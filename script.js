document.addEventListener('DOMContentLoaded', function () {
  const addButton = document.getElementById('addButton');
  const removeButton = document.getElementById('removeButton');
  const displayTable = document.getElementById('displayTable');
  const nextButton = document.getElementById('nextButton');
  const cancelButton = document.getElementById('cancelButton');

  addButton.addEventListener('click', function () {
    const availableFields = document.getElementById('availableFields');
    const displayFields = document.getElementById('displayFields');
    moveSelectedOptions(availableFields, displayFields);
  });

  removeButton.addEventListener('click', function () {
    const availableFields = document.getElementById('availableFields');
    const displayFields = document.getElementById('displayFields');
    moveSelectedOptions(displayFields, availableFields);
  });

  nextButton.addEventListener('click', function () {
    const fileInput = document.getElementById('fileInput');
    const fileType = document.getElementById('fileType').value;
    const encoding = document.getElementById('encoding').value;
    const delimiter = document.getElementById('delimiter').value;
    const hasHeader = document.getElementById('hasHeader').checked;

    const formData = new FormData();
    formData.append('fileInput', fileInput.files[0]);
    formData.append('fileType', fileType);
    formData.append('encoding', encoding);
    formData.append('delimiter', delimiter);
    formData.append('hasHeader', hasHeader);

    fetch('https://tets-sx01.onrender.com/upload', {
      method: 'POST',
      body: formData
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        localStorage.setItem('displayedData', JSON.stringify(data));
        window.location.href = 'display.html'; // Redirect to display.html
      })
      .catch(error => console.error('Error:', error));
  });

  cancelButton.addEventListener('click', function () {
    window.location.href = 'index.html'; // Go back to the initial page
  });

  function moveSelectedOptions(sourceSelect, destinationSelect) {
    const selectedOptions = Array.from(sourceSelect.selectedOptions);
    selectedOptions.forEach(option => {
      destinationSelect.appendChild(option);
    });
  }

  


  function displayData(data) {
    // Clear previous data
    displayTable.innerHTML = '';

    // Create a table to display the processed data
    const table = document.createElement('table');
    table.classList.add('dataTable');

    // Table header based on selected fields
    const selectedFields = Array.from(displayFields.options).map(option => option.value);
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    selectedFields.forEach(field => {
      const th = document.createElement('th');
      th.textContent = field;
      headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Table body with data
    const tbody = document.createElement('tbody');
    data.forEach(item => {
      const row = document.createElement('tr');
      selectedFields.forEach(field => {
        const cell = document.createElement('td');
        cell.textContent = item[field];
        row.appendChild(cell);
      });
      tbody.appendChild(row);
    });
    table.appendChild(tbody);

    displayTable.appendChild(table);
  }
});
