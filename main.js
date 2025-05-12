let passengerCount = 0;

const passengerCountElement = document.getElementById('passenger-count');
const addPassengerButton = document.getElementById('add-passenger');
const removePassengerButton = document.getElementById('remove-passenger');

addPassengerButton.addEventListener('click', () => {
  passengerCount++;
  passengerCountElement.textContent = passengerCount;
});

removePassengerButton.addEventListener('click', () => {
  if (passengerCount > 0) {
    passengerCount--;
    passengerCountElement.textContent = passengerCount;
  }
});
