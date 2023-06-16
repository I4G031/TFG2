<?php
// conexão com o banco de dados
$conn = new mysqli("localhost", "root", "root", "db_projeto");

// verificação da conexão
if ($conn->connect_error) {
    die("Falha na conexão com o banco de dados: " . $conn->connect_error);
}

// receber os dados do formulário
$id_projeto = $_POST["id_projeto"];
$requisito = $_POST["requisito"];
$descricao = $_POST["descricao"];
$prioridade = $_POST["prioridade"];
$id_tarefa = $_POST["id"];

echo "String: ".$sql;

// inserir os dados no banco de dados
$sql = "UPDATE tb_tarefas SET requisito = '$requisito', descricao = '$descricao', prioridade = $prioridade WHERE id = $id_tarefa AND id_projeto =$id_projeto";

echo "String: ".$sql;

if ($conn->query($sql) === TRUE) {
    echo "Tarefa cadastrada com sucesso!";
} else {
    echo "Erro ao cadastrar a tarefa: " . $conn->error;
}

// fechar a conexão com o banco de dados
$conn->close();
?>
