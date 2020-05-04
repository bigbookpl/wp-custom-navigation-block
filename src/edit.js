/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

import {
	SelectControl
} from '@wordpress/components';

import {
	InspectorControls
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

	function onChangeNavigation(newValue) {
		props.setAttributes({ menuId: newValue })
		console.log(newValue);
	}

	var menus = wp.data.select('core').getMenus();

	if (menus != null) {
		menus = wp.data.select('core').getMenus().map(m => ({ value: m.id, label: m.name }));
	} else {
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
			Custom navigation component (selected id: {menuId})
		</p>

	]
}
