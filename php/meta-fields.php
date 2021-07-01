<?php

/**
 * Register the meta fields.
 */
add_action( 'init', 'snt_events_register_block_meta' );

function snt_events_register_block_meta() {
  register_meta( 
    'post', 
    SNT_META_START, 
    array(
      'show_in_rest'       => true,
      'type'               => 'string',
      'default'            => '',
      'single'             => true,
      'sanitize_callback'  => 'sanitize_text_field',
      'auth_callback'      => function() { 
        return current_user_can('edit_posts');
      }
    )
  );
  register_meta( 
    'post', 
    SNT_META_FINISH, 
    array(
      'show_in_rest'       => true,
      'type'               => 'string',
      'default'            => '',
      'single'             => true,
      'sanitize_callback'  => 'sanitize_text_field',
      'auth_callback'      => function() { 
        return current_user_can('edit_posts');
      }
    )
  );
  register_meta(
    'post', 
    SNT_META_DF_FINISH, 
    array(
      'show_in_rest'       => true,
      'type'               => 'string',
      'default'            => '',
      'single'             => true,
      'sanitize_callback'  => 'sanitize_text_field',
      'auth_callback'      => function() { 
        return current_user_can('edit_posts');
      }
    )
  );
  register_meta( 
    'post', 
    SNT_META_DATES, 
    array(
      'show_in_rest'       => true,
      'type'               => 'string',
      'default'            => '',
      'single'             => true,
      'sanitize_callback'  => 'sanitize_text_field',
      'auth_callback'      => function() { 
        return current_user_can('edit_posts');
      }
    )
  );
  register_meta( 
    'post', 
    SNT_META_TIMES,
    array(
      'show_in_rest'       => true,
      'type'               => 'string',
      'default'            => '',
      'single'             => true,
      'sanitize_callback'  => 'sanitize_text_field',
      'auth_callback'      => function() { 
        return current_user_can('edit_posts');
      }
    )
  );
  register_meta( 
    'post', 
    SNT_META_IGNORE, 
    array(
      'show_in_rest'       => true,
      'type'               => 'boolean',
      'default'            => false,
      'single'             => true,
      'sanitize_callback'  => function($val){return boolval($val);},
      'auth_callback'      => function() { 
        return current_user_can('edit_posts');
      }
    )
  );
  register_post_meta( 
    'post', 
    SNT_META_DETAILS, 
    array(
      'type'          => 'object',
      'single'        => true,
      'show_in_rest' => array(
        'schema' => array(
          'type'       => 'object',
          'properties' => array(
            'status'  => array(
              'type' => 'string',
            ),
            'attendance_mode'  => array(
              'type' => 'string',
            ),
            'venue_location_name'=> array(
              'type' => 'string',
            ),
            'venue_location_address'=> array(
              'type' => 'string',
            ),
            'online_location_name'=> array(
              'type' => 'string',
            ),
            'online_location_url'=> array(
              'type' => 'string',
            ),
            'performers'=> array(
              'type' => 'string',
            )
          )
        )
      ),
      'auth_callback'   => function() { 
        return current_user_can('edit_posts');
      }
    )
  );
  }


/**
 * If an event related meta field is updated to an empty string,
 * the meta filed is deleted. This prevents posts where the events block
 * has been removed showing up as events when a meta field query is done.
 * 
 * The JS file dispatches empty strings for the meta fields if
 * the events block is removed.
 */
add_action("updated_postmeta", "snt_events_check_event_meta", 10, 4);

function snt_events_check_event_meta( $meta_id, $post_id, $key, $value ) {
  /** 
   * Array of event related meta values to wipe. 
   * META_IGNORE is missed out because it it a boolean 
   * and can't be set as an empty string.
   */
  $event_meta = [ 
    SNT_META_START,  
    SNT_META_FINISH, 
    SNT_META_DF_FINISH, 
    SNT_META_DATES, 
    SNT_META_TIMES,
    SNT_META_IGNORE
  ];
 
  if ( !in_array($key, $event_meta) ) {
    return;
  }
  
  if ( $value == false ) {
    delete_post_meta($post_id, $key);
    if ( $key === SNT_META_START ) {
      // SNT_META_IGNORE is boolean can can't be an empty string
      // So it is caught here while deleting SNT_META_START
      delete_post_meta($post_id, SNT_META_IGNORE);
    }
  }
}
  