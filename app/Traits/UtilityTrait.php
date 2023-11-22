<?php

namespace App\Traits;

trait UtilityTrait
{
    public static function getRandomString(int $maxLength = 24, float $randPartRatio = 0.55): string
    {
        $timestamp = str_replace('.', '', microtime(true));
        $timestampLength = ceil($randPartRatio * $maxLength);

        $timestamp = substr($timestamp, -$timestampLength);
        $randomString = bin2hex(random_bytes( ceil(( $maxLength - strlen($timestamp) ) / 2) ));
        $transactionReference = $timestamp . $randomString;

        $transactionReference = substr($transactionReference, -$maxLength);

        return $transactionReference;
    }

    public function makePasswordFromName(string $name): string {
        $password = str_replace(' ', '', $name);

        if (strlen($password) < 8) {
            $remainingChars = 8 - strlen($password);
            $randomNumbers = mt_rand(pow(10, $remainingChars - 1), pow(10, $remainingChars) - 1);
            $password = substr($password . $randomNumbers, 0, 8);
        }

        return $password;
    }
}
