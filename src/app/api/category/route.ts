import fs from 'fs';
import path from 'path';
import csvtojson from 'csvtojson';
import { Category } from '@/app/types/Category';

export async function GET() {
    // Contains the path to the categories.csv file
    const csvFilePath = path.join(process.cwd(), 'public', 'categories.csv');
    // Contains the path that will contain the categories.json file.
    const jsonFilePath = path.join(process.cwd(), 'public', 'categories.json');

    try {
        // Convert the csv file to an array of objects
        const csvData = await csvtojson().fromFile(csvFilePath);

        let currentCategory: Category | null = null;
        // Create a Map object to store the categories
        const categoriesMap = new Map();

        csvData.forEach((row) => {
            // Extract the values ​​of a main category and subcategory from the current row (single object of csvData) in CSV
            const mainCategory = row['קטגוריה']?.trim();
            const subCategory = row['תת קטגוריה']?.trim();

            // Insert category values ​​into categoriesMap
            if (mainCategory) {
                currentCategory = mainCategory;
                if (!categoriesMap.has(currentCategory)) {
                    categoriesMap.set(currentCategory, {
                        id: categoriesMap.size + 1,
                        name: currentCategory,
                        subcategories: [],
                    });
                }
            }

            // Add the subcategory to the current category
            if (currentCategory && subCategory) {
                // Return a list of all subcategories of the current category, and push the additional subcategory to the list
                categoriesMap.get(currentCategory).subcategories.push({
                    id: categoriesMap.get(currentCategory).subcategories.length + 1,
                    name: subCategory,
                });
            }
        });

        // Convert the map to an array
        const categoriesArray = Array.from(categoriesMap.values());

        // Save as JSON file
        fs.writeFileSync(jsonFilePath, JSON.stringify(categoriesArray, null, 2));

        return new Response(JSON.stringify(categoriesArray), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error processing categories:', error);
        return new Response('Error processing categories', { status: 500 });
    }
}
