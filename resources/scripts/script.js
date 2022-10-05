let carrots = 0;
let pawTotal = 0;
let pawCost = 10;

let perSecond = 0;

function carrotClick() {
    carrots ++;
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
    perSecond = (0.1 * pawTotal)
    const onedp = perSecond.toFixed(1)
    console.log(onedp)
    document.getElementById('idle-carrots').innerHTML = `${onedp} carrots per second`;
}

// Store item - PAW

function pawBuy() {
    // Check to see if the player has enough carrots
    if (carrots < pawCost) {
        alert('Insufficient carrots')
        return;
    }
    pawTotal += 1;
    carrots = carrots - pawCost;
    document.getElementById('paw-total').innerHTML = `x${pawTotal}`;
    document.getElementById('total-carrots').innerHTML = Math.floor(carrots);

    // Increase cost each time user buys 1
    pawCost += pawCost * 0.1;
    document.getElementById('paw-cost').innerHTML = pawCost.toFixed(1);

    // Invoke idleCarrots to increase carrots per second
    idleCarrots();
}




