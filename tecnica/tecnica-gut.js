$(document).ready(function() {
    // Obter a string 'de consulta da URL
    var queryString = window.location.search;
    // Analisar a string de consulta usando URLSearchParams
    var urlParams = new URLSearchParams(queryString);
    // Obter o valor do parâmetro "id"

    const id_projeto = urlParams.get("id");
    const id_tarefa = urlParams.get("id_tarefa");
    const tecnica = urlParams.get("tecnica");

    if (id_tarefa != null) {
        $.ajax({
            type: 'GET',
            url: '../funcoes/get_tarefa_by_id.php?id=' + id_projeto + '&id_tarefa=' + id_tarefa,
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

    $('#btn-fim').on('click', function(){
        window.location.href = '../index.html?id=' + id_projeto;
    });

    $('#btn-clear').on('click', function() {
        window.location.href = './tarefas.html?id=' + id_projeto;
    });

    $('#btn-ordenar').on('click', function(e) {
        e.stopPropagation();
        var table = $('#list-table').DataTable();
        var rows = table.rows().nodes();
        var i = 0;
        var vetorIds = [];
        var vetorGeral = [];
        var vetorG = [];
        var vetorU = [];
        var vetorT = [];

        rows.each(function() {
            var row = $(this);
            var idCell = $(row).find('td:first');

            var idString = idCell[i].innerHTML;
            vetorIds.push(idString);

            var selects = row.find('select');
            selects.each(function() {
                var select = $(this);
                var selectedValue = select.val();
                if (i == idCell.length - 1) {
                    vetorGeral.push(selectedValue);
                }
            });

            i = i + 1;
        });

        var recortInicial = 0;
        var recorteFinal = 3;
        for (var i = 0; i < vetorIds.length; i++) {
            let vetorTemp = vetorGeral.slice(recortInicial, recorteFinal);
            vetorG.push(vetorGeral[recortInicial]);
            vetorU.push(vetorGeral[recortInicial + 1]);
            vetorT.push(vetorGeral[recortInicial + 2]);
            recortInicial = recortInicial + 3;
            recorteFinal = recorteFinal + 3;
        }
        for (var j = 0; j < vetorIds.length; j++) {

            var objeto = {
                id_projeto: id_projeto,
                id: vetorIds[j],
                prioridade_gravidade: vetorG[j][0],
                prioridade_urgencia: vetorU[j][0],
                prioridade_tendencia: vetorT[j][0]
            };
			
            $.ajax({
                url: "../funcoes/update_gut.php",
                type: "POST",
                data: objeto,
                success: function(response) {
                    window.location.href = './tecnica-gut.html?id=' + id_projeto + '&tecnica=2';
                },
                error: function(ex) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Algo deu errado, tente mais tarde!'
                    });
                }
            });
        }
    });

    var initLoad = true;
    if (tecnica == null) {
        var table = $('#list-table').DataTable({
            ajax: {
                url: '../funcoes/get_requisitos.php?id=' + id_projeto,
                type: 'GET',
                dataSrc: ''
            },
            //order: [0],
            columns: [{
                    data: 'id'
                },
                {
                    data: 'id'
                },
                {
                    data: 'nome'
                },
                {
                    data: 'descricao'
                },
                {
                    data: 'grau_prioridade'
                },
                {
                    data: 'id_projeto'
                },
                {
                    data: 'prioridade_moscow'
                },
                {
                    data: ''
                },
                {
                    data: ''
                },
                {
                    data: ''
                }
            ],
            columnDefs: [{
                    className: 'control',
                    responsivePriority: 2,
                    targets: 0
                },
                {
                    targets: 1,
                    visible: false,
                    render: function(data, type, full, meta) {
                        return formatColumnText(full['id']);
                    }
                },
                {
                    targets: 2,
                    render: function(data, type, full, meta) {
                        return formatColumnText(full['nome']);
                    }
                },
                {
                    targets: 3,
                    render: function(data, type, full, meta) {
                        return formatColumnText(full['descricao']);
                    }
                },
                {
                    visible: false,
                    targets: 4,
                    render: function(data, type, full, meta) {
                        return formatColumnText(full['grau_prioridade']);
                    }
                },
                {
                    targets: 5,
                    visible: false,
                    render: function(data, type, full, meta) {
                        return formatColumnText(full['id_projeto']);
                    }
                },
                {
                    targets: 6,
                    visible: false,
                    render: function(data, type, full, meta) {
                        return '  <select class="form-select" data-id-gut="' + full.id + '" id="prioridade_gut" name="prioridade_gut" aria-label="Prioridade">' +
                            '<option selected disabled></option>' +
                            '<option value="1">Must Have</option>' +
                            '<option value="2">Should have</option>' +
                            '<option value="3">Could Have</option>' +
                            '<option value="4">Wont Have</option>' +
                            '</select>';
                    }
                },
                {
                    targets: 7,
                    visible: true,
                    render: function(data, type, full, meta) {
                        return '  <select class="form-select" data-id-moscow="' + full.prioridade_moscow + '" id="prioridade_moscow" name="prioridade_moscow" aria-label="Prioridade">' +
                            '<option selected></option>' +
                            '<option value="1">Sem Gravidade</option>' +
                            '<option value="2">Pouco Grave</option>' +
                            '<option value="3">Grave</option>' +
                            '<option value="4">Muito Grave</option>' +
                            '<option value="5">Extrematente Grave</option>' +
                            '</select>';
                    }
                },
                {
                    targets: 8,
                    visible: true,
                    render: function(data, type, full, meta) {
                        return '  <select class="form-select" data-id-moscow="' + full.prioridade_moscow + '" id="prioridade_moscow" name="prioridade_moscow" aria-label="Prioridade">' +
                            '<option selected></option>' +
                            '<option value="1">Sem Pressa Alguma</option>' +
                            '<option value="2">Pode Aguardar</option>' +
                            '<option value="3">Agir o Quanto Antes</option>' +
                            '<option value="4">Agir com Alguma Urgência</option>' +
                            '<option value="5">Agir Imediantamente</option>' +
                            '</select>';
                    }
                },
                {
                    targets: 9,
                    visible: true,
                    render: function(data, type, full, meta) {
                        return '  <select class="form-select" data-id-moscow="' + full.prioridade_moscow + '" id="prioridade_moscow" name="prioridade_moscow" aria-label="Prioridade">' +
                            '<option selected></option>' +
                            '<option value="1">Não Vai Agravar, Pode Até Melhorar</option>' +
                            '<option value="2">Vai Agravar No longo do Prazo</option>' +
                            '<option value="3">Vai Agravar No Médio do Prazo</option>' +
                            '<option value="4">Vai Agravar em Pouco Tempo</option>' +
                            '<option value="5">Vai Agravar Rapidamente</option>' +
                            '</select>';
                    }
                },
            ],
        });
    } else if (tecnica == 2) {

        var dataTableData = []; // Array para armazenar os dados do DataTable

        $.ajax({
            type: 'GET',
            url: '../funcoes/get_requisitos.php?id=' + id_projeto,
            success: function(resp) {

                // Analisar a string JSON para obter um array de objetos
                var requisitos = JSON.parse(resp);

                // Verificar se requisitos é um array
                if (Array.isArray(requisitos)) {
                    // Preencher o array com os dados retornados pelo Ajax
					dataTableData = requisitos.map(function(requisito) {
						return {
						  id: requisito.id,
						  nome: requisito.nome,
						  descricao: requisito.descricao,
						  id_projeto: requisito.id_projeto,
						  prioridade_moscow: requisito.prioridade_moscow,
						  prioridade_gravidade: requisito.prioridade_gravidade,
						  prioridade_urgencia: requisito.prioridade_urgencia,
						  prioridade_tendencia: requisito.prioridade_tendencia,
						  prioridade_gut: requisito.prioridade_gravidade*requisito.prioridade_urgencia*requisito.prioridade_tendencia,
						  multiplicacao_prioridades: requisito.prioridade_gravidade * requisito.prioridade_urgencia * requisito.prioridade_tendencia
						};
					  }).sort(function(a, b) {
						return a.multiplicacao_prioridades - b.multiplicacao_prioridades;
					  });				  

                    var table = $('#list-table').DataTable({
                        data: dataTableData,
                        columns: [{
                                data: 'id',
                                title: 'ID'
                            },
                            {
                                data: 'nome',
                                title: 'Nome'
                            },
                            {
                                data: 'descricao',
                                title: 'Requisito'
                            },
                            {
                                data: 'id_projeto',
                                title: 'Descrição'
                            },
                            {
                                data: 'prioridade_moscow',
                                title: 'Prioridade Moscow'
                            },
                            {
                                data: 'prioridade_gut',
                                title: 'Prioridade Moscow'
                            },
                            {
                                data: 'prioridade_urgencia',
                                title: 'Prioridade Gravidade'
                            },
                            {
                                data: 'prioridade_tendencia',
                                title: 'Prioridade Urgencia'
                            },
                            {
                                data: 'tendencia',
                                title: 'Prioridade Tendência'
                            },
                            {
                                data: 'prioridade_gravidade',
                                title: 'Resultado Gut'
                            }
                        ],
						order: [[6, 'desc']],
						visible: true,
                        columnDefs: [
							{
                                className: 'control',
                                responsivePriority: 2,
                                targets: 0
                            },
                            {
                                targets: 1,
								visible: false,
                                render: function(data, type, full, meta) {
                                    return formatColumnText(full['id']);
                                }
                            },
                            {
                                targets: 2,
                                render: function(data, type, full, meta) {
                                    return formatColumnText(full['nome']);
                                }
                            },
                            {
                                targets: 3,
                                render: function(data, type, full, meta) {
                                    return formatColumnText(full['descricao']);
                                }
                            },
                            {
								targets: 4,
								visible: false,
                                render: function(data, type, full, meta) {
                                    return formatColumnText(full['id_projeto']);
                                }
                            },
                            {
                                targets: 5,
								visible: false,
                                render: function(data, type, full, meta) {
                                    return formatColumnText(full['prioridade_moscow']);
                                }
                            },
                            {
								targets: 6,
                                visible: true,
                                render: function(data, type, full, meta) {
                                    if (full['prioridade_gravidade'] == 1) {
                                        return '  <select class="form-select" data-id-gut-gravidade="' + full['prioridade_gravidade'] + '" name="prioridade_gut" aria-label="Prioridade">' +
                                            '<option selected value="1">Sem Gravidade</option>' +
                                            '<option value="2">Pouco Grave</option>' +
                                            '<option value="3">Grave</option>' +
                                            '<option value="4">Muito Grave</option>' +
                                            '<option value="5">Extrematente Grave</option>' +
                                            '</select>';
                                    } else if (full['prioridade_gravidade'] == 2) {
                                        return '  <select class="form-select" data-id-gut-gravidade="' + full['prioridade_gravidade'] + '" name="prioridade_gut" aria-label="Prioridade">' +
                                            '<option value="1">Sem Gravidade</option>' +
                                            '<option selected value="2">Pouco Grave</option>' +
                                            '<option value="3">Grave</option>' +
                                            '<option value="4">Muito Grave</option>' +
                                            '<option value="5">Extrematente Grave</option>' +
                                            '</select>';
                                    } else if (full['prioridade_gravidade'] == 3) {
                                        return '  <select class="form-select" data-id-gut-gravidade="' + full['prioridade_gravidade'] + '" name="prioridade_gut" aria-label="Prioridade">' +
                                            '<option value="1">Sem Gravidade</option>' +
                                            '<option value="2">Pouco Grave</option>' +
                                            '<option selected value="3">Grave</option>' +
                                            '<option value="4">Muito Grave</option>' +
                                            '<option value="5">Extrematente Grave</option>' +
                                            '</select>';
                                    } else if (full['prioridade_gravidade'] == 4) {
                                        return '  <select class="form-select" data-id-gut-gravidade="' + full['prioridade_gravidade'] + '" name="prioridade_gut" aria-label="Prioridade">' +
                                            '<option value="1">Sem Gravidade</option>' +
                                            '<option value="2">Pouco Grave</option>' +
                                            '<option value="3">Grave</option>' +
                                            '<option selected value="4">Muito Grave</option>' +
                                            '<option value="5">Extrematente Grave</option>' +
                                            '</select>';
                                    } else if (full['prioridade_gravidade'] == 5) {
                                        return '  <select class="form-select" data-id-gut-gravidade="' + full['prioridade_gravidade'] + '" name="prioridade_gut" aria-label="Prioridade">' +
                                            '<option value="1">Sem Gravidade</option>' +
                                            '<option value="2">Pouco Grave</option>' +
                                            '<option value="3">Grave</option>' +
                                            '<option value="4">Muito Grave</option>' +
                                            '<option selected value="5">Extrematente Grave</option>' +
                                            '</select>';
                                    }
                                }
                            },
                            {
                                targets: 7,
                                visible: true,
                                render: function(data, type, full, meta) {
                                    if (full['prioridade_urgencia'] == 1) {
                                        return '  <select class="form-select" data-id-gut-urgencia="' + full['prioridade_urgencia'] + '" name="prioridade_gut" aria-label="Prioridade">' +
                                            '<option selected value="1">Sem Pressa Alguma</option>' +
                                            '<option value="2">Pode Aguardar</option>' +
                                            '<option value="3">Agir o Quanto Antes</option>' +
                                            '<option value="4">Agir com Alguma Urgência</option>' +
                                            '<option value="5">Agir Imediantamente</option>' +
                                            '</select>';
                                    } else if (full['prioridade_urgencia'] == 2) {
                                        return '  <select class="form-select" data-id-gut-urgencia="' + full['prioridade_urgencia'] + '" name="prioridade_gut" aria-label="Prioridade">' +
                                            '<option value="1">Sem Pressa Alguma</option>' +
                                            '<option selected value="2">Pode Aguardar</option>' +
                                            '<option value="3">Agir o Quanto Antes</option>' +
                                            '<option value="4">Agir com Alguma Urgência</option>' +
                                            '<option value="5">U5</option>' +
                                            '</select>';
                                    } else if (full['prioridade_urgencia'] == 3) {
                                        return '  <select class="form-select" data-id-gut-urgencia="' + full['prioridade_urgencia'] + '" name="prioridade_gut" aria-label="Prioridade">' +
                                            '<option value="1">Sem Pressa Alguma</option>' +
                                            '<option value="2">Pode Aguardar</option>' +
                                            '<option selected value="3">Agir o Quanto Antes</option>' +
                                            '<option value="4">Agir com Alguma Urgência</option>' +
                                            '<option value="5">Agir Imediantamente</option>' +
                                            '</select>';
                                    } else if (full['prioridade_urgencia'] == 4) {
                                        return '  <select class="form-select" data-id-gut-urgencia="' + full['prioridade_urgencia'] + '" name="prioridade_gut" aria-label="Prioridade">' +
                                            '<option value="1">Sem Pressa Alguma</option>' +
                                            '<option value="2">Pode Aguardar</option>' +
                                            '<option value="3">Agir o Quanto Antes</option>' +
                                            '<option selected value="4">Agir com Alguma Urgência</option>' +
                                            '<option value="5">Agir Imediantamente</option>' +
                                            '</select>';
                                    } else if (full['prioridade_urgencia'] == 5) {
                                        return '  <select class="form-select" data-id-gut-urgencia="' + full['prioridade_urgencia'] + '" name="prioridade_gut" aria-label="Prioridade">' +
                                            '<option value="1">Sem Pressa Alguma</option>' +
                                            '<option value="2">Pode Aguardar</option>' +
                                            '<option value="3">Agir o Quanto Antes</option>' +
                                            '<option value="4">Agir com Alguma Urgência</option>' +
                                            '<option selected value="5">Agir Imediantamente</option>' +
                                            '</select>';
                                    }
                                }
                            },
                            {
                                targets: 8,
                                visible: true,
                                render: function(data, type, full, meta) {
                                    if (full['prioridade_tendencia'] == 1) {
                                        return '  <select class="form-select" data-id-gut-urgencia="' + full['prioridade_tendencia'] + '" name="prioridade_gut" aria-label="Prioridade">' +
                                            '<option selected value="1">Não Vai Agravar, Pode Até Melhorar</option>' +
                                            '<option value="2">Vai Agravar No longo do Prazo</option>' +
                                            '<option value="3">Vai Agravar No Médio do Prazo</option>' +
                                            '<option value="4">Vai Agravar em Pouco Tempo</option>' +
                                            '<option value="5">Vai Agravar Rapidamente</option>' +
                                            '</select>';
                                    } else if (full['prioridade_tendencia'] == 2) {
                                        return '  <select class="form-select" data-id-gut-urgencia="' + full['prioridade_tendencia'] + '" name="prioridade_gut" aria-label="Prioridade">' +
                                            '<option value="1">Não Vai Agravar, Pode Até Melhorar</option>' +
                                            '<option selected value="2">Vai Agravar No longo do Prazo</option>' +
                                            '<option value="3">Vai Agravar No Médio do Prazo</option>' +
                                            '<option value="4">Vai Agravar em Pouco Tempo</option>' +
                                            '<option value="5">Vai Agravar Rapidamente</option>' +
                                            '</select>';
                                    } else if (full['prioridade_tendencia'] == 3) {
                                        return '  <select class="form-select" data-id-gut-urgencia="' + full['prioridade_tendencia'] + '" name="prioridade_gut" aria-label="Prioridade">' +
                                            '<option value="1">Não Vai Agravar, Pode Até Melhorar</option>' +
                                            '<option value="2">Vai Agravar No longo do Prazo</option>' +
                                            '<option selected value="3">Vai Agravar No Médio do Prazo</option>' +
                                            '<option value="4">Vai Agravar em Pouco Tempo</option>' +
                                            '<option value="5">Vai Agravar Rapidamente</option>' +
                                            '</select>';
                                    } else if (full['prioridade_tendencia'] == 4) {
                                        return '  <select class="form-select" data-id-gut-urgencia="' + full['prioridade_tendencia'] + '" name="prioridade_gut" aria-label="Prioridade">' +
                                            '<option value="1">Não Vai Agravar, Pode Até Melhorar</option>' +
                                            '<option value="2">Vai Agravar No longo do Prazo</option>' +
                                            '<option value="3">Vai Agravar No Médio do Prazo</option>' +
                                            '<option selected value="4">Vai Agravar em Pouco Tempo</option>' +
                                            '<option value="5">Vai Agravar Rapidamente</option>' +
                                            '</select>';
                                    } else if (full['prioridade_tendencia'] == 5) {
                                        return '  <select class="form-select" data-id-gut-urgencia="' + full['prioridade_tendencia'] + '" name="prioridade_gut" aria-label="Prioridade">' +
                                            '<option value="1">Não Vai Agravar, Pode Até Melhorar</option>' +
                                            '<option value="2">Vai Agravar No longo do Prazo</option>' +
                                            '<option value="3">Vai Agravar No Médio do Prazo</option>' +
                                            '<option value="4">Vai Agravar em Pouco Tempo</option>' +
                                            '<option selected value="5">Vai Agravar Rapidamente</option>' +
                                            '</select>';
                                    }
                                }
                            },
                            {
                                targets: 9,
                                render: function(data, type, full, meta) {
                                    return formatColumnText(full['prioridade_gut']);
                                }
                            }
                        ]
                    });
                } else {
                    console.log("O retorno não é um array válido:", requisitos);
                }
                $('#btn-fim').removeClass('d-none');
            },
            error: function(xhr, status, error) {
                console.log("Erro na requisição AJAX: ", error);
            }
        });

    }

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
        $.each(buttons, function(index, button) {
            if (button.property == null) {
                button.property = '';
            }
            ret += '<a href="' + button.action + '" class="dropdown-item ' + button.class + '" ' + button.property + '>' + button.text + '</a>';
        });
        ret += '</div>';
        return ret;
    }

});