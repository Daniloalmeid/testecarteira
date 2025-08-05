// Função para conectar à carteira Phantom
async function connectWallet() {
    try {
        // Verifica se a Phantom Wallet está disponível
        const provider = window.solana || window.phantom?.solana;

        if (!provider || !provider.isPhantom) {
            alert('Carteira Phantom não detectada. Instale a extensão ou aplicativo Phantom.');
            return;
        }

        // Solicita conexão à carteira
        const response = await provider.connect();
        const publicKey = response.publicKey.toString();

        // Exibe o endereço da carteira
        document.getElementById('walletAddress').innerText = `Carteira conectada: ${publicKey}`;

        // Opcional: Exemplo de interação com a blockchain Solana
        const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl('devnet'), 'confirmed');
        const balance = await connection.getBalance(response.publicKey);
        console.log(`Saldo da carteira: ${balance / solanaWeb3.LAMPORTS_PER_SOL} SOL`);

    } catch (error) {
        console.error('Erro ao conectar à carteira:', error);
        alert('Erro ao conectar à carteira. Verifique se a Phantom está instalada e desbloqueada.');
    }
}

// Verifica automaticamente se a Phantom está conectada ao carregar a página
window.addEventListener('load', async () => {
    const provider = window.solana || window.phantom?.solana;
    if (provider && provider.isConnected) {
        try {
            const response = await provider.connect({ onlyIfTrusted: true });
            document.getElementById('walletAddress').innerText = `Carteira conectada: ${response.publicKey.toString()}`;
        } catch (error) {
            console.log('Nenhuma conexão automática disponível:', error);
        }
    }
});