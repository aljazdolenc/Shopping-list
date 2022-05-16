import { Ingridient } from './../shared/ingridient.model';

export class Recipe{
    public name: string;
    public description: string;
    public imagePath: string;
    public ingredients: Ingridient[]

    constructor(name: string, desc: string, path: string, ingredients: Ingridient[]){
        this.name = name;
        this.description = desc;
        this.imagePath = path;
        this.ingredients= ingredients;
    }
}