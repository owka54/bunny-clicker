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
    document.getElementsByClassName('item-info')[0].innerHTML = `${pawIdle} cps`;
    document.getElementsByClassName('item-info')[1].innerHTML = `${hayIdle} cps`;
    document.getElementsByClassName('item-info')[2].innerHTML = `${flowerIdle} cps`;
    document.getElementsByClassName('item-info')[3].innerHTML = `${waterIdle} cps`;
    document.getElementsByClassName('item-info')[4].innerHTML = `${hutchIdle} cps`;
    document.getElementsByClassName('item-info')[5].innerHTML = `${bunnyIdle} cps`;
    document.getElementsByClassName('item-info')[6].innerHTML = `${farmIdle} cps`;
}
// Calculate and display carrots per second
function idleCarrots() {
    perSecond = ((pawIdle * pawTotal) + (hayIdle * hayTotal) + (flowerIdle * flowerTotal) + (waterIdle * waterTotal) + (hutchIdle * hutchTotal) + (bunnyIdle * bunnyTotal) + (farmIdle * farmTotal))
    if (totalAchievements > 0) {
        achievementBonus()
    }
    const onedp = perSecond.toFixed(1)
    document.getElementById('idle-carrots').innerHTML = `${onedp} carrots per second`;
}
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 

// Saving the game
// auto-save every 30 seconds
const autoSave = setInterval(saveGame, 30000);

function loadGame() {
    let savedGame = JSON.parse(localStorage.getItem('gameSave'));
    if (typeof savedGame.carrots !== 'undefined') carrots = savedGame.carrots;
    if (typeof savedGame.allTimeCarrots !== 'undefined') allTimeCarrots = savedGame.allTimeCarrots;
    if (typeof savedGame.totalClicks !== 'undefined') totalClicks = savedGame.totalClicks;
    if (typeof savedGame.perClick !== 'undefined') perClick = savedGame.perClick;
    if (typeof savedGame.perSecond !== 'undefined') perSecond = savedGame.perSecond;

    if (typeof savedGame.pawTotal !== 'undefined') pawTotal = savedGame.pawTotal;
    if (typeof savedGame.pawCost !== 'undefined') pawCost = savedGame.pawCost;
    if (typeof savedGame.pawIdle !== 'undefined') pawIdle = savedGame.pawIdle;

    if (typeof savedGame.hayTotal !== 'undefined') hayTotal = savedGame.hayTotal;
    if (typeof savedGame.hayCost !== 'undefined') hayCost = savedGame.hayCost;
    if (typeof savedGame.hayIdle !== 'undefined') hayIdle = savedGame.hayIdle;

    if (typeof savedGame.flowerTotal !== 'undefined') flowerTotal = savedGame.flowerTotal;
    if (typeof savedGame.flowerCost !== 'undefined') flowerCost = savedGame.flowerCost;
    if (typeof savedGame.flowerIdle !== 'undefined') flowerIdle = savedGame.flowerIdle;

    if (typeof savedGame.waterTotal !== 'undefined') waterTotal = savedGame.waterTotal;
    if (typeof savedGame.waterCost !== 'undefined') waterCost = savedGame.waterCost;
    if (typeof savedGame.waterIdle !== 'undefined') waterIdle = savedGame.waterIdle;

    if (typeof savedGame.hutchTotal !== 'undefined') hutchTotal = savedGame.hutchTotal;
    if (typeof savedGame.hutchCost !== 'undefined') hutchCost = savedGame.hutchCost;
    if (typeof savedGame.hutchIdle !== 'undefined') hutchIdle = savedGame.hutchIdle;

    if (typeof savedGame.bunnyTotal !== 'undefined') bunnyTotal = savedGame.bunnyTotal;
    if (typeof savedGame.bunnyCost !== 'undefined') bunnyCost = savedGame.bunnyCost;
    if (typeof savedGame.bunnyIdle !== 'undefined') bunnyIdle = savedGame.bunnyIdle;

    if (typeof savedGame.farmTotal !== 'undefined') farmTotal = savedGame.farmTotal;
    if (typeof savedGame.farmCost !== 'undefined') farmCost = savedGame.farmCost;
    if (typeof savedGame.farmIdle !== 'undefined') farmIdle = savedGame.farmIdle;

    if (typeof savedGame.purchasedUpgrades !== 'undefined') purchasedUpgrades = savedGame.purchasedUpgrades;

    if (typeof savedGame.achievementsGot !== 'undefined') achievementsGot = savedGame.achievementsGot;
    if (typeof savedGame.totalAchievements !== 'undefined') totalAchievements = savedGame.totalAchievements;
    if (typeof savedGame.noOfAchievements !== 'undefined') noOfAchievements = savedGame.noOfAchievements;


}
// Save the game
function saveGame() {
    let gameSave = {
        carrots: carrots,
        allTimeCarrots: allTimeCarrots,
        totalClicks: totalClicks,
        perClick: perClick,
        perSecond: perSecond,

        pawTotal: pawTotal,
        pawCost: pawCost,
        pawIdle: pawIdle,

        hayTotal: hayTotal,
        hayCost: hayCost,
        hayIdle: hayIdle,

        flowerTotal: flowerTotal,
        flowerCost: flowerCost,
        flowerIdle: flowerIdle,

        waterTotal: waterTotal,
        waterCost: waterCost,
        waterIdle: waterIdle,

        hutchTotal: hutchTotal,
        hutchCost: hutchCost,
        hutchIdle: hutchIdle,

        bunnyTotal: bunnyTotal,
        bunnyCost: bunnyCost,
        bunnyIdle: bunnyIdle,

        farmTotal: farmTotal,
        farmCost: farmCost,
        farmIdle: farmIdle,

        purchasedUpgrades: purchasedUpgrades,

        achievementsGot: achievementsGot,
        totalAchievements: totalAchievements,
        noOfAchievements: noOfAchievements
    };
    localStorage.setItem('gameSave', JSON.stringify(gameSave));

}
// Save game by pressing 'CTRL + S'
document.addEventListener('keydown', function(event) {
    if(event.ctrlKey && event.which == 83) {
        event.preventDefault();
        saveGame();
    }
})

