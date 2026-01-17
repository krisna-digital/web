// ============================================
// DATA PRODUK
// ============================================
const products = [
    { 
        id: 1, 
        name: "Cetak Banner", 
        price: 30000, 
        category: "Cetak", 
        image: "images/products/banner.jpg",
        description: "Cetak banner dengan kualitas tinggi dan bahan yang tahan lama.",
        rating: 4.5,
        stock: 1500
    },
    { 
        id: 2, 
        name: "X-Banner Standar", 
        price: 190000, 
        category: "Cetak", 
        image: "images/products/xbanner.jpg", 
        description: "X-Banner Standar dengan bahan berkualitas tinggi dan desain yang menarik.",
        rating: 4.8,
        stock: 8
    },
    { 
        id: 3, 
        name: "Sticker a3", 
        price: 20000, 
        category: "Cetak", 
        image: "images/products/stiker.jpg", 
        description: "Sticker A3 Vinyl atau Bontax dengan kualitas cetak tinggi dan bahan yang tahan lama. Langsung Cutting sesuai bentuk.",
        rating: 4.3,
        stock: 25
    },
    { 
        id: 4, 
        name: "Sticker a4", 
        price: 10000, 
        category: "Cetak", 
        image: "images/products/sticker-a4.png", 
        description: "Sticker A4 dengan kualitas cetak tinggi dan bahan yang tahan lama. Tanpa Cutting.",
        rating: 4.6,
        stock: 30
    },
    { 
        id: 5, 
        name: "ID Card", 
        price: 15000, 
        category: "Nametag", 
        image: "images/products/idcard.png", 
        description: "ID Card dengan desain custom dan bahan yang berkualitas.",
        rating: 4.4,
        stock: 12
    },
    { 
        id: 6, 
        name: "Nametag Resin", 
        price: 30000, 
        category: "Nametag", 
        image: "images/products/resin.jpg", 
        description: "Nametag resin dengan desain custom dan bahan yang berkualitas. Terdapat pilihan Magnet atau Peniti",
        rating: 4.7,
        stock: 45
    },
    { 
        id: 7, 
        name: "Nametag PVC", 
        price: 25000, 
        category: "Nametag", 
        image: "images/products/pvc.jpg", 
        description: "Nametag PVC dengan desain custom dan bahan yang berkualitas. Terdapat pilihan Magnet atau Peniti",
        rating: 4.5,
        stock: 10
    },
    { 
        id: 8, 
        name: "Nametag Grafir", 
        price: 35000, 
        category: "Nametag", 
        image: "images/products/grafir.jpg", 
        description: "Nametag grafir dengan desain custom dan bahan yang berkualitas. Terdapat pilihan Magnet atau Peniti",
        rating: 4.2,
        stock: 20
    },
    { 
        id: 9, 
        name: "Nametag Timbul", 
        price: 50000, 
        category: "Nametag", 
        image: "images/products/timbul.png", 
        description: "Nametag timbul dengan desain custom dan bahan yang berkualitas. Terdapat pilihan Magnet atau Peniti",
        rating: 4.6,
        stock: 18
    },
    { 
        id: 10, 
        name: "Fotocopy", 
        price: 350, 
        category: "Layanan", 
        image: "images/products/fotocopy.jpg", 
        description: "Layanan fotocopy dengan kualitas tinggi dan harga terjangkau.",
        rating: 4.8,
        stock: 50000
    },
    { 
        id: 11, 
        name: "Printing Dokumen", 
        price: 500, 
        category: "Layanan", 
        image: "images/products/print.jpg", 
        description: "Layanan printing start Rp.500 dengan kualitas tinggi dan harga terjangkau.",
        rating: 4.4,
        stock: 7
    },
    { 
        id: 12, 
        name: "Laminating A4-F4", 
        price: 5000, 
        category: "Layanan", 
        image: "images/products/laminating.jpg", 
        description: "Layanan laminating A4-F4 dengan kualitas tinggi dan harga terjangkau.",
        rating: 4.3,
        stock: 15
    },
    {
        id: 13,
        name: "Bingkai Foto 10R",
        price: 25000,
        category: "Fotografi",
        image: "images/products/bingkai-10r.jpg",
        description: "Bingkai foto 10R dengan desain elegan dan bahan berkualitas tinggi.",
        rating: 4.3,
        stock: 15
    },
    {
        id: 14,
        name: "Bingkai Foto 10RW",
        price: 30000,
        category: "Fotografi",
        image: "images/products/10rw.jpg",
        description: "Bingkai foto 10RW dengan desain elegan dan bahan berkualitas tinggi.",
        rating: 4.3,
        stock: 15
    },
    {
        id: 15,
        name: "Bingkai Foto 12RW",
        price: 60000,
        category: "Fotografi",
        image: "images/products/12rw.jpg",
        description: "Bingkai foto 12RW dengan desain elegan dan bahan berkualitas tinggi.",
        rating: 4.3,
        stock: 15
    },
    {
        id: 16,
        name: "Bingkai Foto 16RW",
        price: 100000,
        category: "Fotografi",
        image: "images/products/16rw.jpg",
        description: "Bingkai foto 16RW dengan desain elegan dan bahan berkualitas tinggi.",
        rating: 4.3,
        stock: 15
    },
    {
        id: 17,
        name: "Foto 10R",
        price: 15000,
        category: "Fotografi",
        image: "images/products/cetak-foto.jpg",
        description: "Foto 10R dengan bahan berkualitas tinggi.",
        rating: 4.3,
        stock: 15
    },
    {
        id: 18,
        name: "Foto 10RW",
        price: 20000,
        category: "Fotografi",
        image: "images/products/cetak-foto.jpg",
        description: "Foto 10RW dengan bahan berkualitas tinggi.",
        rating: 4.3,
        stock: 15
    },
    {
        id: 19,
        name: "Foto 12RW",
        price: 60000,
        category: "Fotografi",
        image: "images/products/cetak-foto.jpg",
        description: "Foto 12RW dengan bahan berkualitas tinggi.",
        rating: 4.3,
        stock: 15
    },
    {
        id: 20,
        name: "Foto 16RW",
        price: 150000,
        category: "Fotografi",
        image: "images/products/cetak-foto.jpg",
        description: "Foto 16RW dengan bahan berkualitas tinggi.",
        rating: 4.3,
        stock: 15
    },
    {
        id: 21,
        name: "Foto Polaroid",
        price: 2000,
        category: "Fotografi",
        image: "images/products/polaroid.jpg",
        description: "Foto Polaroid dengan bahan berkualitas tinggi. Minimal order 9pcs foto.",
        rating: 4.3,
        stock: 15
    },
    {
        id: 22,
        name: "Holder + Yoyo ID Card",
        price: 10000,
        category: "Nametag",
        image: "images/products/holder.jpg",
        description: "Holder + Yoyo ID Card dengan bahan berkualitas tinggi.",
        rating: 4.3,
        stock: 15
    },
    {
        id: 23 ,
        name: "Holder ID Card Kulit",
        price: 30000,
        category: "Nametag",
        image: "images/products/holder-kulit.jpg",
        description: "Holder ID Card Kulit dengan bahan berkualitas tinggi.",
        rating: 4.3,
        stock: 15
    },
    {
        id: 24,
        name: "Jilid Plastik",
        price: 5000,
        category: "Layanan",
        image: "images/products/jilid.jpg",
        description: "Jilid Plastik start Rp.5000.",
        rating: 4.3,
        stock: 15
    },
    {
        id: 25,
        name: "Stempel Flash",
        price: 80000,
        category: "Cetak",
        image: "images/products/stempel.jpg",
        description: "Stempel Flash dengan bahan berkualitas tinggi.",
        rating: 4.3,
        stock: 15
    },
    {
        id: 26,
        name: "Nota 1/4 Folio",
        price: 420000,
        category: "Cetak",
        image: "images/products/nota14.jpg",
        description: "Nota 1/4 Folio per rim dapat 40 buku. tanpa numerator",
        rating: 4.3,
        stock: 15
    },
    {
        id: 27 ,
        name: "Nota 1/2 Folio",
        price: 580000,
        category: "Cetak",
        image: "images/products/nota12.jpg",
        description: "Nota 1/2 Folio per rim dapat 26 buku. tanpa numerator",
        rating: 4.3,
        stock: 15
    },
    {
        id: 28,
        name: "Kertas HVS A4 70gsm",
        price: 60000,
        category: "ATK",
        image: "images/products/a4.jpg",
        description: "Kertas HVS A4 70gsm per rim dapat 500 lembar.",
        rating: 4.3,
        stock: 15
    },
    {
        id: 29,
        name: "Kertas HVS F4 70gsm",
        price: 65000,
        category: "ATK",
        image: "images/products/f4.jpg",
        description: "Kertas HVS F4 70gsm per rim dapat 500 lembar.",
        rating: 4.3,
        stock: 15
    },
    {
        id: 30,
        name: "Pulpen Gel",
        price: 30000,
        category: "ATK",
        image: "images/products/pulpen.png",
        description: "Pulpen Gel dengan tinta yang halus dan nyaman digunakan.",
        rating: 4.3,
        stock: 15
    },
    {
        id: 31,
        name: "Sticky Notes",
        price: 10000,
        category: "ATK",
        image: "images/products/sticky-note.jpg",
        description: "Sticky Notes dengan berbagai warna dan ukuran.",
        rating: 4.3,
        stock: 15
    },
    {
        id: 32,
        name: "Nametag B2",
        price: 5000,
        category: "Nametag",
        image: "images/products/b2.jpg",
        description: "Nametag B2 bening",
        rating: 4.3,
        stock: 15
    },
    {
        id: 33,
        name: "Kertas Buram F4",
        price: 5000,
        category: "ATK",
        image: "images/products/buram.jpg",
        description: "Kertas Buram F4 1 rim dapat 500 lembar.",
        rating: 4.3,
        stock: 15
    }
];

