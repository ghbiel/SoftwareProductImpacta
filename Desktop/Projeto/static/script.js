document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");

    form.addEventListener("submit", function (e) {
        e.preventDefault(); // Evita o envio do formulário para testar

        const email = document.getElementById("loginEmail").value;
        const senha = document.getElementById("loginSenha").value;

        const errorMessage = document.getElementById("error-message");

        if (email == "" || senha == "") {
            // Exibe a mensagem de erro
            errorMessage.classList.remove("d-none");
            return false;
        } else {
            // Se os campos estiverem preenchidos, podemos enviar o formulário ou fazer outra ação
            errorMessage.classList.add("d-none");
            // Aqui você pode continuar com o envio do formulário ou outra lógica

            form.submit();
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const eyeIcon = document.getElementById("togglePassword");
    const senhaInput = document.getElementById("loginSenha");

    eyeIcon.addEventListener("click", function () {
        if (senhaInput.type === "password") {
            senhaInput.type = "text"; // Mostra a senha
            eyeIcon.classList.remove("bi-eye-fill")
            eyeIcon.classList.add("bi-eye");
        } else {
            senhaInput.type = "password"; // Oculta a senha
            eyeIcon.classList.remove("bi-eye");
            eyeIcon.classList.add("bi-eye-fill");
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");

    const eyeIcon = document.getElementById("togglePassword");
    const senhaInput = document.getElementById("criarSenha");

    const eyeIcon2 = document.getElementById("togglePassword2");
    const senhaInput2 = document.getElementById("criarSenha2");

    // Função para mostrar/ocultar a senha
    function togglePasswordVisibility(inputField, eyeIcon) {
        if (inputField.type === "password") {
            inputField.type = "text"; // Mostra a senha
            eyeIcon.classList.remove("bi-eye-fill");
            eyeIcon.classList.add("bi-eye");
        } else {
            inputField.type = "password"; // Oculta a senha
            eyeIcon.classList.remove("bi-eye");
            eyeIcon.classList.add("bi-eye-fill");
        }
    }

    // Evento para o ícone de mostrar/ocultar a senha
    eyeIcon.addEventListener("click", function () {
        togglePasswordVisibility(senhaInput, eyeIcon);
    });

    eyeIcon2.addEventListener("click", function () {
        togglePasswordVisibility(senhaInput2, eyeIcon2);
    });

    form.addEventListener("submit", function (e) {
        e.preventDefault(); // Impede o envio do formulário para testes

        const nome = document.getElementById("nomeUsuario").value
        const email = document.getElementById("criarEmail").value;
        const senha = document.getElementById("criarSenha").value;
        const senha2 = document.getElementById("criarSenha2").value;

        const errorMessage = document.getElementById("error-message");
        const errorMessageSenha = document.getElementById("error-message-senhas");

        // Validação dos campos
        if (nome == "" || email === "" || senha === "" || senha2 === "") {
            errorMessage.classList.remove("d-none");
            errorMessageSenha.classList.add("d-none"); // Esconde a mensagem de senhas diferentes
            return; // Impede o envio do formulário
        } else {
            errorMessage.classList.add("d-none"); // Esconde a mensagem de erro de campos vazios
        }

        // Validação de senhas
        if (senha !== senha2) {
            errorMessageSenha.classList.remove("d-none");
            return; // Impede o envio do formulário
        } else {
            errorMessageSenha.classList.add("d-none"); // Esconde a mensagem de erro de senhas diferentes
        }

        form.submit();
    });
});

/*
document.addEventListener("DOMContentLoaded", function () {
    // Aplica a máscara no campo de telefone
    const telefoneInput = document.getElementById('telefone_tutor');
    const im = new Inputmask("(99) 99999-9999");
    im.mask(telefoneInput);

    // Seleciona o formulário
    const form = document.getElementById("form-consulta");

    // Adiciona o evento de envio ao formulário
    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Impede o envio padrão do formulário

        // Esconde a mensagem de erro inicialmente
        const errorMessage = document.getElementById("error-message");
        errorMessage.classList.add("d-none");

        // Captura os valores do formulário
        const nomeAnimal = document.getElementById("nome_animal").value.trim();
        const especieAnimal = document.getElementById("especie_animal").value.trim();
        const racaAnimal = document.getElementById("raca_animal").value.trim();
        const tipoConsulta = document.getElementById("tipo_consulta").value.trim();
        const nomeTutor = document.getElementById("nome_tutor").value.trim();
        const emailTutor = document.getElementById("email_tutor").value.trim();
        const telefoneTutor = document.getElementById("telefone_tutor").value.trim();
        const dataConsulta = document.getElementById("data").value.trim();
        const horaConsulta = document.getElementById("hora").value.trim();
        const telefoneNumerico = telefoneTutor.replace(/\D/g, "")

        // Validação: Verifica se todos os campos estão preenchidos
        if (
            nomeAnimal === "" ||
            especieAnimal === "Escolha a espécie do animal" ||
            racaAnimal === "" ||
            tipoConsulta === "Escolha o tipo de consulta" ||
            nomeTutor === "" ||
            emailTutor === "" ||
            telefoneTutor === "" ||
            telefoneNumerico.length < 11 ||
            dataConsulta === "" ||
            horaConsulta === ""
        ) {
            errorMessage.classList.remove("d-none"); // Exibe a mensagem de erro
            return; // Para a execução caso falte algum campo
        }

        // Verifica a disponibilidade do horário
        checkAvailability(
            dataConsulta,
            horaConsulta,
            nomeAnimal,
            especieAnimal,
            racaAnimal,
            tipoConsulta,
            nomeTutor,
            emailTutor,
            telefoneTutor
        );
    });
});*/

document.addEventListener("DOMContentLoaded", function () {
    if (typeof jQuery !== "undefined") {
        $(document).ready(function () {
            $('#telefone_tutor, .telefone').mask('(00) 00000-0000');
        });
    } else {
        console.error("Erro: jQuery não foi carregado.");
    }
});

document.addEventListener("DOMContentLoaded", function () {
    if (typeof jQuery !== "undefined") {
        $(document).ready(function () {
            $('#cpf_tutor, .telefone').mask('000.000.000-00');
        });
    } else {
        console.error("Erro: jQuery não foi carregado.");
    }
});


const forms = document.querySelectorAll('.form-consulta'); // Agora seleciona todos os formulários com a classe
forms.forEach(function (form) {
    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Impede o envio padrão do formulário

        // Captura os valores do formulário
        const nomeAnimal = form.querySelector("#nome_animal").value.trim();
        const especieAnimal = form.querySelector("#especie_animal").value.trim();
        const racaAnimal = form.querySelector("#raca_animal").value.trim();
        const tipoConsulta = form.querySelector("#tipo_consulta").value.trim();
        const cpf_tutor = form.querySelector("#cpf_tutor").value.trim();
        const dataConsulta = form.querySelector("#data").value.trim();
        const horaConsulta = form.querySelector("#hora").value.trim();


        // Validação: Verifica se todos os campos estão preenchidos
        if (
            nomeAnimal === "" ||
            especieAnimal === "Escolha a espécie do animal" ||
            racaAnimal === "" ||
            tipoConsulta === "Escolha o tipo de consulta" ||
            cpf_tutor === "" ||
            dataConsulta === "" ||
            horaConsulta === ""
        ) {
            const errorMessage = document.getElementById("error-message");
            errorMessage.classList.remove("d-none"); // Exibe a mensagem de erro
            return; // Para a execução caso falte algum campo
        }

        const btId = event.submitter.id;

        if (btId == 'btAtualizar') {
            id = currentId
            rota = '/editar-consulta'
            metodo = 'PUT'
        } else if (btId == 'btAgendar') {
            id = ''
            rota = '/agendar'
            metodo = 'POST'
        }
        ;
        checkAvailability(
            id,
            rota,
            metodo,
            dataConsulta,
            horaConsulta,
            nomeAnimal,
            especieAnimal,
            racaAnimal,
            tipoConsulta,
            cpf_tutor
        );
    });
});

window.addEventListener("load", function () {
    if (localStorage.getItem("Feito")) {
        mostrarToast();

        // Remove a flag para que o toast não apareça novamente no próximo reload
        localStorage.removeItem("Feito");
    }
});

function checkAvailability(id, rota, metodo, data, hora, nomeAnimal, especieAnimal, racaAnimal, tipoConsulta, cpf_tutor) {
    // Esconde a mensagem de horário indisponível antes de tentar novamente
    document.getElementById("horario-indisponivel-message").classList.add("d-none");
    // Faz a requisição ao backend para verificar a disponibilidade
    fetch('/verificar_horario', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: data, hora: hora }),
    })
        .then(response => response.json())
        .then(responseData => {
            if (responseData.disponivel) {
                // Se o horário estiver disponível, envia os dados do formulário
                submitForm(
                    id,
                    rota,
                    metodo,
                    nomeAnimal,
                    especieAnimal,
                    racaAnimal,
                    tipoConsulta,
                    cpf_tutor,
                    data,
                    hora
                );
            } else {
                // Exibe a mensagem de erro de horário indisponível
                document.getElementById("horario-indisponivel-message").classList.remove("d-none");
            }
        })
        .catch(error => {
            console.error("Erro ao verificar a disponibilidade do horário:", error);
        });
}


