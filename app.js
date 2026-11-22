// IPL Ticket Booking - Activity 8

// ==========================================
// 1. DOM SELECTORS
// ==========================================

const matchSelect = document.getElementById("match");
const standSelect = document.getElementById("stand");
const quantityInput = document.getElementById("quantity");


// ==========================================
// 2. BOOKING SUMMARY ELEMENTS
// ==========================================

const summaryMatch = document.getElementById("summary-match");
const summaryStand = document.getElementById("summary-stand");
const summaryPrice = document.getElementById("summary-price");
const summaryQuantity = document.getElementById("summary-quantity");
const summaryTotal = document.getElementById("summary-total");


// ==========================================
// 3. TICKET PRICES
// ==========================================

const ticketPrices = {
    General: 1000,
    Premium: 2500,
    VIP: 5000
};


// ==========================================
// 4. TOAST NOTIFICATION FUNCTION
// ==========================================

function showToast(message) {

    const toast = document.createElement("div");

    toast.textContent = message;

    toast.style.position = "fixed";
    toast.style.bottom = "25px";
    toast.style.right = "25px";
    toast.style.backgroundColor = "#28a745";
    toast.style.color = "white";
    toast.style.padding = "15px 25px";
    toast.style.borderRadius = "8px";
    toast.style.zIndex = "1000";
    toast.style.fontSize = "16px";

    document.body.appendChild(toast);

    setTimeout(function () {
        toast.remove();
    }, 2500);
}


// ==========================================
// 5. UPDATE BOOKING SUMMARY
// ==========================================

function updateBookingSummary() {

    if (!matchSelect || !standSelect || !quantityInput) {
        return;
    }

    const selectedMatch = matchSelect.value;
    const selectedStand = standSelect.value;
    const quantity = Number(quantityInput.value);

    const ticketPrice = ticketPrices[selectedStand] || 0;

    const validQuantity = quantity >= 1 && quantity <= 10;

    const totalAmount = validQuantity ? ticketPrice * quantity : 0;

    if (summaryMatch) {
        summaryMatch.textContent = selectedMatch || "Not selected";
    }

    if (summaryStand) {
        summaryStand.textContent = selectedStand || "Not selected";
    }

    if (summaryPrice) {
        summaryPrice.textContent = "₹" + ticketPrice;
    }

    if (summaryQuantity) {
        summaryQuantity.textContent = validQuantity ? quantity : 0;
    }

    if (summaryTotal) {
        summaryTotal.textContent = "₹" + totalAmount;
    }

    if (selectedMatch && selectedStand && validQuantity) {
        showToast("Booking Summary Updated Successfully!");
    }
}


// ==========================================
// 6. BOOKING EVENT LISTENERS
// ==========================================

if (matchSelect) {
    matchSelect.addEventListener("change", updateBookingSummary);
}

if (standSelect) {
    standSelect.addEventListener("change", updateBookingSummary);
}

if (quantityInput) {
    quantityInput.addEventListener("change", updateBookingSummary);
    quantityInput.addEventListener("input", updateBookingSummary);
}


// ==========================================
// 7. TEAM FILTER FUNCTION
// ==========================================

const teamFilter = document.getElementById("team-filter");

const matchCards = document.querySelectorAll(".match-card");

if (teamFilter) {

    teamFilter.addEventListener("change", function () {

        const selectedTeam = teamFilter.value;

        matchCards.forEach(function (card) {

            const teams = card.dataset.teams.split(" ");

            if (selectedTeam === "all" || teams.includes(selectedTeam)) {
                card.style.display = "";
            } else {
                card.style.display = "none";
            }

        });

    });

}


// ==========================================
// 8. GRID AND LIST VIEW TOGGLE
// ==========================================

const matchContainer = document.getElementById("match-container");

const gridButton = document.getElementById("grid-view");

const listButton = document.getElementById("list-view");

if (matchContainer && gridButton && listButton) {

    // Default Grid View

    gridButton.classList.add("active");

    gridButton.addEventListener("click", function () {

        matchContainer.classList.remove("list-view");

        gridButton.classList.add("active");

        listButton.classList.remove("active");

    });


    // List View

    listButton.addEventListener("click", function () {

        matchContainer.classList.add("list-view");

        listButton.classList.add("active");

        gridButton.classList.remove("active");

    });

}


// ==========================================
// 9. MOBILE HAMBURGER MENU
// ==========================================

const menuToggle = document.getElementById("menu-toggle");

const navLinks = document.getElementById("nav-links");

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", function () {

        navLinks.classList.toggle("active");

        const isExpanded = navLinks.classList.contains("active");

        menuToggle.setAttribute("aria-expanded", isExpanded);

        menuToggle.textContent = isExpanded ? "✕" : "☰";

    });


    // Close menu after clicking a navigation link

    navLinks.querySelectorAll("a").forEach(function (link) {

        link.addEventListener("click", function () {

            navLinks.classList.remove("active");

            menuToggle.setAttribute("aria-expanded", "false");

            menuToggle.textContent = "☰";

        });

    });

}


// ==========================================
// 10. SMOOTH SCROLLING
// ==========================================

document.querySelectorAll('a[href^="#"]').forEach(function (link) {

    link.addEventListener("click", function (event) {

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth"
            });

        }

    });

});


// ==========================================
// END OF ACTIVITY 8
// ==========================================