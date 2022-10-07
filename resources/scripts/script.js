let carrots = 500;
let allTimeCarrots = 500;
let perClick = 1;
let perSecond = 0;

let pawTotal = 0;
let pawCost = 10;
let pawIdle = 0.1;

let hayTotal = 0;
let hayCost = 100;

let flowerTotal = 0;
let flowerCost = 500;

let bunnyTotal = 0;
let bunnyCost = 1000;


function carrotClick() {
    carrots += perClick;
    allTimeCarrots += perClick
    document.getElementById('total-carrots').innerHTML = Math.floor(carrots);
}

// Invoke idleIncrement every second
var interval = setInterval(idleIncrement, 1000);
// Increment carrot count by idle amount
function idleIncrement() {
    carrots += perSecond;
    allTimeCarrots += perSecond
    document.getElementById('total-carrots').innerHTML = Math.floor(carrots);
}
// Calculate and display carrots per second
function idleCarrots() {
    perSecond = ((pawIdle * pawTotal) + (1 * hayTotal) + (5 * flowerTotal) + (25 * bunnyTotal))
    const onedp = perSecond.toFixed(1)
    console.log(onedp)
    document.getElementById('idle-carrots').innerHTML = `${onedp} carrots per second`;
}

// Store item - PAW

function pawBuy() {
    // Check to see if the player has enough carrots
    if (carrots < pawCost) {
        alert('Not enough carrots!')
        return;
    }
    pawTotal += 1;
    carrots -= pawCost;
    document.getElementById('paw-total').innerHTML = `x${pawTotal}`;
    document.getElementById('total-carrots').innerHTML = Math.floor(carrots);

    // Increase cost each time user buys 1
    pawCost *= 1.15;
    document.getElementById('paw-cost').innerHTML = pawCost.toFixed(1);

    // Invoke idleCarrots to increase carrots per second
    idleCarrots();
}

// Store item - HAY

function hayBuy() {
    // Check to see if the player has enough carrots
    if (carrots < hayCost) {
        alert('Not enough carrots!')
        return;
    }
    hayTotal += 1;
    carrots -= hayCost;
    document.getElementById('hay-total').innerHTML = `x${hayTotal}`;
    document.getElementById('total-carrots').innerHTML = Math.floor(carrots);

    // Increase cost each time user buys 1
    hayCost *= 1.15;
    document.getElementById('hay-cost').innerHTML = hayCost.toFixed(1);

    // Invoke idleCarrots to increase carrots per second
    idleCarrots();
}

// Store item - FLOWER

function flowerBuy() {
    // Check to see if the player has enough carrots
    if (carrots < flowerCost) {
        alert('Not enough carrots!')
        return;
    }
    flowerTotal += 1;
    carrots -= flowerCost;
    document.getElementById('flower-total').innerHTML = `x${flowerTotal}`;
    document.getElementById('total-carrots').innerHTML = Math.floor(carrots);

    // Increase cost each time user buys 1
    flowerCost *= 1.15;
    document.getElementById('flower-cost').innerHTML = flowerCost.toFixed(1);

    // Invoke idleCarrots to increase carrots per second
    idleCarrots();
}


// Store item - BUNNY

function bunnyBuy() {
    if (carrots < bunnyCost) {
        alert('Not enough carrots!')
        return;
    }
    bunnyTotal += 1;
    carrots -= bunnyCost;
    document.getElementById('bunny-total').innerHTML = `x${bunnyTotal}`;
    document.getElementById('total-carrots').innerHTML = Math.floor(carrots);

    bunnyCost *= 1.15;
    document.getElementById('bunny-cost').innerHTML = bunnyCost.toFixed(1);

    idleCarrots()
}





// Purchased upgrades array
let purchasedUpgrades = [];


var upgradeInterval = setInterval(checkUpgrades, 5000);
if (allTimeCarrots < 100) {
    const elements = document.getElementsByClassName('click-upgrade');
    for (let element in elements) {
        elements[element].hidden = true;
    }
}
function checkUpgrades() {
    if (allTimeCarrots >= 100 && (!purchasedUpgrades.includes('clickUpgrade'))) {
        const elements = document.getElementsByClassName('click-upgrade');
        for (let element in elements) {
            elements[element].hidden = false;
    }} 
}


function clickUpgrade() {
    if (carrots < 500) {
        alert('Not enough carrots!');
        return;
    }
    perClick = 2;
    purchasedUpgrades.push('clickUpgrade')

    carrots -= 500;
    document.getElementById('total-carrots').innerHTML = Math.floor(carrots);

    document.getElementsByClassName('click-upgrade')[1].hidden = true;
    document.getElementsByClassName('click-upgrade')[0].disabled = true;
    document.getElementsByClassName('click-upgrade')[0].style.borderColor = 'lime';
    document.getElementsByClassName('click-upgrade')[0].style.setProperty('background-color', 'black');
}

function pawUpgrade() {
    if (carrots < 100) {
        alert('Not enough carrots!');
        return;
    }
    pawIdle = 0.2;
    purchasedUpgrades.push('pawUpgrade')
    idleCarrots();

    carrots -= 100;
    document.getElementById('total-carrots').innerHTML = Math.floor(carrots);

    document.getElementsByClassName('paw-upgrade')[1].hidden = true;
    document.getElementsByClassName('paw-upgrade')[0].disabled = true;
    document.getElementsByClassName('paw-upgrade')[0].style.borderColor = 'lime';
    document.getElementsByClassName('paw-upgrade')[0].style.setProperty('background-color', 'black');

}