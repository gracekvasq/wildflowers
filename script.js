/* Wildflower Softball – Clean, Stable Frontend */

const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwFbcZ-998w1cSmdL3icjRUpLLjkJOiYBt3eSTx4H-6OHpIGT6HjQgAUgZjPIDpBz16ag/exec";

let userEmail = null;

/* ---------------------------
   GOOGLE SIGN-IN
---------------------------- */

function onSignIn(response) {
  const data = jwt_decode(response.credential);
  userEmail = data.email;

  const status = document.getElementById("signin-status");
  if (status) status.textContent = "Signed in as " + userEmail;
}

window.onload = function () {
  const btn = document.getElementById("google-signin-btn");
  if (!btn) return;

  google.accounts.id.initialize({
    client_id:
      "514465494343-99m0sudgh675lc1jiu6nlv4iob8pa2b4.apps.googleusercontent.com",
    callback: onSignIn,
  });

  google.accounts.id.renderButton(btn, {
    theme: "outline",
    size: "large",
  });
};

/* ---------------------------
   UPLOAD FILE
---------------------------- */

function handleUpload() {
  const file = document.getElementById("fileInput").files[0];
  if (!file) return alert("Choose a file first.");
  uploadFile(file);
}

async function uploadFile(file) {
  if (!userEmail) {
    alert("Please sign in first.");
    return;
  }

  const reader = new FileReader();

  reader.onload = async function (e) {
    const base64 = e.target.result.split(",")[1];

    const formData = new FormData();
    formData.append("action", "upload");
    formData.append("name", file.name);
    formData.append("mimeType", file.type);
    formData.append("file", base64);

    const res = await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      body: formData,
    });

    const json = await res.json();
    alert("Upload complete!");
  };

  reader.readAsDataURL(file);
}

/* ---------------------------
   LOAD GALLERY
---------------------------- */

async function loadGallery() {
  const container = document.getElementById("gallery");
  if (!container) return;

  const res = await fetch(APPS_SCRIPT_URL + "?action=list");
  const data = await res.json();

  container.innerHTML = "";

  data.files.forEach((file) => {
    const img = document.createElement("img");
    img.src = file.url;
    img.className = "gallery-img";
    container.appendChild(img);
  });
}
