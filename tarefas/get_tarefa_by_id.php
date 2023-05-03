<?php
// conexão com o banco de dados
$conn = new mysqli("localhost", "root", "", "db_projeto");

// verificação da conexão
if ($conn->connect_error) {
    die("Falha na conexão com o banco de dados: " . $conn->connect_error);
}

// receber os dados do formulário
$id_projeto = $_GET["id"];
$id_tarefa = $_GET["id_tarefa"];

// inserir os dados no banco de dados
$sql = "SELECT * FROM tb_requisitos WHERE id_projeto = '$id_projeto' AND id = '$id_tarefa'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // converte os resultados para um array associativo
    $rows = array();
    while ($row = $result->fetch_assoc()) {
        $rows[] = $row;
    }
    // retorna os resultados em formato JSON
    echo json_encode($rows);
} else {
    echo "Erro ao cadastrar a tarefa: " . $conn->error;
}

// fechar a conexão com o banco de dados
$conn->close();
?>
