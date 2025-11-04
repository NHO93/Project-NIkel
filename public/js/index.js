// ============================
// VARIÁVEIS
// ============================
const myModal = new bootstrap.Modal("#register-modal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

checkLogged();

//LOGAR NO SISTEMA
document.getElementById("login-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.getElementById("email-input").value;
    const password = document.getElementById("password-input").value;
    const checkSession = document.getElementById("session-check").checked;

    const account = getAccount(email);

    // Verifica se a conta existe
    if(!account) {
        alert("Ops! Verifique o usuário ou a senha.")
        return;
    }

    // Verifica se a senha está correta
    if(account) {
      // Verifica se a senha está correta
        if(account.password !== password) {
            alert("Ops! Verifique o usuário ou a senha.");
            return;
        }

        // Salva a sessão
        saveSession(email, checkSession);

        // Redireciona para a página home
        window.location.href = "home.html";
    }
});

//CRIAR CONTA
document.getElementById("create-form").addEventListener("submit", function(e) {
    e.preventDefault();

    // Pega os dados do formulário
    const email = document.getElementById("email-create-input").value;
  
    const password = document.getElementById("password-create-input").value;

    // Validações

    // E-mail com no mínimo 5 caracteres
    if(email.length < 5) {
        alert("Preencha o campo com um e-mail válido.");
        return;
    }

    // Senha com no mínimo 4 dígitos
    if(password.length < 4) {
        alert("Preencha a senha com no mínimo 4 dígitos.")
        return;
    }

    // Salva a conta
    saveAccount({
        login: email,
        password: password,
        transactions: []
    })

    // Fecha o modal
    myModal.hide();

    // Exibe mensagem de sucesso
    alert("Conta criada com sucesso.");
});

// ============================
// FUNÇÕES
// ============================

// Verifica se o usuário está logado
function checkLogged() {
  // Verifica a sessão
    if(session) {
        sessionStorage.setItem("logged", session);
        logged = session;
    }

    // Redireciona se não estiver logado
    if(logged) {
        saveSession(logged, session);

        window.location.href = "home.html";
    }
}

// ============================
// SALVA A CONTA
// ============================

// Salva os dados da conta no localStorage
function saveAccount(data) {
  // Salva os dados da conta no localStorage
    localStorage.setItem(data.login, JSON.stringify(data));
}

// Salva a sessão do usuário
function saveSession(data, saveSession) {
  // Se o usuário quiser salvar a sessão, salva no localStorage
    if(saveSession) {
        localStorage.setItem("session", data);
    }

    sessionStorage.setItem("logged", data);

}

// ============================
// PEGA A CONTA
// ============================
function getAccount(key) {
  // Pega os dados da conta no localStorage
    const account = localStorage.getItem(key);

    // Se a conta existir, converte de volta para objeto
    if(account) {
        return JSON.parse(account);
    }

    // Se não existir, retorna string vazia
    return "";
}