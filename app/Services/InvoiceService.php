<?php

namespace App\Services;

use App\Models\Invoice;
use Barryvdh\DomPDF\Facade\Pdf as PDF;

class InvoiceService
{

    public static function generateInvoice(Invoice $invoice)
    {
        $pdf = PDF::loadView('templates.invoices.classic', [
            'invoice' => $invoice
        ]);

        $storagePath = self::makeStoragePath($invoice->company->slug);

        $pdf
            ->setPaper('a4')
            ->setOption(['dpi' => 150])
            ->setWarnings(true)
            ->save("$storagePath$invoice->slug.pdf");

        return;
    }

    private static function makeStoragePath(string $companySlug): string {
        $folderPath = "storage/invoices/$companySlug/";

        if (!file_exists($folderPath)) {
            mkdir($folderPath, 0755, true);
        }

        return "$folderPath/";
    }
}
