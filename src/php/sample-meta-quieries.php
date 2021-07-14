<?php
/**
 * This is an orphan page that contains the events meta queries used elsewhere.
 */


//add_action('wp_head', 'snt_events_dump_all_dates');

function snt_events_dump_all_dates() {
  global $post;
  snt_dump( snt_events_list_all_events() );
  snt_dump(gettype(get_post_meta($post->ID, "_snt_event_start", true)));
  snt_dump(get_post_meta($post->ID, "_snt_event_start", true));
} 


/**
 * All events queried by `_snt-event-de-facto-finish` and ordered by
 * `_snt-event-start`.
 */
function snt_events_list_all_events() {
  $all_events = get_posts( array(
    'posts_per_page' => -1,
    'post_type'      => 'post',
    'meta_query' => array(
      array(
          'key' => SNT_META_DF_FINISH,
          'type' => 'DATETIME',
      ),
    ),
    'order'          => 'ASC',
    'orderby'        => 'meta_value',
    'meta_key'       => SNT_META_START,
    'meta_type'      => 'DATETIME',
  ));

  $all_events_titles = array();

  if ( $all_events ) {
      foreach( $all_events as $post ) {
          $all_events_titles[] = $post->post_title;
          $all_events_titles[] = get_post_meta($post->ID, SNT_META_DF_FINISH);
      }
  }
  
  return $all_events_titles;
}



//add_action('wp_head', 'snt_events_dump_dates');

function snt_events_dump_dates() {
  snt_dump( snt_events_list_current_and_pending_events() );
}


/**
 * List pending events.
 * Including events today that have finished.
 * 
 */
 
function snt_events_list_current_and_pending_events() {
  // Current date without time. Then add time as midnight.
  $now = date("c"); // DATETIME format is Y-m-dTH:i:s
  //$now .= 'T00:00:00';

  $now = substr_replace($now, '', 16, 6);

  $pending_events = get_posts( array(
    'posts_per_page' => -1,
    'post_type'      => 'post',
    'meta_query' => array(
    array(
        'key' => SNT_META_DF_FINISH,
        'type' => 'DATETIME',
        'value'     => $now,
        'compare'   => '>=',
    ),
    ),
    'order'          => 'ASC',
    'orderby'        => 'meta_value',
    'meta_key'       => SNT_META_START,
    'meta_type'      => 'DATETIME',
 ));

 $pending_events_titles = array();

 if ( $pending_events ) {
  foreach( $pending_events as $post ) {
    $pending_events_titles[] = $post->post_title;
    $pending_events_titles[] = get_post_meta($post->ID, META_DF_FINISH)[0];
    $pending_events_titles[] = get_post_meta($post->ID, META_START)[0];
  }
 }

 return $pending_events_titles;
}