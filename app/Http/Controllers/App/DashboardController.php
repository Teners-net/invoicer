<?php

namespace App\Http\Controllers\App;

use App\Http\Controllers\Controller;
use App\Models\Invoice;
use App\Models\Product;
use App\Traits\CompanyTrait;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    use CompanyTrait;

    public function index()
    {
        $user_company = $this->getCurrentCompany();

        $overview = [
            'customers' => $user_company->customers->count(),
            'products' => $user_company->products->count(),
            'invoices' => $user_company->invoices->count(),
        ];

        $inv = $user_company->invoices->whereNotNull('sent_at');

        $invoices = [
            'paid' => $inv->where('paid_at', true)->sum('total_amount'),
            'paid_count' => $inv->where('paid_at', true)->count(),
            'unpaid' => $inv->where('paid_at', false)->sum('total_amount'),
            'unpaid_count' => $inv->where('paid_at', false)->count()
        ];

        return Inertia::render('App/Dashboard', [
            'overview' => $overview,
            'invoices' => $invoices,
        ]);
    }

    public function sales()
    {
        $start = request()->query('start_date', now()->subDays(31));
        $end = request()->query('end_date', now());

        $start = Carbon::parse($start);
        $end = Carbon::parse($end);

        $user_company = $this->getCurrentCompany();

        $invoices = Invoice::where('company_id', $user_company->id)->whereBetween('sent_at', [$start->toDateTimeString(), $end->toDateTimeString()]);
        $cloned = clone $invoices;

        $paidSalesData = $invoices
            ->whereNotNull('paid_at')
            ->select(DB::raw('DATE_FORMAT(sent_at, "%d, %b") as date'), DB::raw('SUM(total_amount) as total_amount'))
            ->groupBy('date')
            ->orderBy('date')
            ->pluck('total_amount', 'date')
            ->toArray();

        $unpaidSalesData = $cloned
            ->whereNull('paid_at')
            ->select(DB::raw('DATE_FORMAT(sent_at, "%d, %b") as date'), DB::raw('SUM(total_amount) as total_amount'))
            ->groupBy('date')
            ->orderBy('date')
            ->pluck('total_amount', 'date')
            ->toArray();

        $dateRange = $this->getDateRange($start, $end);
        $formattedSalesData = $this->formatSalesData($dateRange, $paidSalesData, $unpaidSalesData);

        return array_merge($formattedSalesData, [
            'start' => $start,
            'end' => $end
        ]);
    }

    private function getDateRange($start, $end)
    {
        $dateRange = [];
        while ($start->lte($end)) {
            $dateRange[] = $start->format('d, M');
            $start->addDay();
        }

        return $dateRange;
    }

    private function formatSalesData($dateRange, $paidSalesData, $unpaidSalesData)
    {
        $formattedSalesData = [
            'dates' => $dateRange,
            'paid' => [],
            'unpaid' => [],
        ];

        foreach ($dateRange as $date) {
            $formattedSalesData['paid'][] = $paidSalesData[$date] ?? 0;
            $formattedSalesData['unpaid'][] = $unpaidSalesData[$date] ?? 0;
        }

        return $formattedSalesData;
    }

    public function products()
    {

        $user_company = $this->getCurrentCompany();

        $all = Product::where('company_id', $user_company->id);
        $services = clone $all;

        $goods = $all->where('type', 'GOODS');
        $services = $services->where('type', 'SERVICE');

        $goodsClone = clone $goods;

        return [
            'goods' => $goods->count(),
            'services' => $services->count(),
            'stock' => (object) [
                'adequate' => $goodsClone->where('stock', '>', 26)->count(),
                'low' => $goods->where('stock', '<=', 25)->count(),
                'out' => $goods->where('stock', 0)->count(),
            ]
        ];
    }
}
