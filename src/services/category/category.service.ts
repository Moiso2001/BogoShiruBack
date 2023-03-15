import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Category, Message } from 'src/types';
import { CategoryDto } from 'src/types/dto/category.dto';

@Injectable()
export class CategoryService {

    constructor(@InjectModel('category') private readonly categoryModel: Model<Category>){};

    async getAll(): Promise<Category[] | Message> {
        try {
            const categories = await this.categoryModel.find()

            if(categories.length > 0){
                return categories
            }

            return {message: 'There is no categories yet available'}
        } catch (error) {
            return {message: 'An unexpected error appears', error}
        }
    }

    async getCategoryById(id: string): Promise<Category | Message>{
        try {
            const category = await this.categoryModel.findById(id);

            console.log(category)
            if(category){
                return category
            }

            return {message: `Category with id ${id} not exists in our DB`}
        } catch (error) {
            return {message: 'An unexpected error appears', error}
        }
    }

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
    }

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
    }

    async updateCategory(id: string, category: CategoryDto){
        try {
        } catch (error) {
            
        }
    }
}
