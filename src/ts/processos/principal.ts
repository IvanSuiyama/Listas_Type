import Processo from "../abstracoes/processo"
import MenuPrincipal from "../menus/menuPrincipal"
import ListagemAcomodacoes from "./listagemAcomodacoes"
import TipoCadastroCliente from "./tipoCadastroCliente"
import TipoListagemClientes from "./tipoListagemClientes"
import CadastroAcomodacoes from "./cadastroAcomodacoes"  // Importe a classe CadastroAcomodacoes
import EditarCliente from "./editarClientes"
import ExcluirCliente from "./excluirClientes"
export default class Principal extends Processo {
    constructor() {
        super()
        this.execucao = true
        this.menu = new MenuPrincipal()
    }

    processar(): void {
        
        console.log('Cadastrando as acomodações...');
        let cadastroAcomodacoes = new CadastroAcomodacoes();
        cadastroAcomodacoes.processar();  

        
        this.menu.mostrar();
        this.opcao = this.entrada.receberNumero('Qual opção desejada?');

        switch (this.opcao) {
            case 1:
                this.processo = new TipoCadastroCliente();
                this.processo.processar();
                break;
            case 2:
                this.processo = new EditarCliente();
                this.processo.processar()
                break
            case 3:
                this.processo = new TipoListagemClientes();
                this.processo.processar();
                break;
            case 4:
                this.processo = new ExcluirCliente()
                this.processo.processar()
                break
            case 5:
                this.processo = new ListagemAcomodacoes();
                this.processo.processar();
                break;
            case 0:
                this.execucao = false;
                console.log('Até logo!');
                console.clear();
                break;
            default:
                console.log('Opção não entendida :(');
        }
    }
}
