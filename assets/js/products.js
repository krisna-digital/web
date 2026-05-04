// ============================================
// PAGINATION VARIABLES
// ============================================
let currentPage = 1;
let productsPerPage = 8; // Jumlah produk per halaman
let totalPages = 1;
let filteredProducts = [];

// ============================================
// FUNGSI KHUSUS HALAMAN PRODUK
// ============================================

/**
 * Render produk ke dalam container
 * @param {Array} products - Array produk
 * @param {HTMLElement} container - Container untuk menampung produk
 * @param {number} page - Halaman yang akan ditampilkan
 */
function renderProducts(products, container, page = 1) {
    if (!container) return;
    
    // Simpan filtered products untuk pagination
    filteredProducts = products;
    
    // Hitung total halaman
    totalPages = Math.ceil(products.length / productsPerPage);
    currentPage = Math.min(Math.max(page, 1), totalPages);
    
    // Hitung produk yang akan ditampilkan
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const paginatedProducts = products.slice(startIndex, endIndex);
    
    if (paginatedProducts.length === 0) {
        container.innerHTML = `
            <div class="col-12 text-center py-5">
                <i class="bi bi-search display-1 text-muted mb-3"></i>
                <h3>Produk tidak ditemukan</h3>
                <p>Coba gunakan kata kunci lain atau pilih kategori yang berbeda.</p>
                <button class="btn btn-primary mt-3" onclick="clearFilters()">
                    <i class="bi bi-arrow-clockwise"></i> Reset Filter
                </button>
            </div>
        `;
        updatePagination();
        updateProductCounter(products.length);
        return;
    }
    
    container.innerHTML = paginatedProducts.map(product => `
        <div class="col-3 col-md-3 mb-4" data-product-id="${product.id}">
            <div class="card product-card shadow-sm h-100">
                <div class="position-relative">
                    <img src="${product.image}" class="product-img" alt="${product.name}">
                    <span class="badge position-absolute top-0 end-0 m-2 ${product.category === 'Cetak' ? 'bg-primary' : product.category === 'Nametag' ? 'bg-primary' : product.category === 'Layanan' ? 'bg-success' : product.category === 'Fotografi' ? 'bg-warning' : 'bg-info'}">
                        ${product.category}
                    </span>
                    ${product.stock <= 5 && product.stock > 0 ? 
                        `<span class="badge bg-warning position-absolute top-0 start-0 m-2">Hampir Habis</span>` : ''}
                    ${product.stock <= 0 ? 
                        `<span class="badge bg-danger position-absolute top-0 start-0 m-2">Habis</span>` : ''}
                </div>
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${product.name}</h5>
                    <div class="mb-2">
                        ${generateRatingStars(product.rating)}
                    </div>
                    <p class="card-text flex-grow-1">${product.description}</p>
                    <div class="mt-3">
                        <span class="badge stock-badge ${product.stock > 0 ? 'bg-success' : 'bg-danger'}">
                            Stok: ${product.stock}
                        </span>
                    </div>
                    <div class="d-flex justify-content-between align-items-center mt-auto pt-3">
                        
                    </div>
                </div>
            </div>
        </div>
    `).join('');
    
    updatePagination();
    updateProductCounter(products.length, startIndex + 1, Math.min(endIndex, products.length));
    
    // Scroll ke atas saat ganti halaman
    if (page !== 1) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

/**
 * Tampilkan alert untuk konfirmasi WhatsApp
 * @param {string} message - Pesan alert
 * @param {string} type - Jenis alert (success, danger, warning, info)
 */
function showAlert(message, type = 'info') {
    // Hapus alert sebelumnya
    const existingAlert = document.querySelector('.alert-dismissible');
    if (existingAlert) {
        existingAlert.remove();
    }
    
    // Icon berdasarkan type
    const icons = {
        'success': 'bi-check-circle',
        'danger': 'bi-exclamation-triangle',
        'warning': 'bi-exclamation-circle',
        'info': 'bi-info-circle'
    };
    
    const alertHtml = `
        <div class="alert alert-${type} alert-dismissible fade show position-fixed top-0 end-0 m-3" style="z-index: 9999; max-width: 400px;" role="alert">
            <div class="d-flex align-items-center">
                <i class="bi ${icons[type] || 'bi-info-circle'} fs-4 me-2"></i>
                <div>
                    <div class="fw-semibold">${message}</div>
                    ${type === 'success' ? '<small class="d-block mt-1">Membuka aplikasi WhatsApp...</small>' : ''}
                </div>
            </div>
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', alertHtml);
    
    // Auto dismiss setelah 3 detik
    setTimeout(() => {
        const alert = document.querySelector('.alert-dismissible');
        if (alert) {
            const bsAlert = new bootstrap.Alert(alert);
            bsAlert.close();
        }
    }, 3000);
}

/**
 * Filter produk berdasarkan kriteria
 * @param {string} searchTerm - Kata kunci pencarian
 * @param {string} category - Kategori yang dipilih
 * @param {string} sortBy - Urutan sorting
 * @returns {Array} - Produk yang sudah difilter
 */
function filterProducts(searchTerm = '', category = '', sortBy = 'default') {
    let filtered = [...products];
    
    // Filter berdasarkan pencarian
    if (searchTerm) {
        const term = searchTerm.toLowerCase();
        filtered = filtered.filter(product => 
            product.name.toLowerCase().includes(term) || 
            product.description.toLowerCase().includes(term) ||
            product.category.toLowerCase().includes(term)
        );
    }
    
    // Filter berdasarkan kategori
    if (category && category !== 'all') {
        filtered = filtered.filter(product => product.category === category);
    }
    
    // Sorting
    switch(sortBy) {
        case 'price-low':
            filtered.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filtered.sort((a, b) => b.price - a.price);
            break;
        case 'name-asc':
            filtered.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'name-desc':
            filtered.sort((a, b) => b.name.localeCompare(a.name));
            break;
        case 'rating':
            filtered.sort((a, b) => b.rating - a.rating);
            break;
        default:
            // Default sorting (id ascending)
            filtered.sort((a, b) => a.id - b.id);
    }
    
    return filtered;
}

/**
 * Update counter produk
 * @param {number} total - Jumlah total produk
 * @param {number} start - Produk mulai dari
 * @param {number} end - Produk sampai
 */
function updateProductCounter(total, start = 1, end = productsPerPage) {
    const counterElement = document.getElementById('productCounter');
    if (counterElement) {
        if (total === 0) {
            counterElement.textContent = `Tidak ada produk ditemukan`;
        } else {
            counterElement.textContent = `Menampilkan ${start}-${end} dari ${total} produk`;
            
            // Tambahkan info halaman jika lebih dari 1 halaman
            if (totalPages > 1) {
                const pageInfo = document.getElementById('pageInfo') || (() => {
                    const info = document.createElement('small');
                    info.id = 'pageInfo';
                    info.className = 'text-muted ms-2';
                    counterElement.parentNode.appendChild(info);
                    return info;
                })();
                
                pageInfo.textContent = `(Halaman ${currentPage} dari ${totalPages})`;
            } else {
                const pageInfo = document.getElementById('pageInfo');
                if (pageInfo) pageInfo.remove();
            }
        }
    }
}

/**
 * Update tampilan pagination
 */
function updatePagination() {
    // Hapus pagination lama di HTML
    const oldPagination = document.querySelector('.pagination');
    if (oldPagination) {
        oldPagination.parentElement.remove();
    }
    
    // Buat container baru untuk pagination dinamis
    const paginationContainer = document.createElement('div');
    paginationContainer.className = 'd-flex justify-content-center mt-5';
    
    if (totalPages <= 1) {
        // Jika hanya 1 halaman, jangan tampilkan pagination
        paginationContainer.innerHTML = '';
        const existingContainer = document.getElementById('dynamicPagination');
        if (existingContainer) existingContainer.remove();
        return;
    }
    
    let paginationHTML = `
        <nav aria-label="Page navigation">
            <ul class="pagination">
    `;
    
    // Previous button
    paginationHTML += `
        <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
            <a class="page-link" href="#" onclick="goToPage(${currentPage - 1}); return false;" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
            </a>
        </li>
    `;
    
    // Page numbers
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    // Adjust start page if we're near the end
    if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    // First page
    if (startPage > 1) {
        paginationHTML += `
            <li class="page-item">
                <a class="page-link" href="#" onclick="goToPage(1); return false;">1</a>
            </li>
            ${startPage > 2 ? '<li class="page-item disabled"><span class="page-link">...</span></li>' : ''}
        `;
    }
    
    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
        paginationHTML += `
            <li class="page-item ${i === currentPage ? 'active' : ''}">
                <a class="page-link" href="#" onclick="goToPage(${i}); return false;">${i}</a>
            </li>
        `;
    }
    
    // Last page
    if (endPage < totalPages) {
        paginationHTML += `
            ${endPage < totalPages - 1 ? '<li class="page-item disabled"><span class="page-link">...</span></li>' : ''}
            <li class="page-item">
                <a class="page-link" href="#" onclick="goToPage(${totalPages}); return false;">${totalPages}</a>
            </li>
        `;
    }
    
    // Next button
    paginationHTML += `
        <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
            <a class="page-link" href="#" onclick="goToPage(${currentPage + 1}); return false;" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
            </a>
        </li>
    `;
    
    paginationHTML += `
            </ul>
        </nav>
    `;
    
    paginationContainer.innerHTML = paginationHTML;
    paginationContainer.id = 'dynamicPagination';
    
    // Tempatkan pagination setelah products container
    const productsContainer = document.getElementById('productsContainer');
    if (productsContainer && productsContainer.parentNode) {
        productsContainer.parentNode.insertBefore(paginationContainer, productsContainer.nextSibling);
    }
    
    // Update URL dengan parameter page
    updateURLWithPageParam();
}

/**
 * Pergi ke halaman tertentu
 * @param {number} page - Nomor halaman
 */
function goToPage(page) {
    if (page < 1 || page > totalPages || page === currentPage) return;
    
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const sortFilter = document.getElementById('sortFilter');
    const productsContainer = document.getElementById('productsContainer');
    
    if (!searchInput || !categoryFilter || !sortFilter || !productsContainer) return;
    
    const filteredProducts = filterProducts(
        searchInput.value,
        categoryFilter.value,
        sortFilter.value
    );
    
    renderProducts(filteredProducts, productsContainer, page);
}

/**
 * Clear semua filter
 */
function clearFilters() {
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const sortFilter = document.getElementById('sortFilter');
    
    if (searchInput) searchInput.value = '';
    if (categoryFilter) categoryFilter.value = 'all';
    if (sortFilter) sortFilter.value = 'default';
    
    // Reset ke halaman 1
    currentPage = 1;
    
    handleFilterChange();
}

/**
 * Handle perubahan filter
 */
function handleFilterChange() {
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const sortFilter = document.getElementById('sortFilter');
    const productsContainer = document.getElementById('productsContainer');
    
    if (!searchInput || !categoryFilter || !sortFilter || !productsContainer) return;
    
    // Reset ke halaman 1 saat filter berubah
    currentPage = 1;
    
    const filteredProducts = filterProducts(
        searchInput.value,
        categoryFilter.value,
        sortFilter.value
    );
    
    renderProducts(filteredProducts, productsContainer, 1);
    
    // Simpan filter ke URL
    updateURLWithPageParam();
}

/**
 * Update URL dengan parameter filter dan page
 */
function updateURLWithPageParam() {
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const sortFilter = document.getElementById('sortFilter');
    
    const params = new URLSearchParams();
    
    if (searchInput && searchInput.value) {
        params.set('search', searchInput.value);
    }
    
    if (categoryFilter && categoryFilter.value !== 'all') {
        params.set('category', categoryFilter.value);
    }
    
    if (sortFilter && sortFilter.value !== 'default') {
        params.set('sort', sortFilter.value);
    }
    
    if (currentPage > 1) {
        params.set('page', currentPage);
    }
    
    const newUrl = params.toString() ? `products.html?${params.toString()}` : 'products.html';
    window.history.replaceState({}, '', newUrl);
}

/**
 * Load filter dari URL
 */
function loadFiltersFromURL() {
    const params = new URLSearchParams(window.location.search);
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const sortFilter = document.getElementById('sortFilter');
    
    if (params.has('search') && searchInput) {
        searchInput.value = params.get('search');
    }
    
    if (params.has('category') && categoryFilter) {
        categoryFilter.value = params.get('category');
    }
    
    if (params.has('sort') && sortFilter) {
        sortFilter.value = params.get('sort');
    }
    
    // Load page
    if (params.has('page')) {
        const page = parseInt(params.get('page'));
        if (!isNaN(page) && page > 0) {
            currentPage = page;
        }
    }
}

/**
 * Setup event listeners untuk halaman produk
 */
function setupProductPageEventListeners() {
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const sortFilter = document.getElementById('sortFilter');
    const clearFilterBtn = document.getElementById('clearFilterBtn');
    const searchButton = document.querySelector('#searchInput + .btn');
    
    if (searchInput) {
        // Debounce search input
        let searchTimeout;
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(handleFilterChange, 300);
        });
    }
    
    if (searchButton) {
        searchButton.addEventListener('click', handleFilterChange);
    }
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', handleFilterChange);
    }
    
    if (sortFilter) {
        sortFilter.addEventListener('change', handleFilterChange);
    }
    
    if (clearFilterBtn) {
        clearFilterBtn.addEventListener('click', clearFilters);
    }
}

/**
 * Setup keyboard navigation untuk pagination
 */
function setupKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        // Hanya aktif jika user tidak sedang mengetik di input
        const activeElement = document.activeElement;
        if (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA') {
            return;
        }
        
        // Left arrow - previous page
        if (e.key === 'ArrowLeft' && currentPage > 1) {
            e.preventDefault();
            goToPage(currentPage - 1);
        }
        
        // Right arrow - next page
        if (e.key === 'ArrowRight' && currentPage < totalPages) {
            e.preventDefault();
            goToPage(currentPage + 1);
        }
    });
}

// ============================================
// INISIALISASI HALAMAN PRODUK
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Load filter dari URL
    loadFiltersFromURL();
    
    // Setup event listeners
    setupProductPageEventListeners();
    
    // Setup keyboard navigation
    setupKeyboardNavigation();
    
    // Render produk awal
    const productsContainer = document.getElementById('productsContainer');
    if (productsContainer) {
        const searchInput = document.getElementById('searchInput');
        const categoryFilter = document.getElementById('categoryFilter');
        const sortFilter = document.getElementById('sortFilter');
        
        const filteredProducts = filterProducts(
            searchInput ? searchInput.value : '',
            categoryFilter ? categoryFilter.value : 'all',
            sortFilter ? sortFilter.value : 'default'
        );
        
        renderProducts(filteredProducts, productsContainer, currentPage);
    }
    
    console.log('Halaman produk berhasil diinisialisasi');
});