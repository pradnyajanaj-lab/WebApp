// Reusable Toast Notification Function
function showToast(message) {
    let toast = document.getElementById("toast");

    if (!toast) {
        toast = document.createElement("div");
        toast.id = "toast";

        toast.style.position = "fixed";
        toast.style.bottom = "30px";
        toast.style.right = "30px";
        toast.style.backgroundColor = "#07152f";
        toast.style.color = "white";
        toast.style.padding = "15px 25px";
        toast.style.borderRadius = "8px";
        toast.style.zIndex = "1000";
        toast.style.fontSize = "16px";

        document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.style.display = "block";

    clearTimeout(window.toastTimer);

    window.toastTimer = setTimeout(function () {
        toast.style.display = "none";
    }, 3000);
}


// Book Button Interaction
document.addEventListener("DOMContentLoaded", function () {

    // Detect Book button clicks on the home page
    const bookLinks = document.querySelectorAll('a[href="booking.html"]');

    bookLinks.forEach(function (link) {
        link.addEventListener("click", function () {
            sessionStorage.setItem("openBookingForm", "true");
        });
    });

    // Smoothly scroll to the booking form after opening booking.html
    if (sessionStorage.getItem("openBookingForm") === "true") {

        sessionStorage.removeItem("openBookingForm");

        const bookingForm = document.getElementById("bookingForm");

        if (bookingForm) {
            setTimeout(function () {
                bookingForm.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

                showToast("Booking form opened successfully!");
            }, 300);
        }
    }
});