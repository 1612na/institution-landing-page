<?php
// Conexão com o banco de dados
$servername = "localhost"; 
$username = "root"; // Usuário 
$password = ""; // Senha
$dbname = "faesa"; // Nome do banco de dados

// Criando a conexão
$conn = new mysqli($servername, $username, $password, $dbname);

// Verifica se a conexão foi bem-sucedida
if ($conn->connect_error) {
    die("Falha na conexão: " . $conn->connect_error);
}

// Pegando os dados do formulário
$nome = $_POST['name'];
$email = $_POST['email'];
$telefone = $_POST['telefone'];
$mensagem = isset($_POST['message']) ? $_POST['message'] : "";

$telefone = str_replace(['(', ')', ' '], '', $telefone);

//Validações de email existente no banco de dados, etc

// Preparando a consulta SQL para inserção
$sql = "INSERT INTO leads (nome, email, telefone, mensagem) VALUES (?, ?, ?, ?)";

// Preparando o statement para evitar SQL Injection
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssss", $nome, $email, $telefone, $mensagem);

// Executando a consulta
if ($stmt->execute()) {
    echo json_encode(['status' => 'success', 'message' => 'Dados inseridos com sucesso!']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Erro ao inserir dados: ' . $conn->error]);
}

// Fechando a conexão
$stmt->close();
$conn->close();
?>