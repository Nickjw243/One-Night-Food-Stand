#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import Flask, make_response, request
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models import db, Users, Recipes, Swipes


# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

@app.route('/swipes', methods = ['POST'])
def swipes():
    form_data = request.get_json()
    new_swipes = Swipes(
        swipe = form_data['swipe'],
        user_id = form_data['user_id'],
        recipe_id = form_data['recipe_id'],
        swipe_date = form_data['swipe_date']
    )
    db.session.add(new_swipes)
    db.session.commit()
    response = make_response(
        new_swipes.to_dict(),
        201
    )
    return response


if __name__ == '__main__':
    app.run(port=5555, debug=True)