// ============================================
// DATA TIM
// ============================================
const teamMembers = [
    { 
        name: "Ahmad Wijaya", 
        position: "CEO & Founder", 
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        bio: "Pendiri Colorful Shop dengan pengalaman 10 tahun di industri e-commerce."
    },
    { 
        name: "Siti Nurhaliza", 
        position: "Marketing Director", 
        image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        bio: "Spesialis pemasaran digital dengan fokus pada customer experience."
    },
    { 
        name: "Budi Santoso", 
        position: "Product Manager", 
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        bio: "Bertanggung jawab atas kurasi dan pengembangan produk di Colorful Shop."
    },
    { 
        name: "Dewi Lestari", 
        position: "Customer Service Head", 
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        bio: "Memastikan setiap pelanggan mendapatkan pengalaman terbaik dalam berbelanja."
    }
];

// ============================================
// FUNGSI UMUM
// ============================================

/**
 * Format angka ke format mata uang Rupiah
 * @param {number} amount - Jumlah uang
 * @returns {string} - String yang sudah diformat
 */
function formatRupiah(amount) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(amount);
}

/**
 * Generate rating stars HTML
 * @param {number} rating - Rating 1-5
 * @returns {string} - HTML untuk rating stars
 */
function generateRatingStars(rating) {
    let stars = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 1; i <= 5; i++) {
        if (i <= fullStars) {
            stars += '<i class="bi bi-star-fill text-warning"></i>';
        } else if (i === fullStars + 1 && hasHalfStar) {
            stars += '<i class="bi bi-star-half text-warning"></i>';
        } else {
            stars += '<i class="bi bi-star text-warning"></i>';
        }
    }
    
    return stars + ` <span class="text-muted">(${rating})</span>`;
}

