<?php
/**
 * Plugin Name: SNT Events
 * Plugin URI: https://github.com/stuffnting/snt-events-block
 * Description: Simple plugin that handles events with Gutenberg blocks.
 * Author: Grover Stones
 * Author URI: https://stuffnting.com
 * version: 1.0.0
 * Requires at least: 5.4
 * Requires PHP: 7.2
 * License: GPL v3 or later
 * License URI: https://www.gnu.org/licenses/gpl-3.0.html
 * Text Domain: sntEvents
 */

if( ! defined( 'ABSPATH') ) {
    exit;
}

/**
 * Define some constants
 */

// Defining a constant has better performance than using get_plugin_data()
define('SNT_EVENTS_VERSION', '1.0.0');

define('SNT_EVENTS_PLUGIN_PATH', plugin_dir_path( __FILE__ ));

define('SNT_META_START', '_snt_event_start');
define('SNT_META_FINISH', '_snt_event_finish');
define('SNT_META_DF_FINISH', '_snt_event_de_facto_finish');
define('SNT_META_DATES', '_snt_event_date_string');
define('SNT_META_TIMES', '_snt_event_time_string');
define('SNT_META_IGNORE', '_snt_event_ignore_time');
define('SNT_META_DETAILS', '_snt_event_details');

define('SNT_OPTION_EVENT_CAT_ID', get_field('event_category_id', 'option'));
define('SNT_OPTION_EVENT_DIARY_SLUG', get_field('event_diary_slug', 'option'));


/**
 * Remove jQuery Migrate, added by WordPress 5.6, so that all the
 * annoying console messages are removed.
 */
require_once( 'php/remove-jquery-migrate.php' );

/**
 * Register the meta fields
 */
require_once( 'php/meta-fields.php' );

/**
 * Register the dynamic callback to render the block on the frontend
 */
require_once( 'php/dynamic-cb.php' );

/**
 * Adds a ACF options page
 */
require_once( 'php/acf.php' );

/**
 * Add a dummy page for the events diary (pending events)
 */
require_once( 'php/event-diary-page.php' );

/**
 * Alter the events category archive page.
 */
require_once( 'php/event-archive-page.php' );

/**
 * Alter the events titles and excerpts.
 */
require_once( 'php/event-titles-and-excerpts.php' );

/**
 * Enqueue the JS file and localize it.
 */
add_action( 'init', 'snt_events_enqueue_editor_block_assets' );

function snt_events_enqueue_editor_block_assets() {

  wp_register_script(
    'snt-events-script',
    plugins_url( 'js/index.js', __FILE__ ),
    array( 'wp-edit-post', 'wp-dom-ready' ),
    filemtime( plugin_dir_path(__FILE__) . 'js/index.js' ), // *** Dev only
    true
  );

  // Frontend stylesheet is empty
  /* wp_register_style(
    'snt-events-frontend-style',
    plugins_url( 'css/style.css', __FILE__ ),
    array('wp-edit-blocks'),
    filemtime( plugin_dir_path(__FILE__) . 'css/style.css' ) // *** Dev only
  ); */

  wp_register_style(
    'snt-events-editor-style',
    plugins_url( 'css/editor-styles.css', __FILE__ ),
    array('wp-edit-blocks'),
    filemtime( plugin_dir_path(__FILE__) . 'css/editor-styles.css' ) // *** Dev only
  );

  register_block_type( 'snt/events-block', array(
    'apiVersion' => 2,
    'editor_script' => 'snt-events-script',
    'editor_style' => 'snt-events-editor-style',
    'render_callback' => 'snt_events_dynamic_cb'
  ) );
}


/**
 * Add inline script with PHP data: the post type, and the events category ID
 * from the options page.
 * 
 * Can't be added before snt-events-script is registered.
 * Therefore, this must be done after the init hook.
 * 
 * Enqueued when snt-events-script is registered (see above), which is only on admin pages.
 */
add_action( 'enqueue_block_editor_assets', 'snt_events_localize_editor_block_script' );

function snt_events_localize_editor_block_script() {
  // Allow the script to use PHP derived data
  $script_string = 'var from_php_object = { "events_cat_ID": "' 
    . SNT_OPTION_EVENT_CAT_ID . 
    '", "post_type": "' 
    . get_post_type() .
     '" }'; 

  // Params - registered script handle, data to add, add before/after script file
  wp_add_inline_script( 'snt-events-script', 
    $script_string,
    'before' 
  );
}