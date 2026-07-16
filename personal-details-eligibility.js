/* ========================= */
/* AUTO-FILL FOR TEST MODE  */
/* ========================= */

document.addEventListener("DOMContentLoaded", () => {
  const reg = (localStorage.getItem("reg") || "").toUpperCase();
  const selected = localStorage.getItem("selectedOption");

  // Test mode SPZ
  if (reg === "SL15NCA" || reg === "SL18NCA") {
    // Wait for DOM + address block to be created
    setTimeout(() => autoFillForm(selected), 200);
  }
});

function autoFillForm(journey) {
  /* ============================
     PERSONAL DETAILS
  ============================ */
  if (document.getElementById("firstName")) {
    document.getElementById("firstName").value = "John";
    document.getElementById("lastName").value = "Smith";
    document.getElementById("email").value = "john.smith@test.com";
    document.getElementById("mobile").value = "07123456789";
  }

  /* ============================
     ADDRESS BLOCK (first one)
  ============================ */
  const firstBlock = document.querySelector(".details-box[data-index='1']");
  if (firstBlock) {
    firstBlock.querySelector(".addr1").value = "10 Downing Street";
    firstBlock.querySelector(".addr2").value = "";
    firstBlock.querySelector(".city").value = "London";
    firstBlock.querySelector(".postcode").value = "SW1A 2AA";

    // FIXED DATE: February 2020
    firstBlock.querySelector(".fromMonth").value = "02";
    firstBlock.querySelector(".fromYear").value = "2020";
  }

  /* ============================
     CURRENT POSTCODE (Journey 2 & 3)
     — must match address postcode
  ============================ */
  const currentPostcode = document.getElementById("currentPostcode");
  if (currentPostcode) {
    currentPostcode.value = "SW1A 2AA"; // same as address
  }

  /* ============================
     AFFORDABILITY (Journey 2 & 3)
  ============================ */
  if (journey !== "valuation-only") {
    if (document.getElementById("income")) {
      document.getElementById("income").value = "3200";
      document.getElementById("rent").value = "900";
      document.getElementById("creditCards").value = "150";
      document.getElementById("loans").value = "200";
    }
  }

  // Update progress bar after autofill
  updateProgress();
}

/* ========================= */
/* POPULATE DOB DROPDOWNS */
/* ========================= */

document.addEventListener("DOMContentLoaded", () => {
  const day = document.getElementById("dobDay");
  const month = document.getElementById("dobMonth");
  const year = document.getElementById("dobYear");

  // Days
  for (let d = 1; d <= 31; d++) {
    day.innerHTML += `<option value="${d}">${d}</option>`;
  }

  // Months
  for (let m = 1; m <= 12; m++) {
    month.innerHTML += `<option value="${m}">${m}</option>`;
  }

  // Years (18–90)
  const currentYear = new Date().getFullYear();
  for (let y = currentYear - 18; y >= currentYear - 90; y--) {
    year.innerHTML += `<option value="${y}">${y}</option>`;
  }

  // Add first address block automatically
  addAddressBlock();
});

/* ========================= */
/* ADDRESS HISTORY LOGIC */
/* ========================= */

let addressCount = 0;
const addressContainer = document.getElementById("addressContainer");
const addAddressBtn = document.getElementById("addAddressBtn");

function addAddressBlock() {
  addressCount++;

  const block = document.createElement("div");
  block.classList.add("details-box");
  block.dataset.index = addressCount;

  block.innerHTML = `
        <label class="details-label">
            ADDRESS LINE 1
            <input type="text" class="addr1" required>
        </label>

        <label class="details-label">
            ADDRESS LINE 2
            <input type="text" class="addr2">
        </label>

        <label class="details-label">
            TOWN / CITY
            <input type="text" class="city" required>
        </label>

        <label class="details-label">
            POSTCODE
            <input type="text" class="postcode" required>
        </label>

        <label class="details-label">
            FROM (MM / YYYY)
            <div class="from-row">
                <input type="number" class="fromMonth" min="1" max="12" placeholder="MM" required>
                <input type="number" class="fromYear" min="1900" max="2100" placeholder="YYYY" required>
            </div>
        </label>

        <div class="progress-wrapper">
            <div class="progress-bar">
                <div class="progress-fill"></div>
            </div>
            <p class="progress-text">0y 0m — need 36 months</p>
        </div>
    `;

  addressContainer.appendChild(block);

  // Add listeners for progress update
  block.querySelector(".fromMonth").addEventListener("input", updateProgress);
  block.querySelector(".fromYear").addEventListener("input", updateProgress);
}

addAddressBtn.addEventListener("click", addAddressBlock);

/* ========================= */
/* PROGRESS CALCULATION */
/* ========================= */

function updateProgress() {
  const blocks = document.querySelectorAll(".details-box[data-index]");
  let totalMonths = 0;

  blocks.forEach((block) => {
    const m = parseInt(block.querySelector(".fromMonth").value);
    const y = parseInt(block.querySelector(".fromYear").value);

    if (!m || !y) return;

    const now = new Date();
    const start = new Date(y, m - 1);
    const diffMonths =
      (now.getFullYear() - start.getFullYear()) * 12 +
      (now.getMonth() - start.getMonth());

    totalMonths += diffMonths;

    const fill = block.querySelector(".progress-fill");
    const text = block.querySelector(".progress-text");

    const percent = Math.min((diffMonths / 36) * 100, 100);
    fill.style.width = percent + "%";

    fill.classList.remove("green", "red");
    if (diffMonths >= 36) {
      fill.classList.add("green");
    } else {
      fill.classList.add("red");
    }

    const years = Math.floor(diffMonths / 12);
    const months = diffMonths % 12;

    text.textContent = `${years}y ${months}m — need ${Math.max(
      36 - diffMonths,
      0,
    )} more months`;
  });

  if (totalMonths < 36) {
    addAddressBtn.style.display = "block";
  } else {
    addAddressBtn.style.display = "none";
  }
}

/* ========================= */
/* FORM SUBMISSION */
/* ========================= */

function submitEligibility() {
  const requiredFields = [
    "firstName",
    "lastName",
    "email",
    "mobile",
    "dobDay",
    "dobMonth",
    "dobYear",
    "currentPostcode",
  ];

  for (let id of requiredFields) {
    const el = document.getElementById(id);
    if (!el || !el.value.trim()) {
      alert("Please fill in all required fields.");
      return;
    }
  }

  if (
    !document.getElementById("consent1").checked ||
    !document.getElementById("consent2").checked
  ) {
    alert("Please agree to both consent statements.");
    return;
  }

  const blocks = document.querySelectorAll(".details-box[data-index]");
  let totalMonths = 0;

  for (let block of blocks) {
    const addr1 = block.querySelector(".addr1").value.trim();
    const city = block.querySelector(".city").value.trim();
    const postcode = block.querySelector(".postcode").value.trim();
    const m = parseInt(block.querySelector(".fromMonth").value);
    const y = parseInt(block.querySelector(".fromYear").value);

    if (!addr1 || !city || !postcode || !m || !y) {
      alert("Please complete all required address fields.");
      return;
    }

    const now = new Date();
    const start = new Date(y, m - 1);
    const diffMonths =
      (now.getFullYear() - start.getFullYear()) * 12 +
      (now.getMonth() - start.getMonth());

    totalMonths += diffMonths;
  }

  if (totalMonths < 36) {
    alert("Please provide at least 3 years of address history.");
    return;
  }

  window.location.href = "results.html";
}
