<?php

namespace App\Models;

use App\Traits\UtilityTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Platinum\LaravelExtras\Traits\Sluggable;

class Invoice extends Model
{
    use HasFactory, Sluggable, UtilityTrait;

    /**
     * The attributes that are not mass assignable.
     *
     * @var array<int, string>
     */
    protected $guarded = ['id'];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'total_amount' => 'float',
        'due_at' => 'datetime',
        'sent_at' => 'datetime',
        'created_at' => 'datetime'
    ];

    protected function generateSlug()
    {
        return strtoupper('INV-' . $this->getRandomString(10));
    }

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    public function products()
    {
        return $this->hasMany(InvoiceProduct::class);
    }

    public function currency()
    {
        return $this->belongsTo(Currency::class);
    }

    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    public function channels()
    {
        return $this->belongsToMany(PaymentChannel::class);
    }

    public function getPdfUrlAttribute()
    {
        return Storage::url("invoices/" . $this->company->slug . "/$this->slug.pdf");
    }

    public function getStatusAttribute()
    {
        $status = '';

        if (!$this->sent_at) $status = 'Draft';
        if ($this->sent_at) $status = "Sent";
        if ($this->customer_marked_paid_at) $status = "Pending";
        if ($this->paid_at) $status = "Paid";

        return $status;
    }

    protected $appends = [
        'pdf_url', 'status'
    ];
}
