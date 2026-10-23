<?php

namespace App\Support;

use Statamic\Facades\Entry;

class HavenSearch
{
    public function results(string $query): array
    {
        $query = trim($query);
        if ($query === '') {
            return [];
        }

        return Entry::query()
            ->whereIn('collection', ['products', 'blogs'])
            ->get()
            ->filter(fn ($entry) => $entry->published())
            ->filter(fn ($entry) => $this->matches($query, (string) $entry->get('title').' '.$entry->slug(), true)
                || $this->matches($query, $this->haystack($entry), false))
            ->sortBy(fn ($entry) => ($entry->collectionHandle() === 'products' ? '0' : '1').mb_strtolower($entry->get('title')))
            ->take(24)
            ->map(fn ($entry) => [
                'title' => $entry->get('title'),
                'url' => $entry->url(),
                'image' => $this->imageUrl($entry),
                'price' => $entry->collectionHandle() === 'products' ? $entry->get('price') : null,
                'kind' => $entry->collectionHandle() === 'products' ? 'Piece' : 'Journal',
                'text' => $this->snippet($entry),
            ])
            ->values()
            ->all();
    }

    private function haystack($entry): string
    {
        return implode(' ', array_filter([
            $entry->get('title'),
            $entry->slug(),
            $entry->get('description'),
            $entry->get('details'),
            $entry->get('excerpt'),
            strip_tags((string) $entry->get('content')),
        ]));
    }

    private function matches(string $query, string $haystack, bool $fuzzy): bool
    {
        $query = mb_strtolower(trim($query));
        $haystack = mb_strtolower($haystack);
        if ($query === '' || $haystack === '') {
            return false;
        }
        if (str_contains($query, ' ') && str_contains($haystack, $query)) {
            return true;
        }

        $words = preg_split('/[^\p{L}\p{N}]+/u', $haystack, -1, PREG_SPLIT_NO_EMPTY) ?: [];
        foreach (preg_split('/[^\p{L}\p{N}]+/u', $query, -1, PREG_SPLIT_NO_EMPTY) as $token) {
            if (mb_strlen($token) < 3) {
                continue;
            }
            foreach ($words as $word) {
                if (mb_strlen($word) < 3) {
                    continue;
                }
                if ($word === $token || str_starts_with($word, $token)) {
                    return true;
                }
                if ($fuzzy
                    && abs(mb_strlen($word) - mb_strlen($token)) <= 1
                    && levenshtein($word, $token) <= 1
                    && $this->sharedPrefix($word, $token) >= 2) {
                    return true;
                }
            }
        }

        return false;
    }

    private function sharedPrefix(string $left, string $right): int
    {
        $limit = min(mb_strlen($left), mb_strlen($right));
        $count = 0;
        for ($i = 0; $i < $limit; $i++) {
            if (mb_substr($left, $i, 1) !== mb_substr($right, $i, 1)) {
                break;
            }
            $count++;
        }

        return $count;
    }

    private function snippet($entry): string
    {
        $text = trim(preg_replace('/\s+/', ' ', strip_tags((string) ($entry->get('description') ?: $entry->get('excerpt') ?: ''))));
        if (mb_strlen($text) > 140) {
            return mb_substr($text, 0, 137).'…';
        }

        return $text;
    }

    private function imageUrl($entry): string
    {
        $path = $entry->get('image');
        if (is_string($path) && $path !== '') {
            return '/assets/'.ltrim($path, '/');
        }

        return '/assets/image/images-19.jpg';
    }
}
