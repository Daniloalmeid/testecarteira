const connectButton = document.getElementById('connectButton');
const walletAddressDisplay = document.getElementById('walletAddress');

function isMobile() {
  return /android|iphone|ipad|ipod/i.test(navigator.userAgent);
}

async function connectWallet() {
  const isPhantomInstalled = window.solana && window.solana.isPhantom;

  if (isPhantomInstalled) {
    // Desktop com extensão instalada
    try {
      const resp = await window.solana.connect();
      const walletAddress = resp.publicKey.toString();
      walletAddressDisplay.innerText = 'Carteira conectada: ' + walletAddress;
    } catch (err) {
      console.error('Erro ao conectar:', err);
      walletAddressDisplay.innerText = 'Erro ao conectar à carteira.';
    }
  } else if (isMobile()) {
    // Redireciona para o app da Phantom (mobile)
    const dappUrl = encodeURIComponent(window.location.href);
    const deepLink = `https://phantom.app/ul/v1/connect?app_url=${dappUrl}&redirect_link=${dappUrl}`;
    window.location.href = deepLink;
  } else {
    // Caso Phantom não esteja instalada no desktop
    alert("Por favor, instale a carteira Phantom no seu navegador.");
  }
}

connectButton.addEventListener('click', connectWallet);
