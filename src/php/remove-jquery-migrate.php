<?php
/**
 * Remove jQuery migrate
 */
add_action('wp_default_scripts', function ($scripts) {
  if (!empty($scripts->registered['jquery'])) {
      $scripts->registered['jquery']->deps = array_diff($scripts->registered['jquery']->deps, ['jquery-migrate']);
  }
});