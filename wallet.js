const connectButton = document.getElementById('connectButton');
const walletAddressDisplay = document.getElementById('walletAddress');

async function connectWallet() {
  const isPhantomInstalled = window.solana && window.solana.isPhantom;

  if (isPhantomInstalled) {
    try {
      const resp = await window.solana.connect();
      const walletAddress = resp.publicKey.toString();
      walletAddressDisplay.innerText = 'Carteira conectada: ' + walletAddress;
    } catch (err) {
      console.error('Erro ao conectar:', err);
    }
  } else {
    // Deep link para Phantom (mobile)
    const currentUrl = window.location.href;
    const phantomDeepLink = `https://phantom.app/ul/browse/${encodeURIComponent(currentUrl)}`;
    window.location.href = phantomDeepLink;
  }
}

connectButton.addEventListener('click', connectWallet);
