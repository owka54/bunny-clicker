// Variables //

// Player
let carrots = 0;
let allTimeCarrots = 0;

let totalClicks = 0;
let perClick = 1;

let perSecond = 0;

// Paw
let pawTotal = 0;
let pawCost = 10;
let pawIdle = 0.1;

// Hay
let hayTotal = 0;
let hayCost = 100;
let hayIdle = 1;

// Flower
let flowerTotal = 0;
let flowerCost = 500;
let flowerIdle = 5;

// Water
let waterTotal = 0;
let waterCost = 1000;
let waterIdle = 10

// Hutch
let hutchTotal = 0;
let hutchCost = 2500;
let hutchIdle = 25;

// Bunny
let bunnyTotal = 0;
let bunnyCost = 5000;
let bunnyIdle = 50;

// Farm
let farmTotal = 0;
let farmCost = 10000;
let farmIdle = 100;
// // // // // // // // // //


// Increment carrots every click
function carrotClick() {
    carrots += perClick;
    allTimeCarrots += perClick
    totalClicks += 1;
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
    perSecond = ((pawIdle * pawTotal) + (hayIdle * hayTotal) + (flowerIdle * flowerTotal) + (waterIdle * waterTotal) + (hutchIdle * hutchTotal) + (bunnyIdle * bunnyTotal) + (farmIdle * farmTotal))
    if (totalAchievements > 0) {
        achievementBonus()
    }
    const onedp = perSecond.toFixed(1)
    console.log(onedp)
    document.getElementById('idle-carrots').innerHTML = `${onedp} carrots per second`;
}
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 

// STORE //

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

// Store item - WATER
function waterBuy() {
    // Check to see if the player has enough carrots
    if (carrots < waterCost) {
        alert('Not enough carrots!')
        return;
    }
    waterTotal += 1;
    carrots -= waterCost;
    document.getElementById('water-total').innerHTML = `x${waterTotal}`;
    document.getElementById('total-carrots').innerHTML = Math.floor(carrots);

    // Increase cost each time user buys 1
    waterCost *= 1.15;
    document.getElementById('water-cost').innerHTML = waterCost.toFixed(1);

    // Invoke idleCarrots to increase carrots per second
    idleCarrots();
}

// Store item - HUTCH
function hutchBuy() {
    // Check to see if the player has enough carrots
    if (carrots < hutchCost) {
        alert('Not enough carrots!')
        return;
    }
    hutchTotal += 1;
    carrots -= hutchCost;
    document.getElementById('hutch-total').innerHTML = `x${hutchTotal}`;
    document.getElementById('total-carrots').innerHTML = Math.floor(carrots);

    // Increase cost each time user buys 1
    hutchCost *= 1.15;
    document.getElementById('hutch-cost').innerHTML = hutchCost.toFixed(1);

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

// Store item - FARM
function farmBuy() {
    if (carrots < farmCost) {
        alert('Not enough carrots!')
        return;
    }
    farmTotal += 1;
    carrots -= farmCost;
    document.getElementById('farm-total').innerHTML = `x${farmTotal}`;
    document.getElementById('total-carrots').innerHTML = Math.floor(carrots);

    farmCost *= 1.15;
    document.getElementById('farm-cost').innerHTML = farmCost.toFixed(1);

    idleCarrots()
}

// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 


// UPGRADES

// Purchased upgrades array
let purchasedUpgrades = [];


var upgradeInterval = setInterval(checkUpgrades, 5000);
if (allTimeCarrots < 50) {
    const elements = document.getElementsByClassName('paw-upgrade');
    for (let element in elements) {
        elements[element].hidden = true;
    }
}
if (allTimeCarrots < 250) {
    const elements = document.getElementsByClassName('click-upgrade');
    for (let element in elements) {
        elements[element].hidden = true;
    }
}
function checkUpgrades() {
    if (allTimeCarrots >= 50 && (!purchasedUpgrades.includes('pawUpgrade'))) {
        const elements = document.getElementsByClassName('paw-upgrade');
        for (let element in elements) {
            elements[element].hidden = false;
    }} 
    if (allTimeCarrots >= 250 && (!purchasedUpgrades.includes('clickUpgrade'))) {
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
    document.getElementsByClassName('click-upgrade')[0].style.marginBottom = '3rem'
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
    document.getElementsByClassName('paw-upgrade')[0].style.marginBottom = '3rem'


}

// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 

// ACHIEVEMENTS

let achievementsGot = [];
let totalAchievements = 0;

// Add 1% to carrots per second for every achievement earned
function achievementBonus() {
    let totalBonus = totalAchievements * 0.1;
    perSecond += perSecond * totalBonus;
}

if (totalClicks < 100) {
    document.getElementById('achievement-onehundred-clicks').hidden = true
}
if (pawTotal < 10) {
    document.getElementById('achievement-ten-paws').hidden = true
}

var achievemntInterval = setInterval(checkAchievements, 5000);
function checkAchievements() {
    if (totalClicks > 100 && (!achievementsGot.includes('onehundredClicks'))) {
        document.getElementById('achievement-onehundred-clicks').hidden = false
        achievementsGot.push('onehundredClicks')
        totalAchievements += 1
        idleCarrots()
        alert('Achievement unlocked!\nClick 100 times.')
    }
    if (pawTotal >= 10 && (!achievementsGot.includes('tenPaws'))) {
        document.getElementById('achievement-ten-paws').hidden = false
        achievementsGot.push('tenPaws')
        totalAchievements += 1
        idleCarrots()
        alert('Achievement unlocked!\nHave 10 paws')
    }
}