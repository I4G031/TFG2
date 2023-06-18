<?php
// conexão com o banco de dados
$conn = new mysqli("localhost", "root", "root", "db_projeto");

// verificação da conexão
if ($conn->connect_error) {
    die("Falha na conexão com o banco de dados: " . $conn->connect_error);
}

// receber os dados do formulário
$id_projeto = $_POST["id_projeto"];
$id = $_POST["id"];
$prioridade_moscow = $_POST["prioridade_moscow"];

$prioridade_gravidade   = $_POST["prioridade_gravidade"];
$prioridade_urgencia    = $_POST["prioridade_urgencia"];
$prioridade_tendencia   = $_POST["prioridade_tendencia"];


// inserir os dados no banco de dados
// $sql = "INSERT INTO tb_requisitos (id_projeto, nome, descricao, grau_prioridade) VALUES ('$id_projeto', '$requisito', '$descricao', '$prioridade')";
$sql = "UPDATE tb_requisitos SET prioridade_gravidade = '$prioridade_gravidade', prioridade_urgencia = '$prioridade_urgencia', prioridade_tendencia = '$prioridade_tendencia' WHERE id_projeto = '$id_projeto' AND id = '$id'";
echo "sql: ".$sql;
if ($conn->query($sql) === TRUE) {
    echo "Tarefa cadastrada com sucesso!";
} else {
    echo "Erro ao cadastrar a tarefa: " . $conn->error;
}

// fechar a conexão com o banco de dados
$conn->close();
?>