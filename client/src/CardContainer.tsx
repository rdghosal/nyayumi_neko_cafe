import { ImagePreviewCard } from './ImagePreviewCard';
import "./CardContainer.css";


type CardContainerProps = {
	urlCollection: string[] | undefined
}

const CardContainer = (props: CardContainerProps) => {

	return (
		<div className="card-container">
			{
				props.urlCollection
					? (
						props.urlCollection.map((url, i) => {
							return <ImagePreviewCard url={url} key={i} />
						})
					)
					: (
						<>
							<ImagePreviewCard/>
							<ImagePreviewCard/>
							<ImagePreviewCard/>
							<ImagePreviewCard/>
							<ImagePreviewCard/>
							<ImagePreviewCard/>
							<ImagePreviewCard/>
							<ImagePreviewCard/>
							<ImagePreviewCard/>
						</>
						
					)
			}
			
		</div>
	)

}

export default CardContainer;