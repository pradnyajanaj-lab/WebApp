// IPL Ticket Booking - Activity 7

// DOM Selectors
const matchSelect = document.getElementById("match");
const standSelect = document.getElementById("stand");
const quantityInput = document.getElementById("quantity");

// Booking Summary Elements
const summaryMatch = document.getElementById("summary-match");
const summaryStand = document.getElementById("summary-stand");
const summaryPrice = document.getElementById("summary-price");
const summaryQuantity = document.getElementById("summary-quantity");
const summaryTotal = document.getElementById("summary-total");

// Ticket Prices
const ticketPrices = {
    General: 1000,
    Premium: 2500,
    VIP: 5000
};

// Toast Notification Function
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

// Update Booking Summary
function updateBookingSummary() {

    const selectedMatch = matchSelect.value;
    const selectedStand = standSelect.value;
    const quantity = Number(quantityInput.value);

    const ticketPrice = ticketPrices[selectedStand] || 0;

    const validQuantity = quantity >= 1 && quantity <= 10;

    const totalAmount = validQuantity ? ticketPrice * quantity : 0;

    summaryMatch.textContent = selectedMatch || "Not selected";

    summaryStand.textContent = selectedStand || "Not selected";

    summaryPrice.textContent = "₹" + ticketPrice;

    summaryQuantity.textContent = validQuantity ? quantity : 0;

    summaryTotal.textContent = "₹" + totalAmount;

    if (selectedMatch && selectedStand && validQuantity) {
        showToast("Booking Summary Updated Successfully!");
    }
}

// Change Event Listeners
matchSelect.addEventListener("change", updateBookingSummary);

standSelect.addEventListener("change", updateBookingSummary);

quantityInput.addEventListener("change", updateBookingSummary);

quantityInput.addEventListener("input", updateBookingSummary);

// Smooth Scrolling
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