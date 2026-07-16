document.addEventListener("DOMContentLoaded", () => {
  const reg = localStorage.getItem("reg");
  if (!reg) {
    window.location.href = "vehicle-check.html";
    return;
  }

  // ALWAYS SHOW REG IN CAPITAL LETTERS
  document.getElementById("regPlate").textContent = reg.toUpperCase();

  /* ========================= */
  /* RANDOM MILEAGE GENERATOR  */
  /* ========================= */

  // realistic mileage range for testing
  const randomMileage =
    Math.floor(Math.random() * (120000 - 20000 + 1)) + 20000;

  // insert into input
  document.getElementById("mileageInput").value = randomMileage;
});

function continueToNext() {
  const mileage = document.getElementById("mileageInput").value;

  // mileage must be filled
  if (!mileage) {
    alert("Please enter mileage.");
    return;
  }

  localStorage.setItem("mileage", mileage);

  // condition is optional
  const condition = document.querySelector("input[name='condition']:checked");
  if (condition) {
    localStorage.setItem("condition", condition.value);
  }

  // redirect to next page
  window.location.href = "options-consent.html";
}

/* ========================= */
/* TOOLTIP LOGIC */
/* ========================= */

const options = document.querySelectorAll(".condition-option");
const tooltip = document.getElementById("tooltip");

options.forEach((option) => {
  option.addEventListener("mouseenter", () => {
    tooltip.textContent = option.dataset.tooltip;
    tooltip.style.display = "block";

    const rect = option.getBoundingClientRect();
    tooltip.style.top = rect.bottom + window.scrollY + "px";
    tooltip.style.left = rect.left + rect.width / 2 + "px";
    tooltip.style.transform = "translateX(-50%)";
  });

  option.addEventListener("mouseleave", () => {
    tooltip.style.display = "none";
  });
});
