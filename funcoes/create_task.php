<?php
// conexão com o banco de dados
$conn = new mysqli("localhost", "root", "", "db_projeto");

// verificação da conexão
if ($conn->connect_error) {
    die("Falha na conexão com o banco de dados: " . $conn->connect_error);
}

// receber os dados do formulário
$id_projeto = $_POST["id_projeto"];
$requisito  = $_POST["requisito"];
$descricao  = $_POST["descricao"];
// $prioridade = $_POST["prioridade"];

// inserir os dados no banco de dados
// $sql = "INSERT INTO tb_requisitos (id_projeto, nome, descricao, grau_prioridade) VALUES ('$id_projeto', '$requisito', '$descricao', '$prioridade')";
$sql = "INSERT INTO tb_requisitos (id_projeto, nome, descricao) VALUES ('$id_projeto', '$requisito', '$descricao')";
if ($conn->query($sql) === TRUE) {
    echo "Tarefa cadastrada com sucesso!";
} else {
    echo "Erro ao cadastrar a tarefa: " . $conn->error;
}

// fechar a conexão com o banco de dados
$conn->close();
?>