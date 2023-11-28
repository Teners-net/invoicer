<x-mail::message>
Hello {{$invoice->company->name}},

## Invoice Payment Notification

{{$invoice->customer->full_name}} has marked {{$invoice->slug}} as paid. The funds should reflect within any of your payment channels.

You should check and acknoledge the payment when you receive the funds.

<x-mail::button :url="route('invoices.show', $invoice)">
View the Invoice
</x-mail::button>

<hr style="margin-top: 2em;">
Best Regards,<br>
{{ config('app.name') }}
</x-mail::message>
