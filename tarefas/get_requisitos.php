<?php
// conexão com o banco de dados
$host = 'localhost';
$dbname = 'db_projeto';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die('Erro ao conectar com o banco de dados: ' . $e->getMessage());
}

// recebe o parâmetro id via HTTP GET
$id = $_GET['id'];

// consulta as tarefas do projeto especificado no banco de dados
$query = 'SELECT * FROM tb_requisitos WHERE id_projeto = :id';
$stmt = $pdo->prepare($query);
$stmt->bindValue(':id', $id, PDO::PARAM_INT);
$stmt->execute();

// retorna as tarefas em formato JSON
echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
?>
