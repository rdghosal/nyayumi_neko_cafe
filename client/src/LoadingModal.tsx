type LoadingModalProps = {
	isLoading: boolean
}

const LoadingModal = (props: LoadingModalProps) => {
	return (
		<div className={ `loading-modal${(props.isLoading) ? " visible" : " invisible" }`}>
			<p>
				Loading cat data...
			</p>
			<div className="loading-modal__spinner"></div>
		</div>
	);
}

export default LoadingModal;