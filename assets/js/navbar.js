// ============================================
// NAVBAR STICKY EFFECTS
// ============================================

class StickyNavbar {
    constructor() {
        this.navbar = null;
        this.spacer = null;
        this.lastScrollTop = 0;
        this.init();
    }
    
    init() {
        // Tunggu DOM siap
        document.addEventListener('DOMContentLoaded', () => {
            this.navbar = document.querySelector('.navbar');
            this.spacer = document.querySelector('.navbar-spacer');
            
            if (!this.navbar) return;
            
            this.setupEventListeners();
            this.updateNavbarState();
        });
    }
    
    setupEventListeners() {
        // Scroll effect
        window.addEventListener('scroll', () => this.handleScroll());
        
        // Resize effect
        window.addEventListener('resize', () => this.handleResize());
        
        // Click effect untuk mobile
        document.addEventListener('click', (e) => this.handleClick(e));
    }
    
    handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove scrolled class
        if (scrollTop > 50) {
            this.navbar.classList.add('scrolled');
            
            // Shrink effect
            if (scrollTop > 100) {
                this.navbar.classList.add('shrink');
                if (this.spacer) {
                    this.spacer.style.height = '60px';
                }
            }
            
            // Hide/show navbar saat scroll (opsional)
            if (scrollTop > 200) {
                if (scrollTop > this.lastScrollTop) {
                    // Scroll down - hide navbar
                    this.navbar.style.transform = 'translateY(-100%)';
                } else {
                    // Scroll up - show navbar
                    this.navbar.style.transform = 'translateY(0)';
                }
            }
        } else {
            this.navbar.classList.remove('scrolled', 'shrink');
            this.navbar.style.transform = 'translateY(0)';
            if (this.spacer) {
                this.spacer.style.height = '70px';
            }
        }
        
        this.lastScrollTop = scrollTop;
    }
    
    handleResize() {
        // Update navbar state saat resize
        this.updateNavbarState();
    }
    
    handleClick(e) {
        // Auto close navbar mobile saat link diklik
        if (window.innerWidth < 992) {
            const target = e.target.closest('.nav-link');
            if (target && this.navbar.classList.contains('show')) {
                const collapse = this.navbar.querySelector('.navbar-collapse');
                if (collapse) {
                    const bsCollapse = bootstrap.Collapse.getInstance(collapse);
                    if (bsCollapse) {
                        bsCollapse.hide();
                    }
                }
            }
        }
    }
    
    updateNavbarState() {
        // Update initial state
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 50) {
            this.navbar.classList.add('scrolled');
            if (scrollTop > 100) {
                this.navbar.classList.add('shrink');
                if (this.spacer) {
                    this.spacer.style.height = '60px';
                }
            }
        }
        
        // Update z-index untuk memastikan navbar di atas semua
        this.navbar.style.zIndex = '9999';
    }
    
    // Method untuk update cart count
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
}

// Initialize sticky navbar
const stickyNavbar = new StickyNavbar();

// Export untuk penggunaan global
window.stickyNavbar = stickyNavbar;