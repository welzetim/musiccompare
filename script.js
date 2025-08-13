document.addEventListener("DOMContentLoaded", function () {
    const openBtn = document.getElementById("openModal");
    const modal = document.getElementById("myModal");
    const closeBtn = document.getElementById("closeModal");

    // Öffnen
    openBtn.addEventListener("click", function (event) {
        event.preventDefault(); // Verhindert Link- oder Formular-Reload
        modal.style.display = "block";
    });

    // Schließen
    closeBtn.addEventListener("click", function () {
        modal.style.display = "none";
    });

    // Schließen bei Klick außerhalb
    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});
