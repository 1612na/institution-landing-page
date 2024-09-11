$(document).ready(function() {
    $('input[name="telefone"]').mask('(00) 000000000'); //Mascara para telefone

    $('#formLead').on('submit', function(event) {
        event.preventDefault(); // Previne o envio padrão do formulário

        // Validação do lado do cliente
        var name = $('input[name="name"]').val();
        var phone = $('input[name="telefone"]').val();
        var message = $('input[name="message"]').val();
        var email = $('input[name="email"]').val();

        if (!name) { 
            Swal.fire({
                title: 'Erro de Validação',
                text: 'O nome não pode estar vazio.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return;
        }

        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailPattern.test(email)) {
            Swal.fire({
                title: 'Erro de Validação',
                text: 'Por favor, insira um e-mail válido.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return;
        }

        if (phone.length < 12) {
            Swal.fire({
                title: 'Erro de Validação',
                text: 'Por favor, insira um telefone válido.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return;
        }

        if (message.length < 10) {
            Swal.fire({
                title: 'Erro de Validação',
                text: 'Por favor, insira um telefone válido.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return;
        }

        // Prossegue com a requisição AJAX se a validação passar
        $.ajax({
            url: '../../landing-page-instituicao/src/php/insert_lead.php', // URL do arquivo PHP que irá processar a requisição
            type: 'POST',
            data: $(this).serialize(), // Serializa os dados do formulário
            success: function(response) {
                // Exibe um alerta de sucesso usando SweetAlert
                Swal.fire({
                    title: 'Sucesso!',
                    text: 'Seu formulário foi enviado com sucesso, logo entraremos em contato.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
            },
            error: function() {
                // Exibe um alerta de erro usando SweetAlert
                Swal.fire({
                    title: 'Erro!',
                    text: 'Houve um problema ao enviar seu formulário.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        });
    });
});