// Load saved game and display everything correctly
window.onload = function() {
    loadGame();
    console.log(allTimeCarrots)
    idleCarrots();

    document.getElementById('paw-total').innerHTML = `x${pawTotal}`;
    document.getElementById('paw-cost').innerHTML = pawCost.toFixed(1);
    document.getElementById('hay-total').innerHTML = `x${hayTotal}`;
    document.getElementById('hay-cost').innerHTML = hayCost.toFixed(1);
    document.getElementById('flower-total').innerHTML = `x${flowerTotal}`;
    document.getElementById('flower-cost').innerHTML = flowerCost.toFixed(1);
    document.getElementById('water-total').innerHTML = `x${waterTotal}`;
    document.getElementById('water-cost').innerHTML = waterCost.toFixed(1);
    document.getElementById('hutch-total').innerHTML = `x${hutchTotal}`;
    document.getElementById('hutch-cost').innerHTML = hutchCost.toFixed(1);
    document.getElementById('bunny-total').innerHTML = `x${bunnyTotal}`;
    document.getElementById('bunny-cost').innerHTML = bunnyCost.toFixed(1);
    document.getElementById('farm-total').innerHTML = `x${farmTotal}`;
    document.getElementById('farm-cost').innerHTML = farmCost.toFixed(1);

    for (let achievement in achievementsGot) {
        document.getElementById(achievementsGot[achievement]).hidden = false;
        document.getElementById(achievementsGot[achievement]).style.border = '2px solid gold'
        document.getElementById(achievementsGot[achievement]).style.height = '8rem'
        document.getElementById(achievementsGot[achievement]).style.width = '8rem'
    }

    for (let upgrade in purchasedUpgrades) {
        console.log(purchasedUpgrades[upgrade])
        document.querySelector(`#${purchasedUpgrades[upgrade]} button`).hidden = false;
        console.log(`#${purchasedUpgrades[upgrade]} button`)
        document.querySelector(`#${purchasedUpgrades[upgrade]} button`).disabled = true;
        document.querySelector(`#${purchasedUpgrades[upgrade]} button`).style.borderColor = 'lime';
        document.querySelector(`#${purchasedUpgrades[upgrade]} button`).style.setProperty('background-color', 'black');
        document.querySelector(`#${purchasedUpgrades[upgrade]} button`).style.marginBottom = '3rem'
        document.querySelector(`#${purchasedUpgrades[upgrade]} p`).hidden = true
    }

    document.querySelector('.achievements h2').innerHTML = `Acievements (${totalAchievements} / ${noOfAchievements})`;
    
}

