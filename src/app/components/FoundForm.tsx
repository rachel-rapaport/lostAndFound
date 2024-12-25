// 'use client'
// import React, { useState } from 'react';
// import CategoriesSelect from './select/CategoriesSelect'; // ייבוא קומפוננטת הקטגוריות

// const FoundForm = () => {
//   const [selectedCategory, setSelectedCategory] = useState<string>('');

//   return (
//     <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
//       <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Find Lost Item</h2>
//       <form className="space-y-4">
//         {/* Category Select */}
//         <CategoriesSelect onSelect={(category) => setSelectedCategory(category)} />

//         {/* Subcategory Select */}
//         <div>
//           <label htmlFor="subCategory" className="block text-sm font-medium text-gray-700">
//             Subcategory:
//           </label>
//           <select
//             id="subCategory"
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//             required
//           >
//             <option value="">Select a subcategory</option>
//             <option value="phone">Phone</option>
//             <option value="laptop">Laptop</option>
//           </select>
//         </div>

//         {/* שאר הטופס */}
//         <div>
//           <label htmlFor="line" className="block text-sm font-medium text-gray-700">
//             Line:
//           </label>
//           <input
//             type="text"
//             id="line"
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//             placeholder="Enter line number"
//             required
//           />
//         </div>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           className="w-full py-2 px-4 bg-blue-600 text-white font-medium text-sm rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//         >
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default FoundForm;

