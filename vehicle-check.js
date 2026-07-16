// ⭐ When user selects a test plate, auto-fill the input field
document.getElementById("regSelect").addEventListener("change", function () {
  const value = this.value;

  if (value) {
    document.getElementById("regInput").value = value;
  }
});

function lookupReg() {
  const reg = document.getElementById("regInput").value.trim().toUpperCase();

  if (reg.length < 4) {
    alert("Please enter a valid registration number.");
    return;
  }

  // Save reg to localStorage
  localStorage.setItem("reg", reg);

  // Redirect to next page
  window.location.href = "vehicle-confirmation.html";
}
