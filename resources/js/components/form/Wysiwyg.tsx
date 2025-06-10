import { useCallback } from 'react'
import { EditorContent, useEditor, type JSONContent } from '@tiptap/react'
import { Underline } from '@tiptap/extension-underline'
import StarterKit from '@tiptap/starter-kit'
import CharacterCount from '@tiptap/extension-character-count'
import DragHandle from '@tiptap-pro/extension-drag-handle-react'
import { Color } from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'
import Placeholder from '@tiptap/extension-placeholder'
import TextAlign from '@tiptap/extension-text-align'
import {
	cn,
	Button,
	Divider,
	Dropdown,
	DropdownTrigger,
	DropdownMenu,
	DropdownItem,
} from '@nextui-org/react'
import { t } from '@/i18n'
import { extensionLink } from './wysiwyg/Link'

interface Props {
	charactersLimit?: number
	code?: boolean
	codeBlock?: boolean
	blockquote?: boolean
	headings?: boolean
	link?: boolean
	separator?: boolean
	lists?: boolean
	colorSelector?: boolean
	alignment?: boolean
	minHeight?: number
	placeholder?: string
	initialContent?: string | JSONContent | JSONContent[] | null
	onUpdate: (val: any) => void
}

export const Wysiwyg = ({
	charactersLimit,
	headings = true,
	link = true,
	separator,
	blockquote,
	code,
	codeBlock,
	lists,
	colorSelector,
	alignment,
	minHeight = 170,
	placeholder = '',
	initialContent = '',
	onUpdate,
}: Props) => {
	const editor = useEditor({
		extensions: [
			StarterKit.configure({
				heading: { levels: [2, 3, 4] },
			}),
			CharacterCount.configure({
				limit: charactersLimit,
			}),
			Color,
			TextStyle,
			Underline,
			Placeholder.configure({ placeholder }),
			TextAlign.configure({
				types: ['heading', 'paragraph'],
			}),
			extensionLink,
		],
		content: initialContent,
		onUpdate: ({ editor }) => onUpdate(editor.getHTML()),
	})

	if (!editor) return null

	const percentage =
		editor && charactersLimit
			? Math.round(
					(100 / charactersLimit) * editor.storage.characterCount.characters()
			  )
			: 0

	const setLink = useCallback(() => {
		const previousUrl = editor.getAttributes('link').href
		const url = window.prompt('URL', previousUrl)

		// cancelled
		if (url === null) {
			return
		}

		// empty
		if (url === '') {
			editor.chain().focus().extendMarkRange('link').unsetLink().run()

			return
		}

		// update link
		try {
			editor
				.chain()
				.focus()
				.extendMarkRange('link')
				.setLink({ href: url })
				.run()
		} catch (e) {
			console.log(e)
		}
	}, [editor])

	return (
		<div>
			<div className="bg-default-100 rounded-medium">
				<div className="px-3 py-2">
					<div className="flex gap-1 h-10">
						<Button
							isIconOnly
							size="sm"
							radius="lg"
							variant="light"
							onPress={() => editor.chain().focus().toggleBold().run()}
							color={editor.isActive('bold') ? 'primary' : 'default'}
							title={String(t('Bold'))}
						>
							<i className="ri-bold ri-lg" />
						</Button>

						<Button
							isIconOnly
							size="sm"
							radius="lg"
							variant="light"
							onPress={() => editor.chain().focus().toggleUnderline().run()}
							color={editor.isActive('underline') ? 'primary' : 'default'}
							title={String(t('Underline'))}
						>
							<i className="ri-underline ri-lg" />
						</Button>

						<Button
							isIconOnly
							size="sm"
							radius="lg"
							variant="light"
							onPress={() => editor.chain().focus().toggleItalic().run()}
							color={editor.isActive('italic') ? 'primary' : 'default'}
							title={String(t('Italic'))}
						>
							<i className="ri-italic ri-lg" />
						</Button>

						<Button
							isIconOnly
							size="sm"
							radius="lg"
							variant="light"
							onPress={() => editor.chain().focus().toggleStrike().run()}
							color={editor.isActive('strike') ? 'primary' : 'default'}
							title={String(t('Strikethrough'))}
						>
							<i className="ri-strikethrough ri-lg" />
						</Button>

						{headings && (
							<>
								<Button
									isIconOnly
									size="sm"
									radius="lg"
									variant="light"
									onPress={() =>
										editor.chain().focus().toggleHeading({ level: 2 }).run()
									}
									color={
										editor.isActive('heading', { level: 2 })
											? 'primary'
											: 'default'
									}
									title={String(t('Heading 2'))}
								>
									<i className="ri-h-2 ri-lg" />
								</Button>

								<Button
									isIconOnly
									size="sm"
									radius="lg"
									variant="light"
									onPress={() =>
										editor.chain().focus().toggleHeading({ level: 3 }).run()
									}
									color={
										editor.isActive('heading', { level: 3 })
											? 'primary'
											: 'default'
									}
									title={String(t('Heading 3'))}
								>
									<i className="ri-h-3 ri-lg" />
								</Button>

								<Button
									isIconOnly
									size="sm"
									radius="lg"
									variant="light"
									onPress={() =>
										editor.chain().focus().toggleHeading({ level: 4 }).run()
									}
									color={
										editor.isActive('heading', { level: 4 })
											? 'primary'
											: 'default'
									}
									title={String(t('Heading 4'))}
								>
									<i className="ri-h-4 ri-lg" />
								</Button>
							</>
						)}

						{link && (
							<>
								<Button
									isIconOnly
									size="sm"
									radius="lg"
									variant="light"
									onPress={setLink}
									className={editor.isActive('link') ? '' : ''}
									color={editor.isActive('link') ? 'primary' : 'default'}
									title={String(t('Link'))}
								>
									<i className="ri-link"></i>
								</Button>

								<Button
									isIconOnly
									size="sm"
									radius="lg"
									variant="light"
									color="default"
									onPress={() => editor.chain().focus().unsetLink().run()}
									disabled={!editor.isActive('link')}
									className={editor.isActive('link') ? '' : 'opacity-30'}
									title={String(t('Unlink'))}
								>
									<i className="ri-link-unlink"></i>
								</Button>
							</>
						)}

						{alignment && (
							<Dropdown
								placement="bottom-start"
								classNames={{
									content: 'min-w-1 p-0',
								}}
							>
								<DropdownTrigger>
									<Button
										isIconOnly
										size="sm"
										radius="lg"
										variant="light"
										title={String(t('Alignment'))}
									>
										{editor.isActive({ textAlign: 'center' }) ? (
											<i className="ri-align-center ri-lg" />
										) : editor.isActive({ textAlign: 'right' }) ? (
											<i className="ri-align-right ri-lg" />
										) : editor.isActive({ textAlign: 'justify' }) ? (
											<i className="ri-align-justify ri-lg" />
										) : (
											<i className="ri-align-left ri-lg" />
										)}
									</Button>
								</DropdownTrigger>

								<DropdownMenu
									aria-label="Alignment"
									classNames={{
										list: 'flex-row gap-1.5',
									}}
									itemClasses={{
										base: 'p-0 hover:bg-transparent',
									}}
								>
									<DropdownItem>
										<Button
											isIconOnly
											size="sm"
											radius="lg"
											variant="light"
											onPress={() =>
												editor.chain().focus().setTextAlign('left').run()
											}
											color={
												editor.isActive({ textAlign: 'left' })
													? 'primary'
													: 'default'
											}
										>
											<i className="ri-align-left ri-lg" />
										</Button>
									</DropdownItem>
									<DropdownItem>
										<Button
											isIconOnly
											size="sm"
											radius="lg"
											variant="light"
											onPress={() =>
												editor.chain().focus().setTextAlign('center').run()
											}
											color={
												editor.isActive({ textAlign: 'center' })
													? 'primary'
													: 'default'
											}
										>
											<i className="ri-align-center ri-lg" />
										</Button>
									</DropdownItem>
									<DropdownItem>
										<Button
											isIconOnly
											size="sm"
											radius="lg"
											variant="light"
											onPress={() =>
												editor.chain().focus().setTextAlign('right').run()
											}
											color={
												editor.isActive({ textAlign: 'right' })
													? 'primary'
													: 'default'
											}
										>
											<i className="ri-align-right ri-lg" />
										</Button>
									</DropdownItem>
									<DropdownItem>
										<Button
											isIconOnly
											size="sm"
											radius="lg"
											variant="light"
											onPress={() =>
												editor.chain().focus().setTextAlign('justify').run()
											}
											color={
												editor.isActive({ textAlign: 'justify' })
													? 'primary'
													: 'default'
											}
										>
											<i className="ri-align-justify ri-lg" />
										</Button>
									</DropdownItem>
								</DropdownMenu>
							</Dropdown>
						)}

						{blockquote && (
							<Button
								isIconOnly
								size="sm"
								radius="lg"
								variant="light"
								onPress={() => editor.chain().focus().toggleBlockquote().run()}
								color={editor.isActive('blockquote') ? 'primary' : 'default'}
								title={String(t('Blockquote'))}
							>
								<i className="ri-double-quotes-l ri-lg" />
							</Button>
						)}

						{code || codeBlock ? <Divider orientation="vertical" /> : <></>}

						{code && (
							<Button
								isIconOnly
								size="sm"
								radius="lg"
								variant="light"
								onPress={() => editor.chain().focus().toggleCode().run()}
								color={editor.isActive('code') ? 'primary' : 'default'}
								title={String(t('Code'))}
							>
								<i className="ri-code-s-slash-line ri-lg" />
							</Button>
						)}

						{codeBlock && (
							<Button
								isIconOnly
								size="sm"
								radius="lg"
								variant="light"
								onPress={() => editor.chain().focus().toggleCodeBlock().run()}
								color={editor.isActive('codeBlock') ? 'primary' : 'default'}
								title={String(t('Code block'))}
							>
								<i className="ri-code-box-line ri-lg" />
							</Button>
						)}

						{separator && (
							<>
								<Divider orientation="vertical" />

								<Button
									isIconOnly
									size="sm"
									radius="lg"
									variant="light"
									onPress={() =>
										editor.chain().focus().setHorizontalRule().run()
									}
									color={
										editor.isActive('horizontalRule') ? 'primary' : 'default'
									}
									title={String(t('Horizontal rule'))}
								>
									<i className="ri-separator ri-lg" />
								</Button>
							</>
						)}

						{lists && (
							<>
								<Divider orientation="vertical" />

								<Button
									isIconOnly
									size="sm"
									radius="lg"
									variant="light"
									onPress={() =>
										editor.chain().focus().toggleBulletList().run()
									}
									color={editor.isActive('bulletList') ? 'primary' : 'default'}
									title={String(t('Unordered list'))}
								>
									<i className="ri-list-unordered ri-lg" />
								</Button>

								<Button
									isIconOnly
									size="sm"
									radius="lg"
									variant="light"
									onPress={() =>
										editor.chain().focus().toggleOrderedList().run()
									}
									color={editor.isActive('orderedList') ? 'primary' : 'default'}
									title={String(t('Ordered list'))}
								>
									<i className="ri-list-ordered ri-lg" />
								</Button>
							</>
						)}

						{colorSelector && (
							<>
								<Divider orientation="vertical" />

								<Button
									isIconOnly
									size="sm"
									radius="lg"
									variant="light"
									onPress={() =>
										editor.chain().focus().setColor('#958DF1').run()
									}
									color={
										editor.isActive('textStyle', { color: '#958DF1' })
											? 'primary'
											: 'default'
									}
									data-testid="setPrimary"
									title={String(t('Text color'))}
								>
									<i className="bg-primary w-6 h-6 rounded-full block" />
								</Button>
							</>
						)}
					</div>
				</div>

				<DragHandle
					editor={editor}
					className={cn(
						'bg-default-400 text-default-foreground w-5 h-5 grid place-content-center rounded-md',
						'cursor-grab'
					)}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="currentColor"
						className="w-4"
					>
						<path d="M8.5 7C9.32843 7 10 6.32843 10 5.5C10 4.67157 9.32843 4 8.5 4C7.67157 4 7 4.67157 7 5.5C7 6.32843 7.67157 7 8.5 7ZM8.5 13.5C9.32843 13.5 10 12.8284 10 12C10 11.1716 9.32843 10.5 8.5 10.5C7.67157 10.5 7 11.1716 7 12C7 12.8284 7.67157 13.5 8.5 13.5ZM10 18.5C10 19.3284 9.32843 20 8.5 20C7.67157 20 7 19.3284 7 18.5C7 17.6716 7.67157 17 8.5 17C9.32843 17 10 17.6716 10 18.5ZM15.5 7C16.3284 7 17 6.32843 17 5.5C17 4.67157 16.3284 4 15.5 4C14.6716 4 14 4.67157 14 5.5C14 6.32843 14.6716 7 15.5 7ZM17 12C17 12.8284 16.3284 13.5 15.5 13.5C14.6716 13.5 14 12.8284 14 12C14 11.1716 14.6716 10.5 15.5 10.5C16.3284 10.5 17 11.1716 17 12ZM15.5 20C16.3284 20 17 19.3284 17 18.5C17 17.6716 16.3284 17 15.5 17C14.6716 17 14 17.6716 14 18.5C14 19.3284 14.6716 20 15.5 20Z"></path>
					</svg>
				</DragHandle>

				<EditorContent
					editor={editor}
					className="text-sm pt-0 pb-6 flex flex-col"
					style={{ minHeight: minHeight + 'px' }}
				/>
			</div>

			{charactersLimit && (
				<div className="px-3 py-2">
					<div
						className={cn(
							'flex items-center gap-2 justify-end',
							editor.storage.characterCount.characters() === charactersLimit
								? 'character-count--warning'
								: ''
						)}
					>
						<svg height="20" width="20" viewBox="0 0 20 20">
							<circle r="10" cx="10" cy="10" className="fill-foreground-50" />
							<circle
								r="5"
								cx="10"
								cy="10"
								fill="transparent"
								strokeWidth="10"
								strokeDasharray={`calc(${percentage} * 31.4 / 100) 31.4`}
								transform="rotate(-90) translate(-20)"
								className="stroke-primary"
							/>
							<circle r="6" cx="10" cy="10" className="fill-background" />
						</svg>

						<span className="text-[.7rem] text-foreground-600 font-medium tracking-wide">
							{editor.storage.characterCount.characters()} / {charactersLimit}{' '}
							{t('characters')} /{editor.storage.characterCount.words()}{' '}
							{t('words')}
						</span>
					</div>
				</div>
			)}
		</div>
	)
}
