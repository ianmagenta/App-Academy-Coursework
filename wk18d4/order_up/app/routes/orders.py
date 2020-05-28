from flask import Blueprint, render_template, redirect, url_for
from flask_login import login_required
from ..forms import CreateOrder, UpdateOrder, CloseOrder
from ..models import db, Employee, Table, Order, MenuItem


bp = Blueprint("orders", __name__, url_prefix="")


@bp.route("/", methods=['GET', 'POST'])
@login_required
def index():
    form = CreateOrder()
    update = UpdateOrder()
    close = CloseOrder()
    tables = Table.query.all()
    servers = Employee.query.all()
    orders = Order.query.all()
    items = MenuItem.query.all()
    form.table_id.choices = [(table.id, table.id) for table in tables]
    form.employee_id.choices = [(server.id, server.name) for server in servers]
    update.order_id.choices = [(order.id, order.id) for order in orders]
    update.menu_item_id.choices = [(item.id, item.id) for item in items]
    close.order_id.choices = [(order.id, order.id) for order in orders]
    # print(orders[0].total)
    if form.validate_on_submit():
        # print("hi there!")
        if form.employee_id:
            order = Order(
                employee_id=form.employee_id.data,
                table_id=form.table_id.data,
            )
            db.session.add(order)
            db.session.commit()
            return redirect(url_for('.index'))
    if update.validate_on_submit():
        order = db.session.query(Order).get(update.order_id.data)
        item = db.session.query(MenuItem).get(update.menu_item_id.data)
        order.menu_items.append(item)
        db.session.commit()
        return redirect(url_for('.index'))
    if close.validate_on_submit():
        print('wow heres is  print statement')
        order = db.session.query(Order).get(close.order_id.data)
        order.closed = True
        db.session.commit()

    return render_template("orders.html", form=form, update=update, close=close, servers=servers)


def 