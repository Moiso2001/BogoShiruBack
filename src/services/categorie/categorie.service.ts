import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Categorie, errorMessage } from 'src/types';

@Injectable()
export class CategorieService {

    constructor(@InjectModel('categorie') private readonly categorieModel: Model<Categorie>){};

    async getAll(): Promise<Categorie[] | errorMessage> {
        try {
            const categories = await this.categorieModel.find()

            if(categories.length > 0){
                return categories
            }

            return {message: 'There is no categories yet available'}
        } catch (error) {
            return {message: 'An unexpected error appears', error}
        }
    }

    async getCategorieById(id: String){
        try {
            const categorie = await this.categorieModel.findById(id);

            console.log(categorie)
            if(categorie){
                return categorie
            }

            return {message: `Categorie with id ${id} not exists in our DB`}
        } catch (error) {
            return {message: 'An unexpected error appears', error}
        }
    }

    async getCategorieByName(name: String){
        try {
            const categorie = await this.categorieModel.findOne({name});

            if(categorie){
                return categorie
            }

            return {message: `Categorie with name ${name} not exists in our DB`}
        } catch (error) {
            return {message: 'An unexpected error appears', error}
        }
    }

    async createCategorie(categorie: Categorie){
        try {
            if(!categorie.name){
                return {message: 'Name of category is missing'}
            }

            const newCategorie = new this.categorieModel(categorie)
            await newCategorie.save()

            return {message: `Categorie with name ${categorie.name} was created under id: ${newCategorie._id}`}
        } catch (error) {
            return {message: 'An unexpected error appears', error}
        }
    }
}
