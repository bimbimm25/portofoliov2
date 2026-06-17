/* Split Home animmate */
const { animate, splitText, stagger } = anime;

const { chars: chars1 } = splitText(".profesi-1", { chars: true });
const { chars: chars2 } = splitText(".profesi-2", { chars: true });

animate(chars1, {
    y: [
        { to: ["100%", "0%"] },
        { to: "-100%", delay: 4000, ease: "in(3)" }
    ],
    duration: 900,
    ease: "out(3)",
    delay: stagger(80),
    loop: true,
});

animate(chars2, {
    y: [
        { to: ["100%", "0%"] },
        { to: "-100%", delay: 4000, ease: "in(3)" }
    ],
    duration: 900,
    ease: "out(3)",
    delay: stagger(80),
    loop: true,
});

/*SWIPERJS*/
const swiperProject = new Swiper('.project-swiper', {
    loop: true,
    spaceBetween: 24,
    slidesPerView: "auto",
    grabCursor: true,
    speed: 600,

    pagination: {
        el: '.swiper-pagination',
    },

    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    }

});

/*== WORK TAB ==*/
// tabs should have a data-target attribute (e.g. data-target="#education")
const tabs = document.querySelectorAll('[data-target]');
const tabContent = document.querySelectorAll('[data-content]');

tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
        const targetSelector = tab.dataset.target;
        const targetContent = document.querySelector(targetSelector);

        if (!targetContent) return; // guard if selector is wrong

        // disable all content
        tabContent.forEach((content) => content.classList.remove('work-active'));
        tabs.forEach((t) => t.classList.remove('work-active'));

        // activate tab and content
        tab.classList.add('work-active');
        targetContent.classList.add('work-active');
    });
});

// SERVICES ACCORDION 
const servicesButtons = document.querySelectorAll('.services-button');

servicesButtons.forEach(button => {
    const heightInfo = button.parentNode.querySelector('.services-info');
    if (heightInfo) {
        heightInfo.style.height = heightInfo.scrollHeight + 'px';
    }

    button.addEventListener('click', () => {
        const servicesCards = document.querySelectorAll('.services-card');
        const currentCard = button.parentNode;
        const currentInfo = currentCard.querySelector('.services-info');
        const isCardOpen = currentCard.classList.contains('services-open');

        // close 
        servicesCards.forEach(card => {
            card.classList.replace('services-open', 'services-close');
            const info = card.querySelector('.services-info');
            if (info) {
                info.style.height = '0';
            }
        });

        // only one
        if (!isCardOpen && currentInfo) {
            currentCard.classList.replace('services-close', 'services-open');
            currentInfo.style.height = currentInfo.scrollHeight + 'px';
        }
    });
});

// COPY EMAIL 
const copyBtn = document.getElementById('contact-btn');
const copyEmail = document.getElementById('contact-email').textContent;

copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(copyEmail).then(() => {
        copyBtn.innerHTML = 'Email copied <i class="ri-check-line"></i>';

        setTimeout(() => {
            copyBtn.innerHTML = 'Copy email <i class="ri-file-copy-line"></i>';
        }, 2000);
    });
});

//CURRENT YEARS
const textYear = document.getElementById('footer-year');
const currentYear = new Date().getFullYear();
textYear.textContent = currentYear;

// SCROLL ACTIVE 
const sections = document.querySelectorAll('section[id]');

const scrollActive = () => {
    const scrollY = window.scrollY;

    sections.forEach(section => {
        const id = section.id,
        top = section.offsetTop - 50,
        height = section.offsetHeight,
        link = document.querySelector('.nav-menu a[href*=' + id + ']');

        if (!link) return;

        link.classList.toggle('active-link', scrollY > top && scrollY <= top + height);
    });
};

window.addEventListener('scroll', scrollActive)

// CUSTOM CURSOR
const cursor = document.querySelector('.cursor')
let mouseX = 0, mouseY = 0

const cursorMove = () => {
    cursor.style.left = `${mouseX}px`
    cursor.style.top = `${mouseY}px`
    cursor.style.transform = 'translate(-50%, -50%)'

    requestAnimationFrame(cursorMove)
}

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX
    mouseY = e.clientY
})

cursorMove()

//hide custom cursor on link
const a = document.querySelectorAll('a')

a.forEach(item => {
    item.addEventListener('mouseover', () => {
        cursor.classList.add('hide-cursor')
    })
    item.addEventListener('mouseleave', () => {
        cursor.classList.remove('hide-cursor')
    })
})

// SCROLL REVEAL
const sr = ScrollReveal ({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 300,
})

sr.reveal(`.home-image, .project-container, .work-container, .contact-container`)
sr.reveal(`.home-data`, {delay: 900, origin: 'bottom'})
sr.reveal(`.home-info`, {delay: 1200, origin: 'bottom'})
sr.reveal(`.home-social, .home-cv`, {delay: 1500})
sr.reveal(`.about-image`, {origin: 'left'})
sr.reveal(`.services-card`, {interval: 100})