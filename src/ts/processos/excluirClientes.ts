import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";

export default class ExcluirCliente extends Processo {
    processar(): void {
        console.log('Iniciando o processo de exclusão de cliente...');

       
        let tipoCliente = this.entrada.receberTexto(
            'Você deseja excluir um Titular ou um Dependente? (Digite "Titular" ou "Dependente"):'
        ).toLowerCase();

        let nomeCliente = this.entrada.receberTexto('Digite o nome do cliente a ser excluído:');

        let armazem = Armazem.InstanciaUnica;

        if (tipoCliente === "dependente") {
          
            let titular = armazem.Clientes.find(cliente =>
                cliente.Dependentes.some(dependente => dependente.Nome === nomeCliente)
            );

            if (titular) {
                
                titular['dependentes'] = titular['dependentes'].filter(dependente => dependente.Nome !== nomeCliente);
                console.log(`Cliente dependente "${nomeCliente}" excluído com sucesso.`);
            } else {
                console.log(`Dependente "${nomeCliente}" não encontrado.`);
            }
        } else if (tipoCliente === "titular") {
           
            let indexTitular = armazem.Clientes.findIndex(cliente => cliente.Nome === nomeCliente);

            if (indexTitular !== -1) {
              
                let titular = armazem.Clientes[indexTitular];
                armazem.Clientes.splice(indexTitular, 1);
                console.log(`Cliente titular "${nomeCliente}" e todos os seus dependentes foram excluídos com sucesso.`);
            } else {
                console.log(`Titular "${nomeCliente}" não encontrado.`);
            }
        } else {
            console.log('Tipo de cliente inválido. Digite "Titular" ou "Dependente".');
        }
    }
}
