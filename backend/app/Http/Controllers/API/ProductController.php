<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    /**
     * Display a listing of products with filtering and pagination.
     */
    public function index(Request $request)
    {
        $query = Product::query()->with('category');

        // Filter by Category
        if ($request->has('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        // Search by Name
        if ($request->has('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        // Return all products (no pagination limit)
        return response()->json($query->get());
    }

    /**
     * Store a newly created product (Admin only).
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'stock_quantity' => 'nullable|integer|min:0|required_without:stock',
            'stock' => 'nullable|integer|min:0|required_without:stock_quantity',
            'category_id' => 'required|exists:categories,id',
            'image' => 'nullable|file|mimes:jpeg,png,jpg,gif,webp|max:8192',
        ]);

        $stockValue = $request->input('stock_quantity', $request->input('stock'));
        $data = [
            'name' => $request->name,
            'description' => $request->description,
            'price' => $request->price,
            'category_id' => $request->category_id,
        ];

        // Keep compatibility with either DB schema variant.
        if (Schema::hasColumn('products', 'stock_quantity')) {
            $data['stock_quantity'] = $stockValue;
        }
        if (Schema::hasColumn('products', 'stock')) {
            $data['stock'] = $stockValue;
        }

        if ($request->hasFile('image')) {
            $data['image_path'] = $request->file('image')->store('products', 'public');
        }

        try {
            $product = Product::create($data);

            if (!$product || !$product->id) {
                return response()->json([
                    'message' => 'Product was created but has no ID - database integrity issue',
                    'suggestion' => 'Contact support if this persists.'
                ], 500);
            }

            return response()->json($product->refresh()->load('category'), 201);
        } catch (\Throwable $e) {
            return response()->json([
                'message' => 'Failed to create product: ' . $e->getMessage(),
                'suggestion' => 'Verify required fields (name, price, category_id) and database connection.'
            ], 500);
        }
    }

    /**
     * Display the specified product details.
     */
    public function show(Product $product)
    {
        if (!$product || !$product->id) {
            return response()->json([
                'message' => 'Product not found or has no ID',
                'product_data' => $product
            ], 404);
        }
        return response()->json($product->load('category'));
    }

    /**
     * Update the specified product (Admin only).
     */
    public function update(Request $request, Product $product)
    {
        if (!$product || !$product->id) {
            return response()->json([
                'message' => 'Product not found or has invalid ID',
                'product_id' => $product?->id
            ], 404);
        }

        $request->validate([
            'name' => 'string|max:255',
            'description' => 'nullable|string',
            'price' => 'numeric|min:0',
            'stock_quantity' => 'nullable|integer|min:0',
            'stock' => 'nullable|integer|min:0',
            'category_id' => 'exists:categories,id',
            'image' => 'nullable|file|mimes:jpeg,png,jpg,gif,webp|max:8192',
        ]);

        $data = $request->only(['name', 'description', 'price', 'category_id']);

        if ($request->has('stock_quantity') || $request->has('stock')) {
            $stockValue = $request->input('stock_quantity', $request->input('stock'));
            if (Schema::hasColumn('products', 'stock_quantity')) {
                $data['stock_quantity'] = $stockValue;
            }
            if (Schema::hasColumn('products', 'stock')) {
                $data['stock'] = $stockValue;
            }
        }

        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($product->image_path) {
                Storage::disk('public')->delete($product->image_path);
            }
            $data['image_path'] = $request->file('image')->store('products', 'public');
        }

        try {
            $product->update($data);
            return response()->json($product->refresh());
        } catch (\Throwable $e) {
            return response()->json([
                'message' => 'Failed to update product: ' . $e->getMessage(),
                'suggestion' => 'Verify all fields are valid and the product exists.',
                'product_id' => $product->id
            ], 500);
        }
    }

    /**
     * Remove the specified product (Admin only).
     */
    public function destroy(Product $product)
    {
        if (!$product || !$product->id) {
            return response()->json([
                'message' => 'Product not found or invalid ID'
            ], 404);
        }

        try {
            if ($product->image_path) {
                Storage::disk('public')->delete($product->image_path);
            }
            $product->delete();

            return response()->json(['message' => 'Product deleted successfully']);
        } catch (\Throwable $e) {
            return response()->json([
                'message' => 'Failed to delete product: ' . $e->getMessage()
            ], 500);
        }
    }
}
