// Hide consent on page load + hide 3rd journey if needed
document.addEventListener("DOMContentLoaded", () => {
  // Hide consent initially
  document.getElementById("consentSection").style.display = "none";

  // Get reg and uppercase it
  const reg = (localStorage.getItem("reg") || "").toUpperCase();

  /* ============================================================
     NON-FINANCE MODE → SL18NCA
     Hide Journey 3 (FULL LABEL)
  ============================================================ */
  if (reg === "SL18NCA") {
    const thirdJourneyLabel = document
      .querySelector(
        "input[value='valuation-eligibility-affordability-finance']",
      )
      ?.closest("label.option-card");

    if (thirdJourneyLabel) {
      thirdJourneyLabel.style.display = "none";
    }
  }

  /* ============================================================
     FINANCE MODE → SL15NCA
     Show all journeys (no change needed)
  ============================================================ */
});

// Show/hide consent dynamically when user selects an option
document.querySelectorAll("input[name='option']").forEach((opt) => {
  opt.addEventListener("change", () => {
    const needsConsent =
      opt.value === "valuation-eligibility-affordability" ||
      opt.value === "valuation-eligibility-affordability-finance";

    document.getElementById("consentSection").style.display = needsConsent
      ? "block"
      : "none";
  });
});

function goNext() {
  const selected = document.querySelector("input[name='option']:checked");

  if (!selected) {
    alert("Please select one of the options.");
    return;
  }

  const needsConsent =
    selected.value === "valuation-eligibility-affordability" ||
    selected.value === "valuation-eligibility-affordability-finance";

  if (needsConsent) {
    const consent = document.getElementById("consentCheck").checked;
    if (!consent) {
      alert("Please agree to the consent statement.");
      return;
    }
  }

  // Save selected option
  localStorage.setItem("selectedOption", selected.value);

  // Redirect based on journey
  if (selected.value === "valuation-only") {
    window.location.href = "personal-details.html";
  } else {
    window.location.href = "personal-details-eligibility.html";
  }
}
