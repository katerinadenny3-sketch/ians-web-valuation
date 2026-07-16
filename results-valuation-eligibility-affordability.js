const selectedOption = localStorage.getItem("valuationOption");
const financeExists = localStorage.getItem("financeExists") === "true";

// Simulated valuation
const valuation = {
  tradeLow: 6500,
  tradeHigh: 7200,
  privateSale: 7800,
  retail: 8500,
};

// Simulated eligibility
const eligibility = {
  status: "Likely approved",
  maxMonthly: 320,
  maxVehiclePrice: 14500,
};

// Simulated finance
const finance = {
  balance: 4200,
  equity: valuation.tradeLow - 4200,
};

// Populate valuation
document.getElementById("valuationBlock").innerHTML = `
    <p>Your estimated trade-in value:</p>
    <p class="result-value">£${valuation.tradeLow} – £${valuation.tradeHigh}</p>

    <p>Private sale estimate: <strong>£${valuation.privateSale}</strong></p>
    <p>Retail value estimate: <strong>£${valuation.retail}</strong></p>
`;

// Show eligibility if needed
if (selectedOption === "valuation-eligibility-affordability") {
  document.getElementById("eligibilityBox").style.display = "block";
  document.getElementById("eligibilityBlock").innerHTML = `
        <p><strong>Eligibility:</strong> ${eligibility.status}</p>
        <p><strong>Estimated monthly affordability:</strong> £${eligibility.maxMonthly}</p>
        <p><strong>Estimated maximum vehicle price:</strong> £${eligibility.maxVehiclePrice}</p>
    `;
}

// Show finance if needed
if (selectedOption === "valuation-eligibility-finance" && financeExists) {
  document.getElementById("financeBox").style.display = "block";
  document.getElementById("financeBlock").innerHTML = `
        <p><strong>Finance balance:</strong> £${finance.balance}</p>
        <p><strong>Equity position:</strong> 
            ${
              finance.equity >= 0
                ? "Positive equity of £" + finance.equity
                : "Negative equity of £" + Math.abs(finance.equity)
            }
        </p>
    `;
}
