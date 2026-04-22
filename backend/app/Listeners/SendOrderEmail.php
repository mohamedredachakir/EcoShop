<?php

namespace App\Listeners;

use App\Events\OrderPlaced;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Log;

class SendOrderEmail implements ShouldQueue
{
    use InteractsWithQueue;

    /**
     * Handle the event.
     */
    public function handle(OrderPlaced $event): void
    {
        $order = $event->order;
        $user = $order->user;

        // In a real application, you'd use Mail::to($user->email)->send(new OrderConfirmed($order));
        // For this project, we'll log it as requested for "Traitement asynchrone"
        Log::info('EcoShop - Order Confirmation Email sent to: ' . $user->email . ' for Order ID: ' . $order->id);
    }
}
