
$(document).ready(function() {
	// Obter a string 'de consulta da URL
	var queryString = window.location.search;
	// Analisar a string de consulta usando URLSearchParams
	var urlParams = new URLSearchParams(queryString);
	// Obter o valor do parâmetro "id"
 
    const id_projeto = urlParams.get("id");
    const id_tarefa = urlParams.get("id_tarefa");

	if(id_tarefa != null){
		$.ajax({
			type: 'GET',
			url: '../funcoes/get_tarefa_by_id.php?id='+id_projeto+'&id_tarefa='+id_tarefa,
			data: null,
			success: function(response) {
				var response = JSON.parse(response);
				$('#id-tarefa').val(response[0].id);
				$('#id-projeto').val(response[0].id_projeto);
				$('#requisito').val(response[0].requisito);
				$('#descricao').val(response[0].descricao);
				//$('#prioridade').val(response[0].prioridade);
				table.ajax.reload();
			},
			error: function() {
				Swal.fire({
					title: 'Erro ao cadastrar a tarefa',
					icon: 'error'
				});
			}
		});
	}

	// Atribuir o valor ao campo de texto
	$("#id-projeto").val(id_projeto);
	$("#id-tarefa").val(id_tarefa);

	$('#btn-clear').on('click', function(){
		window.location.href = './tarefas.html?id=' + id_projeto;
	});

	$('#btn-ordenar').on('click', function(){
		var tableData = $('#list-table').DataTable().rows().data();

		// Faça algo com os dados aqui
		console.log(tableData); // Exemplo: exibir os dados no console
		for (var i = 0; i <tableData.length; i++) {
			console.log(tableData[i]);
			console.log($('#data-id-moscow').val());
		  }

 	 });

	// Enviar o formulário quando o botão for clicado
	$('#btn-save').on('click', function(event) {
		event.preventDefault();
		// seleciona os campos do formulário
		var id_projeto = $('#id-projeto').val();
		var id_task    = $('#id-tarefa').val();
		var requisito  = $('#requisito').val();
		var descricao  = $('#descricao').val();
		// var prioridade = $('#prioridade').val();

		// verifica se todos os campos foram preenchidos
		if (id_projeto  == null ||  id_projeto.trim() === '' ||
    		//  id_task    == null || id_task.trim() === ''     ||
    		 requisito  == null ||  requisito.trim() === ''  ||
    		//  prioridade == null || prioridade.trim() === ''  ||
     		 descricao  == null || descricao.trim() === '') {
				Swal.fire({
					title: 'Por favor, preencha todos os campos',
					icon: 'warning'
				});
		}else{
			if($('#id-tarefa').val() == null ||$('#id-tarefa').val() == ''){
				console.log('O valor dentro do if é: ', $('#id-tarefa').val());
				$.ajax({
					type: 'POST',
					url: '../funcoes/create_task.php',
					// data: {id_projeto: id_projeto.value, requisito: requisito.value, descricao: descricao.value, prioridade: prioridade.value},
					data: {id_projeto: id_projeto.value, requisito: requisito.value, descricao: descricao.value},
					success: function() {
						window.location.href = './tarefas.html?id=' + id_projeto.value;
					},
					error: function() {
						Swal.fire({
							title: 'Erro ao cadastrar a tarefa',
							icon: 'error'
						});
					}
				});
			}else{
				$.ajax({
					type: 'POST',
					url: '../funcoes/put_tarefa.php',
					// data: {id_projeto: id_projeto, id_tarefa: id_task, requisito: requisito, descricao: descricao, prioridade: prioridade},
					data: {id_projeto: id_projeto, id_tarefa: id_task, requisito: requisito, descricao: descricao},
					success: function() {
						console.log("sucesso");
						Swal.fire({
							title: 'Tarefa cadastrada com sucesso!',
							icon: 'success'
						});
						$('#id-tarefa').val('');
						$('#requisito').val('');
						$('#descricao').val('');
						// $('#prioridade').val('');
						table.ajax.reload();
					},
					error: function() {
						console.log("erro");
						Swal.fire({
							title: 'Erro ao cadastrar a tarefa',
							icon: 'error'
						});
					}
				});
			}
		}
	});

	$('#list-table').on('click', '.btn-del', function(event) {
		event.preventDefault();
		let id_pro = $(this).data('id-projeto');
		let id_task = $(this).data('id-tarefa');
		console.log('id_projeto: ',id_pro);
		console.log('id_tarefa: ',id_task);
		$.ajax({
		  type: 'POST',
		  url: '../funcoes/del_tarefa.php',
		  data: { id_projeto: id_pro,id_tarefa:id_task},
		  success: function() {
			table.ajax.reload();
		  },
		  error: function() {
			Swal.fire({
			  title: 'Erro ao excluir a tarefa',
			  icon: 'error'
			});
		  }
		});
	  });
	  
	  
	$('#list-table').on('click', '.btn-edit', function(event) {
		event.preventDefault();
	
		let id_pro = $(this).data('id-projeto');
		let id_task = $(this).data('id-tarefa');
		let req = $(this).data('id-requisito');
		let desc = $(this).data('id-descricao');
		// let pri = $(this).data('id-grau-prioridade');
		$('#id-projeto').val(id_pro)
		$('#id-tarefa').val(id_task)
		$('#requisito').val(req)
		$('#descricao').val(desc)
		// $('#prioridade').val(pri)

	  });
	  

	var initLoad = true;
	
	var table = $('#list-table').DataTable({
		ajax: {
			url: '../funcoes/get_requisitos.php?id='+id_projeto,
			type: 'GET',
			dataSrc: ''
		},
		order: [1],
		columns: [
			{ data: 'id' },
			{ data: 'id' },
			{ data: 'nome' },
			{ data: 'descricao' },
			{ data: 'grau_prioridade' },
			{ data: 'id_projeto' },
			{ data: '' },
			{ data: '' }
		],
		columnDefs: [
			{
				className: 'control',
				responsivePriority: 2,
				targets: 0
			},
			{
				targets: 1,
				visible: false,
				render: function (data, type, full, meta) {
					return formatColumnText(full['id']);
				}
			},
			{
				targets: 2,
				render: function (data, type, full, meta) {
					return formatColumnText(full['nome']);
				}
			},
			{
				targets: 3,
				render: function (data, type, full, meta) {
					return formatColumnText(full['descricao']);
				}
			},
			{
				visible: false,
				targets: 4,
				render: function (data, type, full, meta) {
					return formatColumnText(full['grau_prioridade']);
				}
			},
			{
				targets: 5,
				visible: false,
				render: function (data, type, full, meta) {
					return formatColumnText(full['id_projeto']);
				}
			},	
			{
				visible:false,
				targets: 6,
				render: function (data, type, full, meta) {
					return '<button class="btn btn-success btn-edit" data-id-tarefa="' + full.id + '"  data-id-requisito="' + full.nome + '" data-id-descricao="' + full.descricao + '"  data-id-grau-prioridade="' + full.grau_prioridade + '"  data-id-projeto="' + id_projeto + '">Edit</button><button class="btn btn-danger btn-del" data-id-tarefa="' + full.id + '" data-id-projeto="' + id_projeto + '">Del</button>';
				}
			},
			{
				targets: 7,
				render: function (data, type, full, meta) {
					return '  <select class="form-select" data-id-moscow="'+full.id+'" id="prioridade_moscow" name="prioridade_moscow" aria-label="Prioridade">'+
					'<option selected disabled></option>'+
					'<option value="1">Must Have</option>'+
					'<option value="2">Should have</option>'+
					'<option value="3">Could have</option>'+
					'<option value="4">Wont Grave</option>'+
				'</select>';
				}
			},
			{
				visible:false,
				targets: 8,
				render: function (data, type, full, meta) {
					return '  <select class="form-select" data-id-gut="'+full.id+'" id="prioridade_gut" name="prioridade_gut" aria-label="Prioridade">'+
					'<option selected disabled></option>'+
					'<option value="1">Sem Gravidade</option>'+
					'<option value="2">Pouco Grave</option>'+
					'<option value="3">Grave</option>'+
					'<option value="4">Muito Grave</option>'+
					'<option value="5">Extremamente Grave</option>'+
				'</select>';
				}
			}
		],
	});

	function formatColumnText(text) {
		var $rowOutput =
			'<div class="d-flex justify-content-left align-items-center">' +
			'<div class="d-flex flex-column">' +
			'<h6 class="user-name text-truncate mb-0">' +
			text +
			'</h6>' +
			'</div>' +
			'</div>';
		return $rowOutput;
	}

	function formatColumnButtons(buttons) {
		var ret = '<div class="d-flex align-items-center col-actions">';
		$.each(buttons, function (index, button) {
			if (button.property == null) {
				button.property = '';
			}
			ret += '<a href="' + button.action + '" class="dropdown-item ' + button.class + '" ' + button.property + '>' + button.text + '</a>';
		});
		ret += '</div>';
		return ret;
	}
	
});