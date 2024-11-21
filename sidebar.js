// sidebar.js
class Sidebar {
    constructor(options = {}) {
        this.options = {
            containerId: 'sidebarContainer',
            profileImage: '/images/init.jpg',
            homeUrl: 'https://alj032.github.io/#',
            menuItems: [
                { id: 'home', icon: 'fa-home', text: 'HOME', link: '#' },
                { id: 'blog', icon: 'fa-blog', text: 'BLOG', link: '#blog' },
                { id: 'contact', icon: 'fa-envelope', text: 'CONTACT', link: '#contact' }
            ],
            ...options
        };
        
        this.init();
    }

    createStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .sidebar {
                width: 120px;
                background: #111;
                position: fixed;
                height: 100%;
                transition: 0.3s;
                z-index: 1000;
            }

            .sidebar-profile {
                display: block;
                padding: 8px;
                cursor: pointer;
                transition: opacity 0.3s;
            }

            .sidebar-profile:hover {
                opacity: 0.8;
            }

            .sidebar-profile img {
                width: 100%;
                border-radius: 8px;
            }

            .sidebar-item {
                display: block;
                color: white;
                padding: 16px 0;
                text-align: center;
                text-decoration: none;
                transition: 0.3s;
            }

            .sidebar-item:hover {
                background-color: #000;
            }

            .sidebar-item i {
                font-size: 24px;
                display: block;
                margin-bottom: 8px;
            }

            .sidebar-item p {
                margin: 0;
                font-size: 12px;
            }

            .mobile-nav {
                display: none;
                position: fixed;
                top: 0;
                width: 100%;
                z-index: 999;
            }

            .mobile-nav-content {
                background: black;
                display: flex;
                justify-content: space-around;
            }

            .mobile-nav-item {
                color: white;
                text-decoration: none;
                padding: 12px;
                flex: 1;
                text-align: center;
            }

            @media only screen and (max-width: 600px) {
                .sidebar {
                    display: none;
                }

                .mobile-nav {
                    display: block;
                }

                #main {
                    margin-left: 0 !important;
                    padding-top: 50px;
                }
            }
        `;
        document.head.appendChild(style);
    }

    createMobileNav() {
        const mobileNav = document.createElement('div');
        mobileNav.className = 'mobile-nav';
        
        const navContent = document.createElement('div');
        navContent.className = 'mobile-nav-content';
        
        this.options.menuItems.forEach(item => {
            const link = document.createElement('a');
            link.href = item.link;
            link.className = 'mobile-nav-item';
            link.textContent = item.text;
            navContent.appendChild(link);
        });
        
        mobileNav.appendChild(navContent);
        document.body.appendChild(mobileNav);
    }

    createSidebar() {
        const sidebar = document.createElement('nav');
        sidebar.className = 'sidebar';

        // Add clickable profile image
        if (this.options.profileImage) {
            const profileLink = document.createElement('a');
            profileLink.href = this.options.homeUrl;
            profileLink.className = 'sidebar-profile';
            
            const img = document.createElement('img');
            img.src = this.options.profileImage;
            img.alt = 'Profile';
            
            profileLink.appendChild(img);
            sidebar.appendChild(profileLink);
        }

        // Add menu items
        this.options.menuItems.forEach(item => {
            const link = document.createElement('a');
            link.href = item.link;
            link.className = 'sidebar-item';
            
            link.innerHTML = `
                <i class="fa ${item.icon} w3-xxlarge"></i>
                <p>${item.text}</p>
            `;
            
            sidebar.appendChild(link);
        });

        return sidebar;
    }

    init() {
        // Add required styles
        this.createStyles();

        // Create and append sidebar
        const container = document.getElementById(this.options.containerId);
        if (!container) {
            console.error(`Container with id '${this.options.containerId}' not found`);
            return;
        }
        
        container.appendChild(this.createSidebar());
        
        // Create mobile navigation
        this.createMobileNav();

        // Adjust main content margin
        const main = document.getElementById('main');
        if (main) {
            main.style.marginLeft = '120px';
        }
    }

    // Method to update active menu item
    setActiveItem(id) {
        document.querySelectorAll('.sidebar-item').forEach(item => {
            item.classList.remove('w3-black');
        });
        document.querySelector(`.sidebar-item[href="#${id}"]`)?.classList.add('w3-black');
    }
}