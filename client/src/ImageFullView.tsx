import { useEffect, useState } from "react";
import icon from "./cat_icon.svg";
import LoadingModal from "./LoadingModal";

type ImageFullViewProps = {
	url: string
}

const ImageFullView = (props: ImageFullViewProps) => {

	const [ tempImgSrc, setTempImgSrc ] = useState<string>();
	const [ isIcon, toggleIsIcon ] = useState<boolean>(false);

	useEffect(() => { async function handleUndefinedSrc() {

			if (props.url.includes("cat_icon")) {
				setTempImgSrc(await fetchRandomImageUrl())
				toggleIsIcon(true);
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

	const response = await fetch("/api/cats?count=1");
	url = (await response.json() as Array<string>)[0];

	return url;

}

export default ImageFullView;