// ================= MOBILE NAVIGATION =================

// Get the navigation elements
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

// Open and close the navigation menu
menuToggle.addEventListener("click", function () {

    // Toggle the "show" class
    navLinks.classList.toggle("show");

    // Update accessibility state
    const isExpanded = navLinks.classList.contains("show");
    menuToggle.setAttribute("aria-expanded", isExpanded);

});

// Close menu after clicking a navigation link
const navItems = document.querySelectorAll(".nav-links a");

navItems.forEach(function (link) {

    link.addEventListener("click", function () {

        navLinks.classList.remove("show");
        menuToggle.setAttribute("aria-expanded", "false");

    });

});

/* PORTFOLIO CATEGORY FILTERS */

document.addEventListener("DOMContentLoaded", () => {

    const filterButtons = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");

    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            // Get the selected category
            const selectedCategory = button.dataset.category;

            // Update the active filter button
            filterButtons.forEach(btn => {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            // Show or hide project cards
            projectCards.forEach(card => {

                const projectCategory = card.dataset.category;

                if (
                    selectedCategory === "all" ||
                    selectedCategory === projectCategory
                ) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }

            });

        });

    });

});