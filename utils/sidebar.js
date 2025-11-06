document.addEventListener('DOMContentLoaded', () => {
    fetch('sidebar.html')
        .then(response => response.text())
        .then(data => {
            document.body.insertAdjacentHTML('afterbegin', data);
            initSidebar();
        });
});

function initSidebar() {
    const sidebar = document.getElementById('sidebar');
    const mainContainer = document.getElementById('main-container');
    const toggleBtn = document.getElementById('toggle-btn');

    toggleBtn.addEventListener('click', toggleSidebar);

    function isMobile() {
        return window.innerWidth <= 768;
    }

    function toggleSidebar() {
        const isExpanded = sidebar.classList.toggle('expanded');
        if (!isMobile()) {
            mainContainer.classList.toggle('expanded', isExpanded);
        }
    }

    function updateSidebarActiveClass() {
        const path = window.location.pathname.split('/').pop();
        const currentUrl = path || "index.html";

        document.querySelectorAll('#sidebar-menu .menu-item').forEach(item => {
            const link = item.querySelector('a');
            if (link && link.href) {
                const targetUrl = link.href.split('/').pop();
                if (targetUrl === currentUrl) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            }
        });
    }

    fetch('config/sidebar_config.json')
        .then(response => response.json())
        .then(sidebarItems => {
            const menu = document.getElementById('sidebar-menu');
            menu.innerHTML = '';
            sidebarItems.forEach(item => {
                const li = document.createElement('li');
                li.classList.add('menu-item');
                const a = document.createElement('a');
                a.href = item.url;
                if (item.url.startsWith('#') || item.url.includes('.html')) {
                    a.onclick = (e) => {
                        if (isMobile()) {
                            toggleSidebar();
                        }
                    };
                }
                a.innerHTML = `
                    <i class="fa-solid ${item.icon}"></i>
                    <span>${item.label}</span>
                `;
                li.appendChild(a);
                menu.appendChild(li);
            });
            updateSidebarActiveClass();
        })
        .catch(error => {
            console.error("Error al inicializar el sidebar:", error);
            document.getElementById('sidebar-menu').innerHTML = `<li style="color: red; padding: 10px 20px;">Error al cargar menú.</li>`;
        });

    if (!isMobile()) {
        sidebar.classList.remove('expanded');
        mainContainer.classList.remove('expanded');
    } else {
        sidebar.classList.remove('expanded');
        mainContainer.classList.remove('expanded');
    }

    window.addEventListener('resize', () => {
        if (!isMobile() && sidebar.classList.contains('expanded')) {
            mainContainer.classList.add('expanded');
        } else if (!isMobile() && !sidebar.classList.contains('expanded')) {
            mainContainer.classList.remove('expanded');
        } else if (isMobile()) {
            mainContainer.classList.remove('expanded');
        }
    });
}