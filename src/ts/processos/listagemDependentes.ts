import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";
import ImpressoraCliente from "../impressores/impressorCliente";
import Impressor from "../interfaces/impressor";
import Cliente from "../modelos/cliente";

export default class ListagemDependentes extends Processo {
    private clientes: Cliente[];
    private impressor!: Impressor;

    constructor() {
        super();
        this.clientes = Armazem.InstanciaUnica.Clientes;
    }

    processar(): void {
        console.clear();
        console.log('Iniciando a listagem dos dependentes de um titular...');

        // Solicita o nome do titular
        let nomeTitular = this.entrada.receberTexto('Informe o nome do titular para listar seus dependentes:');
        
        // Busca o titular pelo nome informado
        let titular = this.clientes.find(cliente => cliente.Nome === nomeTitular);

        if (titular) {
            console.log(`Dependentes de ${titular.Nome}:`);

            // Verifica se o titular tem dependentes e imprime
            if (titular.Dependentes.length > 0) {
                titular.Dependentes.forEach(dependente => {
                    this.impressor = new ImpressoraCliente(dependente);
                    console.log(this.impressor.imprimir());
                });
            } else {
                console.log('Este titular não possui dependentes cadastrados.');
            }
        } else {
            console.log('Titular não encontrado. Verifique o nome e tente novamente.');
        }
    }
}