/**
 * Update stok produk
 * @param {number} productId - ID produk
 * @param {number} quantity - Jumlah yang dibeli
 */
function updateProductStock(productId, quantity) {
    const product = products.find(p => p.id === productId);
    if (product) {
        product.stock = Math.max(0, product.stock - quantity);
        return product.stock;
    }
    return 0;
}

/**
 * Tambah produk ke cart (simulasi)
 * @param {number} productId - ID produk
 */
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) {
        showAlert('Produk tidak ditemukan!', 'danger');
        return;
    }
    
    if (product.stock <= 0) {
        showAlert('Maaf, stok produk ini habis!', 'warning');
        return;
    }
    
    // Simpan cart di localStorage
    let cart = JSON.parse(localStorage.getItem('colorfulShopCart')) || [];
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: productId,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    localStorage.setItem('colorfulShopCart', JSON.stringify(cart));
    
    // Update stok
    updateProductStock(productId, 1);
    
    showAlert(`"${product.name}" berhasil ditambahkan ke keranjang!`, 'success');
    
    // Update UI jika di halaman produk
    if (window.location.pathname.includes('products.html')) {
        updateProductStockDisplay(productId);
    }
}

/**
 * Tampilkan alert
 * @param {string} message - Pesan alert
 * @param {string} type - Jenis alert (success, danger, warning, info)
 */
