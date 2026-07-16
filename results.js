// Load selected journey option
const selectedOption = localStorage.getItem("selectedOption");

/* ========================================================= */
/* HARD-CODED VALUATION FOR ALL JOURNEYS */
/* ========================================================= */

const valuationAmount = "£14,375";

document.getElementById("valuationBlock").innerHTML = `
    <p>Your estimated trade-in value:</p>
    <p class="result-value">${valuationAmount}</p>
`;

/* ========================================================= */
/* JOURNEY 1 — Valuation only */
/* ========================================================= */

if (selectedOption === "valuation-only") {
  console.log("Journey 1 active");
}

/* ========================================================= */
/* JOURNEY 2 — Valuation + Eligibility + Affordability */
/* ========================================================= */

if (selectedOption === "valuation-eligibility-affordability") {
  console.log("Journey 2 active");
  document.getElementById("fullEligibilityBox").style.display = "block";
}

/* ========================================================= */
/* JOURNEY 3 — Valuation + Eligibility + Affordability + Finance */
/* ========================================================= */

if (selectedOption === "valuation-eligibility-affordability-finance") {
  console.log("Journey 3 active");

  // Hide valuation box (duplicate)
  document.getElementById("valuationBox").style.display = "none";

  // Show finance block
  document.getElementById("financeJourneyBox").style.display = "block";

  // Show 3-column block
  document.getElementById("fullEligibilityBox").style.display = "block";
}
