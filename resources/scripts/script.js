// Variables //

let player = {
    carrots: 202,
    allTimeCarrots: 0,

    totalClicks: 0,
    perClick: 1,

    perSecond: 0,

    achievementsGot: [],
    totalAchievements: 0,
    
    purchasedUpgrades: [],
}

let game = {
    storeMultiple: 1,
}

let storeItems = {
    paw: {
        total: 0,
        cost: 10,
        idle: 0.1
    },
    hay: {
        total: 0,
        cost: 100,
        idle: 1
    },
    flower: {
        total: 0,
        cost: 500,
        idle: 5
    },
    water: {
        total: 0,
        cost: 1000,
        idle: 10
    },
    hutch: {
        total: 0,
        cost: 2500,
        idle: 25
    },
    bunny: {
        total: 0,
        cost: 5000,
        idle: 50
    },
    farm: {
        total: 0,
        cost: 10000,
        idle: 100
    }
}

noOfAchievements = 21;
noOfUpgrades = 6;
// // // // // // // // // //


// Increment carrots every click
function carrotClick() {
    player.carrots += player.perClick;
    player.allTimeCarrots += player.perClick
    player.totalClicks += 1;
    document.getElementById('total-carrots').innerHTML = Math.floor(player.carrots);
}

// Invoke idleIncrement every second
var interval = setInterval(idleIncrement, 1000);
// Increment carrot count by idle amount
function idleIncrement() {
    player.carrots += player.perSecond;
    player.allTimeCarrots += player.perSecond
    document.getElementById('total-carrots').innerHTML = Math.floor(player.carrots);
    // Display cps of each store item when hover over the image
    document.getElementsByClassName('item-info')[0].innerHTML = `${storeItems.paw.idle} cps`;
    document.getElementsByClassName('item-info')[1].innerHTML = `${storeItems.hay.idle} cps`;
    document.getElementsByClassName('item-info')[2].innerHTML = `${storeItems.flower.idle} cps`;
    document.getElementsByClassName('item-info')[3].innerHTML = `${storeItems.water.idle} cps`;
    document.getElementsByClassName('item-info')[4].innerHTML = `${storeItems.hutch.idle} cps`;
    document.getElementsByClassName('item-info')[5].innerHTML = `${storeItems.bunny.idle} cps`;
    document.getElementsByClassName('item-info')[6].innerHTML = `${storeItems.farm.idle} cps`;

    // Display number of cookies in the tab
    document.getElementsByTagName('title')[0].innerHTML = `${Math.floor(player.carrots)} carrots - Bunny Clicker`;
}
// Calculate and display carrots per second
function idleCarrots() {
    player.perSecond = ((storeItems.paw.idle * storeItems.paw.total) + (storeItems.hay.idle * storeItems.hay.total) + (storeItems.flower.idle * storeItems.flower.total) + (storeItems.water.idle * storeItems.water.total) + (storeItems.hutch.idle * storeItems.hutch.total) + (storeItems.bunny.idle * storeItems.bunny.total) + (storeItems.farm.idle * storeItems.farm.total))
    if (player.totalAchievements > 0) {
        achievementBonus()
    }
    const onedp = player.perSecond.toFixed(1)
    document.getElementById('idle-carrots').innerHTML = `${onedp} carrots per second`;
}
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 

// Saving the game
// auto-save every 30 seconds
const autoSave = setInterval(saveGame, 30000);

