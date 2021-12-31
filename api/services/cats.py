import asyncio
from os import remove
from api.dal.cats import QueryType, fetch_cat_data


async def get_breeds():
	"""Returns list of Breed objects."""
	return await fetch_cat_data(query_type=QueryType.BREED, is_query=False)


async def get_categories():
	"""Returns list of Category objects."""
	return await fetch_cat_data(query_type=QueryType.CATEGORY, is_query=False)


async def get_cats_by_breed(breed_id: str, count: int):
	"""Returns list of Cat objects retrieved based on breed_id."""
	cat_data = await fetch_cat_data(query_type=QueryType.BREED, is_query=True\
		, param_value=breed_id
		, count=count)
	
	return remove_duplicates(cat_data, count)


async def get_cats_by_category(category_id: str, count: int):
	"""Returns list of Cat objects retrieved based on category_id."""
	cat_data = await fetch_cat_data(query_type=QueryType.CATEGORY, is_query=True\
		, param_value=category_id
		, count=count)

	return remove_duplicates(cat_data, count)


async def get_random_cats(count: int):
	"""Returns cats not queried by any particular parameter, the number of which is user-specifed."""
	return remove_duplicates(await fetch_cat_data(is_query=True, count=count), count)


def remove_duplicates(in_data: list[str], count) -> list[str]:
	"""Filters through a list of str data and returns list without duplicate items"""
	out_data = [ "" ] * count
	memo = {}

	for index, d in enumerate(in_data):
		if not memo.get(d):
			memo[d] = True
			out_data[index] = d

	return out_data