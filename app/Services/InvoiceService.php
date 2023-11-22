<?php

namespace App\Services;

use App\Models\Invoice;
use Barryvdh\DomPDF\Facade\Pdf as PDF;

class InvoiceService
{
    private $invoice;

    public function __construct(Invoice $invoice)
    {
        $this->invoice = $invoice;
    }

    public function generateInvoice()
    {
        $pdf = PDF::loadView('templates.classic', [
            'invoice' => $this->invoice
        ]);

        return $pdf
            ->setPaper('a4')
            ->setOption(['dpi' => 150])
            ->setWarnings(true)
            ->stream();
    }
}