// Resetting game
function resetGame() {
    if (confirm('Are you sure you want to reset your game?')) {
        var gameSave = {};
        localStorage.setItem('gameSave', JSON.stringify(gameSave));
        location.reload();
    }
}


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
// if (allTimeCarrots < 50) {
//     document.getElementById('paw-upgrade').hidden = true;
// }
// if (allTimeCarrots < 250) {
//     document.getElementById('click-upgrade').hidden = true;
// }
function checkUpgrades() {
    if (allTimeCarrots >= 50 && (!purchasedUpgrades.includes('paw-upgrade'))) {
        document.getElementById('paw-upgrade').hidden = false;
    }
    if (allTimeCarrots >= 250 && (!purchasedUpgrades.includes('click-upgrade'))) {
        document.getElementById('click-upgrade').hidden = false;
}}


function pawUpgrade() {
    if (carrots < 100) {
        alert('Not enough carrots!');
        return;
    }
    pawIdle *= 2;
    purchasedUpgrades.push('paw-upgrade')
    idleCarrots();

    carrots -= 100;
    document.getElementById('total-carrots').innerHTML = Math.floor(carrots);

    document.querySelector('#paw-upgrade button').hidden = false;
    document.querySelector('#paw-upgrade button').disabled = true;
    document.querySelector('#paw-upgrade button').style.borderColor = 'lime';
    document.querySelector('#paw-upgrade button').style.setProperty('background-color', 'black');
    document.querySelector('#paw-upgrade button').style.marginBottom = '3rem'
    document.querySelector('#paw-upgrade p').hidden = true;
}

function clickUpgrade() {
    if (carrots < 500) {
        alert('Not enough carrots!');
        return;
    }
    perClick *= 2;
    purchasedUpgrades.push('click-upgrade')

    carrots -= 500;
    document.getElementById('total-carrots').innerHTML = Math.floor(carrots);

    document.querySelector('#click-upgrade button').hidden = false;
    document.querySelector('#click-upgrade button').disabled = true;
    document.querySelector('#click-upgrade button').style.borderColor = 'lime';
    document.querySelector('#click-upgrade button').style.setProperty('background-color', 'black');
    document.querySelector('#click-upgrade button').style.marginBottom = '3rem'
    document.querySelector('#click-upgrade p').hidden = true
}
function clickUpgrade2() {
    if (carrots < 2000) {
        alert('Not enough carrots!');
        return;
    }
    perClick *= 2;
    purchasedUpgrades.push('click-upgrade2')

    carrots -= 2000;
    document.getElementById('total-carrots').innerHTML = Math.floor(carrots);

    document.querySelector('#click-upgrade2 button').hidden = false;
    document.querySelector('#click-upgrade2 button').disabled = true;
    document.querySelector('#click-upgrade2 button').style.borderColor = 'lime';
    document.querySelector('#click-upgrade2 button').style.setProperty('background-color', 'black');
    document.querySelector('#click-upgrade2 button').style.marginBottom = '3rem'
    document.querySelector('#click-upgrade2 p').hidden = true
}

function hayUpgrade() {
    if (carrots < 750) {
        alert('Not enough carrots!');
        return;
    }
    hayIdle *= 1.5;
    purchasedUpgrades.push('hay-upgrade')
    idleCarrots();

    carrots -= 750;
    document.getElementById('total-carrots').innerHTML = Math.floor(carrots);

    document.querySelector('#hay-upgrade button').hidden = false;
    document.querySelector('#hay-upgrade button').disabled = true;
    document.querySelector('#hay-upgrade button').style.borderColor = 'lime';
    document.querySelector('#hay-upgrade button').style.setProperty('background-color', 'black');
    document.querySelector('#hay-upgrade button').style.marginBottom = '3rem'
    document.querySelector('#hay-upgrade p').hidden = true;
}

function flowerUpgrade() {
    if (carrots < 1250) {
        alert('Not enough carrots!');
        return;
    }
    flowerIdle *= 1.5;
    purchasedUpgrades.push('flower-upgrade')
    idleCarrots();

    carrots -= 1250;
    document.getElementById('total-carrots').innerHTML = Math.floor(carrots);

    document.querySelector('#flower-upgrade button').hidden = false;
    document.querySelector('#flower-upgrade button').disabled = true;
    document.querySelector('#flower-upgrade button').style.borderColor = 'lime';
    document.querySelector('#flower-upgrade button').style.setProperty('background-color', 'black');
    document.querySelector('#flower-upgrade button').style.marginBottom = '3rem'
    document.querySelector('#flower-upgrade p').hidden = true;
}

// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 

// ACHIEVEMENTS

let achievementsGot = [];
let totalAchievements = 0;
let noOfAchievements = 12;



// Add 1% to carrots per second for every achievement earned
function achievementBonus() {
    let totalBonus = totalAchievements * 0.01;
    perSecond += perSecond * totalBonus;
    let percentageBoost = totalBonus * 100
    if (totalBonus > 0) {
        document.querySelector('.achievements p').innerHTML = `Total boost = ${percentageBoost}%`
}}

// click achievements
if (totalClicks < 1) {
    document.getElementById('achievement-one-click').hidden = true
}
if (totalClicks < 100) {
    document.getElementById('achievement-onehundred-clicks').hidden = true
}
if (totalClicks < 1000) {
    document.getElementById('achievement-onethousand-clicks').hidden = true
}
if (totalClicks < 10000) {
    document.getElementById('achievement-tenthousand-clicks').hidden = true
}

// cps achievements
if (perSecond < 1) {
    document.getElementById('achievement-one-cps').hidden = true
}
if (perSecond < 10) {
    document.getElementById('achievement-ten-cps').hidden = true
}
if (perSecond < 50) {
    document.getElementById('achievement-fifty-cps').hidden = true
}
if (perSecond < 100) {
    document.getElementById('achievement-onehundred-cps').hidden = true
}

// paw achievements
if (pawTotal < 1) {
    document.getElementById('achievement-one-paw').hidden = true
}
if (pawTotal < 10) {
    document.getElementById('achievement-ten-paws').hidden = true
}

// hay achievements
if (hayTotal < 10) {
    document.getElementById('achievement-ten-hay').hidden = true
}

// flower achievements
if (flowerTotal < 10) {
    document.getElementById('achievement-ten-flower').hidden = true
}

