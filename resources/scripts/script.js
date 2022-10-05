let carrots = 0;
let total1 = 0;
let cost1 = 10;

let perSecond = 0;

function carrotClick() {
    carrots ++;
    document.getElementById('total-carrots').innerHTML = Math.floor(carrots);
}

var interval = setInterval(idleIncrement, 1000);

function idleIncrement() {
    carrots += perSecond;
    document.getElementById('total-carrots').innerHTML = Math.floor(carrots);
}



function item1Buy() {
    // Check to see if the player has enough carrots
    if (carrots < cost1) {
        alert('Insufficient carrots')
        return;
    }
    total1 += 1;
    carrots = carrots - cost1;
    document.getElementById('total1').innerHTML = total1;
    document.getElementById('total-carrots').innerHTML = Math.floor(carrots);

    // Increase cost each time user buys 1
    cost1 += cost1 * 0.1;
    document.getElementById('cost1').innerHTML = cost1.toFixed(1);

    // Invoke idleCarrots to increase carrots per second
    idleCarrots();
}



function idleCarrots() {
    perSecond = (0.1 * total1)
    const onedp = perSecond.toFixed(1)
    console.log(onedp)
    document.getElementById('idle-carrots').innerHTML = `${onedp} carrots per second`;
}
