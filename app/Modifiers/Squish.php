<?php

namespace App\Modifiers;

use Statamic\Modifiers\Modifier;

class Squish extends Modifier
{
    public function index($value, $params, $context)
    {
        $text = trim(preg_replace('/\s+/u', ' ', strip_tags((string) $value)) ?? '');

        return $text;
    }
}
