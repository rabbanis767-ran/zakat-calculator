function formatCurrency(amount) {
    return "₹" + amount.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
function calculateZakat() {
    const cash = Number(document.getElementById("cash").value) || 0;
    const bank = Number(document.getElementById("bank").value) || 0;
    const businessStock = Number(document.getElementById("businessStock").value) || 0;
    const investments = Number(document.getElementById("investments").value) || 0;
    const rentalIncome = Number(document.getElementById("rentalIncome").value) || 0;
    const investmentProperty = Number(document.getElementById("investmentProperty").value) || 0;
    const debts = Number(document.getElementById("debts").value) || 0;
    const goldPrice = Number(document.getElementById("goldPrice").value) || 0;
    const silverPrice = Number(document.getElementById("silverPrice").value) || 0;
    const goldGrams = Number(document.getElementById("goldGrams").value) || 0;
    const silverGrams = Number(document.getElementById("silverGrams").value) || 0;
    const nisabType = document.getElementById("nisabType").value;

    const goldValue = goldGrams * goldPrice;
    const silverValue = silverGrams * silverPrice;
    const totalAssets = cash + bank + businessStock + investments + rentalIncome + investmentProperty + goldValue + silverValue;
    const netAmount = totalAssets - debts;
    const nisab = nisabType === "silver" ? 612.36 * silverPrice : 87.48 * goldPrice;

    let resultHtml = "";

    // Build overview section
    const overview = `
        <div style="background-color: #f0f8ff; padding: 12px; border-radius: 5px; margin-bottom: 15px;">
            <h4 style="margin-top: 0; color: #1e3a8a;">📊 Asset Overview</h4>
            <table style="width: 100%; border-collapse: collapse;">
                <tr>
                    <td style="padding: 5px; font-weight: 500;">Cash:</td>
                    <td style="text-align: right; padding: 5px;">${formatCurrency(cash)}</td>
                </tr>
                <tr>
                    <td style="padding: 5px; font-weight: 500;">Bank Balance:</td>
                    <td style="text-align: right; padding: 5px;">${formatCurrency(bank)}</td>
                </tr>
                <tr>
                    <td style="padding: 5px; font-weight: 500;">Business Stock/Inventory:</td>
                    <td style="text-align: right; padding: 5px;">${formatCurrency(businessStock)}</td>
                </tr>
                <tr>
                    <td style="padding: 5px; font-weight: 500;">Investments/Shares:</td>
                    <td style="text-align: right; padding: 5px;">${formatCurrency(investments)}</td>
                </tr>
                <tr>
                    <td style="padding: 5px; font-weight: 500;">Saved Rental Income:</td>
                    <td style="text-align: right; padding: 5px;">${formatCurrency(rentalIncome)}</td>
                </tr>
                <tr>
                    <td style="padding: 5px; font-weight: 500;">Investment Property:</td>
                    <td style="text-align: right; padding: 5px;">${formatCurrency(investmentProperty)}</td>
                </tr>
                <tr>
                    <td style="padding: 5px; font-weight: 500;">Gold Value:</td>
                    <td style="text-align: right; padding: 5px;">${formatCurrency(goldValue)}</td>
                </tr>
                <tr>
                    <td style="padding: 5px; font-weight: 500;">Silver Value:</td>
                    <td style="text-align: right; padding: 5px;">${formatCurrency(silverValue)}</td>
                </tr>
                <tr style="border-top: 2px solid #ccc;">
                    <td style="padding: 5px; font-weight: bold;">Total Assets:</td>
                    <td style="text-align: right; padding: 5px; font-weight: bold;">${formatCurrency(totalAssets)}</td>
                </tr>
                <tr>
                    <td style="padding: 5px; font-weight: 500; color: #dc2626;">Liabilities (Debts):</td>
                    <td style="text-align: right; padding: 5px; color: #dc2626;">- ${formatCurrency(debts)}</td>
                </tr>
                <tr style="border-top: 2px solid #ccc; background-color: #e0f2fe;">
                    <td style="padding: 5px; font-weight: bold;">Net Amount:</td>
                    <td style="text-align: right; padding: 5px; font-weight: bold;">${formatCurrency(netAmount)}</td>
                </tr>
            </table>
        </div>
    `;

    if (netAmount < nisab) {
        resultHtml = overview + `❌ <strong>Not eligible for Zakat</strong><br><br>Nisab Threshold: ${formatCurrency(nisab)}<br><small>Your net amount is below the Nisab threshold.</small>`;
    } else {
        const zakat = netAmount * 0.025;
        resultHtml = overview + `✅ <strong>Eligible for Zakat</strong><br><br>Nisab Threshold: ${formatCurrency(nisab)}<br><strong style="color: #16a34a; font-size: 1.1em;">Zakat Payable (2.5%): ${formatCurrency(zakat)}</strong>`;
    }
    const resultDiv = document.getElementById("result");
    resultDiv.style.display = "block";
    resultDiv.innerHTML = resultHtml;
}
