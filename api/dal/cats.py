import asyncio
import aiohttp
import os, requests
from typing import List
from enum import Enum
# from api.models import Cat, Breed, Category


BASE_URL = "https://api.thecatapi.com/v1"
API_KEY = os.getenv("API_KEY")


class QueryType(Enum):
	BREED = 1
	CATEGORY = 2


def get_url(query_type: QueryType, is_query: bool, param_value: str="", count: int = 1):
	"""Returns url after adding suffix"""
	suffix: str = ""

	# For querying by Breed
	if query_type == QueryType.BREED:
		suffix = f"/images/search?limit={count}&breed_ids=" if is_query else "/breeds" 
	# For querying by Category
	elif query_type == QueryType.CATEGORY:
		suffix = f"/images/search?limit={count}&category_ids=" if is_query else "/categories" 
	# For random cat queries
	elif query_type == None and is_query:
		suffix = f"/images/search?limit={count}"

	return BASE_URL + suffix + param_value


async def fetch_cat_data(is_query: bool, query_type: QueryType=None, param_value: str="", count=0):
	"""Returns either List[Cat], List[Category], List[Breed] 
	after  fetching data from third-party API based"""

	response = None

	if count == 0:
		async with aiohttp.ClientSession() as session:
			async with session.get(get_url(query_type, is_query, param_value)) as response:
				return await response.json()
	
	else:
		cat_data = []
		async with aiohttp.ClientSession() as session:
			async with session.get(get_url(query_type, is_query, param_value, count)) as response:
				data = await response.json()
				for d in data:
					cat_data.append(d["url"])

		# cat_data = []
		# for i in range(0, count):
		# 	async with aiohttp.ClientSession() as session:
		# 		async with session.get(get_url(query_type, is_query, param_value)) as response:
		# 			data = await response.json()
		# 			cat_data.append(data[0]["url"])


		# 		# response = requests.get(get_url(query_type, is_query, param_value))
		# 		# cat_data.append(response.json()[0]["url"])
		
		return cat_data




