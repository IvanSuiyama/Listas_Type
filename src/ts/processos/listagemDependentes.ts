import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";
import Cliente from "../modelos/cliente";
import ImpressaorCliente from "../impressores/impressorCliente";
import Impressor from "../interfaces/impressor";

export default class ListagemDependentes extends Processo {
    private impressor!: Impressor;

    processar(): void {
        console.clear();
        console.log('Iniciando a listagem de dependentes...');

       
        let nomeTitular = this.entrada.receberTexto('Digite o nome do titular:');
        
       
        let titular = Armazem.InstanciaUnica.Clientes.find(cliente => cliente.Nome === nomeTitular);

        if (!titular) {
            console.log(`Titular com o nome "${nomeTitular}" não encontrado.`);
            return;
        }

        
        console.log(`Dependentes do titular: ${titular.Nome}`);
        if (titular.Dependentes.length === 0) {
            console.log("Este titular não possui dependentes cadastrados.");
            return;
        }

        titular.Dependentes.forEach(dependente => {
            this.impressor = new ImpressaorCliente(dependente);
            console.log(this.impressor.imprimir());
        });
    }
}
