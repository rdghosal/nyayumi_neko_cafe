
type ImagePreviewCardProps = {
	url?: string
}

export const ImagePreviewCard = (props: ImagePreviewCardProps) => {

	return (
		<div className="img-prev-card">
			<img className="img-prev-card__img" src={props.url} />
		</div>
	)

}