function submitForm(id, rota, metodo, nomeAnimal, especieAnimal, racaAnimal, tipoConsulta, cpf_tutor, data, hora) {
    // Faz o envio dos dados para o backend
    fetch(rota, {
        method: metodo,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: id,
            nome_animal: nomeAnimal,
            especie_animal: especieAnimal,
            raca_animal: racaAnimal,
            tipo_consulta: tipoConsulta,
            cpf_tutor: cpf_tutor,
            data_consulta: data,
            hora_consulta: hora,
        }),
    })
        .then(response => {
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                return response.json();
            } else {
                return response.text().then(text => { throw new Error(text); });
            }
        })
        .then(resp => {
            if (resp.success) {
                localStorage.setItem("Feito", "true");
                // Recarrega a página
                console.log(data)
                enviar_email(metodo, nomeAnimal, especieAnimal, racaAnimal, tipoConsulta, cpf_tutor, data, hora)
                location.reload();
            } else {
                alert(`Erro ao agendar consulta: ${resp.message}`);
            }
        })
        .catch(error => {
            console.error("Erro ao enviar os dados:", error);
            alert("Ocorreu um erro ao salvar os dados.");
        });
}


function enviar_email(metodo, nomeAnimal, especieAnimal, racaAnimal, tipoConsulta, cpf_tutor, data, hora) {
    console.log(data)
    fetch("/confirmar-consulta", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nomeAnimal: nomeAnimal,
            cpf_tutor: cpf_tutor,
            data: data,
            hora: hora,
            metodo: metodo,
            especieAnimal: especieAnimal,
            racaAnimal: racaAnimal,
            tipoConsulta: tipoConsulta
        }),
    });;
}


