import dal.cats as cat_dal

def get_breeds():
	"""Returns list of Breed objects."""
	return cat_dal.fetch_breeds()


def get_categories():
	"""Returns list of Breed objects."""
	return cat_dal.fetch_categories()


def get_cats_by_breed():
	"""Returns list of Breed objects."""
	return cat_dal.fetch_cat_by_category()


def get_cats_by_category():
	"""Returns list of Breed objects."""
	return cat_dal.fetch_cat_by_category()

