<?php

/**
 * Alter the event category archive page, so that it 
 * becomes the Events Archive, or All Events page.
 */

/**
 * Alter the event category archive query 
 */
add_action( 'pre_get_posts', 'snt_alter_query' );

function snt_alter_query( $query ) {
  // Order the event category archive page by start date.
  if ( 
    $query->is_category( SNT_OPTION_EVENT_CAT_ID ) && 
    $query->is_main_query()
    ){
      $query->set( 'order', 'DESC' );
      $query->set( 'orderby', 'meta_value' );
      $query->set( 'meta_key', SNT_META_START );
      $query->set( 'meta_type', 'DATETIME' );
      $query->set( 'posts_per_page', -1 );
    }
}

/**
 * Filter the archive page title prefix.
 */
add_filter('get_the_archive_title_prefix', 'snt_filter_archive_title_prefix');

function snt_filter_archive_title_prefix( $prefix ) {
  if ( is_category( SNT_OPTION_EVENT_CAT_ID ) ) {
    return "";
  }
  return $prefix;
}


/**
 * Alter the archive page title.
 */
add_filter( 'get_the_archive_title', 'snt_filter_archive_title' );

function snt_filter_archive_title( $title ) {
    if ( is_category( SNT_OPTION_EVENT_CAT_ID ) ) {
      return "Events Archive";
    }
    
    return $title;
}