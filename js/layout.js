// layout.js
async function loadComponent(id, file) {
  const el = document.getElementById(id);
  if (el) {
    const res = await fetch(file);
    el.innerHTML = await res.text();

    // 當 header 載入完成後才執行 active 狀態切換
    if (id === 'header') {
      setActiveNavLink();
    }
  }
}

// 切換導覽列 active 狀態
function setActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop(); // 例如 "products.html"
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

  navLinks.forEach(link => {
    link.classList.remove('active', 'text-primary');
    link.classList.add('text-dark');

    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active', 'text-primary');
      link.classList.remove('text-dark');
    }
  });
}

// 載入 Header 與 Footer
loadComponent('header', '/components/header.html');
loadComponent('footer', '/components/footer.html');


// 載入 動畫效果
document.addEventListener('DOMContentLoaded', () => {
  const items = document.querySelectorAll('.animate-up');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        entry.target.style.transition = `opacity 0.8s ease-out ${delay * 0.2}s, transform 0.8s ease-out ${delay * 0.2}s`;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  items.forEach(item => observer.observe(item));
});


// 取得TOP按鈕
const topBtn = document.getElementById("topBtn");

// 滾動監聽
window.addEventListener("scroll", () => {
  if (window.scrollY > 200) { // 滾動超過 200px 顯示
    topBtn.classList.add("show");
  } else {
    topBtn.classList.remove("show");
  }
});

// 點擊回到頂部
topBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth" // 平滑滾動
  });
});

// 影片彈跳視窗
function showVideo(btn) {
  const url = btn.getAttribute('data-video');
  const overlay = document.getElementById('videoOverlay');
  const frame = document.getElementById('youtubeFrame');

  if (url) {
    frame.src = url + (url.includes('?') ? '&' : '?') + 'autoplay=1';
    overlay.style.display = 'flex';
  }
}

function hideVideo() {
  const overlay = document.getElementById('videoOverlay');
  const frame = document.getElementById('youtubeFrame');
  frame.src = '';
  overlay.style.display = 'none';
}

// 點擊遮罩空白處也能關閉
document.addEventListener('click', (e) => {
  const overlay = document.getElementById('videoOverlay');
  if (overlay && overlay.style.display === 'flex' && e.target === overlay) {
    hideVideo();
  }
});




// 圖片彈跳視窗
function showImage(btn) {
  const url = btn.getAttribute('data-image'); // 改成圖片來源
  const overlay = document.getElementById('imageOverlay');
  const img = document.getElementById('popupImage');

  if (url) {
    img.src = url;
    overlay.style.display = 'flex';
  }
}

function hideImage() {
  const overlay = document.getElementById('imageOverlay');
  const img = document.getElementById('popupImage');
  img.src = '';
  overlay.style.display = 'none';
}

// 點擊遮罩空白處也能關閉
document.addEventListener('click', (e) => {
  const overlay = document.getElementById('imageOverlay');
  if (overlay && overlay.style.display === 'flex' && e.target === overlay) {
    hideImage();
  }
});

document.addEventListener("DOMContentLoaded", function() {
    const navLinks = document.querySelectorAll(".category-nav .nav-link");
    const sections = document.querySelectorAll("section > .picbg .container .col > div[id]");
    const nav = document.querySelector(".category-nav");

    function setActive() {
        const navHeight = nav.offsetHeight;
        let scrollPos = window.scrollY + navHeight + 20; // 20px 額外空隙
        sections.forEach(section => {
            const top = section.offsetTop;
            const bottom = top + section.offsetHeight;
            const id = section.getAttribute("id");
            if(scrollPos >= top && scrollPos < bottom) {
                navLinks.forEach(link => {
                    link.classList.remove("active");
                    if(link.getAttribute("href") === "#" + id){
                        link.classList.add("active");
                    }
                });
            }
        });
    }

    // 滾動監聽
    window.addEventListener("scroll", setActive);
    setActive();

    // 點 nav 自動滾動
    navLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);
            const navHeight = nav.offsetHeight;
            const offsetTop = targetSection.offsetTop - navHeight - 20; // 20px 額外空隙
            window.scrollTo({
                top: offsetTop,
                behavior: "smooth"
            });
        });
    });
});
