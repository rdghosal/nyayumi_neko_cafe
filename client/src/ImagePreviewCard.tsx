import { Dispatch, SetStateAction } from "react";
import icon from "./img/cat_icon.svg";

type ImagePreviewCardProps = {
	url?: string
	setImgSrcInFocus: Dispatch<SetStateAction<string>>
}

export const ImagePreviewCard = (props: ImagePreviewCardProps) => {

	return (
		<div className="img-prev-card">
			<img className="img-prev-card__img" src={props.url ? props.url : icon } 
				onClick={(e) => props.setImgSrcInFocus((e.target as HTMLImageElement).src) }/>
		</div>
	)

}