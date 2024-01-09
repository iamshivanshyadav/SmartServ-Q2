document.addEventListener('DOMContentLoaded', function () {
  const step3 = document.querySelector('.step-card.step3');
  if (step3) {
    step3.style.pointerEvents = 'none';
  }

  const hasHeaderCheckbox = document.getElementById('hasHeader');
  const displayHandlingCheckbox = document.getElementById('displayHandlingCheckbox');

  if (hasHeaderCheckbox) {
    hasHeaderCheckbox.addEventListener('change', function () {
      if (this.checked) {
        if (step3) {
          step3.style.pointerEvents = 'auto';
        }
      } else {
        if (step3) {
          step3.style.pointerEvents = 'none';
        }
      }
      if (displayHandlingCheckbox) {
        displayHandlingCheckbox.checked = this.checked;
      }
    });
  }

  if (displayHandlingCheckbox) {
    displayHandlingCheckbox.addEventListener('change', function () {
      if (hasHeaderCheckbox) {
        hasHeaderCheckbox.checked = this.checked;
      }
      if (this.checked) {
        if (step3) {
          step3.style.pointerEvents = 'auto';
        }
      } else {
        if (step3) {
          step3.style.pointerEvents = 'none';
        }
      }
    });
  }

  const addButton = document.getElementById('addButton');
  const removeButton = document.getElementById('removeButton');
  const availableFields = document.getElementById('availableFields');
  const displayFields = document.getElementById('displayFields');

  addButton.addEventListener('click', function () {
    moveOptions(availableFields, displayFields);
  });

  removeButton.addEventListener('click', function () {
    moveOptions(displayFields, availableFields);
  });

  function moveOptions(fromSelect, toSelect) {
    const selectedOptions = Array.from(fromSelect.selectedOptions);
    selectedOptions.forEach(option => {
      toSelect.appendChild(option);
    });

    const selectedColumns = Array.from(displayFields.options).map(option => option.value);
    localStorage.setItem('displayFields', JSON.stringify(selectedColumns));
  }

  const nextButton = document.getElementById('nextButton');
  nextButton.addEventListener('click', function () {
    const fileInput = document.getElementById('fileInput');
    const fileType = document.getElementById('fileType').value;

    const formData = new FormData();
    formData.append('file', fileInput.files[0]);
    formData.append('fileType', fileType);

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
      const storedDisplayFields = JSON.parse(localStorage.getItem('displayFields'));
      let columnsToDisplay = ['Title', 'Price'];

      if (storedDisplayFields && storedDisplayFields.length > 0) {
        columnsToDisplay = storedDisplayFields;
      }

      displayTable(data, columnsToDisplay);
      localStorage.setItem('displayedData', JSON.stringify(data));
    })
    .catch(error => {
      console.error('Error:', error);
    });
  });

  const cancelButton = document.getElementById('cancelButton');
  cancelButton.addEventListener('click', function () {
    localStorage.removeItem('displayedData');
    localStorage.removeItem('displayFields');
    location.reload();
  });

  const storedData = JSON.parse(localStorage.getItem('displayedData'));
  let storedDisplayFields = JSON.parse(localStorage.getItem('displayFields'));
  let columnsToDisplay = ['Title', 'Price'];

  if (storedDisplayFields && storedDisplayFields.length > 0) {
    columnsToDisplay = storedDisplayFields;
  }

  if (storedData) {
    displayTable(storedData, columnsToDisplay);
  } else {
    // Handle no stored data
  }

  function displayTable(data, columnsToDisplay) {
    const displayTableContainer = document.getElementById('displayTable');
    displayTableContainer.innerHTML = ''; // Clear existing table content

    if (!Array.isArray(data) || data.length === 0) {
      // Handle no data scenario
      displayTableContainer.textContent = 'No data available';
      return;
    }

    const table = document.createElement('table');
    const thead = table.createTHead();
    const tbody = table.createTBody();

    const headerRow = thead.insertRow();
    columnsToDisplay.forEach(headerText => {
      const th = document.createElement('th');
      th.textContent = headerText;
      headerRow.appendChild(th);
    });

    data.forEach(item => {
      const row = tbody.insertRow();
      columnsToDisplay.forEach(column => {
        const cell = row.insertCell();
        cell.textContent = item[column.toLowerCase()] || ''; 
      });
    });

    displayTableContainer.appendChild(table);
  }
});

window.addEventListener('beforeunload', function () {
  localStorage.clear();
});
