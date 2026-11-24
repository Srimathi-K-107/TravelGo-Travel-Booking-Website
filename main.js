const menuButton = document.getElementById("menuButton");
const mobileMenu = document.getElementById("mobileMenu");

menuButton.addEventListener("click", function () {
  mobileMenu.classList.toggle("hidden");

  const isOpen = !mobileMenu.classList.contains("hidden");

  menuButton.innerHTML = isOpen
    ? '<i data-lucide="x" class="w-7 h-7"></i>'
    : '<i data-lucide="menu" class="w-7 h-7"></i>';

  lucide.createIcons();
});

const mobileLinks = mobileMenu.querySelectorAll("a");

mobileLinks.forEach(function (link) {
  link.addEventListener("click", function () {
    mobileMenu.classList.add("hidden");

    menuButton.innerHTML = '<i data-lucide="menu" class="w-7 h-7"></i>';

    lucide.createIcons();
  });
});

const searchButton = document.getElementById("searchButton");
const searchInput = document.getElementById("destinationSearch");

const destinations = document.querySelectorAll(".destination-item");
const noDestination = document.getElementById("noDestination");

searchButton.addEventListener("click", function () {
  let searchValue = searchInput.value.trim().toLowerCase();
  let found = false;

  destinations.forEach(function (destination) {
    let name = destination.getAttribute("data-name");

    if (searchValue === "" || name.includes(searchValue)) {
      destination.style.display = "";

      found = true;
    } else {
      destination.style.display = "none";
    }
  });

  if (found) {
    noDestination.classList.add("hidden");
  } else {
    noDestination.classList.remove("hidden");
  }
});

searchInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    searchButton.click();

    document.getElementById("destinations").scrollIntoView({
      behavior: "smooth",
    });
  }
});

const bookButtons = document.querySelectorAll(".book-button");

bookButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    let packageName = button.getAttribute("data-package");

    document.getElementById("packageName").value = packageName;

    document.getElementById("booking").scrollIntoView({
      behavior: "smooth",
    });
  });
});

const bookingForm = document.getElementById("bookingForm");

const confirmationModal = document.getElementById("confirmationModal");

const confirmationMessage = document.getElementById("confirmationMessage");

bookingForm.addEventListener("submit", function (event) {
  event.preventDefault();

  let name = document.getElementById("fullName").value;

  let email = document.getElementById("email").value;

  let packageName = document.getElementById("packageName").value;

  let travellers = document.getElementById("travellers").value;

  confirmationMessage.textContent =
    "Thank you " +
    name +
    "! Your " +
    packageName +
    " booking request has been submitted for " +
    travellers +
    " traveller(s). We will contact you at " +
    email +
    ".";

  confirmationModal.classList.remove("hidden");

  document.body.style.overflow = "hidden";
});

const closeModal = document.getElementById("closeModal");

function hideModal() {
  confirmationModal.classList.add("hidden");

  document.body.style.overflow = "";

  bookingForm.reset();
}

closeModal.addEventListener("click", hideModal);

confirmationModal.addEventListener("click", function (event) {
  if (event.target === confirmationModal) {
    hideModal();
  }
});

const travelDate = document.getElementById("travelDate");

let today = new Date();

let localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
  .toISOString()
  .split("T")[0];

travelDate.setAttribute("min", localToday);

const revealElements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");

        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12,
  },
);

revealElements.forEach(function (element) {
  observer.observe(element);
});
