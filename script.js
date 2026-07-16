document.getElementById("vrmForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const vrm = document.getElementById("vrmInput").value.trim();

  if (vrm.length < 3) {
    alert("Please enter a valid VRM.");
    return;
  }

  localStorage.setItem("vrm", vrm);

  window.location.href = "vehicle-confirmation.html";
});
