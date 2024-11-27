import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";
import Cliente from "../modelos/cliente";


export default class CadastroDependente extends Processo {
    processar(): void {
        console.log('Iniciando o cadastro de um novo dependente...');
        let nome = this.entrada.receberTexto('Qual o nome do dependente?');
        let nomeSocial = this.entrada.receberTexto('Qual o nome social do dependente?');
        let dataNascimento = this.entrada.receberData('Qual a data de nascimento do dependente?');
        
        let dependente = new Cliente(nome, nomeSocial, dataNascimento);

        // O dependente será associado ao titular pelo nome
        let nomeTitular = this.entrada.receberTexto('Informe o nome do titular para associar o dependente:');
        let armazem = Armazem.InstanciaUnica;
        let titular = armazem.Clientes.find(cliente => cliente.Nome === nomeTitular);  // Encontra o titular pelo nome

        if (titular) {
            dependente.Titular = titular;  // Associa o dependente ao titular
            titular.Dependentes.push(dependente);  // Adiciona o dependente à lista de dependentes do titular
            console.log(`Dependente ${dependente.Nome} cadastrado com sucesso e associado ao titular ${titular.Nome}.`);
        } else {
            console.log('Titular não encontrado. Cadastro do dependente não realizado.');
        }
        console.log('Finalizando o cadastro do dependente...');
    }
}
