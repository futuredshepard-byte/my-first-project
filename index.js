const verifyBtn = document.getElementById('verifyBtn');
const ageInput = document.getElementById('age');
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.querySelector("nav ul");
const regBtn = document.getElementById("reg-btn");
const candidateBtn = document.getElementById("candidate-btn");
const registerBtn = document.getElementById("candidate-register-btn");
const deleteAllBtn = document.getElementById("delete-all-btn");


if (verifyBtn && ageInput) {
  verifyBtn.addEventListener('click', () => {
    const age = parseInt(ageInput.value);

    if (isNaN(age) || age < 18 || age > 120) {
      alert('Please enter a valid age (18-120)');
      return;
    }

    localStorage.setItem('ageVerified', 'true');
    window.location.href = 'index.html';
  });
}


if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    navMenu.classList.toggle("show-menu");
  });

  document.addEventListener("click", (e) => {
    if (navMenu.classList.contains("show-menu")) {
      navMenu.classList.remove("show-menu");
    }
  });
}


function searchText() {
  const searchInput = document
    .getElementById("searchInput")
    .value.toLowerCase();
  const content = document.body.innerText.toLowerCase();
  if (searchInput === "") {
    alert("please enter a search term.");
    return;
  } else if (window.find) {
    window.find(searchInput, false, false, true, false, false, false);
  } else {
    alert("Your browser does not support this search");
  }
}

if (regBtn) {
  regBtn.addEventListener("click", () => {
    window.location.href = "register.html";
  });
}


if (candidateBtn) {
  candidateBtn.addEventListener("click", () => {
    window.location.href = "candidate.html";
  });
}





if (registerBtn) {
  registerBtn.addEventListener("click", function (e) {
    e.preventDefault();

    const surname = document.getElementById("surname").value;
    const firstname = document.getElementById("firstname").value;
    const lastname = document.getElementById("lastname").value;
    const email = document.getElementById("email").value;
    const age = document.getElementById("age").value;
    const gender = document.getElementById("gender").value;
    const country = document.getElementById("country").value;
    const state = document.getElementById("state").value;
    const areaOfInterest = document.getElementById("area-of-interest").value;

    if (
      !surname.trim() ||
      !firstname.trim() ||
      !lastname.trim() ||
      !email.trim() ||
      !age ||
      !gender.trim() ||
      !country.trim() ||
      !state.trim() ||
      !areaOfInterest.trim()
    ) {
      alert("Please fill in all required fields");
      return;
    }

    const candidate = {
      surname: surname,
      firstname: firstname,
      lastname: lastname,
      // fullName: `${surname} ${firstname} ${lastname}`,
      email: email,
      age: age,
      gender: gender,
      country: country,
      state: state,
      location: `${state}, ${country}`,
      areaOfInterest: areaOfInterest,
      dateRegistered: new Date().toISOString(),
    };

    let candidates = JSON.parse(localStorage.getItem("candidates")) || [];

    candidates.push(candidate);

    localStorage.setItem("candidates", JSON.stringify(candidates));

    alert("Registration successful");

    window.location.href = "voting.html";
  });
}

function displayCandidate() {
  const container = document.getElementById("candidatesContainer");

  if (!container) {
    return;
  }

  const candidates = JSON.parse(localStorage.getItem("candidates")) || [];

  container.innerHTML = "";

  if (candidates.length === 0) {
    container.innerHTML =
      '<p style="text-align: center; color: #666; font-size: 1.2rem; padding: 2rem;">No candidates registered yet.</p>';
    return;
  }

  candidates.forEach(function (candidate) {
    const card = document.createElement("div");
    card.className = "candidate-card";

    card.innerHTML = `
      <h3 class="candidate-name">${candidate.fullName}</h3>
      <p class="candidate-email">📧 ${candidate.email}</p>
      <p class="candidate-age">👤 Age: ${candidate.age}</p>
      <p class="candidate-gender">⚧ Gender: ${candidate.gender}</p>
      <p class="candidate-location">📍 ${candidate.location}</p>
      <p class="candidate-interest">🎯 Area of Interest: ${candidate.areaOfInterest}</p>
      <button class="vote-btn" data-id="${candidate.id}" data-name="${candidate.fullName}">
        Vote For This Candidate
      </button>
    `;

    container.appendChild(card);
  });

  
  handleVoting();
}

function handleVoting() {
  const voteButtons = document.querySelectorAll('.vote-btn');
  
  voteButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const candidateName = e.target.dataset.name;
      
      console.log(`Vote recorded for: ${candidateName}`);
      
      e.target.textContent = "Vote Recorded ✓";
      e.target.disabled = true;
      
      // Redirect after 1 second
      setTimeout(() => {
        window.location.href = 'thankyou.html';
      }, 1000);
    });
  });
}

window.addEventListener("DOMContentLoaded", displayCandidate);

if (deleteAllBtn) {
  deleteAllBtn.addEventListener("click", function () {
    if (confirm("Are you sure you want to delete all candidates? This cannot be undone.")) {
      localStorage.removeItem("candidates");
      alert("All candidates have been deleted");
      displayCandidate();
    }
  });
}

const form = document.getElementById("reg-form")
form.addEventListener('submit', (e) => {
  e.preventDefault()

  console.log(form)

  setTimeout(() => {
    window.location.href = 'voting.html'
  }, 1000)
})





