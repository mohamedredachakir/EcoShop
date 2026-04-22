<?php

use App\Models\User;
use function Pest\Laravel\postJson;
use function Pest\Laravel\getJson;
use function Pest\Laravel\putJson;

test('a user can register', function () {
    $response = $this->postJson('/api/register', [
        'name' => 'John Doe',
        'email' => 'john@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);

    $response->assertStatus(201)
             ->assertJsonStructure(['access_token', 'user']);
    
    $this->assertDatabaseHas('users', ['email' => 'john@example.com']);
});

test('a user can login', function () {
    $user = User::factory()->create([
        'password' => bcrypt('password'),
    ]);

    $response = $this->postJson('/api/login', [
        'email' => $user->email,
        'password' => 'password',
    ]);

    $response->assertStatus(200)
             ->assertJsonStructure(['access_token']);
});

test('a user can update their profile', function () {
    $user = User::factory()->create();
    
    $response = $this->actingAs($user, 'sanctum')
                     ->putJson('/api/user', [
                         'name' => 'Updated Name',
                     ]);

    $response->assertStatus(200)
             ->assertJsonPath('user.name', 'Updated Name');
});

test('a user can logout', function () {
    $user = User::factory()->create();
    
    $response = $this->actingAs($user, 'sanctum')
                     ->postJson('/api/logout');

    $response->assertStatus(200);
});
