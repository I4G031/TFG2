<?php
// conexão com o banco de dados
$conn = new mysqli("localhost", "root", "root", "db_projeto");

// verificação da conexão
if ($conn->connect_error) {
    die("Falha na conexão com o banco de dados: " . $conn->connect_error);
}

// receber os dados do formulário
$id_projeto = $_POST["id_projeto"];
$id_tarefa = $_POST["id_tarefa"];

// excluir a tarefa do banco de dados
$sql = "DELETE FROM tb_requisitos WHERE id_projeto = '$id_projeto' AND id = '$id_tarefa'";
if ($conn->query($sql) === TRUE) {
    echo "Tarefa excluída com sucesso!";
} else {
    echo "Erro ao excluir a tarefa: " . $conn->error;
}

// fechar a conexão com o banco de dados
$conn->close();
?>