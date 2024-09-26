document.getElementById('calcularBtn').addEventListener('click', function() {
    const inscricao = document.getElementById('inscricao').value;
    const tributo = document.getElementById('tributo').value;
    const dataInicio = new Date(document.getElementById('dataInicial').value);
    const tipoAnalise = document.getElementById('tipoAnalise').value;

    // Captura os valores dos impostos
    const itu = parseFloat(document.getElementById('itu').value) || 0;
    const ipu = parseFloat(document.getElementById('ipu').value) || 0;
    const valorPago = parseFloat(document.getElementById('valorPago').value) || 0;
    const primeiraParcela = parseFloat(document.getElementById('primeiraParcela').value) || 0;
    const ultimaParcela = parseFloat(document.getElementById('ultimaParcela').value) || 0;
    const combateIncendio = parseFloat(document.getElementById('combateIncendio').value) || 0;
    const coletaLixo = parseFloat(document.getElementById('coletaLixo').value) || 0;
    const preservacaoVias = parseFloat(document.getElementById('preservacaoVias').value) || 0;

    // Cálculo do total da dívida
    const totalDivida = itu + ipu + combateIncendio + coletaLixo + preservacaoVias;
    const saldoRemanescente = totalDivida - valorPago;

    // Limpar resultados anteriores
    const tbody = document.querySelector('#resultadoTabela tbody');
    tbody.innerHTML = ''; // Limpa o conteúdo da tabela

    // Adicionar resultados à tabela
    const resultados = [
        { descricao: "Inscrição Imobiliária", valor: inscricao },
        { descricao: "Tributo", valor: tributo },
        { descricao: "Data Inicial", valor: dataInicio.toLocaleDateString() },
        { descricao: "Tipo de Análise", valor: tipoAnalise },
        { descricao: "Total da Dívida", valor: `R$ ${totalDivida.toFixed(2)}` },
        { descricao: "Valor Pago", valor: `R$ ${valorPago.toFixed(2)}` },
        { descricao: "Saldo Remanescente", valor: `R$ ${saldoRemanescente.toFixed(2)}` }
    ];

    resultados.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${item.descricao}</td><td>${item.valor}</td>`;
        tbody.appendChild(row);
    });

    // Exibir simulações de parcelamento
    if (saldoRemanescente > 0 && saldoRemanescente >= 50) {
        // Simulações de parcelamento
        const parcelas = [2, 5, 10, 24, 30, 60, 120];
        const simulaParcelamentoRow = document.createElement('tr');
        simulaParcelamentoRow.innerHTML = `<td colspan="2"><strong>Simulações de Parcelamento:</strong></td>`;
        tbody.appendChild(simulaParcelamentoRow);

        parcelas.forEach(qtdParcelas => {
            const valorParcela = saldoRemanescente / qtdParcelas;
            const row = document.createElement('tr');
            row.innerHTML = `<td>- ${qtdParcelas} parcelas</td><td>R$ ${valorParcela.toFixed(2)}</td>`;
            tbody.appendChild(row);
        });

        // Simulação de quitação
        const quitaSimulacaoRow = document.createElement('tr');
        quitaSimulacaoRow.innerHTML = `<td colspan="2"><strong>Simulação de Quitação:</strong></td>`;
        tbody.appendChild(quitaSimulacaoRow);

        const totalComJuros = saldoRemanescente * 1.05; // Exemplo: 5% de juros
        const rowQuitacao = document.createElement('tr');
        rowQuitacao.innerHTML = `<td>Total com Juros:</td><td>R$ ${totalComJuros.toFixed(2)}</td>`;
        tbody.appendChild(rowQuitacao);
    }

    // Exibir resultados
    document.getElementById('resultadoTabela').style.display = 'table';
});
