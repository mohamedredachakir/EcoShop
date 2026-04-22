<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Schema;

class ProductFactory extends Factory
{
    protected $model = Product::class;

    public function definition(): array
    {
        $stockColumn = Schema::hasColumn('products', 'stock_quantity') ? 'stock_quantity' : 'stock';

        return [
            'name' => $this->faker->words(3, true),
            'description' => $this->faker->paragraph(),
            'price' => $this->faker->randomFloat(2, 10, 500),
            $stockColumn => $this->faker->numberBetween(0, 100),
            'category_id' => Category::factory(),
            'image_path' => null,
        ];
    }
}
