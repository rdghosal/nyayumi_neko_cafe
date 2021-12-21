from flask import Blueprint, render_template, send_from_directory, request
from flask.json import jsonify
import api.services.cats as cat_services


blueprint = Blueprint(name="cats_controller", import_name=__name__)

@blueprint.route("/api/cats/breeds", methods=["GET"])
def get_breeds():
	"""Returns all cat breeds"""
	return cat_services.get_breeds()


@blueprint.route("/api/cats/categories", methods=["GET"])
def get_categories():
	"""Returns all search categories"""
	return cat_services.get_categories()


@blueprint.route("/api/cats/breeds/<path:breed_id>", methods=["GET"])
def get_cats_by_breed(breed_id: str):
	"""Returns cat data based on client-specified breed_id"""
	return cat_services.get_cats_by_breed(breed_id)


@blueprint.route("/api/cats/categories/<path:category_id>", methods=["GET"])
def get_cats_by_category(category_id: str):
	"""Returns cat data based on client-specified category_id"""
	return cat_services.get_cats_by_category(category_id)