function loadGame() {
    let savedGame = JSON.parse(localStorage.getItem('gameSave'));
    if (typeof savedGame.player !== 'undefined') player = savedGame.player;
    if (typeof savedGame.game !== 'undefined') game = savedGame.game;
    if (typeof savedGame.storeItems !== 'undefined') storeItems = savedGame.storeItems;
}
// Save the game
function saveGame() {
    let gameSave = {
        player: player,
        game: game,
        storeItems: storeItems,
    }
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
    idleCarrots();

    document.getElementById('paw-total').innerHTML = `x${storeItems.paw.total}`;
    document.getElementById('paw-cost').innerHTML = storeItems.paw.cost.toFixed(1);
    document.getElementById('hay-total').innerHTML = `x${storeItems.hay.total}`;
    document.getElementById('hay-cost').innerHTML = storeItems.hay.cost.toFixed(1);
    document.getElementById('flower-total').innerHTML = `x${storeItems.flower.total}`;
    document.getElementById('flower-cost').innerHTML = storeItems.flower.cost.toFixed(1);
    document.getElementById('water-total').innerHTML = `x${storeItems.water.total}`;
    document.getElementById('water-cost').innerHTML = storeItems.water.cost.toFixed(1);
    document.getElementById('hutch-total').innerHTML = `x${storeItems.hutch.total}`;
    document.getElementById('hutch-cost').innerHTML = storeItems.hutch.cost.toFixed(1);
    document.getElementById('bunny-total').innerHTML = `x${storeItems.bunny.total}`;
    document.getElementById('bunny-cost').innerHTML = storeItems.bunny.cost.toFixed(1);
    document.getElementById('farm-total').innerHTML = `x${storeItems.farm.total}`;
    document.getElementById('farm-cost').innerHTML = storeItems.farm.cost.toFixed(1);

    for (let achievement in player.achievementsGot) {
        document.getElementById(player.achievementsGot[achievement]).hidden = false;
        document.getElementById(player.achievementsGot[achievement]).style.border = '2px solid gold'
        document.getElementById(player.achievementsGot[achievement]).style.height = '8rem'
        document.getElementById(player.achievementsGot[achievement]).style.width = '8rem'
    }

    for (let upgrade in player.purchasedUpgrades) {
        document.querySelector(`#${player.purchasedUpgrades[upgrade]} button`).hidden = false;
        document.querySelector(`#${player.purchasedUpgrades[upgrade]} button`).disabled = true;
        document.querySelector(`#${player.purchasedUpgrades[upgrade]} button`).style.borderColor = 'lime';
        document.querySelector(`#${player.purchasedUpgrades[upgrade]} button`).style.setProperty('background-color', 'black');
        document.querySelector(`#${player.purchasedUpgrades[upgrade]} button`).style.marginBottom = '3rem'
        document.querySelector(`#${player.purchasedUpgrades[upgrade]} p`).hidden = true
    }

    document.querySelector('.achievements h2').innerHTML = `Acievements (${player.totalAchievements} / ${noOfAchievements})`;
    
}

// Resetting game
function resetGame() {
    if (confirm('Are you sure you want to reset your game?')) {
        if (confirm('There\'s no going back... Are you 100% sure?')) {
            var gameSave = {};
            localStorage.setItem('gameSave', JSON.stringify(gameSave));
            location.reload();
    }}
}

// STORE //
function storeMultiple(value) {
    game.storeMultiple = value;
    displayStore();
}

function displayStore() {
    const items = ['paw', 'hay', 'flower', 'water', 'hutch', 'bunny', 'farm'];
    // If not buying 1
    if (game.storeMultiple !== 1) {
        for (let item of items) {
            // set p to initial price
            let p = storeItems[item].cost;
            let sum = p;
            
            for (let n = 1; n < game.storeMultiple; n++) {
                // set p to new price
                p = Number((p * 1.15).toFixed(1));
                // add to sum
                sum += p;
            }
            document.getElementById(`${item}-cost`).innerHTML = sum.toFixed(1);
            document.getElementById(`${item}-total`).innerHTML = `x${storeItems[item].total}`;
        }
    }

    const buyButtons = document.querySelectorAll('.buy-button');
    buyButtons.forEach(button => {
        button.innerHTML = `Buy ${game.storeMultiple}`
    })
    const sellButtons = document.querySelectorAll('.sell-button');
    sellButtons.forEach(button => {
        button.innerHTML = `Sell ${game.storeMultiple}`
    })
}

