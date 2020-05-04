/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

import {
	ColorPalette,       // Element Tag for Gutenberg standard Palette selector
	source,
	TextControl,
} from '@wordpress/blocks';

import {
	SelectControl
} from '@wordpress/components';

import {
	RichText, InspectorControls  // Element Tag for sidebar view
} from '@wordpress/editor';



/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @param {Object} [props] Properties passed from the editor.
 *
 * @return {WPElement} Element to render.
 */
export default function Edit(props) {
	
	var menuId = props.attributes.menuId;
	console.log(props.attributes.menuId);

	function onChangeNavigation(newValue) {
		props.setAttributes({menuId: newValue})
		// props.attributes.menuId = newValue;
		console.log(newValue);
	}
	var link_url = "http://onet.pl"

	var menus = wp.data.select('core').getMenus();

	if (menus != null){
		menus = wp.data.select('core').getMenus().map(m => ({ value: m.id, label: m.name }));
	}else{
		menus = []
	}
	return [
		<InspectorControls>
			<div id="gbs-block-inspected-inspector-control-wrapper">
				<SelectControl
					label="Select navigation"
					value={menuId}
					options={
						menus
					}
					onChange={onChangeNavigation}
				/>

			</div>
		</InspectorControls>
		,
		<p>
			Custom navigation component id: {menuId}
		</p>

	]
}
