document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);

        window.scrollTo({
            top: targetSection.offsetTop - 20,
            behavior: 'smooth'
        });
    });
});

const nightThemeBtn = document.getElementById("night-theme-btn")




nightThemeBtn.addEventListener("click", function() {
    document.body.classList.toggle("night-theme")

    const theme = localStorage.getItem("theme")
   if(theme === "night-theme") {
    localStorage.setItem("theme", "")
   }  else{
    localStorage.setItem("theme", "night-theme")}
})
