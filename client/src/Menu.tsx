import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { RouterProps } from 'react-router';
import CardContainer from './CardContainer';
import FormContainer from './FormContainer';
import LoadingModal from './LoadingModal';
import Navigation from './Navigation';

enum QueryType {
	CATEGORY = 1,
	BREED = 2
}

const Menu = (props: RouterProps) => {

	const [ urlCollection, setUrls ] = useState<string[]>();
	const [ query, setQuery ] = useState<string>();
	const [ queryType, setQueryType ] = useState<QueryType>();
	const [ isLoading, toggleCardsLoading ]  = useState<boolean>(true);

	useEffect(() => {
		if (queryType && query) {
			setUrls(undefined);
			fetchUrls(queryType, query, setUrls);
		}
	}, [ query ]);
	
	useEffect(() => {
		if (urlCollection) {
			toggleCardsLoading(false);
		}
	}, [ urlCollection])

	return (
		<div className="menu">
			<Navigation {...props}/>
			<FormContainer
				setQuery={setQuery}
				setQueryType={setQueryType} />
			<CardContainer urlCollection={urlCollection} />
			{ isLoading && <LoadingModal /> }
		</div>
	);

}

async function fetchUrls(queryType: QueryType
	, query: string
	, urlCollectionCallback: Dispatch<SetStateAction<string[]|undefined>>) {

	let endpointName = queryType === QueryType.BREED ? "breeds" : "categories"
	let paramName = queryType === QueryType.BREED ? "breed_id" : "category_id"
	
	let url = 
		`/api/cats/${endpointName}?${paramName}=${query}&count=9`
	
	const response = await fetch(url);
	urlCollectionCallback(await response.json());
}


export { Menu, QueryType };