function mostrarToast() {
    var toastEl = document.getElementById('toastConcluido');

    if (toastEl) {
        var toast = new bootstrap.Toast(toastEl, { delay: 3000 }); // Mantém visível por 3 segundos
        toast.show();
    } else {
        console.error("Elemento #toastConcluido não encontrado.");
    }
}


function showConfirmationModal(itemid) {
    // Exibe a tela escurecida
    document.getElementById('overlay').classList.remove('d-none');

    // Inicializa o modal de confirmação
    var myModal = new bootstrap.Modal(document.getElementById('confirmModal'), {
        keyboard: false
    });
    myModal.show();

    // Captura o botão de excluir
    var btExcluir = document.getElementById('confirmDelete'); // Supondo que seu botão de excluir tenha esse id

    // Adiciona evento de clique no botão de excluir
    btExcluir.addEventListener('click', function () {
        fetch('/excluir-consulta', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: itemid })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data.message);  // Log de resposta
                // Fecha o modal após excluir
                myModal.hide();
                document.getElementById('overlay').classList.add('d-none'); // Esconde a tela escurecida
                var myModal2 = new bootstrap.Modal(document.getElementById('successModal'), {
                    keyboard: false
                });
                myModal2.show();

                document.getElementById('successModal').addEventListener('hidden.bs.modal', function () {
                    window.location.reload();  // Recarrega a página quando o modal for fechado
                });

            })
            .catch(error => {
                console.error('Erro ao excluir:', error);
                // Fecha o modal mesmo em caso de erro
                myModal.hide();
                document.getElementById('overlay').classList.add('d-none');
            });
    });
}


