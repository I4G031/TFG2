<?php
include_once 'conexao.php';

$sql = "SELECT * FROM registros";
$resultado = mysqli_query($conexao, $sql);
?>
<table>
    <tr>
        <th>ID</th>
        <th>Nome</th>
        <th>Descrição</th>
        <th>Ações</th>
    </tr>
    <?php while($row = mysqli_fetch_array($resultado)){ ?>
        <tr>
            <td><?php echo $row['id']; ?></td>
            <td><?php echo $row['nome']; ?></td>
            <td><?php echo $row['descricao']; ?></td>
            <td>
                <a href="update.php?id=<?php echo $row['id']; ?>">Editar</a>
                <a href="delete.php?id=<?php echo $row['id']; ?>">Excluir</a>
            </td>
        </tr>
    <?php } ?>
</table>
<a href="create.php">Adicionar Novo</a>