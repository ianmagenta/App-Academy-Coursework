from flask_wtf import FlaskForm
from wtforms.fields import StringField, SelectField, BooleanField, SubmitField
from wtforms.validators import DataRequired
from map.map import map


map_keys = map.keys()
v = [DataRequired()]


class ShipForm(FlaskForm):
    name = StringField("Sender Name", v)
    recipient = StringField("Recipient Name", v)
    origin = SelectField("Origin", v, choices=[(i, i) for i in map_keys])
    destination = SelectField("Destination", v, choices=[
                              (i, i) for i in map_keys])
    express = BooleanField("Express Shipping")
    submit = SubmitField("Submit")
