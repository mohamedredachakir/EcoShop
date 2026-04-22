<?php

use App\Models\Category;
use App\Models\Product;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use function Pest\Laravel\getJson;
use function Pest\Laravel\postJson;

uses(RefreshDatabase::class);

test('a user can list products', function () {
    Product::factory()->count(5)->create();

    $response = getJson('/api/products');

    $response->assertStatus(200)
             ->assertJsonCount(5, 'data');
});

test('a user can search a product', function () {
    Product::factory()->create(['name' => 'Eco Shirt']);
    Product::factory()->create(['name' => 'Sustainable Bag']);

    $response = getJson('/api/products?search=Shirt');

    $response->assertStatus(200)
             ->assertJsonCount(1, 'data')
             ->assertJsonFragment(['name' => 'Eco Shirt']);
});

test('an admin can create a product', function () {
    $category = Category::factory()->create();
    $admin = User::factory()->create(['role' => 'admin']);

    $response = $this->actingAs($admin, 'sanctum')
                     ->postJson('/api/products', [
                         'name' => 'Admin Product',
                         'description' => 'Test Desc',
                         'price' => 99.99,
                         'stock' => 10,
                         'category_id' => $category->id,
                     ]);

    $response->assertStatus(201);
    $this->assertDatabaseHas('products', ['name' => 'Admin Product']);
});

test('a regular user cannot create a product', function () {
    $category = Category::factory()->create();
    $user = User::factory()->create(['role' => 'user']);

    $response = $this->actingAs($user, 'sanctum')
                     ->postJson('/api/products', [
                         'name' => 'Regular Product',
                         'description' => 'Test Desc',
                         'price' => 99.99,
                         'stock' => 10,
                         'category_id' => $category->id,
                     ]);

    $response->assertStatus(403);
});
