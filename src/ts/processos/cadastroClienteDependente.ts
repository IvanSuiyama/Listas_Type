import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";
import Cliente from "../modelos/cliente";
import CadastrarDocumentosCliente from "./cadastrarDocumentosCliente";

export default class CadastroClienteDependente extends Processo {
    processar(): void {
        console.log('Iniciando o cadastro de um novo dependente...');

        // Solicita o nome do titular
        let nomeTitular = this.entrada.receberTexto('Digite o nome do titular ao qual o dependente será vinculado:');

        // Busca o titular no armazém
        let armazem = Armazem.InstanciaUnica;
        let titular = armazem.Clientes.find(cliente => cliente.Nome === nomeTitular);

        // Verifica se o titular foi encontrado
        if (!titular) {
            console.log(`Titular com o nome "${nomeTitular}" não encontrado.`);
            return;
        }

        // Coleta os dados do dependente
        let nome = this.entrada.receberTexto('Qual o nome do dependente?');
        let nomeSocial = this.entrada.receberTexto('Qual o nome social do dependente?');
        let dataNascimento = this.entrada.receberData('Qual a data de nascimento do dependente?');

        // Cria o dependente e associa o titular e o endereço
        let dependente = new Cliente(nome, nomeSocial, dataNascimento);
        dependente.setTitular(titular); 
        dependente.Endereco = titular.Endereco; // Define o mesmo endereço do titular
        titular.Dependentes.push(dependente);

        // Cadastra os documentos do dependente
        this.processo = new CadastrarDocumentosCliente(dependente);
        this.processo.processar();

        // Exibe mensagem de sucesso
        console.log(`Dependente ${dependente.Nome} vinculado ao titular ${titular.Nome} com sucesso.`);
    }
}
