type LoadingModalProps = {
	isLoading: boolean
}

const LoadingModal = (props: LoadingModalProps) => {
	return (
		<div className={ `loading-modal${(props.isLoading) ? " visible" : " invisible" }`}>
			<div className="loading-modal-wrapper">
				<p>
					loading cat data...
				</p>
				<div className="loading-modal__spinner"></div>
			</div>
		</div>
	);
}

export default LoadingModal;