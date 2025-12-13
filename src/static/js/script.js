//sending dice click to python
const main_dice_button = document.getElementById('main-click-dice-button');

main_dice_button.addEventListener('click', () => {
    fetch('/get_dice_click_from_js', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "click": true })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Dice click registered:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});

//getting dice count from python

const diceCountSpan = document.getElementById('dice-count-span');

function updateDiceCount() {
  fetch('/get_dice_info_from_py')
    .then(res => res.json())
    .then(data => {
      diceCountSpan.textContent = `${data.count} | ${data.username}'s Game`;
    })
    .catch(err => console.error('Error fetching dice count:', err));
}

setInterval(updateDiceCount, 100); 
updateDiceCount(); 

//getting money per second from python

const moneyPerSecSpan = document.getElementById('money-per-sec-span');

function updateMoneyPerSec() {
  fetch('/get_money_per_sec_info_from_py')
    .then(res => res.json())
    .then(data => {
      moneyPerSecSpan.textContent = `Money Per Second: $${data.money_per_sec}`;
    })
    .catch(err => console.error('Error fetching money per second:', err));
}
setInterval(updateMoneyPerSec, 100);
updateMoneyPerSec();

//getting money generation from python

const moneyGenerationSpan = document.getElementById('money-generation-span');

function updateMoneyGeneration() {
  fetch('/get_money_generation_from_py')
    .then(res => res.json())
    .then(data => {
      moneyGenerationSpan.textContent = `Money: $${data.money}`;
    })
    .catch(err => console.error('Error fetching money generation:', err));
}
setInterval(updateMoneyGeneration, 100);
updateMoneyGeneration();

//sending 39th Street Button to python
const thirtyNinthStreetButton = document.getElementById('39th_street_button');

thirtyNinthStreetButton.addEventListener('click', () => {
    fetch('/get_39th_street_button_click_from_js', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "buy": true })
    })
    .then(response => response.json())
    .then(data => {
        console.log('39th Street purchase attempt:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});

//getting 39th Street info from python

const thirtyNinthStreetInfoSpan = document.getElementById('39th_street_info_span');

function updateThirtyNinthStreetInfo() {
    fetch('/get_39th_street_button_click_from_py')
        .then(res => res.json())
        .then(data => {
            thirtyNinthStreetInfoSpan.textContent = `Owned: ${data.owned} | Cost: $${data.cost}`;
        }
    )
    .catch(err => console.error('Error fetching 39th Street info:', err));
}

setInterval(updateThirtyNinthStreetInfo, 1000);
updateThirtyNinthStreetInfo();

//Saving Data on Window Close
window.addEventListener("beforeunload", () => {
  const payload = JSON.stringify({
    username: "test",
    email: "test@example.com"
  });

  navigator.sendBeacon("/save-on-close", payload);
});