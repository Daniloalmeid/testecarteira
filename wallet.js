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
    // Deep link de conexão com Phantom (mobile)
    const dappUrl = encodeURIComponent(window.location.origin); // ou URL do seu site
    const redirectLink = `https://phantom.app/ul/v1/connect?app_url=${dappUrl}&redirect_link=${dappUrl}`;

    // Redireciona para o app Phantom com pedido de conexão
    window.location.href = redirectLink;
  }
}
