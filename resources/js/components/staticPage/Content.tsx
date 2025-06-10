import { PropsWithChildren } from 'react'

export const Content = ({ children }: PropsWithChildren) => {
	return (
		<div className="flex justify-center pt-16 pb-28">
			<div className="flex-1 max-w-4xl px-6 xl:px-0">{children}</div>
		</div>
	)
}
