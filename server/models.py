from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db

class Users(db.Model,SerializerMixin):
    __tablename__ = "user"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False)
    user_email = db.Column(db.String, nullable=False)
    passwordhash = db.Column(db.String, nullable=False)

    #__RELATIONSHIPS
    swipes = db.relationship("Swipes", back_populates="user")


class Recipes(db.Model,SerializerMixin):
    __tablename__ = "recipe"

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String, nullable=False)
    category = db.Column(db.String, nullable=False)
    instructions = db.Column(db.String, nullable=False)

    #__RELATIONSHIPS
    swipes = db.relationship("Swipes", back_populates="recipe")

class Swipes(db.Model, SerializerMixin):
    __tablename__ = "swipes"

    id = db.Column(db.Integer, primary_key=True)
    swipe = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    recipe_id = db.Column(db.Integer, db.ForeignKey("recipe.id"))
    # ADD the DateTime function to pull current date and time to populate this column
    swipe_date = db.Column(db.Integer)

    #__RELATIONSHIPS
    user = db.relationship("Users", back_populates = "swipes")
    recipe = db.relationship("Recipes", back_populates = "swipes")
