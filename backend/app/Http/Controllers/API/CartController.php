<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Http\Request;

class CartController extends Controller
{
    /**
     * Display the current user's cart.
     */
    public function index(Request $request)
    {
        $cart = Cart::firstOrCreate(['user_id' => $request->user()->id]);
        
        return response()->json($cart->load('items.product'));
    }

    /**
     * Add a product to the cart.
     */
    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);

        $user = $request->user();
        $cart = Cart::firstOrCreate(['user_id' => $user->id]);

        $cartItem = CartItem::where('cart_id', $cart->id)
            ->where('product_id', $request->product_id)
            ->first();

        if ($cartItem) {
            $cartItem->update([
                'quantity' => $cartItem->quantity + $request->quantity
            ]);
        } else {
            $cartItem = CartItem::create([
                'cart_id' => $cart->id,
                'product_id' => $request->product_id,
                'quantity' => $request->quantity
            ]);
        }

        return response()->json([
            'message' => 'Product added to cart successfully',
            'cart_item' => $cartItem
        ], 201);
    }

    /**
     * Update the quantity of a cart item.
     */
    public function update(Request $request, CartItem $cartItem)
    {
        // Ensure user owns the cart
        if ($cartItem->cart->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        $cartItem->update(['quantity' => $request->quantity]);

        return response()->json([
            'message' => 'Cart updated successfully',
            'cart_item' => $cartItem
        ]);
    }

    /**
     * Remove an item from the cart.
     */
    public function destroy(Request $request, CartItem $cartItem)
    {
        // Ensure user owns the cart
        if ($cartItem->cart->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $cartItem->delete();

        return response()->json(['message' => 'Item removed from cart']);
    }
}
