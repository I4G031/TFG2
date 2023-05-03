<?php
include_once 'conexao.php';

if(isset($_POST['submit'])){
    $id = $_POST['id'];
    $nome = $_POST['nome'];
    $descricao = $_POST['descricao'];

    $sql = "UPDATE registros SET nome=?, descricao=? WHERE id=?";
    $stmt = mysqli_prepare($conexao, $sql);
    mysqli_stmt_bind_param($stmt, "ssi", $nome, $descricao, $id);
    mysqli_stmt_execute($stmt);
    mysqli_stmt_close($stmt);

    header("Location: read.php");
    exit();
} else {
    $id = $_GET['id'];

    $sql = "SELECT * FROM tb_requisitos WHERE id=?";
    $stmt = mysqli_prepare($conexao, $sql);
    mysqli_stmt_bind_param($stmt, "i", $id);
    mysqli_stmt_execute($stmt);
    $resultado = mysqli_stmt_get_result($stmt);
    $row = mysqli_fetch_array($resultado);
    mysqli_stmt_close($stmt);
}
?>

<form method="post" action="">
    <input type="hidden" name="id" value="<?php echo $row['id']; ?>">
    <label for="nome">Nome:</label>
    <input type="text" name="nome" id="nome" value="<?php echo $row['nome']; ?>">
    <br>
    <label for="descricao">Descrição:</label>
    <textarea name="descricao" id="descricao"><?php echo $row['descricao']; ?></textarea>
    <br>
    <input type="submit" name="submit" value="Salvar">
</form>
