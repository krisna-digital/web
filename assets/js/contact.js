// ============================================
// CONTACT PAGE FUNCTIONALITY
// ============================================

/**
 * Validasi form kontak
 */
function validateContactForm(formData) {
    const errors = [];
    
    // Validasi nama
    if (!formData.name || formData.name.trim().length < 3) {
        errors.push({
            field: 'name',
            message: 'Nama harus minimal 3 karakter'
        });
    }
    
    // Validasi email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
        errors.push({
            field: 'email',
            message: 'Email tidak valid'
        });
    }
    
    // Validasi subjek
    if (!formData.subject || formData.subject.trim().length < 5) {
        errors.push({
            field: 'subject',
            message: 'Subjek harus minimal 5 karakter'
        });
    }
    
    // Validasi pesan
    if (!formData.message || formData.message.trim().length < 10) {
        errors.push({
            field: 'message',
            message: 'Pesan harus minimal 10 karakter'
        });
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

/**
 * Tampilkan error validasi
 */
function showValidationErrors(errors) {
    // Reset semua error sebelumnya
    document.querySelectorAll('.is-invalid').forEach(el => {
        el.classList.remove('is-invalid');
    });
    
    document.querySelectorAll('.invalid-feedback').forEach(el => {
        el.remove();
    });
    
    // Tampilkan error baru
    errors.forEach(error => {
        const field = document.getElementById(error.field);
        if (field) {
            field.classList.add('is-invalid');
            
            const errorDiv = document.createElement('div');
            errorDiv.className = 'invalid-feedback';
            errorDiv.textContent = error.message;
            
            field.parentNode.appendChild(errorDiv);
        }
    });
}

/**
 * Kirim form kontak
 */
function submitContactForm(formData) {
    // Simpan ke localStorage
    const submissions = JSON.parse(localStorage.getItem('contactSubmissions')) || [];
    const submissionId = Date.now();
    
    submissions.push({
        id: submissionId,
        ...formData,
        status: 'pending',
        timestamp: new Date().toISOString()
    });
    
    localStorage.setItem('contactSubmissions', JSON.stringify(submissions));
    
    // Kirim email notifikasi (simulasi)
    console.log('Mengirim email notifikasi untuk submission:', submissionId);
    
    // Tampilkan konfirmasi
    const confirmationMessage = `
        <div class="alert alert-success alert-dismissible fade show" role="alert">
            <h4 class="alert-heading"><i class="bi bi-check-circle"></i> Pesan Terkirim!</h4>
            <p>Terima kasih <strong>${formData.name}</strong>, pesan Anda telah berhasil dikirim.</p>
            <hr>
            <p class="mb-0">
                <small>
                    ID Referensi: <code>CS-${submissionId.toString().slice(-6)}</code><br>
                    Kami akan menghubungi Anda dalam 1-2 hari kerja.
                </small>
            </p>
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    `;
    
    const contactForm = document.getElementById('contactForm');
    contactForm.insertAdjacentHTML('beforebegin', confirmationMessage);
    
    // Reset form
    contactForm.reset();
    
    // Scroll ke atas untuk melihat konfirmasi
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Setup form kontak
 */
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Ambil data form
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            subject: document.getElementById('subject').value.trim(),
            message: document.getElementById('message').value.trim()
        };
        
        // Validasi
        const validation = validateContactForm(formData);
        
        if (!validation.isValid) {
            showValidationErrors(validation.errors);
            return;
        }
        
        // Tampilkan loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Mengirim...';
        submitBtn.disabled = true;
        
        // Simulasi pengiriman (2 detik delay)
        setTimeout(() => {
            submitContactForm(formData);
            
            // Reset button state
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

/**
 * Setup quick contact buttons
 */
function setupQuickContact() {
    // WhatsApp button
    const whatsappBtn = document.getElementById('whatsappBtn');
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', function() {
            const phone = '6287882261578'; 
            const defaultMessage = 'Halo Krisna Digital, saya ingin bertanya tentang produk Anda.';
            const message = prompt('Masukkan pesan Anda untuk WhatsApp:', defaultMessage);
            
            if (message) {
                const encodedMessage = encodeURIComponent(message);
                const url = `https://wa.me/${phone}?text=${encodedMessage}`;
                window.open(url, '_blank');
            }
        });
    }
    
    // Email button
    const emailBtn = document.getElementById('emailBtn');
    if (emailBtn) {
        emailBtn.addEventListener('click', function() {
            const email = 'krisna.kusumaaaa@gmail.com';
            const defaultSubject = 'Pertanyaan tentang Krisna Digital';
            const defaultBody = 'Halo Krisna Digital,\n\nSaya ingin bertanya tentang:\n\n';
            
            const subject = prompt('Subjek email:', defaultSubject);
            if (subject) {
                const body = prompt('Isi pesan:', defaultBody);
                if (body) {
                    const url = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                    window.location.href = url;
                }
            }
        });
    }
    
    // Call button
    const callBtn = document.getElementById('callBtn');
    if (callBtn) {
        callBtn.addEventListener('click', function() {
            if (confirm('Apakah Anda ingin menghubungi Customer Service kami?')) {
                window.location.href = 'tel:+622112345678';
            }
        });
    }
}

