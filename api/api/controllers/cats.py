from flask import Blueprint, request, send_file
from flask.json import jsonify
import api.services.cats as cat_services


blueprint = Blueprint(name="cats_controller", import_name=__name__)


@blueprint.route("/api/cats/breeds", methods=["GET"])
async def get_cats_by_breed():
	"""Returns cat data based on client-specified breed_id"""

	count = int(request.args.get("count", "1"))
	breed_id = request.args.get("breed_id", "")

	if not count or not breed_id:
		return jsonify(await cat_services.get_breeds())

	return jsonify(await cat_services.get_cats_by_breed(breed_id=breed_id, count=count))


@blueprint.route("/api/cats/categories", methods=["GET"])
async def get_cats_by_category():
	"""Returns cat data based on client-specified category_id"""
	count = int(request.args.get("count", "1"))
	category_id = request.args.get("category_id", "")

	if not count or not category_id:
		return jsonify(await cat_services.get_categories())

	return jsonify(await cat_services.get_cats_by_category(category_id=category_id, count=count))


@blueprint.route("/api/cats/random", methods=["GET"])
async def get_random_cats():
	"""Returns cat data based on client-specified category_id"""
	count = int(request.args.get("count", "1"))

	return jsonify(await cat_services.get_random_cats(count=count))


@blueprint.route("/api/cats/download", methods=["POST"])
async def get_image():

	r = request.get_json()
	return send_file(await cat_services.get_cat_img_bytes(r["url"]), mimetype="image/jpg")
	