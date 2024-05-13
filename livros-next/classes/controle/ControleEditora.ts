import Editora from "@/classes/modelo/Editora";

var editoras: Array<Editora> = [
    {
        codEditora: 1,
        nome: "Abril",
    },
    {
        codEditora: 2,
        nome: "SM",
    },
    {
        codEditora: 3,
        nome: "Ática",
    }
];

export default class ControleEditora {
    getNomeEditora(codEditora: number) {
        const editora = editoras.filter(editora => editora.codEditora === codEditora);
        return editora[0] ? editora[0].nome : undefined;
    }
    
    getEditoras(): Array<Editora> {
        return editoras;
    }
}
