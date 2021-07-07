<?php
/**
  * Plugin Name: snt-events
  * Plugin URI: S simple plugin that handles events with Gutenberg blocks.
  * Author: Grove
  * Author URI: 
  */
if( ! defined( 'ABSPATH') ) {
    exit;
}

/**
 * Define some constants
 */
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
require_once( 'php/acf-options-page.php' );

/**
 * Add a dummy page for the events diary (pending events)
 */
require_once( 'php/event-diary-page.php' );

/**
 * Alter the events category archive page.
 */
require_once( 'php/event-archive-page.php' );


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

/**
 * Filter the post titles for the main query. 
 * If a post is in the events category, 
 * prepend 'Events:' to the title. 
 */

add_filter( 'the_title', 'snt_filter_single_titles', 10, 2 );

function snt_filter_single_titles( $title, $id ) {
  if ( !is_admin() && in_category( SNT_OPTION_EVENT_CAT_ID, $id ) ) {
    $title = "<span class='single-title-prefix'>Event:</span> {$title}";
  }

  return $title;
}

// OLD method

/* add_filter( 'the_posts', 'snt_filter_single_titles', 10, 2 );

function snt_filter_single_titles( $posts, $query ) {
  if ( !is_admin() && $query->is_main_query()  ) {
    foreach ( $posts as $post ) {

      if ( in_category( SNT_OPTION_EVENT_CAT_ID, $post->ID ) ) {
        $post->post_title = "<span class='single-title-prefix'>Event:</span> {$post->post_title}";
      }

    }
  }

  return $posts;
} */