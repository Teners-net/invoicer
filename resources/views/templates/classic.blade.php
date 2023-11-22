<!DOCTYPE html>
<html>

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <title>Invoice</title>

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
      font-family: "DejaVu Sans";
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
    small {
      margin: 0px;
      padding: 0px;
    }

    .p-4 {
      padding: 1.5rem;
    }

    .p-2 {
      padding: 0.5rem;
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
      border: 1px solid rgb(229 231 235);
      border-collapse: collapse;
    }

    .table tr,
    .table th,
    .table td {
      border-collapse: collapse;
      border: 1px solid rgb(229 231 235);
      white-space: nowrap;
      padding: 0.5rem 1rem;
      text-align: left;
    }

    .border {
      border: 1px solid rgb(229 231 235);
    }

    small {
      font-size: 0.6rem;
      font-weight: lighter;
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

    .table th {
      border-collapse: collapse;
      border: 1px solid white;
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
  <header style="border-top: 0.8rem solid <?php echo $invoice->company->primary_color; ?>">
  </header>

  <footer style="border-bottom: 0.8rem solid <?php echo $invoice->company->secondary_color; ?>">
  </footer>

  <main>
    <table>
      <tbody>
        <tr>
          <td>
            <h1>{{$invoice->company->name}}</h1>
            <p>{{$invoice->company->rc_number}}</p>
          </td>
          <td>
            @if ($invoice->company->logo_public_url)
            <img src="<?php echo $_SERVER["DOCUMENT_ROOT"] . $invoice->company->logo_public_url; ?>" class="float-right" height="100" alt="Company Logo">
            @endif
          </td>
        </tr>
      </tbody>
    </table>

    <div class="my-4">
      <small>INVOICE</small>
      <h3>#{{$invoice->slug}}</h3>
      <p>Due Date: {{$invoice->due_at}}</p>
    </div>

    <div>
      <small>BILL TO</small>
      <h3>{{$invoice->customer->full_name}}</h3>
      <p>{{$invoice->customer->email}}</p>
      <p>{{$invoice->customer->phone}}</p>
      <p>{{$invoice->customer->address}}</p>
    </div>

    <table class="table my-4">
      <thead>
        <tr>
          <th>SN</th>
          <th>PRODUCT</th>
          <th>QUANTITY</th>
          <th>RATE</th>
          <th>AMOUNT</th>
        </tr>
      </thead>

      <tbody>
        @foreach ($invoice->products as $item)
        <tr>
          <td>{{$loop->index + 1}}</td>
          <td>{{$item->name}}</td>
          <td>{{$item->quantity}}</td>
          <td>{{$item->amount}}</td>
          <td>{{$item->amount * $item->quantity}}</td>
        </tr>
        @endforeach
      </tbody>
    </table>

    <hr>
    <hr>
    <h2 class="mt-4" align="right">{{$invoice->currency->symbol}} {{$invoice->total_amount}}</h2>
    <hr>
    <hr>

    @if ($invoice->note)
    <div class="mt-4">
      <small>NOTE</small>
      <p>{!! $invoice->note ?? 'No Note Added' !!}</p>
    </div>
    @endif

    <div class="my-4">
      <p>Pay through any of the following channels</p>
      <table class="mt-1">
        <tbody>
          @foreach ($invoice->channels->chunk(2) as $chunk)
          <tr>
            @foreach ($chunk as $channel)
            <td style="width: 49%;">
              <div class="p-2 border">
                <h4>{{$channel->bank_name}}</h4>
                <p class="mt-1">
                  <small>Account Name</small> <br>
                  {{$channel->account_name}}
                </p>

                <p class="mt-1">
                  <small>Account Number</small> <br>
                  {{$channel->account_number}}
                </p>
              </div>
            </td>
            @endforeach

            @for ($i = count($chunk); $i < 2; $i++) <td>
              </td>
              @endfor
          </tr>
          @endforeach
        </tbody>
      </table>

    </div>
  </main>
</body>

</html>
