<?php

namespace App\Services;

use App\Support\ProductOptions;
use Illuminate\Support\Collection;
use Statamic\Facades\Entry;
use Statamic\Facades\GlobalSet;

class HavenStore
{
    public const LOCALES = [
        'en' => 'English',
        'es' => 'Spanish',
        'de' => 'German',
    ];

    public function currencySymbol(): string
    {
        try {
            $symbol = trim((string) (GlobalSet::findByHandle('setting')?->inDefaultSite()?->get('currency_symbol') ?? ''));
        } catch (\Throwable $e) {
            $symbol = '';
        }

        return $symbol !== '' ? $symbol : '$';
    }

    public function locale(): string
    {
        $code = strtolower((string) session('haven_locale', 'en'));

        return isset(self::LOCALES[$code]) ? $code : 'en';
    }

    public function format(?float $amount): string
    {
        $amount = round((float) $amount, 2);

        return $this->currencySymbol().' '.number_format($amount, 2);
    }

    public function items(): array
    {
        return array_values((array) session('haven_cart', []));
    }

    public function count(): int
    {
        return collect($this->items())->sum(fn ($item) => (int) ($item['qty'] ?? 0));
    }

    public function subtotal(): float
    {
        return round(collect($this->items())->sum(fn ($item) => (float) ($item['total'] ?? 0)), 2);
    }

    public function add(string $id, int $qty = 1, array $options = []): bool
    {
        $entry = Entry::find($id);
        if (! $entry || $entry->collectionHandle() !== 'products') {
            return false;
        }

        $qty = max(1, min(20, $qty));
        $price = (float) $entry->get('price', 0);
        $imageUrl = $this->imageUrl($entry);
        $chosen = ProductOptions::pick(ProductOptions::groups($entry), $options);
        $lineId = ProductOptions::lineId($entry->id(), $chosen);
        $byHandle = collect($chosen)->keyBy('handle');

        $items = collect(session('haven_cart', []))->keyBy(fn ($item) => $item['line_id'] ?? $item['id']);
        $existing = $items->get($lineId);
        $nextQty = $existing ? min(20, (int) $existing['qty'] + $qty) : $qty;

        $items[$lineId] = [
            'id' => $entry->id(),
            'line_id' => $lineId,
            'title' => $entry->get('title'),
            'url' => $entry->url(),
            'image' => $imageUrl,
            'color' => (string) ($byHandle->get('color')['value'] ?? ''),
            'size' => (string) ($byHandle->get('size')['value'] ?? ''),
            'options' => $chosen,
            'options_label' => collect($chosen)
                ->filter(fn ($row) => ($row['value'] ?? '') !== '')
                ->map(fn ($row) => $row['label'].': '.$row['value'])
                ->implode(' · '),
            'price' => $price,
            'qty' => $nextQty,
            'total' => round($price * $nextQty, 2),
        ];

        session(['haven_cart' => $items->values()->all()]);

        return true;
    }

    public function update(array $qtyById): void
    {
        $items = collect(session('haven_cart', []))->keyBy(fn ($item) => $item['line_id'] ?? $item['id']);
        foreach ($qtyById as $id => $qty) {
            if (! $items->has($id)) {
                continue;
            }
            $qty = max(1, min(20, (int) $qty));
            $row = $items->get($id);
            $row['qty'] = $qty;
            $row['total'] = round(((float) $row['price']) * $qty, 2);
            $items[$id] = $row;
        }
        session(['haven_cart' => $items->values()->all()]);
    }

    public function remove(string $id): void
    {
        $items = collect(session('haven_cart', []))->reject(function ($item) use ($id) {
            return ($item['line_id'] ?? '') === $id || ($item['id'] ?? '') === $id;
        });
        session(['haven_cart' => $items->values()->all()]);
    }

    private function imageUrl($entry): string
    {
        $path = (string) $entry->get('image', '');
        if ($path !== '') {
            return '/assets/'.ltrim($path, '/');
        }

        $image = $entry->augmentedValue('image');
        $resolved = is_object($image) && method_exists($image, 'value') ? $image->value() : $image;
        if (is_object($resolved) && method_exists($resolved, 'url')) {
            return $resolved->url();
        }

        return '/assets/image/images-19.jpg';
    }

    public function share(): void
    {
        $items = Collection::make($this->items())->map(function ($item) {
            $item['price_label'] = $this->format((float) $item['price']);
            $item['total_label'] = $this->format((float) $item['total']);

            return $item;
        });

        view()->share([
            'haven_cart' => $items,
            'haven_cart_count' => $this->count(),
            'haven_cart_subtotal' => $this->format($this->subtotal()),
            'haven_cart_summary' => $items->map(function ($item) {
                $label = trim($item['title'].' '.($item['options_label'] ?? ''));

                return $label.' x '.$item['qty'].' = '.$item['total_label'];
            })->implode('; '),
            'haven_currency' => $this->currencySymbol(),
            'haven_locale' => $this->locale(),
            'haven_locale_label' => self::LOCALES[$this->locale()],
        ]);
    }
}
