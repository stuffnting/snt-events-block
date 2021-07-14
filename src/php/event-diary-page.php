<?php 

/**
 * This code is a a dummy page, with a fake URL, to hold the vents diary.
 * (pending events).
 * 
 */


/**
 * Add dummy_page query_var so that dummy pages are easily tested
 */
add_filter( 'query_vars', 'snt_events_add_query_vars' );

function snt_events_add_query_vars( $query_vars ) {
  $query_vars[] = 'dummy_page';
  return $query_vars;
}


/**
 * Add a dummy page for pending events for SNT_OPTION_EVENT_DIARY_SLUG
 */
add_filter( 'request', 'snt_events_alter_the_query' );

function snt_events_alter_the_query( $request ) {
  if ( 
    !is_admin() && 
    array_key_exists( 'pagename', $request ) && 
    SNT_OPTION_EVENT_DIARY_SLUG === $request['pagename']
  ) {
  // Current date without time. Then add time as one minute past midnight.
  $now = date("c"); // DATETIME format is Y-m-dTH:i:s+00:00
  $now = substr_replace($now, '00:00:01', 11);

    $new_request["meta_query"] = array(
      array(
        'key' => SNT_META_DF_FINISH,
        'type' => 'DATETIME',
        'value'     => $now,
        'compare'   => '>=',
      ),
    );

    $new_request['meta_key'] = SNT_META_START;
    $new_request['meta_type'] = 'DATETIME';
    $new_request['orderby'] = 'meta_value';
    $new_request['order'] = 'ASC';
    $new_request['dummy_page'] = 'pending events';

    return $new_request;
  }
  return $request;
}


/**
 * Alter the conditionals for dummy archive pages
 * 
 * Directly altering $wp_the_query at this point also alters $wp_query
 */
add_action( 'wp', 'snt_alter_conditionals' );

function snt_alter_conditionals() {
  global $wp_the_query;

  if ( 
    is_main_query() && 
    get_query_var('dummy_page', false)
  ) {
    $wp_the_query->is_home = false;
    $wp_the_query->is_archive = true;
  }
}


/**
 * Add a title to dummy archive pages
 */
add_filter( 'get_the_archive_title', 'snt_filter_dummy_archive_title' );

function snt_filter_dummy_archive_title( $title ) {
    global $wp_query;
    if( 'pending events' === get_query_var('dummy_page', false) ) {
      return "Events Diary";
    }
    return $title;
}