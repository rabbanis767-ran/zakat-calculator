function formatCurrency(amount) {
    return "₹" + amount.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
function calculateZakat() {
    const cash = Number(document.getElementById("cash").value) || 0;
    const bank = Number(document.getElementById("bank").value) || 0;
    const debts = Number(document.getElementById("debts").value) || 0;
    const goldPrice = Number(document.getElementById("goldPrice").value) || 0;
    const silverPrice = Number(document.getElementById("silverPrice").value) || 0;
    const goldGrams = Number(document.getElementById("goldGrams").value) || 0;
    const silverGrams = Number(document.getElementById("silverGrams").value) || 0;
    const nisabType = document.getElementById("nisabType").value;

    const goldValue = goldGrams * goldPrice;
    const silverValue = silverGrams * silverPrice;
    const totalAssets = cash + bank + goldValue + silverValue;
    const netAmount = totalAssets - debts;
    const nisab = nisabType === "silver" ? 612.36 * silverPrice : 87.48 * goldPrice;

    let resultHtml = "";
    if (netAmount < nisab) {
        resultHtml = `❌ <strong>Not eligible for Zakat</strong><br><br>Net Amount: ${formatCurrency(netAmount)}<br>Nisab Threshold: ${formatCurrency(nisab)}`;
    } else {
        const zakat = netAmount * 0.025;
        resultHtml = `✅ <strong>Eligible for Zakat</strong><br><br>Net Amount: ${formatCurrency(netAmount)}<br><strong>Zakat Payable (2.5%): ${formatCurrency(zakat)}</strong>`;
    }
    const resultDiv = document.getElementById("result");
    resultDiv.style.display = "block";
    resultDiv.innerHTML = resultHtml;
}