function showAlert(message, type = 'info') {
    // Hapus alert sebelumnya
    const existingAlert = document.querySelector('.alert-dismissible');
    if (existingAlert) {
        existingAlert.remove();
    }
    
    const alertHtml = `
        <div class="alert alert-${type} alert-dismissible fade show position-fixed top-0 end-0 m-3" style="z-index: 9999;" role="alert">
            ${message}
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
 * Update tampilan stok produk di UI
 * @param {number} productId - ID produk
 */
function updateProductStockDisplay(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        const stockBadge = document.querySelector(`[data-product-id="${productId}"] .stock-badge`);
        if (stockBadge) {
            stockBadge.textContent = `Stok: ${product.stock}`;
            stockBadge.className = `badge stock-badge ${product.stock > 0 ? 'bg-success' : 'bg-danger'}`;
        }
        
        const buyButton = document.querySelector(`[data-product-id="${productId}"] .btn-buy`);
        if (buyButton) {
            if (product.stock <= 0) {
                buyButton.disabled = true;
                buyButton.innerHTML = '<i class="bi bi-cart-x"></i> Habis';
                buyButton.classList.remove('btn-accent');
                buyButton.classList.add('btn-secondary');
            }
        }
    }
}

/**
 * Update active state di navbar berdasarkan halaman aktif
 */
function updateNavbarActiveState() {
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

/**
 * Setup event listeners umum
 */
/**
 * Setup event listeners umum
 */
function setupGeneralEventListeners() {
    // Event listener untuk tombol "Beli" - sekarang ke WhatsApp
    document.addEventListener('click', function(e) {
        const buyButton = e.target.closest('.btn-buy');
        if (buyButton) {
            e.preventDefault();
            const productId = parseInt(buyButton.dataset.productId);
            const product = products.find(p => p.id === productId);
            
            if (product) {
                // Redirect ke WhatsApp untuk pesan produk
                sendToWhatsApp(product);
            }
        }
    });
    
    // Event listener untuk search form (jika ada)
    const searchForm = document.getElementById('searchForm');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const searchInput = document.getElementById('searchInput');
            if (searchInput && searchInput.value.trim()) {
                window.location.href = `products.html?search=${encodeURIComponent(searchInput.value.trim())}`;
            }
        });
    }
    
    // Event listener untuk kontak form (akan di-handle di contact.js)
}

/**
 * Kirim produk ke WhatsApp
 * @param {Object} product - Produk yang akan dipesan
 */
function sendToWhatsApp(product) {
    // Nomor WhatsApp tujuan (GANTI DENGAN NOMOR ANDA)
    const phoneNumber = "6287882261578";
    
    // Format pesan WhatsApp
    const message = `Halo, saya ingin memesan produk dari toko Anda:\n\n` +
                   `📦 *${product.name}*\n` +
                    `Saya ingin memesan produk ini. Bisa tolong informasikan:\n` +
                   `1. Total harga termasuk ongkir\n` +
                   `2. Estimasi waktu pengiriman\n` +
                   `3. Cara pembayaran\n\n` +
                   `Terima kasih!`;
    
    // Encode pesan untuk URL
    const encodedMessage = encodeURIComponent(message);
    
    // Buat URL WhatsApp - PAKAI window.location.href
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    // Tampilkan konfirmasi dengan timer
    showAlert(`Membuka WhatsApp untuk memesan: ${product.name}`, 'success');
    
    // Delay 1 detik lalu redirect
    setTimeout(() => {
        // Gunakan window.location.href untuk redirect langsung
        window.location.href = whatsappURL;
    }, 1000);
}
// ============================================
// INISIALISASI SAAT DOKUMEN LOADED
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    updateNavbarActiveState();
    setupGeneralEventListeners();

    console.log('Krisna Digital - Website Toko Percetakan');
    console.log('Semua sistem berjalan dengan baik!');
    
    // Tampilkan jumlah item di cart
    const cart = JSON.parse(localStorage.getItem('colorfulShopCart')) || [];
    if (cart.length > 0) {
        const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
        console.log(`Anda memiliki ${cartCount} item di keranjang belanja.`);
    }
});
