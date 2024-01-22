#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import Flask, make_response, request
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models import Users, Recipes, Swipes

# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

@app.route('/recipes/<int:id>', methods = ['GET'])
def recipe_by_id(id):
    recipe = Recipes.query.filter(Recipes.id == id).first()

    if recipe:
        response = make_response(
            recipe.to_dict(),
            200
        )
    else:
        response = make_response(
            { 'error': 'Recipe not found' },
            404
        )
    
    return response

@app.route('/swipes/<int:id>', methods = ['PATCH'])
def swipe_by_id(id):
    swipe = Swipes.query.filter(Swipes.id == id).first()

    if swipe:
        try:
            form_data = request.get_json()

            for attr in form_data:
                setattr(swipe, attr, form_data[attr])
            
            db.session.commit()

            response = make_response(
                swipe.to_dict(rules = ('-user', '-recipe')),
                202
            )
        except ValueError:
            response = make_response(
                { 'errors': ['validation errors'] },
                400
            )
    else:
        response = make_response(
            { 'error': 'Swipe not found' },
            404
        )
    
    return response


if __name__ == '__main__':
    app.run(port=5555, debug=True)

