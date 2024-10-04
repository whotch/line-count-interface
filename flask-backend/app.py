##################
# app.py
# William Hotch
# September 2024
##################

from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from data_proc import sort_by_rank
from db import db
import os

# import routes
from routes.hotd_routes import register_hotd_routes
from routes.himym_routes import register_himym_routes
from routes.bb_routes import register_bb_routes

# set the path to the database
basedir = os.path.abspath(os.path.dirname(__file__))
db_path = os.path.join(basedir, 'line_counts.db')

app = Flask(__name__)
CORS(app)

# Configure SQLite database
app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{db_path}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# initialize the database
db.init_app(app)

with app.app_context():
   
    # import models
    from models.hotd_models import HotdEpInfo, HotdSeriesTotals, HotdSeasonTotals, HotdEpTotals
    from models.himym_models import HimymEpInfo, HimymSeriesTotals, HimymSeasonTotals, HimymEpTotals
    from models.bb_models import BbEpInfo, BbSeriesTotals, BbSeasonTotals, BbEpTotals, BbElcaminoTotals, BbSeriesCombinedTotals, BbPartEpInfo, BbPartTotals, BbPartEpTotals
    
    # initialize the tables in the database
    db.create_all()

# register all routes
register_hotd_routes(app)
register_himym_routes(app)
register_bb_routes(app)

@app.route('/')
def home():
    return "Hello, Flask with SQLite and series_totals table!"

if __name__ == '__main__':
    app.run(debug=True)