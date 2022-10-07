let carrots = 0;
let perClick = 1;
let perSecond = 0;

let pawTotal = 0;
let pawCost = 10;

let hayTotal = 0;
let hayCost = 100;

let bunnyTotal = 0;
let bunnyCost = 500;


function carrotClick() {
    carrots += perClick;
    document.getElementById('total-carrots').innerHTML = Math.floor(carrots);
}

// Invoke idleIncrement every second
var interval = setInterval(idleIncrement, 1000);
// Increment carrot count by idle amount
function idleIncrement() {
    carrots += perSecond;
    document.getElementById('total-carrots').innerHTML = Math.floor(carrots);
}
// Calculate and display carrots per second
function idleCarrots() {
    perSecond = ((0.1 * pawTotal) + (10 * bunnyTotal) + (1 * hayTotal))
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

// Store item - PAW

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




function clickUpgrade() {
    if (carrots < 500) {
        alert('Not enough carrots!');
        return;
    }
    perClick = 2;

    carrots -= 500;
    document.getElementById('total-carrots').innerHTML = Math.floor(carrots);

    const elements = document.getElementsByClassName('click-upgrade');
    for (let element in elements) {
        elements[element].hidden = true;
    }
    // FIX THIS ^^
}