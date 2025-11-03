// Função que verifica se o usuário já está logado
function checkLogged() {

    // Verifica a sessão permanente (localStorage: "logged") OU a sessão temporária (sessionStorage: "logged")
    const loggedUser = localStorage.getItem("logged") || sessionStorage.getItem("logged");
     
    // Se houver um usuário logado, redirecionar para a página inicial
    if (loggedUser) {
        // Redirecionar para a página inicial
        window.location.href = "home.html";
    }
};

// Chamar a função para verificar o login ao carregar a página
checkLogged();

// Inicializar o modal do Bootstrap
const myModal = new bootstrap.Modal(document.getElementById('register-Modal'));

// Salvar conta: Armazena a conta no localStorage
function saveAccount(data){ 
    localStorage.setItem(data.login, JSON.stringify(data));
}

// Gerar conta: Retorna o objeto da conta ou null se não for encontrado
function getAccount(key){
    const account = localStorage.getItem(key);
    // Se a conta não existir, retorna null
    if(!account){
        return null;
    }
    // Se existir, retorna o objeto JSON (já parseado)
    return JSON.parse(account);
}

// --- Lógica de Login ---

document.getElementById("login-form").addEventListener("submit",
    function(e) {
        e.preventDefault();
        
        // Obter os valores dos campos de entrada
        const email = document.getElementById("email-input").value;
        const password = document.getElementById("password-input").value;
        const session = document.getElementById("session-check").checked; // Manter logado

        // Tenta buscar a conta
        const account = getAccount(email);

        // Verificar se a conta existe (se account for null)
        if (!account) {
            alert("Conta não encontrada.");
        } else {
            // Conta encontrada. Comparar senha.
            if (account.password === password) {
                alert("Login bem-sucedido!");
                
                // ********** Lógica de Manter Logado **********
                if (session) {
                    // Se 'Manter Logado' (session == true), salvar no localStorage (permanente)
                    localStorage.setItem("logged", JSON.stringify(account));
                } else {
                    // Se não, salvar no sessionStorage (temporário)
                    sessionStorage.setItem("logged", JSON.stringify(account));
                }
                // ***************************************

                // Redirecionar para a página inicial
                window.location.href = "home.html";
            } else {
                alert("Senha incorreta.");
            }
        }
    }
);

// --- Lógica de Criação de Conta ---

document.getElementById("create-form").addEventListener("submit", function(e) {
    e.preventDefault();
    
    // Obter os valores dos campos de entrada
    const email = document.getElementById("email-create-input").value;
    const password = document.getElementById("password-create-input").value;

    // Validação simples
    if (email.length < 5 || password.length < 8) {
        alert("Por favor, insira um e-mail válido e uma senha com pelo menos 8 caracteres.");
        return;
    }

    // Validação extra: checar se a conta já existe
    if (getAccount(email)) {
        alert("Este e-mail já está registrado!");
        return;
    }

    // Salvar conta
    saveAccount({
        login: email,
        password: password,
        transactions: []
    });

    // Fechar o modal após a criação da conta
    myModal.hide();

    // Limpar os campos do formulário
    document.getElementById("create-form").reset(); 

    alert("Conta criada com sucesso!");
});