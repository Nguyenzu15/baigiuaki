// Lấy các phần tử cần dùng
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

// Bật/tắt menu khi click icon menu
menuIcon.onclick = () => {
    menuIcon.classList.toggle('active');
    navbar.classList.toggle('active');
};

// Xử lý active menu khi scroll
window.onscroll = () => {
    let top = window.scrollY;

    sections.forEach(sec => {
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                let targetLink = document.querySelector('header nav a[href*=' + id + ']');
                if (targetLink) {
                    targetLink.classList.add('active');
                }
            });
        }
    });

    // Khi scroll thì ẩn menu mobile đi
    menuIcon.classList.remove('active');
    navbar.classList.remove('active');
};

// Tự động đóng menu khi click vào một link (trên mobile)
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuIcon.classList.remove('active');
        navbar.classList.remove('active');
    });
});
