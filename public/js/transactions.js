
const myModal = new bootstrap.Modal("#transaction-modal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");
let data = {
    transactions: []
};

// ============================
// EVENTOS
// ============================

// Botão de logout
document.getElementById("button-logout").addEventListener("click", logout);

//ADICIONAR LANÇAMENTO
document.getElementById("transaction-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const value = parseFloat(document.getElementById("value-input").value);
    const description = document.getElementById("description-input").value;
    const date = document.getElementById("date-input").value;
    const type = document.querySelector('input[name="type-input"]:checked').value;

    // Adiciona o novo lançamento ao array existente
    data.transactions.unshift({
        value: value, type: type, description: description, date: date
    });

    // Salva os dados
    saveData(data);
    e.target.reset();
    myModal.hide();

    // Atualiza a interface
    getTransactions();

    // Exibe mensagem de sucesso
    alert("Lançamento adicionado com sucesso.");
    
});

// ============================
// FUNÇÕES
// ============================

// Verifica se o usuário está logado
checkLogged();

// Verifica se o usuário está logado
function checkLogged() {
    // Verifica a sessão
    if(session) {
        sessionStorage.setItem("logged", session);
        logged = session;
    }

    // Redireciona se não estiver logado
    if(!logged) {
        window.location.href = "index.html";
        return;
    }

    // Pega os dados do usuário
    const dataUser = localStorage.getItem(logged);
    if(dataUser) {
        data = JSON.parse(dataUser);
    }

    // Exibe os lançamentos
    getTransactions();

}

// Logout do usuário
function logout() {
    // Remove os dados da sessão
    sessionStorage.removeItem("logged");
    localStorage.removeItem("session");

    // Redireciona para a página de login
    window.location.href = "index.html";
}

// Pega e exibe os lançamentos
function getTransactions() {
    // Pega as transações
    const transactions = data.transactions;
    let transactionsHtml = ``;

    // Loop pelas transações
    if(transactions.length) {
        transactions.forEach((item) => {
            let type = "Entrada";

            // Verifica o tipo de transação
            if(item.type === "2") {
                type = "Saída";
            }

            // Adiciona uma linha na tabela para cada transação
            transactionsHtml += `
                <tr>
                    <th scope="row">${item.date}</th>
                    <td>${item.value.toFixed(2)}</td>
                    <td>${type}</td>
                    <td>${item.description}</td>
                </tr>
            `
        })
    }

    // Exibe as transações na interface
    document.getElementById("transactions-list").innerHTML = transactionsHtml;
}

// Salva os dados no localStorage
function saveData(data) {
    localStorage.setItem(data.login, JSON.stringify(data));
}