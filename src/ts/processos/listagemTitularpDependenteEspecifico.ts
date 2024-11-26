import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";
import Cliente from "../modelos/cliente";

export default class ListagemTitularDeDependente extends Processo {
    processar(): void {
        console.log('Iniciando a listagem do titular a partir de um dependente...');
        
       
        let nomeDependente = this.entrada.receberTexto('Digite o nome do dependente:');

        
        let armazem = Armazem.InstanciaUnica;
        let dependente = armazem.Clientes.find(cliente => cliente.Nome === nomeDependente);

        
        if (!dependente) {
            console.log(`Dependente com o nome "${nomeDependente}" não encontrado.`);
            return;
        }

        
        if (!dependente.Titular) {
            console.log(`O dependente "${nomeDependente}" não possui um titular associado.`);
            return;
        }

        
        let titular = dependente.Titular;
        console.log(`Titular associado ao dependente "${nomeDependente}":`);
        console.log(`- Nome: ${titular.Nome}`);
        console.log(`- Nome Social: ${titular.NomeSocial}`);
        console.log(`- Data de Cadastro: ${titular.DataCadastro.toLocaleDateString()}`);
    }
}
