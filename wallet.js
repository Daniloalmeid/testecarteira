const connectButton = document.getElementById('connectButton');
const disconnectButton = document.getElementById('disconnectButton');
const walletAddressDisplay = document.getElementById('walletAddress');

function isMobile() {
  return /android|iphone|ipad|ipod/i.test(navigator.userAgent);
}

async function connectWallet() {
  const isPhantomInstalled = window.solana && window.solana.isPhantom;

  if (isPhantomInstalled) {
    try {
      const resp = await window.solana.connect();
      const walletAddress = resp.publicKey.toString();
      walletAddressDisplay.innerText = 'Carteira conectada: ' + walletAddress;
      connectButton.style.display = 'none';
      disconnectButton.style.display = 'inline-block';
    } catch (err) {
      console.error('Erro ao conectar:', err);
      walletAddressDisplay.innerText = 'Erro ao conectar à carteira.';
    }
  } else if (isMobile()) {
    const dappUrl = encodeURIComponent(window.location.href);
    const deepLink = `https://phantom.app/ul/v1/connect?app_url=${dappUrl}&redirect_link=${dappUrl}`;
    window.location.href = deepLink;
  } else {
    alert("Por favor, instale a carteira Phantom no seu navegador.");
  }
}

async function disconnectWallet() {
  if (window.solana && window.solana.isPhantom) {
    try {
      await window.solana.disconnect();
      walletAddressDisplay.innerText = 'Carteira desconectada.';
      connectButton.style.display = 'inline-block';
      disconnectButton.style.display = 'none';
    } catch (err) {
      console.error('Erro ao desconectar:', err);
    }
  }
}

// Verifica se já está conectado ao carregar a página
window.addEventListener('load', async () => {
  if (window.solana && window.solana.isPhantom) {
    try {
      const resp = await window.solana.connect({ onlyIfTrusted: true });
      if (resp.publicKey) {
        const walletAddress = resp.publicKey.toString();
        walletAddressDisplay.innerText = 'Carteira conectada: ' + walletAddress;
        connectButton.style.display = 'none';
        disconnectButton.style.display = 'inline-block';
      }
    } catch (err) {
      console.log('Usuário não deu permissão automática.');
    }
  }
});

connectButton.addEventListener('click', connectWallet);
disconnectButton.addEventListener('click', disconnectWallet);
