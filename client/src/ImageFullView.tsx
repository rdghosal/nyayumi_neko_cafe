import { Dispatch, SetStateAction, useEffect, useState } from "react";
import LoadingModal from "./LoadingModal";
import "./css/ImageFullView.css";
import downloadBtn from "./img/download-btn.svg";
import shareBtn from "./img/share-btn.svg";
import closeBtn from "./img/close-btn.svg";
import saveAs from "file-saver";

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
				<img className="share-btn" src={ shareBtn } onClick={async () => await shareImage() } alt="share"></img>
			</div>
		</div>
	);

}


async function fetchRandomImageUrl() {
	
	let url = "";

	const response = await fetch("/api/cats/random?count=1");
	url = (await response.json() as Array<string>)[0];

	return url;

}

function downloadImage(): void {

	const fileName = getImageFileName(); 
	const reqData = {
		url: getImageSrc()
	};

	fetch("/api/cats/download", {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(reqData)
		
	})
	.then(r => r.blob())
	.then(data => saveAs(data, fileName))
	.catch(e => {
		console.error(e);
		window.alert("Failed to download image... Please try again!");
	});

}


async function shareImage() {

	// get image src
	const src = getImageSrc();
	const shareData : ShareData = {
		files: []
	}

	const response = await fetch("/api/cats/download", {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			url: src
		})
	});

	const data = await response.blob();
	const file = new File([data], 'test.jpg', {type: 'image/jpeg'});

	shareData.files!.push(file);
	try {
		await navigator.share(shareData);
	}
	catch(error) {
		console.error(error);
		window.alert("Sorry! Your browser or device doesn't allow sharing.")
	}	
}

function getImageFileName(): string {
	return `nyayumis_cat_cafe_${new Date().toISOString()}.jpg`;	
}

function getImageSrc(): string {
	return (document.getElementById("cat-full-img") as HTMLImageElement).src;	
}

export default ImageFullView;