<?php
include_once 'conexao.php';

$id = $_GET['id'];

$sql = "DELETE FROM tb_requisitos WHERE id=?";
$stmt = mysqli_prepare($conexao, $sql);
mysqli_stmt_bind_param($stmt, "i", $id);
mysqli_stmt_execute($stmt);
mysqli_stmt_close($stmt);

header("Location: read.php");
exit();
?>