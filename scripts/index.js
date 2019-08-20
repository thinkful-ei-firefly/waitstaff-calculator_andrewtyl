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
    $('main').html(`<h2>Enter the Meal Details</h2>
            <form name="mealDetails" id="mealDetailsForm" autocomplete="off">
            <div class="inputFlexRow">
            <label for="BaseMealPrice">Base Meal Price: $</label>
            <input type="number" step="0.01" min="0.00" value="0.00" name="BaseMealPrice" id="inputForBaseMealPrice">
            </div>
            <div class="inputFlexRow tiny">
            <label for="TaxRate">Tax Rate: %</label>
            <input step="0.01" min="0.00" value="8.31" type="number" name="TaxRate" id="inputForTaxRate">
            </div>
            <div class="inputFlexRow tiny">
            <label for="TipPercentage">Tip Percentage: %</label>
            <input step="0.01" min="0.00" value="15.00" type="number" name="TipPercentage" id="inputForTipPercentage"><br />
            </div>
            <div class="inputFlexRow" id="formButtons">
            <button type="button" id="submitButton">Submit</button>
            <button type="reset" id="cancelButton">Cancel</button>
            </div>
        </form>`);
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
    `)
}