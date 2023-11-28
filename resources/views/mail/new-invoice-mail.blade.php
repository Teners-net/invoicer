<x-mail::message>
Hi, {{$invoice->customer->full_name}} <br>
<b>{{$invoice->company->name}}</b> has sent you an invoice.

<x-mail::panel>
<x-mail::table>
| Summary        |          |
|:-|-:|
| Invoice No.    | {{$invoice->slug}} |
| Invoice Due At | {{date_format($invoice->due_at ?? $invoice->created_at, 'jS F, Y')}} |
| Invoice Amount.| {{$invoice->currency->symbol}} {{$invoice->total_amount}} |
</x-mail::table>
</x-mail::panel>

<x-mail::button :url="route('invoice.show', $invoice)">
Make payment
</x-mail::button>

Find full details of the invoice in the PDF file attached to this e-mail or click on the following link: <a href="{{route('invoice.show', $invoice)}}">{{route('invoice.show', $invoice)}}</a>

<hr style="margin-top: 2em;">
Thanks,<br>
{{$invoice->company->name}}
</x-mail::message>