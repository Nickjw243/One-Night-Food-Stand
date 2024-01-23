from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates

from config import db



class Users(db.Model,SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False)
    user_email = db.Column(db.String, nullable=False)
    passwordhash = db.Column(db.String, nullable=False)

    #__RELATIONSHIPS
    swipes = db.relationship("Swipes", back_populates="user")

    #_SERIALIZATION
    serialize_rules = ('-swipes.user', )

    #_VALIDATIONS
    @validates('username')
    def validate_username(self, key, value):
        if 0 < len(value) <= 25:
            return value
        else:
            raise ValueError
    
    @validates('passwordhash')
    def validate_passwordhash(self, key, value):
        if 0 < len(value) <= 25:
            return value
        else:
            raise ValueError
    
    #validation for @ (valid email) in user_email
    
    def __repr__(self):
        return f'<Users {self.id}, {self.username}>'

class Recipes(db.Model,SerializerMixin):
    __tablename__ = "recipes"

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String, nullable=False)
    category = db.Column(db.String, nullable=False)
    instructions = db.Column(db.String, nullable=False)
    directions = db.Column(db.String, nullable = False)
    image_url = db.Column(db.Text, nullable = False)

    #__RELATIONSHIPS
    swipes = db.relationship("Swipes", back_populates="recipe")

    #_SERIALIZATION
    serialize_rules = ('-swipes.recipe', )

    #_VALIDATIONS

    def __repr__(self):
        return f'<Recipes {self.id}, {self.name}>'

class Swipes(db.Model, SerializerMixin):
    __tablename__ = "swipes"

    id = db.Column(db.Integer, primary_key=True)
    swipe = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    recipe_id = db.Column(db.Integer, db.ForeignKey("recipes.id"))
    # ADD the DateTime function to pull current date and time to populate this column
    swipe_date = db.Column(db.Integer)

    #__RELATIONSHIPS
    user = db.relationship("Users", back_populates = "swipes")
    recipe = db.relationship("Recipes", back_populates = "swipes")

    #_SERIALIZATIONS
    serialize_rules = ('-user.swipes', '-recipe.swipes')

    #_VALIDATIONS

    def __repr__(self):
        return f'<Swipes {self.id}, {self.swipe}, {self.user_id}, {self.recipe_id}>'
    

