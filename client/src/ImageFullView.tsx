import { useEffect, useState } from "react";
import icon from "./cat_icon.svg";
import LoadingModal from "./LoadingModal";

type ImageFullViewProps = {
	url: string
}

const ImageFullView = (props: ImageFullViewProps) => {

	const [ tempImgSrc, setTempImgSrc ] = useState<string>();
	const [ isIcon, toggleIsIcon ] = useState<boolean>(true);

	useEffect(() => { async function handleUndefinedSrc() {

			if (props.url.includes("cat_icon")) {
				setTempImgSrc(await fetchRandomImageUrl())
			}

			else {
				toggleIsIcon(false);
			}

		};
		handleUndefinedSrc();
	}, [])

	return (
		<div className="img-fullview">
			{ (isIcon && !tempImgSrc) ? <LoadingModal /> : null }
			<img src={ isIcon ? tempImgSrc : props.url } alt="" />
		</div>
	);

}


async function fetchRandomImageUrl() {
	
	let url = "";

	const response = await fetch("/api/cats/random?count=1");
	url = (await response.json() as Array<string>)[0];

	return url;

}

export default ImageFullView;