var achievemntInterval = setInterval(checkAchievements, 5000);
function checkAchievements() {
    // click
    if (totalClicks >= 1 && (!achievementsGot.includes('achievement-one-click'))) {
        document.getElementById('achievement-one-click').hidden = false
        document.getElementById('achievement-one-click').style.border = '2px solid gold'
        document.getElementById('achievement-one-click').style.height = '8rem'
        document.getElementById('achievement-one-click').style.width = '8rem'
        achievementsGot.push('achievement-one-click')
        totalAchievements += 1
        idleCarrots()
        alert('Achievement unlocked!\nClick 1 time.')
    }
    if (totalClicks >= 100 && (!achievementsGot.includes('achievement-onehundred-clicks'))) {
        document.getElementById('achievement-onehundred-clicks').hidden = false
        document.getElementById('achievement-onehundred-clicks').style.border = '2px solid gold'
        document.getElementById('achievement-onehundred-clicks').style.height = '8rem'
        document.getElementById('achievement-onehundred-clicks').style.width = '8rem'
        achievementsGot.push('achievement-onehundred-clicks')
        totalAchievements += 1
        idleCarrots()
        alert('Achievement unlocked!\nClick 100 times.')
    }
    if (totalClicks >= 1000 && (!achievementsGot.includes('achievement-onethousand-clicks'))) {
        document.getElementById('achievement-onethousand-clicks').hidden = false
        document.getElementById('achievement-onethousand-clicks').style.border = '2px solid gold'
        document.getElementById('achievement-onethousand-clicks').style.height = '8rem'
        document.getElementById('achievement-onethousand-clicks').style.width = '8rem'
        achievementsGot.push('achievement-onethousand-clicks')
        totalAchievements += 1
        idleCarrots()
        alert('Achievement unlocked!\nClick 1000 times.')
    }
    if (totalClicks >= 10000 && (!achievementsGot.includes('achievement-tenthousand-clicks'))) {
        document.getElementById('achievement-tenthousand-clicks').hidden = false
        document.getElementById('achievement-tenthousand-clicks').style.border = '2px solid gold'
        document.getElementById('achievement-tenthousand-clicks').style.height = '8rem'
        document.getElementById('achievement-tenthousand-clicks').style.width = '8rem'
        achievementsGot.push('achievement-tenthousand-clicks')
        totalAchievements += 1
        idleCarrots()
        alert('Achievement unlocked!\nClick 10000 times.')
    }
    // cps
    if (perSecond >= 1 && (!achievementsGot.includes('achievement-one-cps'))) {
        document.getElementById('achievement-one-cps').hidden = false
        document.getElementById('achievement-one-cps').style.border = '2px solid gold'
        document.getElementById('achievement-one-cps').style.height = '8rem'
        document.getElementById('achievement-one-cps').style.width = '8rem'
        achievementsGot.push('achievement-one-cps')
        totalAchievements += 1
        idleCarrots()
        alert('Achievement unlocked!\nGet 1 carrot per second')
    }
    if (perSecond >= 10 && (!achievementsGot.includes('achievement-ten-cps'))) {
        document.getElementById('achievement-ten-cps').hidden = false
        document.getElementById('achievement-ten-cps').style.border = '2px solid gold'
        document.getElementById('achievement-ten-cps').style.height = '8rem'
        document.getElementById('achievement-ten-cps').style.width = '8rem'
        achievementsGot.push('achievement-ten-cps')
        totalAchievements += 1
        idleCarrots()
        alert('Achievement unlocked!\nGet 10 carrots per second')
    }
    if (perSecond >= 50 && (!achievementsGot.includes('achievement-fifty-cps'))) {
        document.getElementById('achievement-fifty-cps').hidden = false
        document.getElementById('achievement-fifty-cps').style.border = '2px solid gold'
        document.getElementById('achievement-fifty-cps').style.height = '8rem'
        document.getElementById('achievement-fifty-cps').style.width = '8rem'
        achievementsGot.push('achievement-fifty-cps')
        totalAchievements += 1
        idleCarrots()
        alert('Achievement unlocked!\nGet 50 carrots per second')
    }
    if (perSecond >= 100 && (!achievementsGot.includes('achievement-onehundred-cps'))) {
        document.getElementById('achievement-onehundred-cps').hidden = false
        document.getElementById('achievement-onehundred-cps').style.border = '2px solid gold'
        document.getElementById('achievement-onehundred-cps').style.height = '8rem'
        document.getElementById('achievement-onehundred-cps').style.width = '8rem'
        achievementsGot.push('achievement-onehundred-cps')
        totalAchievements += 1
        idleCarrots()
        alert('Achievement unlocked!\nGet 100 carrots per second')
    }
    // paw
    if (pawTotal >= 1 && (!achievementsGot.includes('achievement-one-paw'))) {
        document.getElementById('achievement-one-paw').hidden = false
        document.getElementById('achievement-one-paw').style.border = '2px solid gold'
        document.getElementById('achievement-one-paw').style.height = '8rem'
        document.getElementById('achievement-one-paw').style.width = '8rem'
        achievementsGot.push('achievement-one-paw')
        totalAchievements += 1
        idleCarrots()
        alert('Achievement unlocked!\nHave 1 paw')
    }
    if (pawTotal >= 10 && (!achievementsGot.includes('achievement-ten-paws'))) {
        document.getElementById('achievement-ten-paws').hidden = false
        document.getElementById('achievement-ten-paws').style.border = '2px solid gold'
        document.getElementById('achievement-ten-paws').style.height = '8rem'
        document.getElementById('achievement-ten-paws').style.width = '8rem'
        achievementsGot.push('achievement-ten-paws')
        totalAchievements += 1
        idleCarrots()
        alert('Achievement unlocked!\nHave 10 paws')
    }
    // hay
    if (hayTotal >= 10 && (!achievementsGot.includes('achievement-ten-hay'))) {
        document.getElementById('achievement-ten-hay').hidden = false;
        document.getElementById('achievement-ten-hay').style.border = '2px solid gold'
        document.getElementById('achievement-ten-hay').style.height = '8rem'
        document.getElementById('achievement-ten-hay').style.width = '8rem'
        achievementsGot.push('achievement-ten-hay');
        totalAchievements += 1;
        idleCarrots()
        alert('Achievement unlocked!\nHave 10 hay')
    }
    // flower
    if (flowerTotal >= 10 && (!achievementsGot.includes('achievement-ten-flower'))) {
        document.getElementById('achievement-ten-flower').hidden = false;
        document.getElementById('achievement-ten-flower').style.border = '2px solid gold'
        document.getElementById('achievement-ten-flower').style.height = '8rem'
        document.getElementById('achievement-ten-flower').style.width = '8rem'
        achievementsGot.push('achievement-ten-flower');
        totalAchievements += 1;
        idleCarrots()
        alert('Achievement unlocked!\nHave 10 flower')
    }
    document.querySelector('.achievements h2').innerHTML = `Acievements (${totalAchievements} / ${noOfAchievements})`;
}