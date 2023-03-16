import { CategoryDto } from 'src/types/dto/category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Category, Message } from 'src/types';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class CategoryService {

    constructor(@InjectModel('category') private readonly categoryModel: Model<Category>){};

    /* We devided the services between type requests, initially the getAll which brings all categorie in DB */
    async getAll(): Promise<Category[] | Message> {
        try {
            const categories = await this.categoryModel.find()

            if(categories.length > 0){
                return categories
            }

            return {message: 'There are no categories available'}
        } catch (error) {
            return {message: 'An unexpected error appears', error}
        }
    };

    /* Looking by ID */
    async getCategoryById(id: string): Promise<Category | Message>{
        try {
            const category = await this.categoryModel.findById(id);

            if(category){
                return category
            }

            return {message: `Category with id ${id} not exists in DB`}
        } catch (error) {
            return {message: 'An unexpected error appears', error}
        }
    };

    /* Looking by name */
    async getCategoryByName(name: string): Promise<Category | Message>{
        try {
            const category = await this.categoryModel.findOne({name});

            if(category){
                return category
            }

            return {message: `Category with name ${name} not exists in our DB`}
        } catch (error) {
            return {message: 'An unexpected error appears', error}
        }
    };

    /* Used to post a category */
    async createCategory(category: CategoryDto): Promise<Message>{
        try {
            if(!category.name){
                return {message: 'Name of category is missing'}
            }

            const newCategory = new this.categoryModel(category)
            await newCategory.save()

            return {message: `Category with name ${category.name} was created under id: ${newCategory._id}`}
        } catch (error) {
            return {message: 'An unexpected error appears', error}
        }
    };

    /* Well... any further to say update and delete... just that :) */
    async updateCategory(id: string, category: CategoryDto): Promise<Category | Message>{
        try {
            const updatedCategory = await this.categoryModel.findByIdAndUpdate(id, category, {new: true})
            
            if(!updatedCategory){
                return {message: `Categorie under id: ${id} doesn't exist`}
            }
            
            return updatedCategory
        } catch (error) {
            return {message: 'An unexpected error appears', error}
        }
    };

    async deleteCategory(id: string): Promise<Message>{
        try {
            const deletedCategory = await this.categoryModel.findByIdAndDelete(id).exec();

            if(!deletedCategory){
                return {message: `The category under id: ${id} does not exist`}
            }

            return {message: `The category under the id: ${deletedCategory._id} was deleted correctly`}
        } catch (error) {
            return {message: 'An unexpected error appears', error}
        }
    }
}