/**
 * Load jam operasional
 */
function loadBusinessHours() {
    const businessHours = [
        { day: 'Senin - Jumat', hours: '08:00 - 17:00 WIB' },
        { day: 'Sabtu', hours: '09:00 - 15:00 WIB' },
        { day: 'Minggu', hours: '10:00 - 14:00 WIB' },
        { day: 'Hari Libur Nasional', hours: 'Tutup' }
    ];
    
    const hoursList = document.getElementById('businessHoursList');
    if (hoursList) {
        hoursList.innerHTML = businessHours.map(item => `
            <div class="d-flex justify-content-between align-items-center mb-2 pb-2 border-bottom">
                <span>${item.day}</span>
                <span class="badge bg-primary">${item.hours}</span>
            </div>
        `).join('');
    }
}

/**
 * Setup peta lokasi
 */
function setupLocationMap() {
    const mapElement = document.getElementById('locationMap');
    if (!mapElement) return;
    
    // Create interactive map placeholder
    mapElement.innerHTML = `
        <div class="position-relative h-100">
            <div class="map-placeholder h-100 d-flex flex-column align-items-center justify-content-center p-4">
                <div class="text-center mb-4">
                    <i class="bi bi-geo-alt-fill display-1 text-primary mb-3"></i>
                    <h3 class="mb-2">Lokasi Toko Utama</h3>
                    <p class="text-muted">Jl. Merdeka No. 123, Jakarta Pusat</p>
                </div>
                
                <div class="d-flex flex-wrap justify-content-center gap-2">
                    <a href="https://maps.google.com/?q=Jl.+Merdeka+No.+123,+Jakarta+Pusat" 
                       target="_blank" 
                       class="btn btn-primary">
                        <i class="bi bi-google me-1"></i> Google Maps
                    </a>
                    <a href="https://www.waze.com/ul?q=Jl.+Merdeka+No.+123,+Jakarta+Pusat" 
                       target="_blank" 
                       class="btn btn-success">
                        <i class="bi bi-geo-alt me-1"></i> Waze
                    </a>
                    <a href="https://www.openstreetmap.org/search?query=Jl.+Merdeka+No.+123,+Jakarta+Pusat" 
                       target="_blank" 
                       class="btn btn-info">
                        <i class="bi bi-map me-1"></i> OpenStreetMap
                    </a>
                </div>
                
                <div class="mt-4 text-center">
                    <small class="text-muted">
                        <i class="bi bi-info-circle me-1"></i>
                        Koordinat: -6.1751° S, 106.8650° E
                    </small>
                </div>
            </div>
            
            <!-- Map Controls (simulasi) -->
            <div class="position-absolute top-0 end-0 m-3">
                <button class="btn btn-sm btn-light shadow-sm" onclick="zoomInMap()">
                    <i class="bi bi-plus"></i>
                </button>
                <button class="btn btn-sm btn-light shadow-sm mt-1" onclick="zoomOutMap()">
                    <i class="bi bi-dash"></i>
                </button>
            </div>
        </div>
    `;
}

/**
 * Setup FAQ Accordion
 */
function setupFAQ() {
    const faqAccordion = document.getElementById('faqAccordion');
    if (!faqAccordion) return;
    
    // Add event listeners to FAQ items
    const faqItems = faqAccordion.querySelectorAll('.accordion-button');
    faqItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            // Log FAQ interaction
            console.log(`FAQ ${index + 1} clicked: ${this.textContent}`);
            
            // You could add analytics tracking here
            // trackFAQView(index + 1, this.textContent);
        });
    });
}

