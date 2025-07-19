from flask import Blueprint, jsonify, request
from .services import get_buses, get_bus_details, get_bus_position, get_bus_record

bp = Blueprint("main", __name__)

@bp.route("/buses")
def buses():
    buses = get_buses()
    return jsonify({
        "buses": buses,
        "total_buses": len(buses),
        "articulados": sum(1 for b in buses.values() if b.get("type") == "Articulado"),
        "rigidos": sum(1 for b in buses.values() if b.get("type") == "Rígido")
    })

@bp.route("/buses/<id>")
def bus_details(id):
    return jsonify(get_bus_details(id))

@bp.route("/buses/<id>/position")
def bus_position(id):
    line = request.args.get("line")
    return jsonify(get_bus_position(id, line))

@bp.route("/buses/<id>/record")
def bus_record(id):
    return jsonify(get_bus_record(id))
    