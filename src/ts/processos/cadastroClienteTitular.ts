import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";
import Cliente from "../modelos/cliente";
import Acomodacao from "../modelos/acomodacao";
import CadastrarDocumentosCliente from "./cadastroDocumentosCliente";
import CadastroEnderecoTitular from "./cadastroEnderecoTitular";

export default class CadastroClienteTitular extends Processo {
    processar(): void {
        console.log('Iniciando o cadastro de um novo cliente...');
        let nome = this.entrada.receberTexto('Qual o nome do novo cliente?');
        let nomeSocial = this.entrada.receberTexto('Qual o nome social do novo cliente?');
        let dataNascimento = this.entrada.receberData('Qual a data de nascimento?');
        let cliente = new Cliente(nome, nomeSocial, dataNascimento);

        
        const diretores = [
            'Solteiro Simples',
            'Casal Simples',
            'Família Simples',
            'Família Mais',
            'Família Super',
            'Solteiro Mais'
        ];

        console.log('Escolha uma acomodação para o cliente:');
        diretores.forEach((nome, index) => {
            console.log(`${index + 1} - ${nome}`);
        });

        
        let escolha = this.entrada.receberNumero('Escolha o número da acomodação desejada:');
        if (escolha > 0 && escolha <= diretores.length) {
            
            const acomodacaoEscolhida = diretores[escolha - 1];
            cliente.Acomodacao = new Acomodacao(acomodacaoEscolhida as any, 1, 1, 1, true, 1); // Usando o setter para associar a acomodação
        } else {
            console.log('Opção inválida. Nenhuma acomodação foi associada.');
        }

        
        this.processo = new CadastroEnderecoTitular(cliente);
        this.processo.processar();

        
        this.processo = new CadastrarDocumentosCliente(cliente);
        this.processo.processar();

        let armazem = Armazem.InstanciaUnica;
        armazem.Clientes.push(cliente);

        console.log('Finalizando o cadastro do cliente...');
        console.log(`Cliente associado à acomodação: ${cliente.Acomodacao?.NomeAcomadacao || 'Nenhuma'}`);
    }
}
