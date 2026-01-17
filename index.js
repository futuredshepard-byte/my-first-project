const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.querySelector('nav ul');


menuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    navMenu.classList.toggle('show-menu');
});

document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('show-menu')) {
        navMenu.classList.remove('show-menu');
    }
});

function searchText() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const content = document.body.innerText.toLowerCase();
    if (searchInput === '') {
        alert('please enter a search term.');
        return
        }else if (window.find) {
            window.find(searchInput, false, false, true, false, false, false);
        }else {
            alert("Your browser does not support this search'");
        }
    }

