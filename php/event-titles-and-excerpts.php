<?php

/**
 * Alter the event titles and excerpts.
 */

/**
 * Adds the event dates to event archive page excerpts 
 * and events diary page excerpts.
 * 
 * @see snt_events_dynamic_cb() in ./dynamic-cb.php
 * 
 * @param {string} $excerpt The excerpt passed to the WP 
 *                          the_excerpt filter CB function.
 * 
 * @return {string} The excerpt with events dates added.
 */
add_filter( 'the_excerpt', 'snt_filter_archive_excerpt' ) ;

function snt_filter_archive_excerpt($excerpt) {
  if ( !is_admin() && in_category( SNT_OPTION_EVENT_CAT_ID ) ) {
    return snt_events_dynamic_cb(false, false) . $excerpt;
  }

  return $excerpt;
}

/**
 * Filter the post titles for the main query. 
 * If a post is in the events category, 
 * prepend 'Events:' to the title. 
 * 
 * @param {string} $title The title sent to the WP filter CB function.
 * @param {int} $id The post id passed to the WP filter CB function.
 * 
 * @return {string} If the post is an event, the title with "Event! prepended.
 *                  Otherwise, the unaltered title.
 */

add_filter( 'the_title', 'snt_filter_single_titles', 10, 2 );

function snt_filter_single_titles( $title, $id ) {

  if ( !is_admin() && in_category( SNT_OPTION_EVENT_CAT_ID, $id ) ) {
    $title = "<span class='single-title-prefix'>Event:</span> {$title}";
  }

  return $title;
}