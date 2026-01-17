// ============================================
// WHATSAPP CONFIGURATION
// ============================================

const whatsappConfig = {
    // Nomor WhatsApp tujuan (ganti dengan nomor Anda)
    phoneNumber: "6287882261578",
    
    // Pesan default
    defaultMessage: "Halo, saya ingin bertanya tentang produk Anda.",
    
    // Template pesan untuk produk
    productMessageTemplate: (product) => {
        return `Halo, saya ingin memesan produk dari *Colorful Shop*:\n\n` +
               `📦 *${product.name}*\n` +
               `💰 Harga: ${formatRupiah(product.price)}\n` +
               `📋 Kategori: ${product.category}\n` +
               `📝 Deskripsi: ${product.description}\n\n` +
               `Saya ingin memesan produk ini. Bisa tolong informasikan:\n` +
               `1. Total harga termasuk ongkir ke [lokasi saya]\n` +
               `2. Estimasi waktu pengiriman\n` +
               `3. Cara pembayaran\n\n` +
               `Terima kasih! 🙏`;
    },
    
    // Template pesan untuk multiple products
    cartMessageTemplate: (cartItems) => {
        let message = `Halo, saya ingin memesan beberapa produk dari *Colorful Shop*:\n\n`;
        
        cartItems.forEach((item, index) => {
            message += `${index + 1}. ${item.name} x${item.quantity} = ${formatRupiah(item.price * item.quantity)}\n`;
        });
        
        const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        message += `\n💰 *Total: ${formatRupiah(total)}*\n\n`;
        message += `Mohon informasikan total termasuk ongkir ke [lokasi saya] dan cara pembayaran. Terima kasih! 🙏`;
        
        return message;
    },
    
    // Cek apakah WhatsApp tersedia
    isWhatsAppAvailable: () => {
        // Deteksi mobile device
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        return isMobile;
    },
    
    // Generate WhatsApp URL
    generateURL: (message) => {
        const encodedMessage = encodeURIComponent(message);
        return `https://wa.me/${whatsappConfig.phoneNumber}?text=${encodedMessage}`;
    }
};

// Fungsi untuk kirim produk ke WhatsApp
function sendProductToWhatsApp(product) {
    const message = whatsappConfig.productMessageTemplate(product);
    const url = whatsappConfig.generateURL(message);
    
    // Tampilkan konfirmasi
    showAlert(`Membuka WhatsApp untuk memesan: ${product.name}`, 'success');
    
    // Delay sedikit sebelum buka WhatsApp
    setTimeout(() => {
        window.open(url, whatsappConfig.isWhatsAppAvailable() ? '_self' : '_blank');
    }, 1000);
}

// Fungsi untuk kirim cart ke WhatsApp
function sendCartToWhatsApp() {
    const cart = JSON.parse(localStorage.getItem('colorfulShopCart')) || [];
    
    if (cart.length === 0) {
        showAlert('Keranjang belanja kosong!', 'warning');
        return;
    }
    
    const message = whatsappConfig.cartMessageTemplate(cart);
    const url = whatsappConfig.generateURL(message);
    
    showAlert(`Mengirim ${cart.length} item ke WhatsApp`, 'success');
    
    setTimeout(() => {
        window.open(url, whatsappConfig.isWhatsAppAvailable() ? '_self' : '_blank');
    }, 1000);
}

// Export untuk penggunaan global
window.whatsappConfig = whatsappConfig;
window.sendProductToWhatsApp = sendProductToWhatsApp;
window.sendCartToWhatsApp = sendCartToWhatsApp;