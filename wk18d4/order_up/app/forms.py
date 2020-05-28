from flask_wtf import FlaskForm
from wtforms.fields import (
    StringField, PasswordField, SubmitField, SelectField, BooleanField)
from wtforms.validators import DataRequired

v = [DataRequired()]


class LoginForm(FlaskForm):
    employee_number = StringField("Employee Number", v)
    password = PasswordField("Password", v)
    submit = SubmitField("Login")


class CreateOrder(FlaskForm):
    employee_id = SelectField("Select ID", v, coerce=int)
    table_id = SelectField("Select Table", v, coerce=int)
    submit = SubmitField("Create Order")


class UpdateOrder(FlaskForm):
    order_id = SelectField("Select Order", v, coerce=int)
    menu_item_id = SelectField("Select Item", v, coerce=int)
    submit = SubmitField("Update Order")


class CloseOrder(FlaskForm):
    order_id = SelectField("Select Order", v, coerce=int)
    submit = SubmitField("Close Order")
