<?php

/**
 * ACF options page
 * 
 */
add_action('acf/init', 'snt_acf_options_page');
function snt_acf_options_page() {
  if( function_exists('acf_add_options_page') ) {      
    acf_add_options_sub_page(array(
      'page_title'  => __('Extra Site Settings', 'sntEvents'),
      'menu_title'  => __('Extra Site Settings', 'sntEvents'),
      'parent_slug' => 'options-general.php',
      'capability'	=> 'manage_options',
      'redirect'		=> false,            
    ));
  }
}