function storeItemBuy(item) {
    const storeItem = storeItems[item];
    // (storeItem.cost * game.storeMultiple)

    if (player.carrots < document.getElementById(`${item}-cost`).innerHTML) {
        alert('Not enough carrots!');
        return;
    }
    storeItem.total += Number(game.storeMultiple);
    player.carrots -= document.getElementById(`${item}-cost`).innerHTML;
    document.getElementById('total-carrots').innerHTML = Math.floor(player.carrots);

    if (game.storeMultiple !== 1) {
        let cost = storeItem.cost;
        for (let n = 1; n <= game.storeMultiple; n++) {
            cost *= 1.15;
        }
        storeItem.cost = cost;
    } else {
        storeItem.cost *= 1.15;
    }
    
    displayStore();
    idleCarrots();
}
function storeItemSell(item) {
    const storeItem = storeItems[item];

    if (storeItem.total - Number(game.storeMultiple) < 0) {
        console.log('Not enough items to sell')
        return;
    }
    storeItem.total -= Number(game.storeMultiple);
    player.carrots += ((storeItem.cost / 4) * game.storeMultiple);
    // document.getElementById(`${item}-total`).innerHTML = `x${storeItem.total * game.storeMultiple}`;
    document.getElementById('total-carrots').innerHTML = Math.floor(player.carrots)

    storeItem.cost *= (0.87 * game.storeMultiple);
    // document.getElementById(`${item}-cost`).innerHTML = (storeItem.cost * game.storeMultiple).toFixed(1);

    displayStore();
    idleCarrots();
}

// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 


// UPGRADES

// var upgradeInterval = setInterval(checkUpgrades, 5000);
// if (allTimeCarrots < 50) {
//     document.getElementById('paw-upgrade').hidden = true;
// }
// if (allTimeCarrots < 250) {
//     document.getElementById('click-upgrade').hidden = true;
// }
// function checkUpgrades() {
//     if (allTimeCarrots >= 50 && (!purchasedUpgrades.includes('paw-upgrade'))) {
//         document.getElementById('paw-upgrade').hidden = false;
//     }
//     if (allTimeCarrots >= 250 && (!purchasedUpgrades.includes('click-upgrade'))) {
//         document.getElementById('click-upgrade').hidden = false;
// }}


function pawUpgrade() {
    if (player.carrots < 100) {
        alert('Not enough carrots!');
        return;
    }
    storeItems.paw.idle *= 2;
    player.purchasedUpgrades.push('paw-upgrade')
    idleCarrots();

    player.carrots -= 100;
    document.getElementById('total-carrots').innerHTML = Math.floor(player.carrots);

    document.querySelector('#paw-upgrade button').hidden = false;
    document.querySelector('#paw-upgrade button').disabled = true;
    document.querySelector('#paw-upgrade button').style.borderColor = 'lime';
    document.querySelector('#paw-upgrade button').style.setProperty('background-color', 'black');
    document.querySelector('#paw-upgrade button').style.marginBottom = '3rem'
    document.querySelector('#paw-upgrade p').hidden = true;
}
function pawUpgrade2() {
    if (player.carrots < 500) {
        alert('Not enough carrots!');
        return;
    }
    storeItems.paw.idle *= 2;
    player.purchasedUpgrades.push('paw-upgrade2')
    idleCarrots();

    player.carrots -= 500;
    document.getElementById('total-carrots').innerHTML = Math.floor(player.carrots);

    document.querySelector('#paw-upgrade2 button').hidden = false;
    document.querySelector('#paw-upgrade2 button').disabled = true;
    document.querySelector('#paw-upgrade2 button').style.borderColor = 'lime';
    document.querySelector('#paw-upgrade2 button').style.setProperty('background-color', 'black');
    document.querySelector('#paw-upgrade2 button').style.marginBottom = '3rem'
    document.querySelector('#paw-upgrade2 p').hidden = true;
}

function clickUpgrade() {
    if (player.carrots < 500) {
        alert('Not enough carrots!');
        return;
    }
    player.perClick *= 2;
    player.purchasedUpgrades.push('click-upgrade')

    player.carrots -= 500;
    document.getElementById('total-carrots').innerHTML = Math.floor(player.carrots);

    document.querySelector('#click-upgrade button').hidden = false;
    document.querySelector('#click-upgrade button').disabled = true;
    document.querySelector('#click-upgrade button').style.borderColor = 'lime';
    document.querySelector('#click-upgrade button').style.setProperty('background-color', 'black');
    document.querySelector('#click-upgrade button').style.marginBottom = '3rem'
    document.querySelector('#click-upgrade p').hidden = true
}
function clickUpgrade2() {
    if (player.carrots < 2000) {
        alert('Not enough carrots!');
        return;
    }
    player.perClick *= 2;
    player.purchasedUpgrades.push('click-upgrade2')

    player.carrots -= 2000;
    document.getElementById('total-carrots').innerHTML = Math.floor(player.carrots);

    document.querySelector('#click-upgrade2 button').hidden = false;
    document.querySelector('#click-upgrade2 button').disabled = true;
    document.querySelector('#click-upgrade2 button').style.borderColor = 'lime';
    document.querySelector('#click-upgrade2 button').style.setProperty('background-color', 'black');
    document.querySelector('#click-upgrade2 button').style.marginBottom = '3rem'
    document.querySelector('#click-upgrade2 p').hidden = true
}

