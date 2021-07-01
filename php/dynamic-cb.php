<?php

function snt_events_dynamic_cb( $attributes, $inner_blocks ) {
  global $post;
  //Get a flattened array
  $meta = get_post_meta( get_the_ID() );

  $date_string = $meta[SNT_META_DATES][0] ?? '';
  $time_string = $meta[SNT_META_TIMES][0] ?? '';
  $ignore_time = $meta[SNT_META_IGNORE][0] ?? false;

  $time_string = $ignore_time ? '' : $time_string ;

  $start_date = $meta[SNT_META_START][0] ?? '';
  $finish_date = $meta[SNT_META_FINISH][0] ?? '';

  // If this is an archive page only return the date string
  if ( is_archive() ) {
    return $date_string ? "<p class='excerpt-event-details'>Date: $date_string</p>" : '' ;
  }

  $details = maybe_unserialize( $meta[SNT_META_DETAILS][0] );

  $status = $details['status'] ?? 'EventScheduled';
  $attendance_mode = $details['attendance_mode'] ?? 'OnlineEventAttendanceMode';
  $venue_location_name = $details['venue_location_name'] ?? '';
  $venue_location_address = $details['venue_location_address'] ?? '';
  $online_location_name = $details['online_location_name'] ?? '';
  $online_location_url = $details['online_location_url'] ?? '';
  $performers = $details['performers'] ?? '';

  $schema = [
    "@context"    => "https://schema.org",
    "@type"       => "Event",
    "name"        => sanitize_text_field( $post->post_title ), // Unaffected by the_title filter
    "description" => get_the_excerpt(),
    'image'       => "https://riot1831.com/android-chrome-512x512.png",
    "startDate"   => $start_date ? $start_date . "+00:00" : '',
    "endDate"  => $finish_date ? $finish_date . "+00:00" : ''
  ];

  switch ( $attendance_mode ) {
    case 'MixedEventAttendanceMode':
      $schema['eventAttendanceMode'] = 'MixedEventAttendanceMode';
      $schema['location'] = [
        [ '@type' => 'VirtualLocation', 'name' => $online_location_name, 'url' => $online_location_url ],
        [ '@type' => 'Place', 'name' => $venue_location_name, 'address' => $venue_location_address ]
      ];
      break;
    case 'OfflineEventAttendanceMode':
      $schema['eventAttendanceMode'] = 'OfflineEventAttendanceMode';
      $schema['location'] = [ 
        '@type'   => 'Place', 
        'name'    => $venue_location_name, 
        'address' => $venue_location_address 
      ];
      break;
    case 'OnlineEventAttendanceMode':
      $schema['eventAttendanceMode'] = 'OnlineEventAttendanceMode';
      $schema['location'] = [ 
        '@type' => 'VirtualLocation', 
        'name'  => $online_location_name, 
        'url'   => $online_location_url 
      ];
      break;
    default: 
  }

  $schema['eventStatus'] = $status;

  $performers_array = array_map( 'trim', explode( ',', $performers ) );
  
  if ( is_array( $performers_array ) ) {
    $schema['performer'] = [];

    foreach( $performers_array as $performer ) {
      $schema['performer'][] = [
        '@type' => 'Person',
        'name'  => $performer
      ];
    }
  } else {
    $schema['performer'] = '';
  }
  
  // Otherwise format all the event details
  $meta_out = '<p class="event-details-title">Event details</p>';
  $meta_out .= $date_string 
    ? sprintf( "<p class='event-details-date'>%s</p>\n",
      sanitize_text_field( $date_string )
    )
    : '';
  $meta_out .= ( $time_string && $date_string ) 
    ? sprintf( "<p class='event-detail-time'>%s</p>\n",
     sanitize_text_field( $time_string )
    )
    : '';
  $meta_out .= $venue_location_name 
    ? sprintf( "<p class='event-detail-venue'>Venue: %s, %s</p>\n",
      sanitize_text_field( $venue_location_name ),
      sanitize_text_field( $venue_location_address )
    )
    : '';
  $meta_out .= $online_location_name 
    ? sprintf( "<p class='event-detail-online'>Online: <a href='%s' target='_blank'>%s</a></p>\n",
      esc_url( $online_location_url ),
      sanitize_text_field( $online_location_name )
    )
    : '';
  $meta_out .= $performers 
    ? sprintf( "<p class='event-detail-performers'>With: %s</p>\n", 
      sanitize_text_field($performers)
    )
    : '';


  /**
   * The block's meta values can not be used in its `save` function,
   * whereas, the block's inner-blocks are included. This means that
   * the meta values need to be added back into the HTML from 
   * the `save` function.
   * 
   * $meta_out is placed into the div wrapper added by the inner-block
   * by the `save` function.
   */ 
  $re = '@(<div[\w\W\r\t\n]*>)@mU';
  $subst = "$1\n$meta_out";

  $html_out = preg_replace($re, $subst, $inner_blocks);
  $schema_out = json_encode($schema);
  $final_out = "$html_out <script type='application/ld+json' >$schema_out</script>";

  return $final_out;
}