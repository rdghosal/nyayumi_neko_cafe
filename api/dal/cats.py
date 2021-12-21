import os, requests
from typing import List
from enum import Enum
# from api.models import Cat, Breed, Category


BASE_URL = "https://api.thecatapi.com/v1"
API_KEY = os.getenv("API_KEY")


class QueryType(Enum):
	BREED = 1
	CATEGORY = 2


def get_url(query_type: QueryType, is_query: bool, param_value: str=""):
	"""Returns url after adding suffix"""
	suffix: str = ""

	if query_type == QueryType.BREED:
		suffix = "/images/search?breed_ids=" if is_query else "/breeds" 
	elif query_type == QueryType.CATEGORY:
		suffix = "/images/search?category_ids=" if is_query else "/categories" 

	print(BASE_URL + suffix + param_value)
	return BASE_URL + suffix + param_value


def fetch_cat_data(query_type: QueryType, is_query: bool, param_value: str=""):
	"""Returns either List[Cat], List[Category], List[Breed] 
	after fetching data from third-party API based"""
	response = requests.get(get_url(query_type, is_query, param_value))
	return response.text




