<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit922c70a1ba5685154aecbde09a61cad4
{
    public static $prefixLengthsPsr4 = array (
        'P' => 
        array (
            'PHPMailer\\PHPMailer\\' => 20,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'PHPMailer\\PHPMailer\\' => 
        array (
            0 => __DIR__ . '/..' . '/phpmailer/phpmailer/src',
        ),
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInit922c70a1ba5685154aecbde09a61cad4::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInit922c70a1ba5685154aecbde09a61cad4::$prefixDirsPsr4;

        }, null, ClassLoader::class);
    }
}
