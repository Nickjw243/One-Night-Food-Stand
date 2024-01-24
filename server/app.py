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

@app.route('/swipes', methods = ['GET', 'POST'])
def swipes():
    if request.method == "GET":
        swipes = Swipes.query.all()
        swipes_dict = [swipe.to_dict(rules = ('-recipe', '-user')) for swipe in swipes]
        response = make_response(
            swipes_dict,
            200
        )
    elif request.method == 'POST':
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

@app.route('/recipes/<int:id>', methods = ['GET'])
def recipe_by_id(id):
    recipe = Recipes.query.filter(Recipes.id == id).first()

    if recipe:
        response = make_response(
            recipe.to_dict(rules = ('-swipes', )),
            200
        )
    else:
        response = make_response(
            { 'error': 'Recipe not found' },
            404
        )
    
    return response

@app.route('/recipes', methods = ['GET'])
def recipes():
    recipes = Recipes.query.all()

    recipes_dict = [recipe.to_dict(rules = ('occasion', 'weather', 'protein', 'difficulty', '-swipes')) for recipe in recipes]

    response = make_response(
        recipes_dict,
        200
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

@app.route('/users/<int:id>', methods = ['GET','DELETE'])
def users(id):
    user = Users.query.filter(Users.id == id).first()

    if request.method == 'GET':
        user_body = user.to_dict(rules=('-swipes','-username','-id',))

        res = make_response(
            user_body,
            200
        )
    elif request.method == 'DELETE':
        db.session.delete(user)
        db.session.commit()

        res = make_response(
            {},
            201
        )
    return res

##-------------This is for the login functionality-----##(app.js)
@app.route('/users/<string:user_email>', methods = ['GET'])
def users_by_email(user_email):
    try:
        user = Users.query.filter(Users.user_email == user_email).first()
        user_body = user.to_dict(rules=('-swipes','-username','-id',))

        res = make_response(
            user_body,
            200
        )
    except:
        res = make_response(
            {"error": "account does not exist"},
            404
        )
    return res

# @app.route('/users', methods = ['GET', 'POST'])
# def users():
#     if request.method == 'GET':
#         users = Users.query.all()
#         users_dict = [user.to_dict() for user in users]
#         response = make_response(
#             users_dict,
#             200
#         )
#     elif request.method == 'POST':
#         try:
#             form_data = request.get_json()
#             new_user = Users(
#                 username = form_data['username'],
#                 user_email = form_data['user_email'],
#                 passwordhash = form_data['passwordhash']
#             )
#             db.session.add(new_user)
#             db.session.commit()
#             response = make_response(
#                 new_user.to_dict(),
#                 201
#             )
#         except ValueError:
#             response = make_response(
#                 {'Error': 'Validation error'}
#             )
#     return response

if __name__ == '__main__':
    app.run(port=5555, debug=True)

