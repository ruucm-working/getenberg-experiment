/**
 * WordPress dependencies
 */

const { __ } = wp.i18n // Import __() from wp.i18n

const { InnerBlocks } = wp.editor

export const name = 'core/column'

export const settings = {
	title: __('Column'),

	parent: ['core/columns'],

	icon: 'columns',

	description: __('A single column within a columns block.'),

	category: 'common',

	supports: {
		inserter: false,
	},

	edit() {
		return <InnerBlocks templateLock={false} />
	},

	save() {
		return (
			<div>
				<InnerBlocks.Content />
			</div>
		)
	},
}
