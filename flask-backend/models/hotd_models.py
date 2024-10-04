#####################
# hotd_models.py
# William Hotch
# September 2024
#####################

from flask_sqlalchemy import SQLAlchemy
from db import db

# Define a model for the hotd_ep_info table
class HotdEpInfo(db.Model):
    __tablename__ = 'hotd_ep_info'
    id = db.Column(db.Integer, primary_key=True)
    season_num = db.Column(db.Integer, nullable=False)
    ep_num = db.Column(db.Integer, nullable=False)
    ep_name = db.Column(db.String, nullable=False)

# Define a model for the hotd_series_totals table
class HotdSeriesTotals(db.Model):
    __tablename__ = 'hotd_series_totals' 
    id = db.Column(db.Integer, primary_key=True)  
    char_name = db.Column(db.String, nullable=False) 
    line_count = db.Column(db.Integer, nullable=False)
    ep_count = db.Column(db.Integer, nullable=False)
    rank = db.Column(db.Integer, nullable=False)

# Define a model for the hotd_season_totals table
class HotdSeasonTotals(db.Model):
    __tablename__ = 'hotd_season_totals'
    id = db.Column(db.Integer, primary_key=True)  
    season_num = db.Column(db.Integer, nullable=False)
    char_name = db.Column(db.String, nullable=False) 
    line_count = db.Column(db.Integer, nullable=False)
    ep_count = db.Column(db.Integer, nullable=False)
    rank = db.Column(db.Integer, nullable=False)

# Define a model for the hotd_ep_totals table
class HotdEpTotals(db.Model):
    __tablename__ = 'hotd_ep_totals'
    id = db.Column(db.Integer, primary_key=True)  
    ep_id = db.Column(db.Integer, nullable=False)
    char_name = db.Column(db.String, nullable=False) 
    line_count = db.Column(db.Integer, nullable=False)
    rank = db.Column(db.Integer, nullable=False)