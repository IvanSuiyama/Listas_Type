import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";
import ImpressorAcomodacao from "../impressores/impressorAcomodacao";
import Impressor from "../interfaces/impressor";
import Acomodacao from "../modelos/acomodacao";
import Cliente from "../modelos/cliente";

export default class ListagemAcomodacoes extends Processo {
    private acomodacoes: Acomodacao[];
    private clientes: Cliente[];
    private impressor!: Impressor;

    constructor() {
        super();
        this.acomodacoes = Armazem.InstanciaUnica.Acomodacoes;
        this.clientes = Armazem.InstanciaUnica.Clientes;
    }

    processar(): void {
        console.clear();
        console.log('Iniciando a listagem das acomodações ofertadas...');
        console.log(`-------------------------------------------------`);

        // Dicionário para contar quantos clientes estão associados a cada acomodação
        let acomodacaoCount: { [key: string]: number } = {};

        // Contabiliza a quantidade de clientes por acomodação
        this.clientes.forEach(cliente => {
            if (cliente.Acomodacao) {
                let acomodacaoNome = cliente.Acomodacao.NomeAcomadacao;
                if (acomodacaoCount[acomodacaoNome]) {
                    acomodacaoCount[acomodacaoNome]++;
                } else {
                    acomodacaoCount[acomodacaoNome] = 1;
                }
            }
        });

        // Agora exibimos as acomodações e a quantidade de clientes associada
        this.acomodacoes.forEach(acomodacao => {
            const acomodacaoNome = acomodacao.NomeAcomadacao;
            const clientesAssociados = acomodacaoCount[acomodacaoNome] || 0; // Pega a quantidade ou 0 se não tiver clientes

            this.impressor = new ImpressorAcomodacao(acomodacao);
            console.log(this.impressor.imprimir());
            console.log(`Quantidade de clientes associados: ${clientesAssociados}`);
            console.log(`-------------------------------------------------`);
        });
    }
}
