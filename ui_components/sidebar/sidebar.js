// --- Funciones de Sidebar ---

// Función para verificar si estamos en móvil
function isMobile() {
    return window.innerWidth <= 768;
}

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const mainContainer = document.getElementById('main-container');
    const isExpanded = sidebar.classList.toggle('expanded');
    
    if (!isMobile()) {
        // Solo en escritorio, ajustar el margen del contenido
        mainContainer.classList.toggle('expanded', isExpanded);
    }
}

function updateSidebarActiveClass() {
    const path = window.location.pathname.split('/').pop();
    const currentUrl = path || "index.html"; // Asegura que "index.html" sea el valor por defecto

    document.querySelectorAll('#sidebar-menu .menu-item').forEach(item => {
        const link = item.querySelector('a');
        if (link && link.href) {
            const targetUrl = link.href.split('/').pop();
            
            if (targetUrl === currentUrl && targetUrl !== '#') {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        }
    });
}

function buildSidebarMenu(items) {
    const menu = document.getElementById('sidebar-menu');
    menu.innerHTML = ''; 

    items.forEach(item => {
        const li = document.createElement('li');
        li.classList.add('menu-item');

        const a = document.createElement('a');
        a.href = item.url;
        
        // Cerrar el sidebar si es un link interno en móvil
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
}

async function initSidebar() {
    // Cargar configuración de la barra lateral
    try {
        const response = await fetch('config/sidebar_config.json');
        if (!response.ok) throw new Error(`Error ${response.status}: No se pudo cargar config/sidebar_config.json.`);
        const sidebarItems = await response.json();
        
        buildSidebarMenu(sidebarItems);
        updateSidebarActiveClass(); 

        const toggleBtn = document.getElementById('toggle-btn');
        toggleBtn.addEventListener('click', toggleSidebar);

        const sidebar = document.getElementById('sidebar');
        const mainContainer = document.getElementById('main-container');

        // Forzar el estado colapsado inicial en desktop
        if (!isMobile()) {
            sidebar.classList.remove('expanded');
            mainContainer.classList.remove('expanded');
        } else {
            // En móvil, el sidebar debe estar colapsado (width: 0) por defecto
            sidebar.classList.remove('expanded'); 
            mainContainer.classList.remove('expanded');
        }

        // Asegurar el comportamiento responsive en resize
        window.addEventListener('resize', () => {
            if (!isMobile() && sidebar.classList.contains('expanded')) {
                mainContainer.classList.add('expanded');
            } else if (!isMobile() && !sidebar.classList.contains('expanded')) {
                mainContainer.classList.remove('expanded');
            } else if (isMobile()) {
                // En móvil, el margen del main siempre es 0
                mainContainer.classList.remove('expanded');
            }
        });

    } catch (error) {
        console.error("Error al inicializar el sidebar:", error);
        const sidebarMenu = document.getElementById('sidebar-menu');
        if(sidebarMenu) {
            sidebarMenu.innerHTML = `<li style="color: red; padding: 10px 20px;">Error al cargar menú.</li>`;
        }
    }
}

// Función para cargar el HTML del sidebar
async function loadSidebar() {
    try {
        const response = await fetch('ui_components/sidebar/sidebar.html');
        if (!response.ok) throw new Error('No se pudo cargar el HTML del sidebar.');
        const sidebarHTML = await response.text();
        document.getElementById('sidebar-container').innerHTML = sidebarHTML;
    } catch (error) {
        console.error('Error al cargar el sidebar:', error);
        document.getElementById('sidebar-container').innerHTML = '<p>Error al cargar la barra lateral.</p>';
    }
}
