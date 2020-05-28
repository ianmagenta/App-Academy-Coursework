from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

order_items = db.Table(
    "order_items",
    db.Model.metadata,
    db.Column("order_id", db.Integer, db.ForeignKey(
        "orders.id"), primary_key=True),
    db.Column("menu_item_id", db.Integer, db.ForeignKey(
        "menu_items.id"), primary_key=True)
)


class Employee(db.Model, UserMixin):
    __tablename__ = 'employees'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    employee_number = db.Column(db.Integer, nullable=False, unique=True)
    hashed_password = db.Column(db.String(100), nullable=False)

    orders = db.relationship("Order", back_populates="employee")

    @property
    def password(self):
        return hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.hashed_password, password)


class Menu(db.Model):
    __tablename__ = 'menus'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(30), nullable=False)

    items = db.relationship("MenuItem", back_populates="menu")


class MenuItem(db.Model):
    __tablename__ = 'menu_items'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    price = db.Column(db.Float, nullable=False)
    menu_id = db.Column(db.Integer, db.ForeignKey('menus.id'))
    menu_type_id = db.Column(db.Integer, db.ForeignKey('menu_item_types.id'))

    menu = db.relationship("Menu", back_populates="items")
    orders = db.relationship(
        "Order", secondary=order_items, back_populates="menu_items")
    type = db.relationship("MenuItemType")


class MenuItemType(db.Model):
    __tablename__ = 'menu_item_types'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20), nullable=False)


class Table(db.Model):
    __tablename__ = 'tables'

    id = db.Column(db.Integer, primary_key=True)
    number = db.Column(db.Integer, nullable=False, unique=True)
    capacity = db.Column(db.Integer, nullable=False)

    orders = db.relationship("Order", back_populates="table")


class Order(db.Model):
    __tablename__ = 'orders'

    id = db.Column(db.Integer, primary_key=True)
    employee_id = db.Column(db.Integer, db.ForeignKey("employees.id"))
    table_id = db.Column(db.Integer, db.ForeignKey("tables.id"))
    closed = db.Column(db.Boolean, default=False)

    employee = db.relationship("Employee", back_populates="orders")
    table = db.relationship("Table", back_populates="orders")
    menu_items = db.relationship(
        "MenuItem", secondary=order_items, back_populates="orders")

    @property
    def total(self):
        # print(self.menu_items)
        return sum([item.price for item in self.menu_items])
