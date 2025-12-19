// Discord SDK setup
const discordSdk = new DiscordSDK.DiscordSDK("1234567890123456789");

// Set Activity Status function
async function setActivityStatus() {
    try {
        const activity = {
            state: "Reading manga in Discord",
            details: "One Piece • Chapter 1090",
            timestamps: {
                start: Date.now()
            },
            assets: {
                large_image: "manga",
                large_text: "Manga Reader",
                small_image: "voice",
                small_text: "In Voice Channel"
            },
            buttons: [
                { label: "Join Reading", url: "https://discord.gg" },
                { label: "Browse Library", url: "https://discord.gg" }
            ]
        };
        
        console.log('Setting activity status:', activity);
        alert('Activity status would be set in Discord!');
        
    } catch (error) {
        console.error('Error setting activity:', error);
    }
}

// DOM Ready
document.addEventListener('DOMContentLoaded', () => {
    const statusBtn = document.getElementById('statusBtn');
    const statusMessage = document.getElementById('statusMessage');
    
    // Set Activity Status Button
    statusBtn.addEventListener('click', () => {
        statusBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Setting...';
        statusBtn.disabled = true;
        
        setActivityStatus();
        
        // Show success message
        statusMessage.classList.add('show');
        
        // Reset button
        setTimeout(() => {
            statusBtn.innerHTML = '<i class="fas fa-play-circle"></i> Set Activity Status';
            statusBtn.disabled = false;
            statusMessage.classList.remove('show');
        }, 2000);
    });
    
    // Navigation buttons
    document.querySelectorAll('.nav-btn').forEach(button => {
        button.addEventListener('click', () => {
            if (button.classList.contains('primary')) {
                button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
                setTimeout(() => {
                    button.innerHTML = '<i class="fas fa-play"></i> Read Now';
                    alert('Starting manga reading session!');
                }, 1000);
            }
        });
    });
    
    // Quick access buttons
    document.querySelectorAll('.quick-btn').forEach(button => {
        button.addEventListener('click', () => {
            const icon = button.querySelector('i');
            const text = button.textContent.trim();
            console.log(`Clicked: ${text}`);
            
            button.style.transform = 'scale(0.95)';
            setTimeout(() => {
                button.style.transform = '';
            }, 150);
        });
    });
    
    // Reader cards
    document.querySelectorAll('.reader').forEach(reader => {
        reader.addEventListener('click', () => {
            const name = reader.querySelector('.reader-name').textContent;
            console.log(`Selected reader: ${name}`);
            
            reader.style.background = 'rgba(88, 101, 242, 0.2)';
            setTimeout(() => {
                reader.style.background = '';
            }, 500);
        });
    });
    
    // Auto-update progress
    setInterval(() => {
        const progressFill = document.querySelector('.progress-fill');
        const progressText = document.querySelector('.progress-text');
        const readers = document.querySelectorAll('.reader-status');
        
        let progress = parseInt(progressFill.style.width) || 65;
        progress = Math.min(100, progress + Math.random() * 5);
        
        progressFill.style.width = `${progress}%`;
        progressText.textContent = `${Math.round(progress)}% complete`;
        
        // Update random reader
        if (Math.random() > 0.7) {
            const randomReader = readers[Math.floor(Math.random() * readers.length)];
            const randomPage = Math.floor(Math.random() * 50) + 1;
            randomReader.textContent = `Page ${randomPage}`;
        }
    }, 5000);
    
    console.log('Manga Reader Activity loaded!');
});
