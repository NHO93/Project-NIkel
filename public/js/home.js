// HOME JS

const myModal = new bootstrap.Modal("#transaction-modal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

// Declara variáveis globais
let data = {
    transactions: []
};

// ============================
// EVENTOS
// ============================

// Botão de logout
document.getElementById("button-logout").addEventListener("click", logout);

//EXIBE AS TRANSAÇÕES
document.getElementById("transactions-button").addEventListener("click", function (){
    window.location.href = "transactions.html"
})

//ADICIONAR LANÇAMENTO
document.getElementById("transaction-form").addEventListener("submit", function(e) {
    e.preventDefault();

    // Pega os dados do formulário
    const value = parseFloat(document.getElementById("value-input").value);
    const description = document.getElementById("description-input").value;
    const date = document.getElementById("date-input").value;

    // Pega o tipo de lançamento
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
    getCashIn();
    getCashOut();
    getTotal();

    // Exibe mensagem de sucesso
    alert("Lançamento adicionado com sucesso.");
    
});

// ============================
// FUNÇÕES
// ============================

// Verifica se o usuário está logado
checkLogged();

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

    // Atualiza a interface
    getCashIn();
    getCashOut();
    getTotal();
}

// Deslogar usuário
function logout() {
    sessionStorage.removeItem("logged");
    localStorage.removeItem("session");

    // Redireciona para a página de login
    window.location.href = "index.html";
}

// ============================
// EXIBE AS TRANSAÇÕES
// ============================
function getCashIn() {
  // Pega as transações de entrada
    const transactions = data.transactions;

    // Filtra apenas as transações de entrada
    const cashIn = transactions.filter((item) => item.type === "1");

    // Exibe as transações na interface
    if(cashIn.length) {
        let cashInHtml = ``;
        let limit = 0;

        // Define o limite de exibição
        if(cashIn.length > 5) {
            limit = 5;
        } else {
            limit = cashIn.length;
        }

        // Loop pelas transações
        for (let index = 0; index < limit; index++) {
            cashInHtml += `
            <div class="row mb-4">
                <div class="col-12">
                    <h3 class="fs-2">R$ ${cashIn[index].value.toFixed(2)}</h3>
                    <div class="container p-0">
                        <div class="row">
                            <div class="col-12 col-md-8">
                                <p>${cashIn[index].description}</p>
                            </div>
                            <div class="col-12 col-md-3 d-flex justify-content-end">
                                ${cashIn[index].date}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `
        }

        // Exibe o HTML na interface
        document.getElementById("cash-in-list").innerHTML = cashInHtml;
    }
}

// ============================
// EXIBE AS SAÍDAS
// ============================
function getCashOut() {
  // Pega as transações de saída
    const transactions = data.transactions;

    // Filtra apenas as transações de saída
    const cashIn = transactions.filter((item) => item.type === "2");

    // Exibe as transações na interface
    if(cashIn.length) {
        let cashInHtml = ``;
        let limit = 0;

        // Define o limite de exibição
        if(cashIn.length > 5) {
            limit = 5;
        } else {
            limit = cashIn.length;
        }

        // Loop pelas transações
        for (let index = 0; index < limit; index++) {
            cashInHtml += `
            <div class="row mb-4">
                <div class="col-12">
                    <h3 class="fs-2">R$ ${cashIn[index].value.toFixed(2)}</h3>
                    <div class="container p-0">
                        <div class="row">
                            <div class="col-12 col-md-8">
                                <p>${cashIn[index].description}</p>
                            </div>
                            <div class="col-12 col-md-3 d-flex justify-content-end">
                                ${cashIn[index].date}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `
        }

        // Exibe o HTML na interface
        document.getElementById("cash-out-list").innerHTML = cashInHtml;
    }
}

// ============================
// EXIBE O TOTAL
// ============================
function getTotal() {
  // Calcula o total das transações
    const transactions = data.transactions;
    let total = 0;

    // Loop pelas transações
    transactions.forEach((item) => {
        if(item.type === "1") {
            total += item.value;
        } else {
            total -= item.value;
        }
    });

    // Exibe o total na interface
    document.getElementById("total").innerHTML = `R$ ${total.toFixed(2)}`;
}

// ============================
// SALVA OS DADOS
// ============================
function saveData(data) {
  // Salva os dados no localStorage
    localStorage.setItem(data.login, JSON.stringify(data));
}