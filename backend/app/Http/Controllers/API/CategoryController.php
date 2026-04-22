<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * Display a listing of categories.
     */
    public function index()
    {
        return response()->json(Category::all());
    }

    /**
     * Store a newly created category (Admin only).
     */
    public function store(Request $request)
    {
        // Simple middleware/role check could be added here
        $request->validate([
            'name' => 'required|string|max:255|unique:categories',
            'description' => 'nullable|string',
        ]);

        $category = Category::create($request->all());

        return response()->json($category, 201);
    }

    /**
     * Display the specified category with its products.
     */
    public function show(Category $category)
    {
        return response()->json($category->load('products'));
    }

    /**
     * Update the specified category (Admin only).
     */
    public function update(Request $request, Category $category)
    {
        $request->validate([
            'name' => 'string|max:255|unique:categories,name,' . $category->id,
            'description' => 'nullable|string',
        ]);

        $category->update($request->all());

        return response()->json($category);
    }

    /**
     * Remove the specified category (Admin only).
     */
    public function destroy(Category $category)
    {
        $category->delete();

        return response()->json(['message' => 'Category deleted successfully']);
    }
}
