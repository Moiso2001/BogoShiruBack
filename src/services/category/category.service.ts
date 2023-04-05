import { CategoryDto } from 'src/types/dto/category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Category, Keyword, Message } from 'src/types';
import { Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { KeywordDto } from 'src/types/dto/keyword.dto';

@Injectable()
export class CategoryService {

    constructor(
        @InjectModel('category') private readonly categoryModel: Model<Category>,
        @InjectModel('keyword') private readonly keywordModel: Model<Keyword>
    ){};

    /* We devided the services between type requests, initially the getAll which brings all categorie in DB */
    async getAll(): Promise<Category[] | Message> {
        try {
            const categories = await this.categoryModel.find({deletedAt: null}).exec()

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
            const category = await this.categoryModel
                .findById(id)
                .where({deletedAt: null}) // Excludes soft deleted categories
                .exec()

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
            const category = await this.categoryModel.findOne({name, deletedAt: null}).exec()

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
            // We validate if the category name already exists on 
            const categoryExist = await this.categoryModel.findOne({name: category.name, deletedAt: null});

            if(categoryExist){
                return {message: `Category with name: ${category.name} already exist`}
            };

            const newCategory = new this.categoryModel(category)
            await newCategory.save()

            return {message: `Category with name: ${newCategory.name} was created under id: ${newCategory._id}`}
        } catch (error) {
            return {message: 'An unexpected error appears', error}
        }
    };

    /* Well... any further to say update and delete... just that :) */
    async updateCategory(id: string, category: CategoryDto): Promise<Category | Message>{
        try {
            const updatedCategory = await this.categoryModel.findOneAndUpdate(
                {_id: id, deletedAt: null}, // Excluding all soft deleted documents
                category, 
                {new: true}
            );
            
            if(!updatedCategory){
                return {message: `Categorie under id: ${id} doesn't exist`}
            }
            
            return updatedCategory
        } catch (error) {
            return {message: 'An unexpected error appears', error}
        }
    };
    
    async deleteCategory(id: string): Promise<Message | Category>{
        try {
            //Soft delete implemented to avoid DB error queries on future
            const deletedCategory = await this.categoryModel
                .findById(id,{ new: true })
                .where({deletedAt: null})
                .exec();

            if(!deletedCategory){
                return {message: `Category under id: ${id} not found`}
            }

            deletedCategory.deletedAt = new Date();
            await deletedCategory.save();

            return deletedCategory 
        } catch (error) {
            return {message: 'An unexpected error appears', error}
        }
    };

    /* Keywords relation with Category */
    async addKeywords(idCategory: string, keywords: KeywordDto[]): Promise<Message | Category>{
        try {
            const categoryToUpdate = await this.categoryModel
                .findById(idCategory)
                .where({deletedAt: null}) // Excluding all soft deleted documents
                .exec()

            // Validate if idCategory exists
            if(!categoryToUpdate){
                return{message: `Category with ID ${idCategory} not found.`}
            }

            // Map the KeywordDto array to an ab rray of keyword IDs
            const keywordIds: Array<Types.ObjectId> = [];

            for (const keyword of keywords) { 
            
              // Search the keyword and if it does not exist we will create it
              const result = await this.keywordModel.findOneAndUpdate(
                { name: keyword.name.toLowerCase(), deletedAt: null }, // Case if the name already exists
                { name: keyword.name.toLowerCase() }, // Case if the name doesn't exist and we create it here
                { upsert: true, new: true }
              );

              // We validate if the keyword already exists in the category to avoid adding duplicates
              if(categoryToUpdate.keywords.includes(result._id) || keywordIds.some(value => JSON.stringify(value) === JSON.stringify(result._id)))continue;

              keywordIds.push(result._id);
            }
        
            // Update the category's keywords property with the new keyword IDs
            categoryToUpdate.keywords = [...categoryToUpdate.keywords, ...keywordIds];

            // Cleaning all keywords soft deleted (this function won't be reflected on the controller return, whatever on DB it was already updated)
            categoryToUpdate.keywords.forEach(async id => {
                // Find each keyword by the id on the Category.keywords
                const keyword =  await this.keywordModel.findById(id) 
                
                // If the keyword propety is different than null is because has a date on it, and it was already soft deleted
                if(keyword.deletedAt !== null){
                    await this.categoryModel.findOneAndUpdate(
                        {_id: idCategory, deletedAt: null},
                        { $pull: { keywords: keyword._id }},    // Pull method will pull out the keyword by id from our Tag.keyword array 
                    );
                }
            })
        
            // Save the updated category to the database
            await categoryToUpdate.save();  
            
            return categoryToUpdate
        } catch (error) {
            return {message: 'An unexpected error appears', error}
        }
    };

    async deleteKeyword(categoryId: string, keywordName: string): Promise<Message | Category>{
        try {
          // Search keyword by name and validate it in case the keyword name does not exist.
          const keywordToDelete = await this.keywordModel.findOne({name: keywordName, deletedAt: null}).exec()

          if(!keywordToDelete){
            return {message: `Keyword with name ${keywordName} not found.`};
          }

          // Search the category and pull the keyword provided before
          const categoryToUpdate = await this.categoryModel.findOneAndUpdate(
            {_id: categoryId, deletedAt: null},           // Excluding all soft deleted documents
            { $pull: { keywords: keywordToDelete._id } }, // Pull method will pull out the kategory by id from our Category.keyword array
            { new: true }                                 // Will assure categoryToUpdate will be the last category version
          );
      
          if (!categoryToUpdate) {
            return {message: `Category with ID ${categoryId} not found.`};
          }
      
            return categoryToUpdate;
        } catch (error) {
            return {message: 'An unexpected error appears', error}
        }
    };
}
