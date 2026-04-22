<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    /**
     * Display current user's order history.
     */
    public function index(Request $request)
    {
        $user = $request->user();
        $query = Order::query()->with(['items.product', 'user']);

        if ($user->role !== 'admin') {
            $query->where('user_id', $user->id);
        }

        $orders = $query->latest()->paginate(10);

        return response()->json($orders);
    }

    /**
     * Create an order from the cart (Checkout).
     */
    public function store(Request $request)
    {
        $user = $request->user();
        $cart = Cart::where('user_id', $user->id)->with('items.product')->first();

        if (!$cart || $cart->items->isEmpty()) {
            return response()->json(['message' => 'Your cart is empty'], 400);
        }

        // Use a transaction for consistency
        return DB::transaction(function () use ($user, $cart) {
            $totalAmount = 0;

            // 1. Create the Order (with user's phone)
            $order = Order::create([
                'user_id' => $user->id,
                'phone' => $user->phone,
                'total_amount' => 0, // Will update shortly
                'status' => 'pending'
            ]);

            // 2. Transfer CartItems to OrderItems (Capture current Price)
            foreach ($cart->items as $item) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $item->product_id,
                    'quantity' => $item->quantity,
                    'price' => $item->product->price
                ]);

                $totalAmount += ($item->product->price * $item->quantity);
            }

            // 3. Update final total
            $order->update(['total_amount' => $totalAmount]);

            // 4. Empty the Cart
            $cart->items()->delete();

            // 5. Trigger Event (OrderPlaced) - Will handle stock and email
            event(new \App\Events\OrderPlaced($order));

            return response()->json([
                'message' => 'Order placed successfully',
                'order' => $order->load('items.product')
            ], 201);
        });
    }

    /**
     * Display a single order details.
     */
    public function show(Request $request, Order $order)
    {
        $user = $request->user();

        // Allow admins to view any order, users can only view their own
        if ($user->role !== 'admin' && $order->user_id !== $user->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        return response()->json($order->load('items.product', 'user'));
    }

    /**
     * Update order status (Admin only).
     */
    public function update(Request $request, Order $order)
    {
        $request->validate([
            'status' => 'required|in:pending,confirmed,delivered,rejected'
        ]);

        $order->update(['status' => $request->status]);

        return response()->json([
            'message' => 'Order status updated successfully',
            'order' => $order->load('items.product', 'user')
        ]);
    }
}
