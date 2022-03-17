<?php

// Enqueuing
function load_css()
{
    wp_register_style('main', get_template_directory_uri() . '/style.css', [], 1, 'all');
    wp_enqueue_style('main');

}
add_action('wp_enqueue_scripts', 'load_css');

function load_js()
{
    wp_register_script('js', get_template_directory_uri() . '/js/main.js', 0, 1, true);
    wp_enqueue_script('js');
}
add_action('wp_enqueue_scripts', 'load_js');

// Image Sizes
add_image_size('small', 600, 600, false);