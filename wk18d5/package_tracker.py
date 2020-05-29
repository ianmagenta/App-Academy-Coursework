from flask import Flask, render_template, redirect
from app.config import Configuration as Config
from app.shipping_form import ShipForm
from flask_migrate import Migrate
from app.models import db, Package

app = Flask(__name__)

app.config.from_object(Config)
db.init_app(app)
migrate = Migrate(app, db)


@app.route("/")
def root_endpoint():
    packages = Package.query.all()
    Package.advance_all_locations()
    return render_template('package_status.html', packages=packages)


@app.route("/new_package", methods=["GET", "POST"])
def package():
    form = ShipForm()
    if form.validate_on_submit():
        data = form.data
        new_package = Package(sender=data["name"],
                              recipient=data["recipient"],
                              origin=data["origin"],
                              destination=data["destination"],
                              location=data["origin"])
        db.session.add(new_package)
        db.session.commit()
        return redirect("/")
    return render_template("shipping_request.html", form=form)
