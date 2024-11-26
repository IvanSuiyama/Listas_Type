import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";
import Cliente from "../modelos/cliente";
import Endereco from "../modelos/endereco";

export default class EditarCliente extends Processo {
    processar(): void {
        console.log('Iniciando o processo de Edição de cliente...');

        let tipoCliente = this.entrada.receberTexto(
            'Você deseja editar um Titular ou um Dependente? (Digite "Titular" ou "Dependente"):'
        ).toLowerCase();

        let nomeCliente = this.entrada.receberTexto('Digite o nome do cliente a ser editado:');

        let armazem = Armazem.InstanciaUnica;

        let cliente = armazem.Clientes.find(cliente => cliente.Nome === nomeCliente);

        if (!cliente) {
            console.log(`Cliente com o nome "${nomeCliente}" não encontrado.`);
            return;
        }

        let titular: Cliente | undefined;
        if (tipoCliente === 'dependente') {
            titular = armazem.Clientes.find(cliente => cliente.Dependentes.includes(cliente));
            if (!titular) {
                console.log(`Titular do dependente "${nomeCliente}" não encontrado.`);
                return;
            }
        }

        if (tipoCliente === 'titular' || tipoCliente === 'dependente') {
            let novoNome = this.entrada.receberTexto(`Digite o novo nome do cliente (atualmente: "${cliente.Nome}"):`);
            cliente.Nome = novoNome;

            let novoNomeSocial = this.entrada.receberTexto(`Digite o novo nome social do cliente (atualmente: "${cliente.NomeSocial}"):`);
            cliente.NomeSocial = novoNomeSocial;

            if (tipoCliente === 'titular') {
                let editarEndereco = this.entrada.receberTexto(`Deseja editar o endereço do cliente? (Sim/Não):`).toLowerCase();
                if (editarEndereco === 'sim') {
                    let rua = this.entrada.receberTexto('Qual a rua?');
                    let bairro = this.entrada.receberTexto('Qual o bairro?');
                    let cidade = this.entrada.receberTexto('Qual a cidade?');
                    let estado = this.entrada.receberTexto('Qual o estado?');
                    let pais = this.entrada.receberTexto('Qual o país?');
                    let codigoPostal = this.entrada.receberTexto('Qual o código postal?');
                    let novoEndereco = new Endereco(rua, bairro, cidade, estado, pais, codigoPostal);
                    cliente.Endereco = novoEndereco;
                }
            }

            console.log(`Cliente "${cliente.Nome}" editado com sucesso.`);
        } else {
            console.log('Tipo de cliente inválido. Digite "Titular" ou "Dependente".');
        }
    }
}