function hayUpgrade() {
    if (player.carrots < 750) {
        alert('Not enough carrots!');
        return;
    }
    storeItems.hay.idle *= 1.5;
    player.purchasedUpgrades.push('hay-upgrade')
    idleCarrots();

    player.carrots -= 750;
    document.getElementById('total-carrots').innerHTML = Math.floor(player.carrots);

    document.querySelector('#hay-upgrade button').hidden = false;
    document.querySelector('#hay-upgrade button').disabled = true;
    document.querySelector('#hay-upgrade button').style.borderColor = 'lime';
    document.querySelector('#hay-upgrade button').style.setProperty('background-color', 'black');
    document.querySelector('#hay-upgrade button').style.marginBottom = '3rem'
    document.querySelector('#hay-upgrade p').hidden = true;
}

function flowerUpgrade() {
    if (player.carrots < 1250) {
        alert('Not enough carrots!');
        return;
    }
    storeItems.flower.idle *= 1.5;
    player.purchasedUpgrades.push('flower-upgrade')
    idleCarrots();

    player.carrots -= 1250;
    document.getElementById('total-carrots').innerHTML = Math.floor(player.carrots);

    document.querySelector('#flower-upgrade button').hidden = false;
    document.querySelector('#flower-upgrade button').disabled = true;
    document.querySelector('#flower-upgrade button').style.borderColor = 'lime';
    document.querySelector('#flower-upgrade button').style.setProperty('background-color', 'black');
    document.querySelector('#flower-upgrade button').style.marginBottom = '3rem'
    document.querySelector('#flower-upgrade p').hidden = true;
}

// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 

// ACHIEVEMENTS

// Add 1% to carrots per second for every achievement earned
function achievementBonus() {
    let totalBonus = player.totalAchievements * 0.01;
    player.perSecond += player.perSecond * totalBonus;
    let percentageBoost = totalBonus * 100
    if (totalBonus > 0) {
        document.querySelector('.achievements p').innerHTML = `Total boost = ${Math.floor(percentageBoost)}%`
    }
}

// click achievements
if (player.totalClicks < 1) {
    document.getElementById('achievement-one-click').hidden = true
}
if (player.totalClicks < 100) {
    document.getElementById('achievement-onehundred-clicks').hidden = true
}
if (player.totalClicks < 1000) {
    document.getElementById('achievement-onethousand-clicks').hidden = true
}
if (player.totalClicks < 10000) {
    document.getElementById('achievement-tenthousand-clicks').hidden = true
}

// cps achievements
if (player.perSecond < 1) {
    document.getElementById('achievement-one-cps').hidden = true
}
if (player.perSecond < 10) {
    document.getElementById('achievement-ten-cps').hidden = true
}
if (player.perSecond < 50) {
    document.getElementById('achievement-fifty-cps').hidden = true
}
if (player.perSecond < 100) {
    document.getElementById('achievement-onehundred-cps').hidden = true
}

// paw achievements
if (storeItems.paw.total < 1) {
    document.getElementById('achievement-one-paw').hidden = true
}
if (storeItems.paw.total < 10) {
    document.getElementById('achievement-ten-paws').hidden = true
}
if (storeItems.paw.total < 25) {
    document.getElementById('achievement-twentyfive-paws').hidden = true
}
if (storeItems.paw.total < 50) {
    document.getElementById('achievement-fifty-paws').hidden = true
}
if (storeItems.paw.total < 100) {
    document.getElementById('achievement-onehundred-paws').hidden = true
}

