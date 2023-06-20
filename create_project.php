<?php
// conexão com o banco de dados
$conn = new mysqli("localhost", "root", "", "db_projeto");

// verificação da conexão
if ($conn->connect_error) {
    die("Falha na conexão com o banco de dados: " . $conn->connect_error);
}

// receber os dados do formulário
$projeto = $_POST["projeto"];

// inserir os dados no banco de dados
$sql = "INSERT INTO tb_projetos (nome) VALUES ('$projeto')";
if ($conn->query($sql) === TRUE) {
    $id_projeto = $conn->insert_id; // Obtém o ID do último registro inserido
    echo $id_projeto; // Retorna o ID do projeto cadastrado
} else {
    echo "Erro ao cadastrar o projeto: " . $conn->error;
}

// fechar a conexão com o banco de dados
$conn->close();
?>
