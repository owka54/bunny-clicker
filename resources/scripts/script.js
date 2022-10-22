// Variables //

let player = {
    carrots: 0,
    allTimeCarrots: 0,
    prestigeLevelCarrots: 0,

    totalClicks: 0,
    perClick: 1,
    perSecond: 0,
    totalRocketBunnyClicks: 0,

    achievementsGot: [],
    totalAchievements: 0,
    
    purchasedUpgrades: [],

    prestige: 0,
}

let game = {
    storeMultiple: 1,
    prestigeCost: 100000000,
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

noOfAchievements = 34;
noOfUpgrades = 21;
// // // // // // // // // //

const prestigeButton = document.getElementById('prestige-button');



// Increment carrots every click
function carrotClick() {
    player.carrots += player.perClick;
    player.allTimeCarrots += player.perClick;
    player.prestigeLevelCarrots += player.perClick;
    player.totalClicks += 1;
    document.getElementById('total-carrots').innerHTML = abbrNum(player.carrots.toFixed(0), 1);
    canBuy();
    canSell();
}

// Invoke idleIncrement every second
var interval = setInterval(idleIncrement, 1000);
// Increment carrot count by idle amount
function idleIncrement() {
    player.carrots += player.perSecond;
    player.allTimeCarrots += player.perSecond;
    player.prestigeLevelCarrots += player.perSecond;
    document.getElementById('total-carrots').innerHTML = abbrNum(player.carrots.toFixed(0), 1);
    // Display cps of each store item when hover over the image
    let achBonus = 1;
    let prestBonus = 1;
    if (player.totalAchievements > 0) {
        achBonus = 1 + (player.totalAchievements * 0.01);
    }
    if (player.prestige > 0) {
        prestBonus = 1 + (player.prestige * 5) / 100 ;
    }
    document.getElementsByClassName('item-info')[0].innerHTML = (storeItems.paw.idle * achBonus * prestBonus).toFixed(1) + 'cps';
    document.getElementsByClassName('item-info')[1].innerHTML = (storeItems.hay.idle * achBonus * prestBonus).toFixed(1) + 'cps';
    document.getElementsByClassName('item-info')[2].innerHTML = (storeItems.flower.idle * achBonus * prestBonus).toFixed(1) + 'cps';
    document.getElementsByClassName('item-info')[3].innerHTML = (storeItems.water.idle * achBonus * prestBonus).toFixed(1) + 'cps';
    document.getElementsByClassName('item-info')[4].innerHTML = (storeItems.hutch.idle * achBonus * prestBonus).toFixed(1) + 'cps';
    document.getElementsByClassName('item-info')[5].innerHTML = (storeItems.bunny.idle * achBonus * prestBonus).toFixed(1) + 'cps';
    document.getElementsByClassName('item-info')[6].innerHTML = (storeItems.farm.idle * achBonus * prestBonus).toFixed(1) + 'cps';

    // Display amount of carrots needed before prestige when hovering over prestige button
    const amountNeeded = game.prestigeCost - player.prestigeLevelCarrots;
    document.getElementById('prestige-left').innerHTML = amountNeeded <= 0 ? 'Prestige Ready!' : abbrNum(amountNeeded.toFixed(0), 0) + ' carrots needed to prestige';

    // Display number of cookies in the tab
    document.getElementsByTagName('title')[0].innerHTML = abbrNum(Math.floor(player.carrots), 1) + ' carrots - Bunny Clicker';
    if (player.prestigeLevelCarrots >= game.prestigeCost) {
        prestigeButton.disabled = false;
        prestigeButton.style.opacity = 1;
    } else {
        prestigeButton.disabled = true;
        prestigeButton.style.opacity = .5;
        prestigeButton.style.backgroundColor = 'rgb(255, 128, 0)';
    }

    canBuy();
    canSell();
}
// Calculate and display carrots per second
function idleCarrots() {
    player.perSecond = ((storeItems.paw.idle * storeItems.paw.total) + (storeItems.hay.idle * storeItems.hay.total) + (storeItems.flower.idle * storeItems.flower.total) + (storeItems.water.idle * storeItems.water.total) + (storeItems.hutch.idle * storeItems.hutch.total) + (storeItems.bunny.idle * storeItems.bunny.total) + (storeItems.farm.idle * storeItems.farm.total))
    if (player.totalAchievements > 0) {
        achievementBonus()
    }
    if (player.prestige > 0) {
        prestigeBonus()
    }
    const onedp = abbrNum(player.perSecond.toFixed(1), 1)
    document.getElementById('idle-carrots').innerHTML = (onedp == 0.0) ? `0 carrots per second` : `${onedp} carrots per second`;
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
    canBuy();

    multipleItemCosts();
    displayStore();

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
    document.querySelector('.upgrades-store h2').innerHTML = `Upgrades (${player.purchasedUpgrades.length} / ${noOfUpgrades})`;
    
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
function canBuy() {
    const items = ['paw', 'hay', 'flower', 'water', 'hutch', 'bunny', 'farm'];
    if (game.storeMultiple == 1) {
        for (let item of items) {
            const storeItem = storeItems[item];
            if (player.carrots < storeItem.cost) {
                document.querySelector(`#${item} .buy-button`).disabled = true;
            } else {
                document.querySelector(`#${item} .buy-button`).disabled = false;
            }
        }
    } else if (game.storeMultiple == 10) {
        for (let item of items) {
            const storeItem = storeItems[item];
            if (player.carrots < storeItem.tenCost) {
                document.querySelector(`#${item} .buy-button`).disabled = true;
            } else {
                document.querySelector(`#${item} .buy-button`).disabled = false;
            }
        }
    } else if (game.storeMultiple == 100) {
        for (let item of items) {
            const storeItem = storeItems[item];
            if (player.carrots < storeItem.onehundredCost) {
                document.querySelector(`#${item} .buy-button`).disabled = true;
            } else {
                document.querySelector(`#${item} .buy-button`).disabled = false;
            }
        }
    }
}
function canSell() {
    const items = ['paw', 'hay', 'flower', 'water', 'hutch', 'bunny', 'farm'];
    for (let item of items) {
        const storeItem = storeItems[item];
        if (storeItem.total - game.storeMultiple < 0) {
            document.querySelector(`#${item} .sell-button`).disabled = true;
        } else {
            document.querySelector(`#${item} .sell-button`).disabled = false;
        }
    }
}
function multipleItemCosts() {
    const items = ['paw', 'hay', 'flower', 'water', 'hutch', 'bunny', 'farm'];
    for (let item of items) {
        let p = storeItems[item].cost;
        let sum = Number(p);
    
        const nums = [[10, 'ten'], [100, 'onehundred']];

        for (let num in nums) {
           
            for (let n = 1; n < nums[num][0]; n++) {
                p = Number((p * 1.15).toFixed(1));
                sum += p;
            }
            
            if (nums[num][1] == 'ten') {
                storeItems[item].tenCost = Number(sum.toFixed(1));
            } else {
                storeItems[item].onehundredCost = Number(sum.toFixed(1));
            }
        }
    }
}

function displayStore() {
    const items = ['paw', 'hay', 'flower', 'water', 'hutch', 'bunny', 'farm'];
    for (let item of items) {
        // Display the correct cost depending on the buy multiple selected
        if (game.storeMultiple == 1) {
            document.getElementById(`${item}-cost`).innerHTML = abbrNum(storeItems[item].cost.toFixed(0), 1);
        } else if (game.storeMultiple == 10) {
            document.getElementById(`${item}-cost`).innerHTML = abbrNum(storeItems[item].tenCost.toFixed(0), 1);
        } else {
            document.getElementById(`${item}-cost`).innerHTML = abbrNum(storeItems[item].onehundredCost.toFixed(0), 1);
        }
        // Display total items owned
        document.getElementById(`${item}-total`).innerHTML = `x${storeItems[item].total}`;
    }

    // Change the text of the buy & sell buttons to correspond to the selected buy/sell multiplier
    const buyButtons = document.querySelectorAll('.buy-button');
    buyButtons.forEach(button => {
        button.innerHTML = `Buy ${game.storeMultiple}`
    })
    const sellButtons = document.querySelectorAll('.sell-button');
    sellButtons.forEach(button => {
        button.innerHTML = `Sell ${game.storeMultiple}`
    })

    canBuy();
    canSell();
}

function storeItemBuy(item) {
    const storeItem = storeItems[item];

    storeItem.total += Number(game.storeMultiple);
    if (game.storeMultiple == 1) {
        if (player.carrots < storeItem.cost) {
            alert('Not enough carrots!');
            return;
        }
        player.carrots -= storeItem.cost;
    } else if (game.storeMultiple == 10) {
        if (player.carrots < storeItem.tenCost) {
            alert('Not enough carrots!');
            return;
        }
        player.carrots -= storeItem.tenCost;
    } else {
        if (player.carrots < storeItem.onehundredCost) {
            alert('Not enough carrots!');
            return;
        }
        player.carrots -= storeItem.onehundredCost;
    }
    document.getElementById('total-carrots').innerHTML = abbrNum(Math.floor(player.carrots), 1);

    if (game.storeMultiple !== 1) {
        let cost = storeItem.cost;
        for (let n = 1; n <= game.storeMultiple; n++) {
            cost *= 1.15;
        }
        storeItem.cost = Number(cost.toFixed(1));
    } else {
        storeItem.cost *= 1.15;
    }
    
    multipleItemCosts();
    displayStore();
    idleCarrots();
    canBuy();
    canSell();
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
    document.getElementById('total-carrots').innerHTML = abbrNum(Math.floor(player.carrots), 1);

    // storeItem.cost *= (0.87 * game.storeMultiple);
    // document.getElementById(`${item}-cost`).innerHTML = (storeItem.cost * game.storeMultiple).toFixed(1);

    if (game.storeMultiple !== 1) {
        let cost = storeItem.cost;
        for (let n = 1; n <= game.storeMultiple; n++) {
            cost *= 0.87;
        }
        storeItem.cost = Number(cost.toFixed(1));
    } else {
        storeItem.cost *= 0.87;
    }

    multipleItemCosts();
    displayStore();
    idleCarrots();
    canBuy();
    canSell();
}


// Prestige
function prestige() {
    if (confirm('Are you ready to prestige?')) {
            player.prestige += 1;
            game.prestigeCost *= 5;
            var gameSave = {
                player: {
                    carrots: 0,
                    allTimeCarrots: player.allTimeCarrots,
                    prestigeLevelCarrots: 0,
                
                    totalClicks: player.totalClicks,
                    perClick: 1,
                    perSecond: 0,
                    totalRocketBunnyClicks: player.totalRocketBunnyClicks,
                
                    achievementsGot: player.achievementsGot,
                    totalAchievements: player.totalAchievements,
                    
                    purchasedUpgrades: [],
                
                    prestige: player.prestige,
                },
                game: {
                    prestigeCost: game.prestigeCost,
                    storeMultiple: 1,
                }
            }
            localStorage.setItem('gameSave', JSON.stringify(gameSave));
            location.reload();
}}
function prestigeBonus() {
    let totalBonus = player.prestige * 5;
    player.perSecond += player.perSecond * totalBonus;
    let prestigeBoost = totalBonus;
    if (player.prestige > 0) {
        document.querySelector('#prestige').innerHTML = `Prestige Boost = ${prestigeBoost}%`
    }
}

document.getElementById('prestige-button')


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
    document.getElementById('total-carrots').innerHTML = abbrNum(Math.floor(player.carrots), 1);

    document.querySelector('#paw-upgrade button').hidden = false;
    document.querySelector('#paw-upgrade button').disabled = true;
    document.querySelector('#paw-upgrade button').style.borderColor = 'lime';
    document.querySelector('#paw-upgrade button').style.setProperty('background-color', 'black');
    document.querySelector('#paw-upgrade button').style.marginBottom = '3rem'
    document.querySelector('#paw-upgrade p').hidden = true;

    document.querySelector('.upgrades-store h2').innerHTML = `Upgrades (${player.purchasedUpgrades.length} / ${noOfUpgrades})`;

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
    document.getElementById('total-carrots').innerHTML = abbrNum(Math.floor(player.carrots), 1);

    document.querySelector('#paw-upgrade2 button').hidden = false;
    document.querySelector('#paw-upgrade2 button').disabled = true;
    document.querySelector('#paw-upgrade2 button').style.borderColor = 'lime';
    document.querySelector('#paw-upgrade2 button').style.setProperty('background-color', 'black');
    document.querySelector('#paw-upgrade2 button').style.marginBottom = '3rem'
    document.querySelector('#paw-upgrade2 p').hidden = true;

    document.querySelector('.upgrades-store h2').innerHTML = `Upgrades (${player.purchasedUpgrades.length} / ${noOfUpgrades})`;

}
function pawUpgrade3() {
    if (player.carrots < 750) {
        alert('Not enough carrots!');
        return;
    }
    storeItems.paw.idle *= 2.5;
    player.purchasedUpgrades.push('paw-upgrade3')
    idleCarrots();

    player.carrots -= 750;
    document.getElementById('total-carrots').innerHTML = abbrNum(Math.floor(player.carrots), 1);

    document.querySelector('#paw-upgrade3 button').hidden = false;
    document.querySelector('#paw-upgrade3 button').disabled = true;
    document.querySelector('#paw-upgrade3 button').style.borderColor = 'lime';
    document.querySelector('#paw-upgrade3 button').style.setProperty('background-color', 'black');
    document.querySelector('#paw-upgrade3 button').style.marginBottom = '3rem'
    document.querySelector('#paw-upgrade3 p').hidden = true;

    document.querySelector('.upgrades-store h2').innerHTML = `Upgrades (${player.purchasedUpgrades.length} / ${noOfUpgrades})`;

}
function pawUpgrade4() {
    if (player.carrots < 1000) {
        alert('Not enough carrots!');
        return;
    }
    storeItems.paw.idle *= 2;
    player.purchasedUpgrades.push('paw-upgrade4')
    idleCarrots();

    player.carrots -= 1000;
    document.getElementById('total-carrots').innerHTML = abbrNum(Math.floor(player.carrots), 1);

    document.querySelector('#paw-upgrade4 button').hidden = false;
    document.querySelector('#paw-upgrade4 button').disabled = true;
    document.querySelector('#paw-upgrade4 button').style.borderColor = 'lime';
    document.querySelector('#paw-upgrade4 button').style.setProperty('background-color', 'black');
    document.querySelector('#paw-upgrade4 button').style.marginBottom = '3rem'
    document.querySelector('#paw-upgrade4 p').hidden = true;

    document.querySelector('.upgrades-store h2').innerHTML = `Upgrades (${player.purchasedUpgrades.length} / ${noOfUpgrades})`;

}

function clickUpgrade() {
    if (player.carrots < 100) {
        alert('Not enough carrots!');
        return;
    }
    player.perClick *= 2;
    player.purchasedUpgrades.push('click-upgrade')

    player.carrots -= 100;
    document.getElementById('total-carrots').innerHTML = abbrNum(Math.floor(player.carrots), 1);

    document.querySelector('#click-upgrade button').hidden = false;
    document.querySelector('#click-upgrade button').disabled = true;
    document.querySelector('#click-upgrade button').style.borderColor = 'lime';
    document.querySelector('#click-upgrade button').style.setProperty('background-color', 'black');
    document.querySelector('#click-upgrade button').style.marginBottom = '3rem'
    document.querySelector('#click-upgrade p').hidden = true

    document.querySelector('.upgrades-store h2').innerHTML = `Upgrades (${player.purchasedUpgrades.length} / ${noOfUpgrades})`;

}
function clickUpgrade2() {
    if (player.carrots < 750) {
        alert('Not enough carrots!');
        return;
    }
    player.perClick *= 2;
    player.purchasedUpgrades.push('click-upgrade2')

    player.carrots -= 750;
    document.getElementById('total-carrots').innerHTML = abbrNum(Math.floor(player.carrots), 1);

    document.querySelector('#click-upgrade2 button').hidden = false;
    document.querySelector('#click-upgrade2 button').disabled = true;
    document.querySelector('#click-upgrade2 button').style.borderColor = 'lime';
    document.querySelector('#click-upgrade2 button').style.setProperty('background-color', 'black');
    document.querySelector('#click-upgrade2 button').style.marginBottom = '3rem'
    document.querySelector('#click-upgrade2 p').hidden = true

    document.querySelector('.upgrades-store h2').innerHTML = `Upgrades (${player.purchasedUpgrades.length} / ${noOfUpgrades})`;

}
function clickUpgrade3() {
    if (player.carrots < 1500) {
        alert('Not enough carrots!');
        return;
    }
    player.perClick *= 2;
    player.purchasedUpgrades.push('click-upgrade3')

    player.carrots -= 1500;
    document.getElementById('total-carrots').innerHTML = abbrNum(Math.floor(player.carrots), 1);

    document.querySelector('#click-upgrade3 button').hidden = false;
    document.querySelector('#click-upgrade3 button').disabled = true;
    document.querySelector('#click-upgrade3 button').style.borderColor = 'lime';
    document.querySelector('#click-upgrade3 button').style.setProperty('background-color', 'black');
    document.querySelector('#click-upgrade3 button').style.marginBottom = '3rem'
    document.querySelector('#click-upgrade3 p').hidden = true

    document.querySelector('.upgrades-store h2').innerHTML = `Upgrades (${player.purchasedUpgrades.length} / ${noOfUpgrades})`;

}
function clickUpgrade4() {
    if (player.carrots < 3000) {
        alert('Not enough carrots!');
        return;
    }
    player.perClick *= 2;
    player.purchasedUpgrades.push('click-upgrade4')

    player.carrots -= 3000;
    document.getElementById('total-carrots').innerHTML = abbrNum(Math.floor(player.carrots), 1);

    document.querySelector('#click-upgrade4 button').hidden = false;
    document.querySelector('#click-upgrade4 button').disabled = true;
    document.querySelector('#click-upgrade4 button').style.borderColor = 'lime';
    document.querySelector('#click-upgrade4 button').style.setProperty('background-color', 'black');
    document.querySelector('#click-upgrade4 button').style.marginBottom = '3rem'
    document.querySelector('#click-upgrade4 p').hidden = true

    document.querySelector('.upgrades-store h2').innerHTML = `Upgrades (${player.purchasedUpgrades.length} / ${noOfUpgrades})`;

}
function clickUpgrade5() {
    if (player.carrots < 5000) {
        alert('Not enough carrots!');
        return;
    }
    player.perClick *= 2;
    player.purchasedUpgrades.push('click-upgrade5')

    player.carrots -= 5000;
    document.getElementById('total-carrots').innerHTML = abbrNum(Math.floor(player.carrots), 1);

    document.querySelector('#click-upgrade5 button').hidden = false;
    document.querySelector('#click-upgrade5 button').disabled = true;
    document.querySelector('#click-upgrade5 button').style.borderColor = 'lime';
    document.querySelector('#click-upgrade5 button').style.setProperty('background-color', 'black');
    document.querySelector('#click-upgrade5 button').style.marginBottom = '3rem'
    document.querySelector('#click-upgrade5 p').hidden = true

    document.querySelector('.upgrades-store h2').innerHTML = `Upgrades (${player.purchasedUpgrades.length} / ${noOfUpgrades})`;

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
    document.getElementById('total-carrots').innerHTML = abbrNum(Math.floor(player.carrots), 1);

    document.querySelector('#hay-upgrade button').hidden = false;
    document.querySelector('#hay-upgrade button').disabled = true;
    document.querySelector('#hay-upgrade button').style.borderColor = 'lime';
    document.querySelector('#hay-upgrade button').style.setProperty('background-color', 'black');
    document.querySelector('#hay-upgrade button').style.marginBottom = '3rem'
    document.querySelector('#hay-upgrade p').hidden = true;

    document.querySelector('.upgrades-store h2').innerHTML = `Upgrades (${player.purchasedUpgrades.length} / ${noOfUpgrades})`;

}
function hayUpgrade2() {
    if (player.carrots < 1250) {
        alert('Not enough carrots!');
        return;
    }
    storeItems.hay.idle *= 2;
    player.purchasedUpgrades.push('hay-upgrade2')
    idleCarrots();

    player.carrots -= 1250;
    document.getElementById('total-carrots').innerHTML = abbrNum(Math.floor(player.carrots), 1);

    document.querySelector('#hay-upgrade2 button').hidden = false;
    document.querySelector('#hay-upgrade2 button').disabled = true;
    document.querySelector('#hay-upgrade2 button').style.borderColor = 'lime';
    document.querySelector('#hay-upgrade2 button').style.setProperty('background-color', 'black');
    document.querySelector('#hay-upgrade2 button').style.marginBottom = '3rem'
    document.querySelector('#hay-upgrade2 p').hidden = true;

    document.querySelector('.upgrades-store h2').innerHTML = `Upgrades (${player.purchasedUpgrades.length} / ${noOfUpgrades})`;

}
function hayUpgrade3() {
    if (player.carrots < 1750) {
        alert('Not enough carrots!');
        return;
    }
    storeItems.hay.idle *= 2;
    player.purchasedUpgrades.push('hay-upgrade3')
    idleCarrots();

    player.carrots -= 1750;
    document.getElementById('total-carrots').innerHTML = abbrNum(Math.floor(player.carrots), 1);

    document.querySelector('#hay-upgrade3 button').hidden = false;
    document.querySelector('#hay-upgrade3 button').disabled = true;
    document.querySelector('#hay-upgrade3 button').style.borderColor = 'lime';
    document.querySelector('#hay-upgrade3 button').style.setProperty('background-color', 'black');
    document.querySelector('#hay-upgrade3 button').style.marginBottom = '3rem'
    document.querySelector('#hay-upgrade3 p').hidden = true;

    document.querySelector('.upgrades-store h2').innerHTML = `Upgrades (${player.purchasedUpgrades.length} / ${noOfUpgrades})`;

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
    document.getElementById('total-carrots').innerHTML = abbrNum(Math.floor(player.carrots), 1);

    document.querySelector('#flower-upgrade button').hidden = false;
    document.querySelector('#flower-upgrade button').disabled = true;
    document.querySelector('#flower-upgrade button').style.borderColor = 'lime';
    document.querySelector('#flower-upgrade button').style.setProperty('background-color', 'black');
    document.querySelector('#flower-upgrade button').style.marginBottom = '3rem'
    document.querySelector('#flower-upgrade p').hidden = true;

    document.querySelector('.upgrades-store h2').innerHTML = `Upgrades (${player.purchasedUpgrades.length} / ${noOfUpgrades})`;

}
function flowerUpgrade2() {
    if (player.carrots < 2000) {
        alert('Not enough carrots!');
        return;
    }
    storeItems.flower.idle *= 2.5;
    player.purchasedUpgrades.push('flower-upgrade2')
    idleCarrots();

    player.carrots -= 2000;
    document.getElementById('total-carrots').innerHTML = abbrNum(Math.floor(player.carrots), 1);

    document.querySelector('#flower-upgrade2 button').hidden = false;
    document.querySelector('#flower-upgrade2 button').disabled = true;
    document.querySelector('#flower-upgrade2 button').style.borderColor = 'lime';
    document.querySelector('#flower-upgrade2 button').style.setProperty('background-color', 'black');
    document.querySelector('#flower-upgrade2 button').style.marginBottom = '3rem'
    document.querySelector('#flower-upgrade2 p').hidden = true;

    document.querySelector('.upgrades-store h2').innerHTML = `Upgrades (${player.purchasedUpgrades.length} / ${noOfUpgrades})`;

}
function flowerUpgrade3() {
    if (player.carrots < 3500) {
        alert('Not enough carrots!');
        return;
    }
    storeItems.flower.idle *= 1.5;
    player.purchasedUpgrades.push('flower-upgrade3')
    idleCarrots();

    player.carrots -= 3500;
    document.getElementById('total-carrots').innerHTML = abbrNum(Math.floor(player.carrots), 1);

    document.querySelector('#flower-upgrade3 button').hidden = false;
    document.querySelector('#flower-upgrade3 button').disabled = true;
    document.querySelector('#flower-upgrade3 button').style.borderColor = 'lime';
    document.querySelector('#flower-upgrade3 button').style.setProperty('background-color', 'black');
    document.querySelector('#flower-upgrade3 button').style.marginBottom = '3rem'
    document.querySelector('#flower-upgrade3 p').hidden = true;

    document.querySelector('.upgrades-store h2').innerHTML = `Upgrades (${player.purchasedUpgrades.length} / ${noOfUpgrades})`;

}

function waterUpgrade() {
    if (player.carrots < 2500) {
        alert('Not enough carrots!');
        return;
    }
    storeItems.water.idle *= 2;
    player.purchasedUpgrades.push('water-upgrade')
    idleCarrots();

    player.carrots -= 2500;
    document.getElementById('total-carrots').innerHTML = abbrNum(Math.floor(player.carrots), 1);

    document.querySelector('#water-upgrade button').hidden = false;
    document.querySelector('#water-upgrade button').disabled = true;
    document.querySelector('#water-upgrade button').style.borderColor = 'lime';
    document.querySelector('#water-upgrade button').style.setProperty('background-color', 'black');
    document.querySelector('#water-upgrade button').style.marginBottom = '3rem'
    document.querySelector('#water-upgrade p').hidden = true;

    document.querySelector('.upgrades-store h2').innerHTML = `Upgrades (${player.purchasedUpgrades.length} / ${noOfUpgrades})`;

}

function hutchUpgrade() {
    if (player.carrots < 4000) {
        alert('Not enough carrots!');
        return;
    }
    storeItems.hutch.idle *= 2;
    player.purchasedUpgrades.push('hutch-upgrade')
    idleCarrots();

    player.carrots -= 4000;
    document.getElementById('total-carrots').innerHTML = abbrNum(Math.floor(player.carrots), 1);

    document.querySelector('#hutch-upgrade button').hidden = false;
    document.querySelector('#hutch-upgrade button').disabled = true;
    document.querySelector('#hutch-upgrade button').style.borderColor = 'lime';
    document.querySelector('#hutch-upgrade button').style.setProperty('background-color', 'black');
    document.querySelector('#hutch-upgrade button').style.marginBottom = '3rem'
    document.querySelector('#hutch-upgrade p').hidden = true;

    document.querySelector('.upgrades-store h2').innerHTML = `Upgrades (${player.purchasedUpgrades.length} / ${noOfUpgrades})`;

}

function bunnyUpgrade() {
    if (player.carrots < 8000) {
        alert('Not enough carrots!');
        return;
    }
    storeItems.bunny.idle *= 1.5;
    player.purchasedUpgrades.push('bunny-upgrade')
    idleCarrots();

    player.carrots -= 8000;
    document.getElementById('total-carrots').innerHTML = abbrNum(Math.floor(player.carrots), 1);

    document.querySelector('#bunny-upgrade button').hidden = false;
    document.querySelector('#bunny-upgrade button').disabled = true;
    document.querySelector('#bunny-upgrade button').style.borderColor = 'lime';
    document.querySelector('#bunny-upgrade button').style.setProperty('background-color', 'black');
    document.querySelector('#bunny-upgrade button').style.marginBottom = '3rem'
    document.querySelector('#bunny-upgrade p').hidden = true;

    document.querySelector('.upgrades-store h2').innerHTML = `Upgrades (${player.purchasedUpgrades.length} / ${noOfUpgrades})`;

}

function farmUpgrade() {
    if (player.carrots < 15000) {
        alert('Not enough carrots!');
        return;
    }
    storeItems.farm.idle *= 1.5;
    player.purchasedUpgrades.push('farm-upgrade')
    idleCarrots();

    player.carrots -= 15000;
    document.getElementById('total-carrots').innerHTML = abbrNum(Math.floor(player.carrots), 1);

    document.querySelector('#farm-upgrade button').hidden = false;
    document.querySelector('#farm-upgrade button').disabled = true;
    document.querySelector('#farm-upgrade button').style.borderColor = 'lime';
    document.querySelector('#farm-upgrade button').style.setProperty('background-color', 'black');
    document.querySelector('#farm-upgrade button').style.marginBottom = '3rem'
    document.querySelector('#farm-upgrade p').hidden = true;

    document.querySelector('.upgrades-store h2').innerHTML = `Upgrades (${player.purchasedUpgrades.length} / ${noOfUpgrades})`;

}
function farmUpgrade2() {
    if (player.carrots < 27500) {
        alert('Not enough carrots!');
        return;
    }
    storeItems.farm.idle *= 2;
    player.purchasedUpgrades.push('farm-upgrade2')
    idleCarrots();

    player.carrots -= 27500;
    document.getElementById('total-carrots').innerHTML = abbrNum(Math.floor(player.carrots), 1);

    document.querySelector('#farm-upgrade2 button').hidden = false;
    document.querySelector('#farm-upgrade2 button').disabled = true;
    document.querySelector('#farm-upgrade2 button').style.borderColor = 'lime';
    document.querySelector('#farm-upgrade2 button').style.setProperty('background-color', 'black');
    document.querySelector('#farm-upgrade2 button').style.marginBottom = '3rem'
    document.querySelector('#farm-upgrade2 p').hidden = true;

    document.querySelector('.upgrades-store h2').innerHTML = `Upgrades (${player.purchasedUpgrades.length} / ${noOfUpgrades})`;

}
function farmUpgrade3() {
    if (player.carrots < 45000) {
        alert('Not enough carrots!');
        return;
    }
    storeItems.farm.idle *= 2;
    player.purchasedUpgrades.push('farm-upgrade3')
    idleCarrots();

    player.carrots -= 45000;
    document.getElementById('total-carrots').innerHTML = abbrNum(Math.floor(player.carrots), 1);

    document.querySelector('#farm-upgrade3 button').hidden = false;
    document.querySelector('#farm-upgrade3 button').disabled = true;
    document.querySelector('#farm-upgrade3 button').style.borderColor = 'lime';
    document.querySelector('#farm-upgrade3 button').style.setProperty('background-color', 'black');
    document.querySelector('#farm-upgrade3 button').style.marginBottom = '3rem'
    document.querySelector('#farm-upgrade3 p').hidden = true;

    document.querySelector('.upgrades-store h2').innerHTML = `Upgrades (${player.purchasedUpgrades.length} / ${noOfUpgrades})`;

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
if (player.perSecond < 1000) {
    document.getElementById('achievement-onethousand-cps').hidden = true
}
if (player.perSecond < 10000) {
    document.getElementById('achievement-tenthousand-cps').hidden = true
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
if (storeItems.hay.total < 50) {
    document.getElementById('achievement-fifty-hay').hidden = true
}
if (storeItems.hay.total < 100) {
    document.getElementById('achievement-onehundred-hay').hidden = true
}

// flower achievements
if (storeItems.flower.total < 10) {
    document.getElementById('achievement-ten-flower').hidden = true
}
if (storeItems.flower.total < 25) {
    document.getElementById('achievement-twentyfive-flower').hidden = true
}
if (storeItems.flower.total < 50) {
    document.getElementById('achievement-fifty-flower').hidden = true
}
if (storeItems.flower.total < 100) {
    document.getElementById('achievement-onehundred-flower').hidden = true
}

// water achievements
if (storeItems.water.total < 10) {
    document.getElementById('achievement-ten-water').hidden = true
}
if (storeItems.water.total < 25) {
    document.getElementById('achievement-twentyfive-water').hidden = true
}
if (storeItems.water.total < 50) {
    document.getElementById('achievement-fifty-water').hidden = true
}
if (storeItems.water.total < 100) {
    document.getElementById('achievement-onehundred-water').hidden = true
}

// hutch achievements
if (storeItems.hutch.total < 10) {
    document.getElementById('achievement-ten-hutch').hidden = true
}

// bunny achievements
if (storeItems.bunny.total < 10) {
    document.getElementById('achievement-ten-bunny').hidden = true
}

// farm achievements
if (storeItems.farm.total < 10) {
    document.getElementById('achievement-ten-farm').hidden = true
}

// rocket bunny achievements
if (player.totalRocketBunnyClicks < 1) {
    document.getElementById('achievement-one-rocketBunny').hidden = true
}
if (player.totalRocketBunnyClicks < 10) {
    document.getElementById('achievement-ten-rocketBunny').hidden = true
}
if (player.totalRocketBunnyClicks < 100) {
    document.getElementById('achievement-onehundred-rocketBunny').hidden = true
}

// prestige achievements
if (player.prestige < 1) {
    document.getElementById('achievement-first-prestige').hidden = true
}
if (player.prestige < 2) {
    document.getElementById('achievement-second-prestige').hidden = true
}
if (player.prestige < 5) {
    document.getElementById('achievement-fifth-prestige').hidden = true
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
    if (player.perSecond >= 1000 && (!player.achievementsGot.includes('achievement-onethousand-cps'))) {
        document.getElementById('achievement-onethousand-cps').hidden = false
        document.getElementById('achievement-onethousand-cps').style.border = '2px solid gold'
        document.getElementById('achievement-onethousand-cps').style.height = '8rem'
        document.getElementById('achievement-onethousand-cps').style.width = '8rem'
        player.achievementsGot.push('achievement-onethousand-cps')
        player.totalAchievements += 1
        idleCarrots()
    }
    if (player.perSecond >= 10000 && (!player.achievementsGot.includes('achievement-tenthousand-cps'))) {
        document.getElementById('achievement-tenthousand-cps').hidden = false
        document.getElementById('achievement-tenthousand-cps').style.border = '2px solid gold'
        document.getElementById('achievement-tenthousand-cps').style.height = '8rem'
        document.getElementById('achievement-tenthousand-cps').style.width = '8rem'
        player.achievementsGot.push('achievement-tenthousand-cps')
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
    // hay
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
    if (storeItems.hay.total >= 50 && (!player.achievementsGot.includes('achievement-fifty-hay'))) {
        document.getElementById('achievement-fifty-hay').hidden = false;
        document.getElementById('achievement-fifty-hay').style.border = '2px solid gold'
        document.getElementById('achievement-fifty-hay').style.height = '8rem'
        document.getElementById('achievement-fifty-hay').style.width = '8rem'
        player.achievementsGot.push('achievement-fifty-hay');
        player.totalAchievements += 1;
        idleCarrots()
    }
    if (storeItems.hay.total >= 100 && (!player.achievementsGot.includes('achievement-onehundred-hay'))) {
        document.getElementById('achievement-onehundred-hay').hidden = false;
        document.getElementById('achievement-onehundred-hay').style.border = '2px solid gold'
        document.getElementById('achievement-onehundred-hay').style.height = '8rem'
        document.getElementById('achievement-onehundred-hay').style.width = '8rem'
        player.achievementsGot.push('achievement-onehundred-hay');
        player.totalAchievements += 1;
        idleCarrots()
    }
    // flower
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
    if (storeItems.flower.total >= 50 && (!player.achievementsGot.includes('achievement-fifty-flower'))) {
        document.getElementById('achievement-fifty-flower').hidden = false;
        document.getElementById('achievement-fifty-flower').style.border = '2px solid gold'
        document.getElementById('achievement-fifty-flower').style.height = '8rem'
        document.getElementById('achievement-fifty-flower').style.width = '8rem'
        player.achievementsGot.push('achievement-fifty-flower');
        player.totalAchievements += 1;
        idleCarrots()
    }
    if (storeItems.flower.total >= 100 && (!player.achievementsGot.includes('achievement-onehundred-flower'))) {
        document.getElementById('achievement-onehundred-flower').hidden = false;
        document.getElementById('achievement-onehundred-flower').style.border = '2px solid gold'
        document.getElementById('achievement-onehundred-flower').style.height = '8rem'
        document.getElementById('achievement-onehundred-flower').style.width = '8rem'
        player.achievementsGot.push('achievement-onehundred-flower');
        player.totalAchievements += 1;
        idleCarrots()
    }
    // water
    if (storeItems.water.total >= 10 && (!player.achievementsGot.includes('achievement-ten-water'))) {
        document.getElementById('achievement-ten-water').hidden = false;
        document.getElementById('achievement-ten-water').style.border = '2px solid gold'
        document.getElementById('achievement-ten-water').style.height = '8rem'
        document.getElementById('achievement-ten-water').style.width = '8rem'
        player.achievementsGot.push('achievement-ten-water');
        player.totalAchievements += 1;
        idleCarrots()
    }
    if (storeItems.water.total >= 25 && (!player.achievementsGot.includes('achievement-twentyfive-water'))) {
        document.getElementById('achievement-twentyfive-water').hidden = false;
        document.getElementById('achievement-twentyfive-water').style.border = '2px solid gold'
        document.getElementById('achievement-twentyfive-water').style.height = '8rem'
        document.getElementById('achievement-twentyfive-water').style.width = '8rem'
        player.achievementsGot.push('achievement-twentyfive-water');
        player.totalAchievements += 1;
        idleCarrots()
    }
    if (storeItems.water.total >= 50 && (!player.achievementsGot.includes('achievement-fifty-water'))) {
        document.getElementById('achievement-fifty-water').hidden = false;
        document.getElementById('achievement-fifty-water').style.border = '2px solid gold'
        document.getElementById('achievement-fifty-water').style.height = '8rem'
        document.getElementById('achievement-fifty-water').style.width = '8rem'
        player.achievementsGot.push('achievement-fifty-water');
        player.totalAchievements += 1;
        idleCarrots()
    }
    if (storeItems.water.total >= 100 && (!player.achievementsGot.includes('achievement-onehundred-water'))) {
        document.getElementById('achievement-onehundred-water').hidden = false;
        document.getElementById('achievement-onehundred-water').style.border = '2px solid gold'
        document.getElementById('achievement-onehundred-water').style.height = '8rem'
        document.getElementById('achievement-onehundred-water').style.width = '8rem'
        player.achievementsGot.push('achievement-onehundred-water');
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

    // rocket bunny
    if (player.totalRocketBunnyClicks >= 1 && (!player.achievementsGot.includes('achievement-one-rocketBunny'))) {
        document.getElementById('achievement-one-rocketBunny').hidden = false;
        document.getElementById('achievement-one-rocketBunny').style.border = '2px solid gold'
        document.getElementById('achievement-one-rocketBunny').style.height = '8rem'
        document.getElementById('achievement-one-rocketBunny').style.width = '8rem'
        player.achievementsGot.push('achievement-one-rocketBunny');
        player.totalAchievements += 1;
        idleCarrots()
    }
    if (player.totalRocketBunnyClicks >= 10 && (!player.achievementsGot.includes('achievement-ten-rocketBunny'))) {
        document.getElementById('achievement-ten-rocketBunny').hidden = false;
        document.getElementById('achievement-ten-rocketBunny').style.border = '2px solid gold'
        document.getElementById('achievement-ten-rocketBunny').style.height = '8rem'
        document.getElementById('achievement-ten-rocketBunny').style.width = '8rem'
        player.achievementsGot.push('achievement-ten-rocketBunny');
        player.totalAchievements += 1;
        idleCarrots()
    }
    if (player.totalRocketBunnyClicks >= 100 && (!player.achievementsGot.includes('achievement-onehundred-rocketBunny'))) {
        document.getElementById('achievement-onehundred-rocketBunny').hidden = false;
        document.getElementById('achievement-onehundred-rocketBunny').style.border = '2px solid gold'
        document.getElementById('achievement-onehundred-rocketBunny').style.height = '8rem'
        document.getElementById('achievement-onehundred-rocketBunny').style.width = '8rem'
        player.achievementsGot.push('achievement-onehundred-rocketBunny');
        player.totalAchievements += 1;
        idleCarrots()
    }

    // prestige
    if (player.prestige >= 1 && (!player.achievementsGot.includes('achievement-first-prestige'))) {
        document.getElementById('achievement-first-prestige').hidden = false;
        document.getElementById('achievement-first-prestige').style.border = '2px solid gold'
        document.getElementById('achievement-first-prestige').style.height = '8rem'
        document.getElementById('achievement-first-prestige').style.width = '8rem'
        player.achievementsGot.push('achievement-first-prestige');
        player.totalAchievements += 1;
        idleCarrots()
    }
    if (player.prestige >= 2 && (!player.achievementsGot.includes('achievement-second-prestige'))) {
        document.getElementById('achievement-second-prestige').hidden = false;
        document.getElementById('achievement-second-prestige').style.border = '2px solid gold'
        document.getElementById('achievement-second-prestige').style.height = '8rem'
        document.getElementById('achievement-second-prestige').style.width = '8rem'
        player.achievementsGot.push('achievement-second-prestige');
        player.totalAchievements += 1;
        idleCarrots()
    }
    if (player.prestige >= 5 && (!player.achievementsGot.includes('achievement-fifth-prestige'))) {
        document.getElementById('achievement-fifth-prestige').hidden = false;
        document.getElementById('achievement-fifth-prestige').style.border = '2px solid gold'
        document.getElementById('achievement-fifth-prestige').style.height = '8rem'
        document.getElementById('achievement-fifth-prestige').style.width = '8rem'
        player.achievementsGot.push('achievement-fifth-prestige');
        player.totalAchievements += 1;
        idleCarrots()
    }

    document.querySelector('.achievements h2').innerHTML = `Acievements (${player.totalAchievements} / ${noOfAchievements})`;
}


const bunnyRocket = document.getElementById('bunny-rocket');
bunnyRocket.hidden = true;

bunnyRocket.addEventListener('click', () => {
    const toAdd = player.perSecond * 100 > 1000 ? player.perSecond * 100 : 1000;
    player.carrots += toAdd;
    player.allTimeCarrots += toAdd;
    player.prestigeLevelCarrots += toAdd;
    player.totalRocketBunnyClicks += 1;
    document.getElementById('total-carrots').innerHTML = abbrNum(player.carrots.toFixed(0), 1);
    bunnyRocket.hidden = true;
})

const rocketAppear = setInterval(bunnyRocketAppear, 180000);
function bunnyRocketAppear() {
    let disappear = setTimeout(() => {
        bunnyRocket.hidden = true;
    }, 10000)
    
    bunnyRocket.hidden = false;


    const moveTime = setInterval(move, 90);
    let margin = 0;

    let l = window.screen.width;
    let w = -500;

    function move() {
        if (margin == w) {
            margin = 0 + 'px';
        } else {
            bunnyRocket.style.marginLeft = margin + 'px';
            bunnyRocket.style.marginTop = margin + 'px';
        }
        margin -= 7;
    }

}


const abbrNum = (number, decPlaces) => {
    // 2 decimal places => 100, 3 => 1000, etc
    decPlaces = Math.pow(10, decPlaces)
  
    // Enumerate number abbreviations
    var abbrev = ['k', 'm', 'b', 't', 'q', 'Q', 's', 'S', 'o', 'n', 'd']
  
    // Go through the array backwards, so we do the largest first
    for (var i = abbrev.length - 1; i >= 0; i--) {
      // Convert array index to "1000", "1000000", etc
      var size = Math.pow(10, (i + 1) * 3)
  
      // If the number is bigger or equal do the abbreviation
      if (size <= number) {
        // Here, we multiply by decPlaces, round, and then divide by decPlaces.
        // This gives us nice rounding to a particular decimal place.
        number = Math.round((number * decPlaces) / size) / decPlaces
  
        // Handle special case where we round up to the next abbreviation
        if (number == 1000 && i < abbrev.length - 1) {
          number = 1
          i++
        }
  
        // Add the letter for the abbreviation
        number += abbrev[i]
  
        // We are done... stop
        break
      }
    }
      return number
  }