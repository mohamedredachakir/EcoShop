<?php

namespace App\Listeners;

use App\Events\OrderPlaced;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Schema;

class UpdateStock implements ShouldQueue
{
    use InteractsWithQueue;

    /**
     * Handle the event.
     */
    public function handle(OrderPlaced $event): void
    {
        $order = $event->order;

        foreach ($order->items as $item) {
            $product = $item->product;
            if (Schema::hasColumn('products', 'stock_quantity')) {
                $product->decrement('stock_quantity', $item->quantity);
            } elseif (Schema::hasColumn('products', 'stock')) {
                $product->decrement('stock', $item->quantity);
            }
        }
    }
}
