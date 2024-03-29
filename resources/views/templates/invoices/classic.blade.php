<!DOCTYPE html>
<html>

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Invoice - {{$invoice->slug}}</title>
    <meta name="name" content="{{$invoice->slug}}">
    <meta name="author" content="Invoicer by Teners">
    <meta name="keywords" content="{{$invoice->company->slug}}, invoice, invoicer, teners invoicer">
    <meta name="description" content="Invoice from {{$invoice->company->name}}">

    <style type="text/css">
        @page {
            margin: 0;
        }

        header {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
        }

        footer {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
        }

        main {
            padding: 2.5rem 3rem;
        }

        .page-break {
            page-break-after: always;
        }

        body {
            font-family: "DejaVu Serif", "DejaVu Sans";
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6,
        th,
        tr,
        td,
        p,
        small,
        hr {
            margin: 0px;
            padding: 0px;
        }

        .p-4 {
            padding: 1.5rem;
        }

        .p-2 {
            padding: 0.5rem;
        }

        .p-0 {
            padding: 0;
        }

        .mt-1 {
            margin: 0.1rem 0;
        }

        .my-4 {
            margin: 1.2rem 0;
        }

        table {
            width: 100%;
            table-layout: auto;
        }

        .table {
            background-color: white;
            border-collapse: collapse;
        }

        /* .table tr, */
        .table th,
        .table td {
            border-collapse: collapse;
            white-space: nowrap;
            padding: 0.4rem 0.8rem;
            text-align: left;
        }

        .table th {
            border-collapse: collapse;
            border: 1px solid white;
            text-align: center;
        }

        .table thead,
        .table td {
            border: 1px solid rgb(229 231 235);
        }

        .table .money {
            text-align: right;
        }

        .no-border,
        .no-border tr,
        .no-border td {
            border: 0px !important;
        }

        .border {
            border: 1px solid rgb(229 231 235);
        }

        h1 {
            font-size: 2.5rem;
        }

        p,
        td,
        th {
            font-weight: lighter;
            font-size: 0.8rem;
        }

        small {
            font-size: 0.6rem;
            font-weight: lighter;
        }

        thead {
            background-color: rgb(229 231 235);
        }

        .w-full {
            width: 100%;
        }

        hr {
            border-color: rgb(229 231 235);
        }
    </style>
</head>

<body>
    <header style="padding: 0.1rem 4rem; border-top: 0.8rem solid <?php echo $invoice->company->primary_color; ?>">
    </header>

    <footer style="padding: 0.1rem 4rem; border-bottom: 0.8rem solid <?php echo $invoice->company->secondary_color; ?>">
        <hr>
        <small>Powered by Invoicer &bull; <a href="https://invoicer.teners.net">invoicer.teners.net</a></small>
    </footer>

    <main>
        @if ($invoice->company->logo)
        <img src="{{base_path().'/storage/app/public/company_logo/'.$invoice->company->logo}}" height="100" alt="{{$invoice->company->name}}">
        @endif
        <h1>{{$invoice->company->name}}</h1>
        <p>{{$invoice->company->rc_number}}</p>
        <p><a href="{{$invoice->company->website}}">{{$invoice->company->website}}</a></p>
        <p><a href="mailto:{{$invoice->company->contact_email}}">{{$invoice->company->contact_email}}</a></p>

        <div class="my-4">
            <small>INVOICE</small>
            <h3>#{{$invoice->slug}}</h3>
            <p>Invoice Date: {{date_format($invoice->sent_at ?? $invoice->created_at, 'jS F, Y')}}</p>
            @if ($invoice->due_at)
            <p>Due Date: {{date_format($invoice->due_at ?? $invoice->created_at, 'jS F, Y')}}</p>
            @endif
        </div>

        @if ($invoice->customer)
        <div>
            <small>BILL TO</small>
            <h3>{{$invoice->customer->full_name}}</h3>
            <p>{{$invoice->customer->email}}</p>
            <p>{{$invoice->customer->phone}}</p>
            <p>{{$invoice->customer->address}}</p>
        </div>
        @endif

        <table class="table my-4">
            <thead>
                <tr class="border">
                    <th></th>
                    <th>Item Description</th>
                    <th>Qty.</th>
                    <th>Unit Price ({{$invoice->currency->symbol}})</th>
                    <th>Amount ({{$invoice->currency->symbol}})</th>
                </tr>
            </thead>

            <tbody>
                @foreach ($invoice->products as $item)
                <tr>
                    <td>{{$loop->index + 1}}</td>
                    <td>{{$item->name}}</td>
                    <td>{{$item->quantity}}</td>
                    <td class="money">{{$item->amount_in_base / $item->quantity}}</td>
                    <td class="money">{{$item->amount_in_base}}</td>
                </tr>
                @endforeach
                <tr class="no-border">
                    <td colspan="3"></td>
                    <td colspan="2" class="p-0">
                        <hr>
                    </td>
                </tr>
                <tr class="no-border">
                    <td colspan="3"></td>
                    <td>Sub Total</td>
                    <td class="money">{{$invoice->sub_amount}}</td>
                </tr>
                @if ($invoice->discount_value)
                @if ($invoice->discount_type == 'FIXED')
                <tr class="no-border">
                    <td colspan="3"></td>
                    <td>Discount</td>
                    <td class="money">- {{$invoice->currency->symbol}}{{$invoice->discount_value}}</td>
                </tr>
                @else
                <tr class="no-border">
                    <td colspan="3"></td>
                    <td>Discount</td>
                    <td class="money">- {{$invoice->discount_value}}%</td>
                </tr>
                @endif
                @endif
                <tr class="no-border">
                    <td colspan="3"></td>
                    <td>Total</td>
                    <td class="money">
                        <h2>{{$invoice->currency->symbol}} {{$invoice->total_amount}}</h2>
                    </td>
                </tr>
                <tr class="no-border">
                    <td colspan="3"></td>
                    <td colspan="2" class="p-0">
                        <hr>
                    </td>
                </tr>
            </tbody>
        </table>

        @if ($invoice->note)
        <div style="margin-top: 4rem;">
            <small>NOTE</small>
            <p>{!! $invoice->note ?? 'No Note Added' !!}</p>
        </div>
        @endif
    </main>
</body>

</html>