from api.dal.cats import QueryType, fetch_cat_data

def get_breeds():
	"""Returns list of Breed objects."""
	return fetch_cat_data(QueryType.BREED, is_query=False)


def get_categories():
	"""Returns list of Category objects."""
	return fetch_cat_data(QueryType.CATEGORY, is_query=False)


def get_cats_by_breed(breed_id):
	"""Returns list of Cat objects retrieved based on breed_id."""
	return fetch_cat_data(QueryType.BREED, is_query=True\
		, param_value=breed_id)


def get_cats_by_category(category_id):
	"""Returns list of Cat objects retrieved based on category_id."""
	return fetch_cat_data(QueryType.CATEGORY, is_query=True\
		, param_value=category_id)

