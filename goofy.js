// Function to generate a random wallet address
function generateRandomAddress() {
    const chars = '0123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
    let address = '';
    for (let i = 0; i < 44; i++) {
        address += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return address.slice(0, 4) + '***' + address.slice(-4);
}

// Function to generate a random SOL amount
function generateRandomSOLAmount() {
    return (Math.random() * (50 - 0.1) + 0.1).toFixed(1);
}

// Function to display a notification
function displayNotification() {
    const container = document.getElementById('notificationContainer');
    const notification = document.createElement('div');
    notification.classList.add('notification');
    const address = generateRandomAddress();
    const amount = generateRandomSOLAmount();
    notification.textContent = `${address} has cashed out ${amount} SOL profit`;
    
    // Add the notification with an initial 'bounceIn' class
    notification.classList.add('bounceIn');
    container.appendChild(notification);

    // Remove the 'bounceIn' class after the animation completes
    setTimeout(() => {
        notification.classList.remove('bounceIn');
    }, 1000); // Match the duration of the bounce animation

    // Remove the notification from the DOM after a set time
    setTimeout(() => {
        container.removeChild(notification);
    }, 10000); // Keep the notification visible for 10 seconds
}

// Start displaying notifications every 20 seconds
setInterval(displayNotification, 500);

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.getElementById('loadingCircle').classList.add('hidden');
        document.getElementById('content').classList.remove('hidden');
    }, 1000); // Adjust the timing if necessary
    
    const walletInfoDiv = document.getElementById('walletInfo');
    const walletAddressP = document.getElementById('walletAddress');
    const solBalanceSpan = document.getElementById('solBalance');
    const connectBtn = document.getElementById('connectBtn');

    connectBtn.addEventListener('click', async () => {
        if (window.solana && window.solana.isPhantom) {
            try {
                const response = await window.solana.connect();
                console.log('Connected with public key:', response.publicKey.toString());
                connectBtn.textContent = 'Wallet Connected';
                walletAddressP.textContent = `Wallet Address: ${response.publicKey.toString()}`;
            
            } catch (err) {
                console.error(err);
                alert('Connection failed!');
            }
        } else {
            alert('Solana object not found! Make sure you have a Solana wallet extension installed.');
        }
    });
});

