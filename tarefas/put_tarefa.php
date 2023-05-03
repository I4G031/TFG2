<?php
// conexão com o banco de dados
$conn = new mysqli("localhost", "root", "", "db_projeto");

// verificação da conexão
if ($conn->connect_error) {
    die("Falha na conexão com o banco de dados: " . $conn->connect_error);
}

// receber os dados do formulário
$id_tarefa  = $_POST["id_tarefa"];
$id_projeto = $_POST["id_projeto"];
$requisito  = $_POST["requisito"];
$descricao  = $_POST["descricao"];
$prioridade = $_POST["prioridade"];

// atualizar os dados da tarefa no banco de dados
$sql = "UPDATE tb_requisitos SET nome = '$requisito', descricao = '$descricao', grau_prioridade = '$prioridade' WHERE id_projeto = '$id_projeto' AND id = '$id_tarefa'";

if ($conn->query($sql) === TRUE) {
    echo "Tarefa atualizada com sucesso!";
} else {
    echo "Erro ao atualizar a tarefa: " . $conn->error;
}

// fechar a conexão com o banco de dados
$conn->close();
?>