interface Props {
	error: string | undefined
}

export const ErrorMessage = ({ error }: Props) => {
	if (!error) return <></>

	return <div className="text-xs text-danger mt-1">{error}</div>
}
