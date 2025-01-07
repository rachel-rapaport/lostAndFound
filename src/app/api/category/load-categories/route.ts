import * as xlsx from 'xlsx';
import fs from 'fs';
import path from 'path';
import SubCategoryModel from "@/app/lib/models/subCategory";
import connect from '@/app/lib/db/mongo';
import CategoryModel from '@/app/lib/models/category';
import { NextResponse } from 'next/server';
import { Category } from '@/app/types/props/category';

export async function POST() {
    try {
        await connect();
        // Path to the Excel file
        const filePath = path.join(process.cwd(), 'public', 'categories.xlsx');
        if (!fs.existsSync(filePath)) {
            return NextResponse.json({ message: 'File not found.' }, { status: 400 });
        }
        // Reads the content of the Excel file as a binary buffer for further processing
        const fileBuffer = fs.readFileSync(filePath);
        // Parse the Excel file
        const workbook = xlsx.read(fileBuffer, { type: 'buffer' });
        // Retrieves the first sheet from the workbook, based on the list of sheet names
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        // Converts the first sheet into a simple JSON format (an array of objects),
        // where each row becomes an object, and column headers are used as keys
        const data: { category: string; subCategory: string; }[] = xlsx.utils.sheet_to_json(sheet);

        let lastCategory: Category | null = null;

        for (const cell of data) {
            const categoryTitle = cell.category?.trim();
            const subCategoryTitle = cell.subCategory?.trim();

            if (categoryTitle) {
                // Check before adding if the category already exists in the database
                lastCategory = await CategoryModel.findOne({ title: categoryTitle });
                // If there is a new category, create it
                if (!lastCategory) {
                    lastCategory = await CategoryModel.create({ title: categoryTitle });
                }
            }

            else if (!lastCategory) {
                return NextResponse.json({ message: 'Missing initial category in file.' }, { status: 400 });
            }

            // If there is the subcategory, create the relationship with the parent category
            if (subCategoryTitle) {
                // Check if the subcategory exists in the database
                const existingSubCategory = await SubCategoryModel.findOne({ title: subCategoryTitle });
                if (!existingSubCategory && lastCategory) {
                    // Create new subcategory with the parent category id
                    const newSubCategory = await SubCategoryModel.create({ title: subCategoryTitle, categoryId: lastCategory._id });
                    if (newSubCategory) {
                        await CategoryModel.findByIdAndUpdate(
                            lastCategory._id,
                            { $push: { subCategories: newSubCategory._id } },
                            { new: true }
                        );
                    }
                }
            }
        }
        return NextResponse.json({ message: 'Categories were added successfully from file!' }, { status: 201 });
    }
    catch (error) {
        return NextResponse.json({ message: 'Failed adding categories from file', error: error }, { status: 500 });
    }
}