function editRow(id) {
    // Abre o modal de edição
    const errorMessage = document.getElementById("error-message");
    errorMessage.classList.add("d-none"); // Retira a mensagem de erro
    var myModal = new bootstrap.Modal(document.getElementById('editModal'));
    myModal.show();

    const row = document.querySelector(`#consulta-${id}`);

    if (row) {
        // Agora você pode usar querySelector para acessar os dados das células da linha
        const nomeAnimal = row.querySelector("td:nth-child(2)").textContent.trim();
        const racaAnimal = row.querySelector("td:nth-child(3)").textContent.trim();
        const tipoAnimal = row.querySelector("td:nth-child(4)").textContent.trim();
        const dataConsulta = row.querySelector("td:nth-child(5)").textContent.trim();
        const horaConsulta = row.querySelector("td:nth-child(6)").textContent.trim();
        const tipoConsulta = row.querySelector("td:nth-child(7)").textContent.trim();
        const nomeTutor = row.querySelector("td:nth-child(9)").textContent.trim();
        const emailTutor = row.querySelector("td:nth-child(10)").textContent;
        const telefoneTutor = row.querySelector("td:nth-child(11)").textContent.trim()
        const cpf_tutor = row.querySelector("td:nth-child(12)").textContent.trim();

        //Tratar data
        const partesData = dataConsulta.split("/");  // Divida a string pela barra
        const dataNew = (`${partesData[2]}-${partesData[1]}-${partesData[0]}`);
        // Preenche o formulário com os dados da linha (opcional)
        document.querySelector("#nome_animal").value = nomeAnimal;
        document.querySelector("#raca_animal").value = racaAnimal;
        document.querySelector("#especie_animal").value = tipoAnimal;
        document.querySelector("#tipo_consulta").value = tipoConsulta;
        document.querySelector("#data").value = dataNew;
        document.querySelector("#hora").value = horaConsulta;
        // document.querySelector("#nome_tutor").value = nomeTutor;
        // document.querySelector("#telefone_tutor").value = telefoneTutor;
        // document.querySelector("#email_tutor").value = emailTutor
        document.querySelector("#cpf_tutor").value = cpf_tutor;

    } else {
        console.error("Linha não encontrada!");
    }

    currentId = row.querySelector("td:nth-child(1)").textContent.trim()
};


const cadtutor = document.querySelectorAll('.form-agendar_tutor');
cadtutor.forEach(function (form) {
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        // Captura os valores do formulário
        const nomeTutor = form.querySelector("#nome_tutor").value.trim();
        const emailTutor = form.querySelector("#email_tutor").value.trim();
        const telefoneTutor = form.querySelector("#telefone_tutor").value.trim();
        const telefoneNumerico = telefoneTutor.replace(/\D/g, "");
        const cpftutor = form.querySelector("#cpf_tutor").value.trim();

        // Validação: Verifica se todos os campos estão preenchidos
        if (
            nomeTutor === "" ||
            emailTutor === "" ||
            telefoneTutor === "" ||
            telefoneNumerico.length < 11 ||
            cpftutor.length < 11
        ) {
            const errorMessage = document.getElementById("error-message");
            errorMessage.classList.remove("d-none"); // Exibe a mensagem de erro
            return; // Para a execução caso falte algum campo
        }

        const btId = event.submitter.id;

        if (btId == 'btAtualizarTutor') {
            id = currentId
            rota = '/editar-tutor'
            metodo = 'PUT'
        } else if (btId == 'btCadTutor') {
            id = ''
            rota = '/cadtutor'
            metodo = 'POST'
        }

        checkTutExist(
            id,
            rota,
            metodo,
            nomeTutor,
            emailTutor,
            telefoneNumerico,
            cpftutor
        );
    });
});

