const STORE = {
    lastOrder: {
        subtotal: 0.00,
        tip: 0.00,
        total: 0.00
    },
    earnings: {
        tipTotal: 0.00,
        mealCount: 0,
        avgTip: 0.00
    }
}

$('#submitButton').on('click', function() {
    console.log("form submit button pressed");
    let baseMealPrice = $('#inputForBaseMealPrice').val();
    let taxRate = $('#inputForTaxRate').val();
    let tipPercentage = $('#inputForTipPercentage').val();
    baseMealPrice = parseInt(baseMealPrice);
    taxRate = parseInt(taxRate);
    tipPercentage = parseInt(tipPercentage);
    processStore(baseMealPrice, taxRate, tipPercentage);
    reRenderPage();
})

function processStore(baseMealPrice, taxRate, tipPercentage) {
    STORE.lastOrder.subtotal = baseMealPrice;
    let tipAmt = (baseMealPrice * tipPercentage * 0.01);
    STORE.lastOrder.tip = tipAmt;
    let taxAmt = (baseMealPrice * taxRate * 0.01);
    STORE.lastOrder.total = (baseMealPrice + tipAmt + taxAmt);
    STORE.earnings.tipTotal = (STORE.earnings.tipTotal + tipAmt);
    STORE.earnings.mealCount++;
    STORE.earnings.avgTip = (STORE.earnings.tipTotal / STORE.earnings.mealCount);
}

function reRenderPage() {
    $('#customerCharges').html(`
            <h2>Customer Charges</h2>
            <h3>Subtotal ${STORE.lastOrder.subtotal}</h3>
            <h3>Tip ${STORE.lastOrder.tip}</h3>
            <h3>Total ${STORE.lastOrder.total}</h3>
    `)
    $('#myEarnings').html(`
            <h2>My Earnings Info</h2>
            <h3>Tip Total: ${STORE.earnings.tipTotal}</h3>
            <h3 id="mealCount">Meal Count: ${STORE.earnings.mealCount}</h3><span>
            <h3>Average Tip Per Meal: ${STORE.earnings.avgTip}</h3>
    `);
    $('#mealDetailsForm')[0].reset();
}