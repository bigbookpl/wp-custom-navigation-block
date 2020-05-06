<?php
/**
 * Plugin Name:     Custom Navigation
 * Description:     Gutenberg block to display vertical navigation.
 * Version:         1.0.0
 * Author:          Krzysztof Konieczny
 * License:         GPL-2.0-or-later
 * License URI:     https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:     bigbook
 *
 * @package         bigbook
 */

function custom_navigation_render_callback($attributes){

	if ($attributes['menuId'] == null ) {
		return "<span>Custom navigation component. Please select navigation.</span>";
	}

	return wp_nav_menu(array('menu' => $attributes['menuId'], 'menu_class' => 'left-menu', 'echo' =>false));
}

/**
 * Registers all block assets so that they can be enqueued through the block editor
 * in the corresponding context.
 *
 * @see https://developer.wordpress.org/block-editor/tutorials/block-tutorial/applying-styles-with-stylesheets/
 */
function bigbook_custom_navigation_block_init() {
	$dir = dirname( __FILE__ );

	$script_asset_path = "$dir/build/index.asset.php";
	if ( ! file_exists( $script_asset_path ) ) {
		throw new Error(
			'You need to run `npm start` or `npm run build` for the "bigbook/custom-navigation" block first.'
		);
	}
	$index_js     = 'build/index.js';
	$script_asset = require( $script_asset_path );
	wp_register_script(
		'bigbook-custom-navigation-block-editor',
		plugins_url( $index_js, __FILE__ ),
		$script_asset['dependencies'],
		$script_asset['version']
	);

	$editor_css = 'editor.css';
	wp_register_style(
		'bigbook-custom-navigation-block-editor',
		plugins_url( $editor_css, __FILE__ ),
		array(),
		filemtime( "$dir/$editor_css" )
	);

	$style_css = 'style.css';
	wp_register_style(
		'bigbook-custom-navigation-block',
		plugins_url( $style_css, __FILE__ ),
		array(),
		filemtime( "$dir/$style_css" )
	);

	register_block_type( 'bigbook/custom-navigation', array(
		'editor_script' => 'bigbook-custom-navigation-block-editor',
		'editor_style'  => 'bigbook-custom-navigation-block-editor',
		'style'         => 'bigbook-custom-navigation-block',
		'attributes'      => array(
            'menuId'    => array(
                'type'      => 'string',
                'default'   => false,
            ),
        ),
		'render_callback' => 'custom_navigation_render_callback',
	) );
}
add_action( 'init', 'bigbook_custom_navigation_block_init' );
