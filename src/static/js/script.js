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
    .catch((error) => {
        console.error('Error:', error);
    });
});

//getting dice count from python

const diceCountSpan = document.getElementById('dice-count-span');

async function updateDiceCount() {
  fetch('/get_dice_info_from_py', {cache: "no-cache"})
    .then(res => res.json())
    .then(data => {
      diceCountSpan.textContent = `${data.count} | ${data.username}'s Game`;
    })
    .catch(err => console.error('Error fetching dice count:', err));
}

//getting money per second from python

const moneyPerSecSpan = document.getElementById('money-per-sec-span');

async function updateMoneyPerSec() {
  fetch('/get_money_per_sec_info_from_py', {cache: "no-cache"})
    .then(res => res.json())
    .then(data => {
      moneyPerSecSpan.textContent = `Money Per Second: $${data.money_per_sec.toLocaleString()}`;
    })
    .catch(err => console.error('Error fetching money per second:', err));
}

//getting money generation from python

const moneyGenerationSpan = document.getElementById('money-generation-span');

async function updateMoneyGeneration() {
  fetch('/get_money_generation_from_py', {cache: "no-cache"})
    .then(res => res.json())
    .then(data => {
      moneyGenerationSpan.textContent = `Money: $${data.money.toLocaleString()}`;
    })
    .catch(err => console.error('Error fetching money generation:', err));
}

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
    .catch((error) => {
        console.error('Error:', error);
    });
});

//getting 39th Street info from python

const thirtyNinthStreetInfoSpan = document.getElementById('39th_street_info_span');

async function updateThirtyNinthStreetInfo() {
    fetch('/get_39th_street_button_click_from_py', {cache: "no-cache"})
        .then(res => res.json())
        .then(data => {
            thirtyNinthStreetInfoSpan.textContent = `Owned: ${data.owned} | Cost: $${data.cost}`;
        }
    )
    .catch(err => console.error('Error fetching 39th Street info:', err));
}

//sending The Paseo Button to python

const thePaseoButton = document.getElementById('the_Paseo_button');

thePaseoButton.addEventListener('click', () => {
    fetch('/get_The_Paseo_button_click_from_js', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "buy": true })
    })
    .then(response => response.json())
    .catch((error) => {
        console.error('Error:', error);
    });
});

//getting The Paseo info from python

const thePaseoInfoSpan = document.getElementById('The_Paseo_info_span');

async function updateThePaseoInfo() {
    fetch('/get_The_Paseo_button_click_from_py', {cache: "no-cache"})
        .then(res => res.json())
        .then(data => {
            thePaseoInfoSpan.textContent = `Owned: ${data.owned} | Cost: $${data.cost}`;
        }
    )
    .catch(err => console.error('Error fetching The Paseo info:', err));
}

// send data back at one time
// use mod operater if you need different intervals for each

setInterval(() => {
  Promise.all([
    updateDiceCount(),
    updateMoneyPerSec(),
    //updateMoneyGeneration(),
    updateThirtyNinthStreetInfo(),
    updateThePaseoInfo()
  ])
  .catch((error) => {
    console.error('Error updating all data:', error);
  });
}, 1000);

//dice count at faster interval to make it feel more responsive

setInterval(updateMoneyGeneration, 250);
updateMoneyGeneration()

//Saving Data on Window Close

window.addEventListener("beforeunload", (event) => {
  const payload = JSON.stringify({
    username: "test",
    email: "test@example.com"
  });

  // Use fetch with keepalive to ensure request completes before unload
  fetch("/save-on-close", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: payload,
    keepalive: true
  }).catch((error) => {
    console.error('Error saving on close:', error);
  });
});