import os
from flask import Blueprint, render_template, redirect
import psycopg2
from app.forms import AppointmentForm
from datetime import datetime

bp = Blueprint('main', __name__, "")

CONNECTION_PARAMETERS = {
    "user": os.environ.get("DB_USER"),
    "password": os.environ.get("DB_PASS"),
    "dbname": os.environ.get("DB_NAME"),
    "host": os.environ.get("DB_HOST"),
}


@bp.route("/", methods=["GET", "POST"])
def main():
    form = AppointmentForm()
    if form.validate_on_submit():
        with psycopg2.connect(**CONNECTION_PARAMETERS) as conn:
            with conn.cursor() as curs:
                curs.execute(
                    'insert into appointments values (default, %(name)s, %(start_datetime)s, %(end_datetime)s, %(description)s, %(private)s)', {
                        'name': form.name.data,
                        'start_datetime': datetime.combine(form.start_date.data, form.start_time.data),
                        'end_datetime': datetime.combine(form.end_date.data, form.end_time.data),
                        'description': form.description.data,
                        'private': form.private.data
                    })

        return redirect("/")
    with psycopg2.connect(**CONNECTION_PARAMETERS) as conn:
        with conn.cursor() as curs:
            curs.execute(
                'SELECT id, name, start_datetime, end_datetime FROM appointments ORDER BY start_datetime;')
            rows = curs.fetchall()
    # Create a psycopg2 connection with the connection parameters
    # Create a cursor from the connection
    # Execute "SELECT id, name, start_datetime, end_datetime
    #          FROM appointments
    #          ORDER BY start_datetime;"
    # Fetch all of the records
    return render_template("main.html", rows=rows, form=form)
