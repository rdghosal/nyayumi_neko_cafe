import { ImagePreviewCard } from './ImagePreviewCard';
import "./CardContainer.css";
import { Dispatch, SetStateAction } from 'react';


type CardContainerProps = {
	urlCollection: string[] | undefined
	setImgSrcInFocus: Dispatch<SetStateAction<string>>
}

const CardContainer = (props: CardContainerProps) => {

	return (
		<div className="card-container">
			{
				props.urlCollection
					? (
						props.urlCollection.map((url, i) => {
							return <ImagePreviewCard url={url} key={i} 
										setImgSrcInFocus={props.setImgSrcInFocus}/>
						})
					)
					: (
						<>
							<ImagePreviewCard
								setImgSrcInFocus={props.setImgSrcInFocus}/>
							<ImagePreviewCard
								setImgSrcInFocus={props.setImgSrcInFocus}/>
							<ImagePreviewCard
								setImgSrcInFocus={props.setImgSrcInFocus}/>
							<ImagePreviewCard
								setImgSrcInFocus={props.setImgSrcInFocus}/>
							<ImagePreviewCard
								setImgSrcInFocus={props.setImgSrcInFocus}/>
							<ImagePreviewCard
								setImgSrcInFocus={props.setImgSrcInFocus}/>
							<ImagePreviewCard
								setImgSrcInFocus={props.setImgSrcInFocus}/>
							<ImagePreviewCard
								setImgSrcInFocus={props.setImgSrcInFocus}/>
							<ImagePreviewCard
								setImgSrcInFocus={props.setImgSrcInFocus}/>
						</>
						
					)
			}
			
		</div>
	)

}

export default CardContainer;