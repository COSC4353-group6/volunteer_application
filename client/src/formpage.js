document.getElementById('addDate').addEventListener('click', function() {
  const dateInput = document.getElementById('availability');
  const dateValue = dateInput.value;

  if (dateValue) {
    const existingDates = Array.from(document.querySelectorAll('#dateList .date-item span'));
    const isDuplicate = existingDates.some(date => date.textContent === dateValue);

    if (!isDuplicate) {
      const dateItem = document.createElement('div');
      dateItem.classList.add('date-item');

      dateItem.innerHTML = `
        <span>${dateValue}</span> 
        <button class="remove-btn" onclick="removeDate(this)">Remove</button>
      `;

      document.getElementById('dateList').appendChild(dateItem);
      dateInput.value = '';
    } else {
      alert('This date is already in the list.');
    }
  }
});

function removeDate(button) {
  const dateItem = button.parentElement;
  dateItem.remove();
}

function toggleDropdown() {
  var dropdown = document.getElementById("skillsDropdown");
  dropdown.classList.toggle("active");
}
