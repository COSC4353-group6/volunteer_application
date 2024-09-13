// Set the document title and link the CSS stylesheet
document.title = "User Profile Management";

// Create the link tag for the CSS file
const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = 'formpage.css';
link.media = 'screen'; // Set media to 'screen' if needed
document.head.appendChild(link);

// Create the header
const header = document.createElement('header');
const logo = document.createElement('img');
logo.src = 'src/images/volt2.png';  // Update the path to your image
logo.alt = 'Logo';
logo.classList.add('header-logo');
header.appendChild(logo);
header.appendChild(document.createTextNode(' User Profile '));
document.body.appendChild(header);

// Remaining code...

// Create the main section and form
const main = document.createElement('main');
const form = document.createElement('form');
form.id = 'profileForm';
main.appendChild(form);
document.body.appendChild(main);

// Helper function to create form groups with labels and inputs
function createFormGroup(labelText, inputType, inputId, inputName, isRequired, maxLength = '') {
  const formGroup = document.createElement('div');
  formGroup.classList.add('form-group');

  const label = document.createElement('label');
  label.setAttribute('for', inputId);
  label.textContent = labelText;

  const input = document.createElement('input');
  input.type = inputType;
  input.id = inputId;
  input.name = inputName;
  if (isRequired) input.required = true;
  if (maxLength) input.maxLength = maxLength;

  formGroup.appendChild(label);
  formGroup.appendChild(input);
  return formGroup;
}

// Add form fields
form.appendChild(createFormGroup('Full Name (50 characters, required):', 'text', 'fullName', 'fullName', true, '50'));
form.appendChild(createFormGroup('Address 1 (100 characters, required):', 'text', 'address1', 'address1', true, '100'));
form.appendChild(createFormGroup('Address 2 (100 characters, optional):', 'text', 'address2', 'address2', false, '100'));
form.appendChild(createFormGroup('City (100 characters, required):', 'text', 'city', 'city', true, '100'));

// Create the state selection
const stateFormGroup = document.createElement('div');
stateFormGroup.classList.add('form-group');
const stateLabel = document.createElement('label');
stateLabel.setAttribute('for', 'state');
stateLabel.textContent = 'State (required):';
stateFormGroup.appendChild(stateLabel);

const stateSelect = document.createElement('select');
stateSelect.id = 'state';
stateSelect.name = 'state';
stateSelect.required = true;

const states = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'];
stateSelect.innerHTML = '<option value="">Select a state</option>' + states.map(state => `<option value="${state}">${state}</option>`).join('');
stateFormGroup.appendChild(stateSelect);
form.appendChild(stateFormGroup);

// Add more form fields
form.appendChild(createFormGroup('Zip Code (9 characters, required):', 'text', 'zipCode', 'zipCode', true, '9'));
form.appendChild(createFormGroup('Skills (required):', 'text', 'Skill', 'Skill', true));
const preferencesFormGroup = createFormGroup('Preferences (optional):', 'textarea', 'preferences', 'preferences', false);
preferencesFormGroup.querySelector('input').remove(); // Remove input added by helper function
const textarea = document.createElement('textarea');
textarea.id = 'preferences';
textarea.name = 'preferences';
textarea.rows = '4';
preferencesFormGroup.appendChild(textarea);
form.appendChild(preferencesFormGroup);

// Add availability input and button
const availabilityFormGroup = createFormGroup('Availability (multiple dates allowed, required):', 'date', 'availability', 'availability', true);
const addDateButton = document.createElement('button');
addDateButton.type = 'button';
addDateButton.id = 'addDate';
addDateButton.textContent = 'Add another date';
availabilityFormGroup.appendChild(addDateButton);
form.appendChild(availabilityFormGroup);

// Add a container to display added dates
const dateList = document.createElement('div');
dateList.id = 'dateList';
dateList.classList.add('form-group');
form.appendChild(dateList);

// Submit button
const submitButton = document.createElement('button');
submitButton.type = 'submit';
submitButton.textContent = 'Submit';
form.appendChild(submitButton);

// Append the link element to the <head> of the document
document.head.appendChild(link);

// JavaScript logic to handle adding/removing dates
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
  const dropdown = document.getElementById("skillsDropdown");
  dropdown.classList.toggle("active");
}
