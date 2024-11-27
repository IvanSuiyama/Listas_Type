import Menu from "../interfaces/menu";

export default class MenuAcomodarCliente implements Menu {
    mostrar(): void {
        console.clear();
        console.log(`****************************`);
        console.log(`| Em qual acomodação deseja acomodar o cliente?`);
        console.log(`----------------------`);
        console.log(`| 1 - Solteiro Simples`);
        console.log(`| 2 - Solteiro Mais`);
        console.log(`| 3 - Casal Simples`);
        console.log(`| 4 - Família Simples`);
        console.log(`| 5 - Família Mais`);
        console.log(`| 6 - Família Super`);
        console.log(`----------------------`);
    }
}
