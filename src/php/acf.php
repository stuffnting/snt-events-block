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


/**
 * ACF fields
 * 
 * @link https://www.advancedcustomfields.com/resources/local-json/
 * 
 * @param {array} $paths The paths list of afc.json file paths
 * 
 * @return {array} The array of paths with the new path added.
 */
add_filter('acf/settings/load_json', 'snt_acf_json_load_point');

function snt_acf_json_load_point( $paths ) {
    
    // remove original path (optional)
    unset($paths[0]);

    // append path
    $paths[] = SNT_EVENTS_PLUGIN_PATH . 'acf-json';

    // return
    return $paths;
    
}