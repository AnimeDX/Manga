// Initialize Discord SDK
const discordSdk = new DiscordSDK.DiscordSDK("1234567890123456789");

async function setupDiscordSDK() {
  try {
    await discordSdk.ready();
    console.log('Discord SDK is ready!');
    
    // Subscribe to voice state updates
    discordSdk.subscribe('VOICE_STATE_UPDATE', (data) => {
      console.log('Voice state update:', data);
    });
    
    // Subscribe to activity updates
    discordSdk.subscribe('ACTIVITY_UPDATE', (data) => {
      console.log('Activity update:', data);
    });
    
  } catch (error) {
    console.error('Failed to initialize Discord SDK:', error);
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  setupDiscordSDK();
  
  // Set Activity Status Button
  const statusBtn = document.getElementById('statusBtn');
  const statusMessage = document.getElementById('statusMessage');
  
  statusBtn.addEventListener('click', async () => {
    try {
      // Show loading state
      statusBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Setting Status...';
      statusBtn.disabled = true;
      
      // Set activity status
      await setActivityStatus();
      
      // Show success message
      statusMessage.classList.add('show');
      
      // Restore button after 2 seconds
      setTimeout(() => {
        statusBtn.innerHTML = '<i class="fas fa-play-circle"></i> Set Activity Status';
        statusBtn.disabled = false;
        statusMessage.classList.remove('show');
      }, 2000);
      
    } catch (error) {
      console.error('Failed to set activity status:', error);
      statusBtn.innerHTML = '<i class="fas fa-exclamation-circle"></i> Failed - Try Again';
      statusBtn.disabled = false;
      
      // Show error temporarily
      setTimeout(() => {
        statusBtn.innerHTML = '<i class="fas fa-play-circle"></i> Set Activity Status';
        statusBtn.disabled = false;
      }, 2000);
    }
  });
  
  // Navigation buttons functionality
  document.querySelectorAll('.nav-btn').forEach(button => {
    button.addEventListener('click', () => {
      if (button.classList.contains('primary')) {
        simulateReading();
      }
    });
  });
  
  // Quick access buttons
  document.querySelectorAll('.quick-btn').forEach(button => {
    button.addEventListener('click', () => {
      const icon = button.querySelector('i');
      const text = button.textContent.trim();
      console.log(`Quick action: ${text} (${icon.className})`);
      
      // Add click animation
      button.style.transform = 'scale(0.95)';
      setTimeout(() => {
        button.style.transform = '';
      }, 150);
    });
  });
});

// Set activity status function
async function setActivityStatus() {
  try {
    // Create activity data
    const activity = {
      state: "Reading One Piece",
      details: "Chapter 1090 • 4 readers",
      timestamps: {
        start: Date.now(),
        end: Date.now() + (60 * 60 * 1000) // 1 hour from now
      },
      assets: {
        large_image: "manga_cover",
        large_text: "One Piece",
        small_image: "discord",
        small_text: "In Voice Channel"
      },
      buttons: [
        { label: "Join Reading", url: "https://discord.gg" },
        { label: "Browse Library", url: "https://discord.gg" }
      ],
      party: {
        id: "manga_party_123",
        size: [4, 8]
      }
    };
    
    // Set the activity
    await discordSdk.commands.setActivity(activity);
    console.log('Activity status set successfully!');
    
  } catch (error) {
    console.error('Error setting activity:', error);
    throw error;
  }
}

// Simulate reading activity
function simulateReading() {
  const progressFill = document.querySelector('.progress-fill');
  const progressText = document.querySelector('.progress-text');
  const readers = document.querySelectorAll('.reader-status');
  
  // Animate progress bar
  let progress = 65;
  const interval = setInterval(() => {
    progress += 0.5;
    if (progress > 100) progress = 65;
    
    progressFill.style.width = `${progress}%`;
    progressText.textContent = `${Math.round(progress)}% complete`;
    
    // Update random reader status
    if (Math.random() > 0.7) {
      const randomReader = readers[Math.floor(Math.random() * readers.length)];
      const randomPage = Math.floor(Math.random() * 50) + 1;
      randomReader.textContent = `Page ${randomPage}`;
    }
  }, 100);
  
  // Stop animation after 3 seconds
  setTimeout(() => {
    clearInterval(interval);
  }, 3000);
}

// Add some interactivity to reader cards
document.querySelectorAll('.reader').forEach(reader => {
  reader.addEventListener('click', () => {
    const name = reader.querySelector('.reader-name').textContent;
    console.log(`Selected reader: ${name}`);
    
    // Add visual feedback
    reader.style.background = 'rgba(88, 101, 242, 0.2)';
    setTimeout(() => {
      reader.style.background = '';
    }, 500);
  });
});

// Update time display every minute
function updateTimeDisplay() {
  const timeElements = document.querySelectorAll('.reader-status');
  timeElements.forEach((element, index) => {
    if (index === 0) return; // Skip first one (page number)
    const minutes = Math.floor(Math.random() * 60) + 1;
    element.textContent = `${minutes} min ago`;
  });
}

// Start periodic updates
setInterval(updateTimeDisplay, 60000);

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
  // Space to trigger primary action
  if (e.code === 'Space' && !e.target.matches('button, input, textarea')) {
    e.preventDefault();
    document.querySelector('.nav-btn.primary').click();
  }
  
  // Escape to close status message
  if (e.code === 'Escape') {
    document.getElementById('statusMessage').classList.remove('show');
  }
});

// Initialize with some random data
function initializeRandomData() {
  const chapters = [1085, 1086, 1087, 1088, 1089, 1090, 1091];
  const mangaTitles = [
    "One Piece", "Jujutsu Kaisen", "Chainsaw Man",
    "My Hero Academia", "Demon Slayer", "Attack on Titan"
  ];
  const readerNames = ["Alex", "Sam", "Jordan", "Taylor", "Casey", "Riley"];
  
  // Randomize current manga
  const randomManga = mangaTitles[Math.floor(Math.random() * mangaTitles.length)];
  const randomChapter = chapters[Math.floor(Math.random() * chapters.length)];
  
  document.querySelector('.cover-title').textContent = randomManga;
  document.querySelector('.cover-chapter').textContent = `Chapter ${randomChapter}`;
  document.querySelector('.manga-title').innerHTML = `${randomManga} <span class="status-indicator">●</span>`;
  
  // Randomize reader names
  const readerElements = document.querySelectorAll('.reader-name');
  const shuffledNames = [...readerNames].sort(() => Math.random() - 0.5);
  
  readerElements.forEach((element, index) => {
    element.textContent = shuffledNames[index];
  });
}

// Initialize with random data
initializeRandomData();