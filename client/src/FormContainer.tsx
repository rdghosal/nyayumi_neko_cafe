import { ChangeEvent, Dispatch, SetStateAction, useEffect, useLayoutEffect, useState } from "react";
import "./css/FormContainer.css";
import { QueryType } from "./Menu";

type FormContainerProps = {
	setQuery: Dispatch<SetStateAction<string | undefined>> 
	setQueryType: Dispatch<SetStateAction<QueryType | undefined>> 
}

const FormContainer = (props: FormContainerProps) => {

	const [ categories, setCategories ] = useState<any[]>();
	const [ breeds, setBreeds ] = useState<any[]>();
	const [ activeDropdownId, setActiveDropdownId ] = useState("dropdown-breeds");

	// Populate dropdowns and disable one of them.
	useEffect(() => { async function setDropdownData() {
			setCategories(await fetchDropdownData(QueryType.CATEGORY));
			setBreeds(await fetchDropdownData(QueryType.BREED));
		};
		initializeDefaultState(props.setQueryType);
		setDropdownData();
	}, []);

	useEffect(() => {

		const dropdownCategories =
			document.getElementById("dropdown-categories") as HTMLSelectElement;

		const dropdownBreeds =
			document.getElementById("dropdown-breeds") as HTMLSelectElement;

		const isCategoriesLoaded = dropdownCategories.childElementCount > 1;
		const isBreedsLoaded = dropdownBreeds.childElementCount > 1;

		if (categories && !isCategoriesLoaded)
			loadDropdowns(QueryType.CATEGORY, categories);
		else if (breeds && !isBreedsLoaded) {
			loadDropdowns(QueryType.BREED, breeds);
			props.setQuery(breeds[0].id);
		}

	}, [categories,  breeds]);

	useEffect(() => {

		const inactiveDropdownId = 
			activeDropdownId === "dropdown-breeds" ? "dropdown-categories" : "dropdown-breeds";

		const activeDropdown = document.getElementById(activeDropdownId) as HTMLSelectElement;
		const inactiveDropdown = document.getElementById(inactiveDropdownId) as HTMLSelectElement;

		inactiveDropdown.disabled = true;
		inactiveDropdown.classList.remove("active");
		inactiveDropdown.parentElement?.querySelector("label")?.classList.remove("active");

		activeDropdown.disabled = false;
		activeDropdown.classList.add("active");
		activeDropdown.parentElement?.querySelector("label")?.classList.add("active");

		if (activeDropdown.childElementCount > 1) {
			props.setQuery(activeDropdown.value);
		}
			
	}, [ activeDropdownId ]);

	return (
		<section className="form-container">
			<p>search by...</p>
			<div className="dropdown-container">
				<div className="dropdown-flex-wrapper">
					<div className="dropdown-group">
						<div className="radio-btn-group">
							<input type="radio" name="query-type" id="radio-cat-breed"
								value="breeds"
								onChange={ (e) => handleRadioButtonChange(
									e
									, setActiveDropdownId
									, props.setQueryType ) } 
								defaultChecked={ true } />
							<label className="form__label" htmlFor="radio-cat-breed">breed</label>
						</div>
						<select name="dropdown-breed" id="dropdown-breeds" className="dropdown"
							onChange={(e) => handleDropdownChange(e, props.setQuery) }>
							{ !breeds && <option>loading...</option> }
						</select>
					</div>
				</div>
				<div className="dropdown-flex-wrapper">
					<div className="dropdown-group">
						<div className="radio-btn-group">
							<input type="radio" name="query-type" id="radio-cat-category"
								value="categories"
								onChange={ (e) => handleRadioButtonChange(
									e
									, setActiveDropdownId
									, props.setQueryType ) } />
							<label className="form__label" htmlFor="radio-cat-breed">category</label>
						</div>
						<select name="dropdown-category" id="dropdown-categories" className="dropdown"
							onChange={(e) => handleDropdownChange(e, props.setQuery) }>
							{ !categories && <option>loading...</option> }
						</select>
					</div>
				</div>
			</div>
		</section>
	);

}

async function loadDropdowns(queryType: QueryType, optionDataCollection: any[]) {

	const dropdownId = queryType === QueryType.BREED 
		? "dropdown-breeds" : "dropdown-categories";

	const dropdown
		 = document.getElementById(dropdownId) as HTMLSelectElement;

	// Fetch cat categories
	appendToSelect(dropdown, optionDataCollection);
}


function appendToSelect(selectEl: HTMLSelectElement, optionDataCollection: any[]) {
	
	optionDataCollection.forEach(optionData => {
		const opt = document.createElement("option") as HTMLOptionElement;

		opt.value = optionData.id;
		opt.text = optionData.name;
		
		selectEl.appendChild(opt);
	});
}

async function fetchDropdownData(queryType: QueryType) : Promise<any[]> {

	const baseUrl = "/api/cats"
	const suffix = queryType === QueryType.BREED ? "/breeds" : "/categories"

	const response = await fetch(baseUrl + suffix);	
	return await response.json();
}


function handleDropdownChange(e: ChangeEvent<HTMLSelectElement>
	, callback: Dispatch<SetStateAction<string|undefined>>) {
	const dropdownValue = e.target.value;
	callback(dropdownValue);
}


function handleRadioButtonChange(e: ChangeEvent<HTMLInputElement>
	, activeDropdownIdCallback: Dispatch<SetStateAction<string>>
	, queryTypeCallback: Dispatch<SetStateAction<QueryType|undefined>>) {
	
	const radioValue = e.target.value;

	let activeDropdownId = "";
	let queryType = undefined;
	
	if (radioValue === "breeds") {
		activeDropdownId = "dropdown-breeds";
		queryType = QueryType.BREED;
	} 
	else if (radioValue === "categories") {
		activeDropdownId = "dropdown-categories"
		queryType = QueryType.CATEGORY;
	}

	activeDropdownIdCallback(activeDropdownId);
	queryTypeCallback(queryType);
}


function initializeDefaultState(queryTypeCallback: Dispatch<SetStateAction<QueryType|undefined>>) {

	const categoryDropdown = 
		document.getElementById("dropdown-categories") as HTMLSelectElement;
	categoryDropdown.disabled = true; 
	queryTypeCallback(QueryType.BREED);
}


export default FormContainer;
