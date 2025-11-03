// Variável global para armazenar os dados do usuário logado
let logged = {};

// Verifica se o usuário está logado
function getLoggedData() {
    // Tenta obter os dados do usuário logado do localStorage ou sessionStorage
    let userData = localStorage.getItem("logged");

    // Se não estiver no localStorage, tenta no sessionStorage
    if (!userData) {
        userData = sessionStorage.getItem("logged");
    }
    // Se encontrar os dados, parseia e retorna o objeto
    if (userData) {
        return JSON.parse(userData);
    }
    // Se não encontrar,
    return null;
}

// Verifica autenticação ao carregar a página
function checkAuthentication() {
    logged = getLoggedData();
    if (!logged) {
        // Se não estiver logado, exibe um alerta
        alert("Você precisa estar logado para acessar esta página.");
        // Se não estiver logado, redireciona para a página de login
        window.location.href = "index.html";
    } else{
        console.log("Usuário logado:", logged);
    
    }
}

document.getElementById("logout-button").addEventListener("click", function() {
    // Limpa os dados de login do localStorage e sessionStorage
    localStorage.removeItem("logged");

    // Limpa os dados de login do sessionStorage
    sessionStorage.removeItem("logged");

    // Exibe uma mensagem de sucesso
    alert("Você saiu com sucesso.");

    // Redireciona para a página de login
    window.location.href = "index.html";
});

// Chamar a função para verificar a autenticação ao carregar a página
checkAuthentication();
