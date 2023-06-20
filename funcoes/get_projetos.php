<?php
// conexão com o banco de dados
$host = 'localhost';
$dbname = 'db_projeto';
$username = 'root';
$password = 'root';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die('Erro ao conectar com o banco de dados: ' . $e->getMessage());
}

// consulta os projetos no banco de dados
$query = 'SELECT * FROM tb_projetos';
$stmt = $pdo->query($query);

// retorna os projetos em formato JSON
echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
?>