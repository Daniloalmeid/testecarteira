const connectButton = document.getElementById('connectButton');
const disconnectButton = document.getElementById('disconnectButton');
const walletAddressDisplay = document.getElementById('walletAddress');

function isMobile() {
  return /android|iphone|ipad|ipod/i.test(navigator.userAgent.toLowerCase());
}

async function connectWallet() {
  const isPhantomInstalled = window.solana && window.solana.isPhantom;
  const mobile = isMobile();

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
  } else if (mobile) {
    // Redirecionamento para o app Phantom com pedido de conexão
    const dappUrl = encodeURIComponent(window.location.href);
    const phantomDeepLink = `https://phantom.app/ul/v1/connect?app_url=${dappUrl}&redirect_link=${dappUrl}`;

    // iOS precisa de replace para abrir o deep link corretamente
    window.location.replace(phantomDeepLink);
  } else {
    // Apenas desktop sem Phantom instalada
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

// Verifica se já está conectada ao carregar a página
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
      console.log('Usuário não autorizou conexão automática.');
    }
  }
});

connectButton.addEventListener('click', connectWallet);
disconnectButton.addEventListener('click', disconnectWallet);
