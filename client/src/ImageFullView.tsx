import { Dispatch, SetStateAction, useEffect, useState } from "react";
import LoadingModal from "./LoadingModal";
import "./ImageFullView.css";
import downloadBtn from "./img/download-btn.svg";
import shareBtn from "./img/share-btn.svg";
import closeBtn from "./img/close-btn.svg";
import saveAs from "file-saver";
import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript";

type ImageFullViewProps = {
	url: string
	setImgSrcInFocus: Dispatch<SetStateAction<string>>
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
			<LoadingModal isLoading={ isIcon && !tempImgSrc } />
			<img className="img-fullview__close-btn" src={ closeBtn } onClick={() => props.setImgSrcInFocus("")} alt="close"></img>
			<img className="img-fullview__img" src={ isIcon ? tempImgSrc : props.url } alt="cat" id="cat-full-img" />
			<div className="img-fullview__interact-btns">
				<img className="download-btn" src={ downloadBtn } onClick={ downloadImage } alt="download"></img>
				<img className="share-btn" src={ shareBtn } alt="share"></img>
			</div>
		</div>
	);

}


async function fetchRandomImageUrl() {
	
	let url = "";

	const response = await fetch("http://localhost:5000/api/cats/random?count=1");
	url = (await response.json() as Array<string>)[0];

	return url;

}

function downloadImage(): void {

	const fileName = `nyayumis_cat_cafe_${new Date().toISOString()}.jpg`;
	const reqData = {
		url: (document.getElementById("cat-full-img") as HTMLImageElement).src
	};

	fetch("http://localhost:5000/api/cats/download", {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(reqData)
		
	})
	.then(r => r.blob())
	.then(data => saveAs(data, fileName))
	.catch(e => console.error(e));

}

export default ImageFullView;