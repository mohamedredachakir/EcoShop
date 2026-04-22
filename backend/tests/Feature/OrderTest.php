<?php

use App\Models\Product;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use function Pest\Laravel\postJson;
use function Pest\Laravel\getJson;
use Illuminate\Support\Facades\Event;
use App\Events\OrderPlaced;

uses(RefreshDatabase::class);

test('a user can place an order from their cart', function () {
    $user = User::factory()->create();
    $product = Product::factory()->create(['price' => 100, 'stock' => 10]);

    // 1. Add to Cart
    $this->actingAs($user, 'sanctum')
         ->postJson('/api/cart', [
             'product_id' => $product->id,
             'quantity' => 2,
         ]);

    // 2. Checkout
    $response = $this->actingAs($user, 'sanctum')
                     ->postJson('/api/orders');

    $response->assertStatus(201)
             ->assertJsonPath('order.total_amount', "200.00")
             ->assertJsonCount(1, 'order.items');

    $this->assertDatabaseHas('orders', ['user_id' => $user->id]);
    $this->assertDatabaseHas('order_items', ['product_id' => $product->id]);
    $this->assertDatabaseHas('products', ['id' => $product->id, 'stock' => 8]); // Async logic test
});

test('a user cannot checkout with an empty cart', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user, 'sanctum')
                     ->postJson('/api/orders');

    $response->assertStatus(400);
});

test('a user can view their order history', function () {
    $user = User::factory()->create();
    $product = Product::factory()->create(['price' => 50, 'stock' => 5]);

    $this->actingAs($user, 'sanctum')
         ->postJson('/api/cart', ['product_id' => $product->id, 'quantity' => 1]);
    
    $this->actingAs($user, 'sanctum')
         ->postJson('/api/orders');

    $response = $this->actingAs($user, 'sanctum')
                     ->getJson('/api/orders');

    $response->assertStatus(200)
             ->assertJsonCount(1, 'data');
});
