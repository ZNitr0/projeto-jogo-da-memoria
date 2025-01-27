// Array para armazenar os nomes dos amigos
let amigos = [];

// Função para exibir mensagens no HTML
function exibirMensagem(mensagem, tipo = "info") {
    const elementoMensagem = document.getElementById("mensagem");
    elementoMensagem.textContent = mensagem;
    elementoMensagem.className = `feedback ${tipo}`; // Define a classe de estilo
}

// Função para adicionar amigos
function adicionarAmigo() {
    const inputAmigo = document.getElementById("amigo");
    const nomeAmigo = inputAmigo.value.trim();

    if (nomeAmigo === "") {
        exibirMensagem("Por favor, insira um nome válido.", "erro");
        return;
    }

    if (amigos.includes(nomeAmigo)) {
        exibirMensagem("Este nome já foi adicionado.", "erro");
        return;
    }

    amigos.push(nomeAmigo);
    atualizarLista();
    exibirMensagem("Amigo adicionado com sucesso!", "sucesso");
    inputAmigo.value = ""; // Limpa o campo de input
}

// Função para atualizar a lista de amigos no HTML
function atualizarLista() {
    const listaAmigos = document.getElementById("listaAmigos");
    listaAmigos.innerHTML = ""; // Limpa a lista atual

    amigos.forEach((amigo, index) => {
        const li = document.createElement("li");
        li.textContent = amigo;

        // Adiciona botão para remover amigos
        const btnRemover = document.createElement("button");
        btnRemover.textContent = "Remover";
        btnRemover.onclick = () => removerAmigo(index);

        li.appendChild(btnRemover);
        listaAmigos.appendChild(li);
    });
}

// Função para remover um amigo da lista
function removerAmigo(index) {
    amigos.splice(index, 1); // Remove o amigo pelo índice
    atualizarLista();
    exibirMensagem("Amigo removido com sucesso.", "sucesso");
}

// Função para sortear amigos secretos
function sortearAmigo() {
    if (amigos.length < 2) {
        exibirMensagem("É necessário pelo menos 2 amigos para realizar o sorteio.", "erro");
        return;
    }

    const sorteados = new Map(); // Usaremos um Map para garantir que ninguém tire a si mesmo
    const amigosDisponiveis = [...amigos];

    for (const amigo of amigos) {
        // Filtra a lista para evitar que o amigo tire a si mesmo
        const possiveis = amigosDisponiveis.filter(a => a !== amigo);

        if (possiveis.length === 0) {
            exibirMensagem("Não foi possível realizar o sorteio. Tente novamente.", "erro");
            return;
        }

        const sorteado = possiveis[Math.floor(Math.random() * possiveis.length)];
        sorteados.set(amigo, sorteado);

        // Remove o sorteado da lista de disponíveis
        amigosDisponiveis.splice(amigosDisponiveis.indexOf(sorteado), 1);
    }

    exibirResultado(sorteados);
    exibirMensagem("Sorteio realizado com sucesso!", "sucesso");
}

// Função para exibir o resultado do sorteio
function exibirResultado(sorteados) {
    const listaResultado = document.getElementById("resultado");
    listaResultado.innerHTML = ""; // Limpa os resultados anteriores

    sorteados.forEach((sorteado, amigo) => {
        const li = document.createElement("li");
        li.textContent = `${amigo} tirou ${sorteado}`;
        listaResultado.appendChild(li);
    });
}
