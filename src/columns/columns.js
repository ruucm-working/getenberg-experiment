/**
 * BLOCK: hellogorilla-block
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

import { log } from 'ruucm-util'
import { Row, Column } from 'ruucm-blocks'
import styled from 'styled-components'

//  Import CSS.
import './style.scss'
import './editor.scss'

// const getColumnsTemplate = memoize(columns => {
// 	return () => ['core/column']
// })

const { __ } = wp.i18n // Import __() from wp.i18n
const { registerBlockType } = wp.blocks // Import registerBlockType() from wp.blocks
const { PanelBody, RangeControl, Button, Disabled, SandBox } = wp.components
const { Fragment, RawHTML } = wp.element
const { getPhrasingContentSchema } = wp.blocks

const {
	RichText,
	AlignmentToolbar,
	InspectorControls,
	InnerBlocks,
	MediaUpload,
	BlockControls,
	PlainText,
} = wp.editor

/**
 * Styles
 */
const Label = styled.div`
	color: red;
	position: absolute;
	right: 0;
	top: 0;
	font-size: 10px;
`

const EditAsHTML = () => {
	return (
		<div className="wp-block-html">
			<BlockControls>
				<div className="components-toolbar">
					<button
						className={`components-tab-button ${!isPreview ? 'is-active' : ''}`}
						onClick={() => setState({ isPreview: false })}
					>
						<span>HTML</span>
					</button>
					<button
						className={`components-tab-button ${isPreview ? 'is-active' : ''}`}
						onClick={() => setState({ isPreview: true })}
					>
						<span>{__('Preview')}</span>
					</button>
				</div>
			</BlockControls>
			<Disabled.Consumer>
				{isDisabled =>
					isPreview || isDisabled ? (
						<SandBox html={attributes.content} />
					) : (
						<PlainText
							value={attributes.content}
							onChange={content => setAttributes({ content })}
							placeholder={__('Write HTML…')}
							aria-label={__('HTML')}
						/>
					)
				}
			</Disabled.Consumer>
		</div>
	)
}

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType('cgb/block-ruucm-column', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: 'ruucm-column', // Block title.
	icon: 'shield', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: ['layout'],

	// Specifying my block attributes
	attributes: {
		mediaID_01: {
			type: 'number',
		},
		mediaURL_01: {
			type: 'string',
			source: 'attribute',
			selector: 'img',
			attribute: 'src',
		},
		content: {
			type: 'array',
			source: 'children',
			selector: 'p',
		},
		alignment: {
			type: 'string',
			default: 'none',
		},
		columns: {
			type: 'number',
			default: 2,
		},
		firstColumn: {
			type: 'number',
			default: 6,
		},
		secondColumn: {
			type: 'number',
			default: 6,
		},
	},

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	edit: function(props) {
		// Creates a <p class='wp-block-cgb-block-hellogorilla-block'></p>.

		const {
			attributes: {
				content,
				alignment,
				columns,
				firstColumn,
				secondColumn,
				mediaID_01,
				mediaURL_01,
			},
			className,

			setAttributes,
		} = props

		const onChangeAlignment = newAlignment => {
			props.setAttributes({
				alignment: newAlignment === undefined ? 'none' : newAlignment,
			})
		}
		const onChangeContent = newContent => {
			props.setAttributes({ content: newContent })
		}
		const onSelectImage01 = media => {
			setAttributes({
				mediaURL_01: media.url,
				mediaID_01: media.id,
			})
		}

		return (
			<div className={props.className}>
				<Row>
					<Column col={firstColumn}>
						<RichText
							// className={ className }
							tagName="div"
							onChange={onChangeContent}
							value={content}
						/>
						<MediaUpload
							onSelect={onSelectImage01}
							type="image"
							value={mediaID_01}
							render={({ open }) => (
								<Button
									className={
										mediaID_01 ? 'image-button' : 'button button-large'
									}
									onClick={open}
								>
									{!mediaID_01 ? (
										'Upload Image'
									) : (
										<img src={mediaURL_01} alt={'Upload Recipe Image'} />
									)}
								</Button>
							)}
						/>
						<Label>firstColumn : {firstColumn} </Label>
					</Column>
					<Column col={secondColumn}>
						{/* <InnerBlocks template={['core/column']} /> */}

						{/* <EditAsHTML /> */}

						<div className="wp-block-html">
							<BlockControls>
								<div className="components-toolbar">
									<button
										className={`components-tab-button ${
											!isPreview ? 'is-active' : ''
										}`}
										onClick={() => setState({ isPreview: false })}
									>
										<span>HTML</span>
									</button>
									<button
										className={`components-tab-button ${
											isPreview ? 'is-active' : ''
										}`}
										onClick={() => setState({ isPreview: true })}
									>
										<span>{__('Preview')}</span>
									</button>
								</div>
							</BlockControls>
							<Disabled.Consumer>
								{isDisabled =>
									isPreview || isDisabled ? (
										<SandBox html={attributes.content} />
									) : (
										<PlainText
											value={attributes.content}
											onChange={content => setAttributes({ content })}
											placeholder={__('Write HTML…')}
											aria-label={__('HTML')}
										/>
									)
								}
							</Disabled.Consumer>
						</div>
						<Label>secondColumn : {secondColumn} </Label>
					</Column>
				</Row>

				<InspectorControls>
					<PanelBody>
						<RangeControl
							label={__('First Column')}
							value={firstColumn}
							onChange={nextColumns => {
								setAttributes({
									firstColumn: nextColumns,
								})
							}}
							min={1}
							max={12}
						/>
					</PanelBody>
				</InspectorControls>
				<InspectorControls>
					<PanelBody>
						<RangeControl
							label={__('Second Column')}
							value={secondColumn}
							onChange={nextColumns => {
								setAttributes({
									secondColumn: nextColumns,
								})
							}}
							min={1}
							max={12}
						/>
					</PanelBody>
				</InspectorControls>
			</div>
		)
	},

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	save: function(props) {
		log('props(save)', props)
		return (
			<div>
				<Row>
					<Column col={props.attributes.firstColumn}>
						<RichText.Content tagName="div" value={props.attributes.content} />
					</Column>
					<Column col={props.attributes.secondColumn}>
						{/* <InnerBlocks /> */}
					</Column>
				</Row>
			</div>
		)
	},
})
