// Navbar Fixed Functionality
class NavbarFixed {
    constructor() {
        this.navbar = null;
        this.spacer = null;
        this.init();
    }
    
    init() {
        // Tunggu DOM siap
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }
    
    setup() {
        // Cari navbar dan spacer
        this.navbar = document.querySelector('.navbar.fixed-top');
        this.spacer = document.getElementById('navbar-spacer');
        
        if (!this.navbar) {
            console.warn('Navbar dengan class .fixed-top tidak ditemukan');
            return;
        }
        
        // Setup event listeners
        this.setupEventListeners();
        
        // Update initial state
        this.updateNavbarState();
        
        // Update cart count
        this.updateCartCount();
        
        // Update active link
        this.updateActiveLink();
    }
    
    setupEventListeners() {
        // Scroll event
        window.addEventListener('scroll', () => this.handleScroll());
        
        // Resize event
        window.addEventListener('resize', () => this.handleResize());
        
        // Click event untuk mobile navbar close
        document.addEventListener('click', (e) => this.handleClick(e));
    }
    
    handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove scrolled class
        if (scrollTop > 10) {
            this.navbar.classList.add('navbar-scrolled');
            if (this.spacer) {
                this.spacer.style.height = '70px';
            }
        } else {
            this.navbar.classList.remove('navbar-scrolled');
            if (this.spacer) {
                this.spacer.style.height = '80px';
            }
        }
        
        // Optional: Hide navbar saat scroll down, show saat scroll up
        if (scrollTop > 100) {
            const delta = scrollTop - (this.lastScrollTop || 0);
            
            if (delta > 5) {
                // Scroll down
                this.navbar.style.transform = 'translateY(-100%)';
                this.navbar.style.transition = 'transform 0.3s ease';
            } else if (delta < -5) {
                // Scroll up
                this.navbar.style.transform = 'translateY(0)';
                this.navbar.style.transition = 'transform 0.3s ease';
            }
        } else {
            this.navbar.style.transform = 'translateY(0)';
        }
        
        this.lastScrollTop = scrollTop;
    }
    
    handleResize() {
        // Update spacer height berdasarkan ukuran navbar
        this.updateSpacerHeight();
    }
    
    handleClick(e) {
        // Auto close navbar mobile saat link diklik
        if (window.innerWidth < 992) {
            const navLink = e.target.closest('.nav-link');
            if (navLink) {
                const navbarCollapse = this.navbar.querySelector('.navbar-collapse');
                if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                    const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                    if (bsCollapse) {
                        bsCollapse.hide();
                    }
                }
            }
        }
    }
    
    updateNavbarState() {
        // Update initial scroll state
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > 10) {
            this.navbar.classList.add('navbar-scrolled');
        }
        
        // Update z-index
        this.navbar.style.zIndex = '1030';
    }
    
    updateSpacerHeight() {
        if (!this.spacer) return;
        
        const navbarHeight = this.navbar.offsetHeight;
        this.spacer.style.height = navbarHeight + 'px';
    }
    
    updateCartCount() {
        const cartCountElement = document.getElementById('cartCount');
        if (cartCountElement) {
            const cart = JSON.parse(localStorage.getItem('colorfulShopCart')) || [];
            const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
            
            if (totalItems > 0) {
                cartCountElement.textContent = totalItems;
                cartCountElement.style.display = 'block';
            } else {
                cartCountElement.style.display = 'none';
            }
        }
    }
    
    updateActiveLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const linkPage = link.getAttribute('href');
            
            if (linkPage === currentPage || 
                (currentPage === '' && linkPage === 'index.html') ||
                (currentPage === 'index.html' && linkPage === '')) {
                link.classList.add('active');
            }
        });
    }
}

// Initialize navbar fixed
const navbarFixed = new NavbarFixed();

// Export untuk global access
window.navbarFixed = navbarFixed;