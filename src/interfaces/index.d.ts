export interface ICategory {
    id: number;
    title: string;
}

export interface IPost {
    id: number;
    title: string;
    content: string;
    status: "published" | "draft" | "rejected";
    category: { id: number };
}

export interface IPessoa {
    id: any;
    nome: string;
    sobrenome: string;
    cpf:string;
    contato:string;
    usuario:{
        role: {
            name : string
        }
    };
}