// hay achievements
if (storeItems.hay.total < 10) {
    document.getElementById('achievement-ten-hay').hidden = true
}
if (storeItems.hay.total < 25) {
    document.getElementById('achievement-twentyfive-hay').hidden = true
}

// flower achievements
if (storeItems.flower.total < 10) {
    document.getElementById('achievement-ten-flower').hidden = true
}
if (storeItems.flower.total < 25) {
    document.getElementById('achievement-twentyfive-flower').hidden = true
}

// water achievements
if (storeItems.water.total < 10) {
    document.getElementById('achievement-ten-water').hidden = true
}

// hutch achievements
if (storeItems.hutch.total < 10) {
    document.getElementById('achievement-ten-hutch').hidden = true
}

// bunny achievements
if (storeItems.bunny.total < 10) {
    document.getElementById('achievement-ten-bunny').hidden = true
}

// hutch achievements
if (storeItems.farm.total < 10) {
    document.getElementById('achievement-ten-farm').hidden = true
}

var achievemntInterval = setInterval(checkAchievements, 2000);
function checkAchievements() {
     // click
    if (player.totalClicks >= 1 && (!player.achievementsGot.includes('achievement-one-click'))) {
        document.getElementById('achievement-one-click').hidden = false
        document.getElementById('achievement-one-click').style.border = '2px solid gold'
        document.getElementById('achievement-one-click').style.height = '8rem'
        document.getElementById('achievement-one-click').style.width = '8rem'
        player.achievementsGot.push('achievement-one-click')
        player.totalAchievements += 1
        idleCarrots()
    }
    if (player.totalClicks >= 100 && (!player.achievementsGot.includes('achievement-onehundred-clicks'))) {
        document.getElementById('achievement-onehundred-clicks').hidden = false
        document.getElementById('achievement-onehundred-clicks').style.border = '2px solid gold'
        document.getElementById('achievement-onehundred-clicks').style.height = '8rem'
        document.getElementById('achievement-onehundred-clicks').style.width = '8rem'
        player.achievementsGot.push('achievement-onehundred-clicks')
        player.totalAchievements += 1
        idleCarrots()
    }
    if (player.totalClicks >= 1000 && (!player.achievementsGot.includes('achievement-onethousand-clicks'))) {
        document.getElementById('achievement-onethousand-clicks').hidden = false
        document.getElementById('achievement-onethousand-clicks').style.border = '2px solid gold'
        document.getElementById('achievement-onethousand-clicks').style.height = '8rem'
        document.getElementById('achievement-onethousand-clicks').style.width = '8rem'
        player.achievementsGot.push('achievement-onethousand-clicks')
        player.totalAchievements += 1
        idleCarrots()
    }
    if (player.totalClicks >= 10000 && (!player.achievementsGot.includes('achievement-tenthousand-clicks'))) {
        document.getElementById('achievement-tenthousand-clicks').hidden = false
        document.getElementById('achievement-tenthousand-clicks').style.border = '2px solid gold'
        document.getElementById('achievement-tenthousand-clicks').style.height = '8rem'
        document.getElementById('achievement-tenthousand-clicks').style.width = '8rem'
        player.achievementsGot.push('achievement-tenthousand-clicks')
        player.totalAchievements += 1
        idleCarrots()
    }
    // cps
    if (player.perSecond >= 1 && (!player.achievementsGot.includes('achievement-one-cps'))) {
        document.getElementById('achievement-one-cps').hidden = false
        document.getElementById('achievement-one-cps').style.border = '2px solid gold'
        document.getElementById('achievement-one-cps').style.height = '8rem'
        document.getElementById('achievement-one-cps').style.width = '8rem'
        player.achievementsGot.push('achievement-one-cps')
        player.totalAchievements += 1
        idleCarrots()
    }
    if (player.perSecond >= 10 && (!player.achievementsGot.includes('achievement-ten-cps'))) {
        document.getElementById('achievement-ten-cps').hidden = false
        document.getElementById('achievement-ten-cps').style.border = '2px solid gold'
        document.getElementById('achievement-ten-cps').style.height = '8rem'
        document.getElementById('achievement-ten-cps').style.width = '8rem'
        player.achievementsGot.push('achievement-ten-cps')
        player.totalAchievements += 1
        idleCarrots()
    }
    if (player.perSecond >= 50 && (!player.achievementsGot.includes('achievement-fifty-cps'))) {
        document.getElementById('achievement-fifty-cps').hidden = false
        document.getElementById('achievement-fifty-cps').style.border = '2px solid gold'
        document.getElementById('achievement-fifty-cps').style.height = '8rem'
        document.getElementById('achievement-fifty-cps').style.width = '8rem'
        player.achievementsGot.push('achievement-fifty-cps')
        player.totalAchievements += 1
        idleCarrots()
    }
    if (player.perSecond >= 100 && (!player.achievementsGot.includes('achievement-onehundred-cps'))) {
        document.getElementById('achievement-onehundred-cps').hidden = false
        document.getElementById('achievement-onehundred-cps').style.border = '2px solid gold'
        document.getElementById('achievement-onehundred-cps').style.height = '8rem'
        document.getElementById('achievement-onehundred-cps').style.width = '8rem'
        player.achievementsGot.push('achievement-onehundred-cps')
        player.totalAchievements += 1
        idleCarrots()
    }
    // paw
    if (storeItems.paw.total >= 1 && (!player.achievementsGot.includes('achievement-one-paw'))) {
        document.getElementById('achievement-one-paw').hidden = false
        document.getElementById('achievement-one-paw').style.border = '2px solid gold'
        document.getElementById('achievement-one-paw').style.height = '8rem'
        document.getElementById('achievement-one-paw').style.width = '8rem'
        player.achievementsGot.push('achievement-one-paw')
        player.totalAchievements += 1
        idleCarrots()
    }
    if (storeItems.paw.total >= 10 && (!player.achievementsGot.includes('achievement-ten-paws'))) {
        document.getElementById('achievement-ten-paws').hidden = false
        document.getElementById('achievement-ten-paws').style.border = '2px solid gold'
        document.getElementById('achievement-ten-paws').style.height = '8rem'
        document.getElementById('achievement-ten-paws').style.width = '8rem'
        player.achievementsGot.push('achievement-ten-paws')
        player.totalAchievements += 1
        idleCarrots()
    }
    if (storeItems.paw.total >= 25 && (!player.achievementsGot.includes('achievement-twentyfive-paws'))) {
        document.getElementById('achievement-twentyfive-paws').hidden = false
        document.getElementById('achievement-twentyfive-paws').style.border = '2px solid gold'
        document.getElementById('achievement-twentyfive-paws').style.height = '8rem'
        document.getElementById('achievement-twentyfive-paws').style.width = '8rem'
        player.achievementsGot.push('achievement-twentyfive-paws')
        player.totalAchievements += 1
        idleCarrots()
    }
    if (storeItems.paw.total >= 50 && (!player.achievementsGot.includes('achievement-fifty-paws'))) {
        document.getElementById('achievement-fifty-paws').hidden = false
        document.getElementById('achievement-fifty-paws').style.border = '2px solid gold'
        document.getElementById('achievement-fifty-paws').style.height = '8rem'
        document.getElementById('achievement-fifty-paws').style.width = '8rem'
        player.achievementsGot.push('achievement-fifty-paws')
        player.totalAchievements += 1
        idleCarrots()
    }
    if (storeItems.paw.total >= 100 && (!player.achievementsGot.includes('achievement-onehundred-paws'))) {
        document.getElementById('achievement-onehundred-paws').hidden = false
        document.getElementById('achievement-onehundred-paws').style.border = '2px solid gold'
        document.getElementById('achievement-onehundred-paws').style.height = '8rem'
        document.getElementById('achievement-onehundred-paws').style.width = '8rem'
        player.achievementsGot.push('achievement-onehundred-paws')
        player.totalAchievements += 1
        idleCarrots()
    }
// //     // hay
    if (storeItems.hay.total >= 10 && (!player.achievementsGot.includes('achievement-ten-hay'))) {
        document.getElementById('achievement-ten-hay').hidden = false;
        document.getElementById('achievement-ten-hay').style.border = '2px solid gold'
        document.getElementById('achievement-ten-hay').style.height = '8rem'
        document.getElementById('achievement-ten-hay').style.width = '8rem'
        player.achievementsGot.push('achievement-ten-hay');
        player.totalAchievements += 1;
        idleCarrots()
    }
    if (storeItems.hay.total >= 25 && (!player.achievementsGot.includes('achievement-twentyfive-hay'))) {
        document.getElementById('achievement-twentyfive-hay').hidden = false;
        document.getElementById('achievement-twentyfive-hay').style.border = '2px solid gold'
        document.getElementById('achievement-twentyfive-hay').style.height = '8rem'
        document.getElementById('achievement-twentyfive-hay').style.width = '8rem'
        player.achievementsGot.push('achievement-twentyfive-hay');
        player.totalAchievements += 1;
        idleCarrots()
    }
// //     // flower
    if (storeItems.flower.total >= 10 && (!player.achievementsGot.includes('achievement-ten-flower'))) {
        document.getElementById('achievement-ten-flower').hidden = false;
        document.getElementById('achievement-ten-flower').style.border = '2px solid gold'
        document.getElementById('achievement-ten-flower').style.height = '8rem'
        document.getElementById('achievement-ten-flower').style.width = '8rem'
        player.achievementsGot.push('achievement-ten-flower');
        player.totalAchievements += 1;
        idleCarrots()
    }
    if (storeItems.flower.total >= 25 && (!player.achievementsGot.includes('achievement-twentyfive-flower'))) {
        document.getElementById('achievement-twentyfive-flower').hidden = false;
        document.getElementById('achievement-twentyfive-flower').style.border = '2px solid gold'
        document.getElementById('achievement-twentyfive-flower').style.height = '8rem'
        document.getElementById('achievement-twentyfive-flower').style.width = '8rem'
        player.achievementsGot.push('achievement-twentyfive-flower');
        player.totalAchievements += 1;
        idleCarrots()
    }
// //     // water
    if (storeItems.water.total >= 10 && (!player.achievementsGot.includes('achievement-ten-water'))) {
        document.getElementById('achievement-ten-water').hidden = false;
        document.getElementById('achievement-ten-water').style.border = '2px solid gold'
        document.getElementById('achievement-ten-water').style.height = '8rem'
        document.getElementById('achievement-ten-water').style.width = '8rem'
        player.achievementsGot.push('achievement-ten-water');
        player.totalAchievements += 1;
        idleCarrots()
    }
    // hutch
    if (storeItems.hutch.total >= 10 && (!player.achievementsGot.includes('achievement-ten-hutch'))) {
        document.getElementById('achievement-ten-hutch').hidden = false;
        document.getElementById('achievement-ten-hutch').style.border = '2px solid gold'
        document.getElementById('achievement-ten-hutch').style.height = '8rem'
        document.getElementById('achievement-ten-hutch').style.width = '8rem'
        player.achievementsGot.push('achievement-ten-hutch');
        player.totalAchievements += 1;
        idleCarrots()
    }
    // bunny
    if (storeItems.bunny.total >= 10 && (!player.achievementsGot.includes('achievement-ten-bunny'))) {
        document.getElementById('achievement-ten-bunny').hidden = false;
        document.getElementById('achievement-ten-bunny').style.border = '2px solid gold'
        document.getElementById('achievement-ten-bunny').style.height = '8rem'
        document.getElementById('achievement-ten-bunny').style.width = '8rem'
        player.achievementsGot.push('achievement-ten-bunny');
        player.totalAchievements += 1;
        idleCarrots()
    }
    // farm
    if (storeItems.farm.total >= 10 && (!player.achievementsGot.includes('achievement-ten-farm'))) {
        document.getElementById('achievement-ten-farm').hidden = false;
        document.getElementById('achievement-ten-farm').style.border = '2px solid gold'
        document.getElementById('achievement-ten-farm').style.height = '8rem'
        document.getElementById('achievement-ten-farm').style.width = '8rem'
        player.achievementsGot.push('achievement-ten-farm');
        player.totalAchievements += 1;
        idleCarrots()
    }

    document.querySelector('.achievements h2').innerHTML = `Acievements (${player.totalAchievements} / ${noOfAchievements})`;
}