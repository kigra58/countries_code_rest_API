export type IBook={
    id:number,
    title:string;
    author:[IAuthor];
    price:number
    publisher:string;
    category:[ICategory]
}

export type IAuthor={
    id:number;
    name:string
}
export type ICategory={
    id:number;
    name:string
}