/**
 * Setup form kontak untuk WhatsApp
 */
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Ambil data form
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            subject: document.getElementById('subject').value.trim(),
            message: document.getElementById('message').value.trim(),
            timestamp: new Date().toLocaleString('id-ID'),
            page: window.location.href
        };
        
        // Validasi
        const validation = validateContactForm(formData);
        
        if (!validation.isValid) {
            showValidationErrors(validation.errors);
            return;
        }
        
        // Tampilkan loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Mengirim...';
        submitBtn.disabled = true;
        
        // Kirim ke WhatsApp
        sendContactToWhatsApp(formData);
        
        // Reset form setelah delay
        setTimeout(() => {
            contactForm.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

/**
 * Kirim data kontak ke WhatsApp
 * @param {Object} formData - Data dari form
 */
function sendContactToWhatsApp(formData) {
    // Ambil nomor WhatsApp dari data attribute atau gunakan default
    const form = document.getElementById('contactForm');
    const whatsappNumber = form.dataset.whatsappNumber || "6287882261578"; // GANTI NOMOR ANDA

    // Format pesan WhatsApp
    const whatsappMessage = `
📨 *PESAN BARU DARI WEBSITE*
────────────────────
👤 *Nama:* ${formData.name}
📧 *Email:* ${formData.email}
📋 *Subjek:* ${formData.subject}
────────────────────
💬 *Pesan:*
${formData.message}
────────────────────
🕐 *Waktu:* ${formData.timestamp}
🌐 *Dari Halaman:* ${formData.page}
────────────────────
*Pesan ini dikirim otomatis dari website.*
    `.trim();
    
    // Encode pesan
    const encodedMessage = encodeURIComponent(whatsappMessage);
    
    // Buat URL WhatsApp
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    // Tampilkan konfirmasi
    showAlert(`
        <div class="text-center">
            <i class="bi bi-whatsapp display-4 text-success mb-3"></i>
            <h5>Mengirim ke WhatsApp...</h5>
            <p class="mb-0">Membuka aplikasi WhatsApp</p>
        </div>
    `, 'success');
    
    // Redirect ke WhatsApp setelah delay
    setTimeout(() => {
        // Coba beberapa metode untuk pastikan terbuka
        
        // Method 1: Direct redirect
        window.location.href = whatsappURL;
        
        // Method 2: Simpan di localStorage untuk fallback
        localStorage.setItem('lastContactForm', JSON.stringify(formData));
        localStorage.setItem('lastWhatsAppURL', whatsappURL);
        
        // Method 3: Buat iframe untuk trigger (lebih reliable)
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.src = whatsappURL;
        document.body.appendChild(iframe);
        
        // Method 4: Fallback manual link
        setTimeout(() => {
            const alertContainer = document.querySelector('.alert-dismissible');
            if (alertContainer) {
                const manualLink = document.createElement('a');
                manualLink.href = whatsappURL;
                manualLink.target = '_blank';
                manualLink.className = 'btn btn-success btn-sm mt-2';
                manualLink.innerHTML = '<i class="bi bi-whatsapp me-1"></i> Klik jika tidak otomatis';
                alertContainer.querySelector('.alert').appendChild(manualLink);
            }
        }, 1500);
        
    }, 1500);
}

/**
 * Validasi form kontak
 */
function validateContactForm(formData) {
    const errors = [];
    
    // Validasi nama
    if (!formData.name || formData.name.trim().length < 3) {
        errors.push({
            field: 'name',
            message: 'Nama harus minimal 3 karakter'
        });
    }
    
    // Validasi email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
        errors.push({
            field: 'email',
            message: 'Email tidak valid'
        });
    }
    
    // Validasi subjek
    if (!formData.subject || formData.subject.trim().length < 5) {
        errors.push({
            field: 'subject',
            message: 'Subjek harus minimal 5 karakter'
        });
    }
    
    // Validasi pesan
    if (!formData.message || formData.message.trim().length < 10) {
        errors.push({
            field: 'message',
            message: 'Pesan harus minimal 10 karakter'
        });
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

/**
 * Tampilkan error validasi
 */
function showValidationErrors(errors) {
    // Reset semua error sebelumnya
    document.querySelectorAll('.is-invalid').forEach(el => {
        el.classList.remove('is-invalid');
    });
    
    document.querySelectorAll('.invalid-feedback').forEach(el => {
        el.remove();
    });
    
    // Tampilkan error baru
    errors.forEach(error => {
        const field = document.getElementById(error.field);
        if (field) {
            field.classList.add('is-invalid');
            
            const errorDiv = document.createElement('div');
            errorDiv.className = 'invalid-feedback';
            errorDiv.textContent = error.message;
            
            field.parentNode.appendChild(errorDiv);
        }
    });
    
    // Scroll ke error pertama
    if (errors.length > 0) {
        const firstErrorField = document.getElementById(errors[0].field);
        if (firstErrorField) {
            firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
            firstErrorField.focus();
        }
    }
}

/**
 * Setup live chat simulation
 */
function setupLiveChat() {
    const liveChatBtn = document.getElementById('liveChatBtn');
    if (!liveChatBtn) return;
    
    liveChatBtn.addEventListener('click', function() {
        const chatWindow = document.getElementById('chatWindow');
        
        if (!chatWindow) {
            // Create chat window if it doesn't exist
            const chatHTML = `
                <div id="chatWindow" class="position-fixed bottom-0 end-0 m-3" style="z-index: 9999; width: 300px;">
                    <div class="card shadow-lg border-0">
                        <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                            <div>
                                <i class="bi bi-chat-dots me-2"></i>
                                <strong>Live Chat</strong>
                            </div>
                            <button type="button" class="btn btn-sm btn-light" onclick="closeChat()">
                                <i class="bi bi-x"></i>
                            </button>
                        </div>
                        <div class="card-body" style="height: 300px; overflow-y: auto;">
                            <div class="text-center text-muted my-4">
                                <i class="bi bi-robot display-4 mb-3"></i>
                                <p>Halo! Saya Clara, asisten virtual Krisna Digital.</p>
                                <p class="small">Bagaimana saya bisa membantu Anda?</p>
                            </div>
                        </div>
                        <div class="card-footer">
                            <div class="input-group">
                                <input type="text" class="form-control" placeholder="Ketik pesan Anda..." disabled>
                                <button class="btn btn-primary" disabled>
                                    <i class="bi bi-send"></i>
                                </button>
                            </div>
                            <small class="text-muted d-block mt-2">
                                <i class="bi bi-info-circle me-1"></i>
                                Live chat sedang dalam pengembangan
                            </small>
                        </div>
                    </div>
                </div>
            `;
            
            document.body.insertAdjacentHTML('beforeend', chatHTML);
            
            // Show notification
            showAlert('Fitur live chat sedang dalam pengembangan. Silakan gunakan WhatsApp atau email untuk kontak langsung.', 'info');
        } else {
            chatWindow.style.display = chatWindow.style.display === 'none' ? 'block' : 'none';
        }
    });
}

/**
 * Setup WhatsApp quick button
 */
function setupWhatsAppButton() {
    const whatsappBtn = document.getElementById('whatsappBtn');
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', function() {
            // GANTI NOMOR ANDA
            const phoneNumber = "6287882261578";
            const defaultMessage = "Halo, saya ingin bertanya tentang produk Anda.";
            
            // Prompt untuk custom message
            const userMessage = prompt('Masukkan pesan Anda untuk WhatsApp:', defaultMessage);
            
            if (userMessage) {
                const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(userMessage)}`;
                window.open(url, '_blank');
            }
        });
    }
}

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    setupContactForm();
    setupWhatsAppButton();
    loadBusinessHours();
    setupLocationMap();
    setupFAQ();
    setupLiveChat();
    
    console.log('Halaman kontak WhatsApp berhasil diinisialisasi');
});

/**
 * Setup contact page
 */
function setupContactPage() {
    setupContactForm();
    setupQuickContact();
    loadBusinessHours();
    setupLocationMap();
    setupFAQ();
    setupLiveChat();
    
    console.log('Halaman kontak berhasil diinisialisasi');
}

// Global function untuk chat (harus di window scope)
window.closeChat = function() {
    const chatWindow = document.getElementById('chatWindow');
    if (chatWindow) {
        chatWindow.style.display = 'none';
    }
};

window.zoomInMap = function() {
    alert('Fitur zoom map sedang dalam pengembangan');
};

window.zoomOutMap = function() {
    alert('Fitur zoom map sedang dalam pengembangan');
};

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    setupContactPage();
});