function checkTutExist(id, rota, metodo, nomeTutor, emailTutor, telefoneTutor, cpftutor) {
    // Esconde a mensagem de horário indisponível antes de tentar novamente
    if (metodo === 'POST') {
        document.getElementById("tutor-existente").classList.add("d-none");
    }
    // Faz a requisição ao backend para verificar a disponibilidade
    fetch('/verificar_tutor', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cpf_tutor: cpftutor }),
    })
        .then(response => response.json())
        .then(responseData => {
            if (responseData.disponivel || metodo === 'PUT') {
                // Se o horário estiver disponível, envia os dados do formulário
                submitFormTutor(
                    id,
                    rota,
                    metodo,
                    nomeTutor,
                    emailTutor,
                    telefoneTutor,
                    cpftutor
                );
            } else {
                // Exibe a mensagem de erro de horário indisponível
                document.getElementById("tutor-existente").classList.remove("d-none");
                const errorMsg = document.getElementById("tutor-existente");
                if (errorMsg) {
                    console.log("Elemento encontrado:", errorMsg); // Debug
                    errorMsg.classList.remove("d-none");
                    errorMsg.style.display = "block"; // Força exibição
                }
            }
        })
        .catch(error => {
            console.error("Erro ao verificar a disponibilidade do tutor:", error);
        });
}


function submitFormTutor(id, rota, metodo, nomeTutor, emailTutor, telefoneTutor, cpftutor) {
    // Faz o envio dos dados para o backend
    fetch(rota, {
        method: metodo,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: id,
            nome_tutor: nomeTutor,
            email: emailTutor,
            telefone: telefoneTutor,
            cpf_tutor: cpftutor
        }),
    })
        .then(response => {
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                return response.json();
            } else {
                return response.text().then(text => { throw new Error(text); });
            }
        })
        .then(data => {
            if (data.success) {
                localStorage.setItem("Feito", "true");
                // Recarrega a página
                location.reload();

            } else {
                alert(`Erro ao cadastrar tutor: ${data.message}`);
            }
        })
        .catch(error => {
            console.error("Erro ao enviar os dados:", error);
            alert("Ocorreu um erro ao salvar os dados.");
        });
}



function showConfirmationModaltut(itemid) {
    // Exibe a tela escurecida
    document.getElementById('overlay').classList.remove('d-none');

    // Inicializa o modal de confirmação
    var myModal = new bootstrap.Modal(document.getElementById('confirmModal'), {
        keyboard: false
    });
    myModal.show();

    // Captura o botão de excluir
    var btExcluirTut = document.getElementById('confirmDeleteTut'); // Supondo que seu botão de excluir tenha esse id

    // Adiciona evento de clique no botão de excluir
    btExcluirTut.addEventListener('click', function () {
        fetch('/excluir-tutor', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: itemid })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data.message);  // Log de resposta
                // Fecha o modal após excluir
                myModal.hide();
                document.getElementById('overlay').classList.add('d-none'); // Esconde a tela escurecida
                var myModal2 = new bootstrap.Modal(document.getElementById('successModal'), {
                    keyboard: false
                });
                myModal2.show();

                document.getElementById('successModal').addEventListener('hidden.bs.modal', function () {
                    window.location.reload();  // Recarrega a página quando o modal for fechado
                });

            })
            .catch(error => {
                console.error('Erro ao excluir:', error);
                // Fecha o modal mesmo em caso de erro
                myModal.hide();
                document.getElementById('overlay').classList.add('d-none');
            });
    });
}


function editRowTUT(id) {
    // Abre o modal de edição
    const errorMessage = document.getElementById("error-message");
    errorMessage.classList.add("d-none"); // Retira a mensagem de erro
    var myModal = new bootstrap.Modal(document.getElementById('editModalTUT'));
    myModal.show();

    const row = document.querySelector(`#tutor-${id}`);

    if (row) {
        // Agora você pode usar querySelector para acessar os dados das células da linha
        const nome_tutor = row.querySelector("td:nth-child(2)").textContent.trim();
        const email = row.querySelector("td:nth-child(3)").textContent.trim();
        const telefone = row.querySelector("td:nth-child(4)").textContent.trim();
        const CPF = row.querySelector("td:nth-child(5)").textContent.trim();

        // Preenche o formulário com os dados da linha (opcional)
        document.querySelector("#nome_tutor").value = nome_tutor;
        document.querySelector("#email_tutor").value = email;
        document.querySelector("#cpf_tutor").value = CPF;
        document.querySelector("#telefone_tutor").value = telefone;

    } else {
        console.error("Linha não encontrada!");
    }


    currentId = row.querySelector("td:nth-child(1)").textContent.trim()
    console.log(currentId)
};
