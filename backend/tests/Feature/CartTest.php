<?php

use App\Models\Product;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use function Pest\Laravel\postJson;
use function Pest\Laravel\getJson;
use function Pest\Laravel\putJson;
use function Pest\Laravel\deleteJson;

uses(RefreshDatabase::class);

test('a user can add a product to their cart', function () {
    $user = User::factory()->create();
    $product = Product::factory()->create();

    $response = $this->actingAs($user, 'sanctum')
                     ->postJson('/api/cart', [
                         'product_id' => $product->id,
                         'quantity' => 2,
                     ]);

    $response->assertStatus(201);
    $this->assertDatabaseHas('cart_items', [
        'product_id' => $product->id,
        'quantity' => 2,
    ]);
});

test('a user can view their cart', function () {
    $user = User::factory()->create();
    $product = Product::factory()->create();

    $this->actingAs($user, 'sanctum')
         ->postJson('/api/cart', [
             'product_id' => $product->id,
             'quantity' => 1,
         ]);

    $response = $this->actingAs($user, 'sanctum')
                     ->getJson('/api/cart');

    $response->assertStatus(200)
             ->assertJsonCount(1, 'items');
});

test('a user can delete a cart item', function () {
    $user = User::factory()->create();
    $product = Product::factory()->create();

    $this->actingAs($user, 'sanctum')
         ->postJson('/api/cart', [
             'product_id' => $product->id,
             'quantity' => 1,
         ]);
    
    $cartItem = \App\Models\CartItem::first();

    $response = $this->actingAs($user, 'sanctum')
                     ->deleteJson("/api/cart/{$cartItem->id}");

    $response->assertStatus(200);
    $this->assertDatabaseEmpty('cart_items');
});
