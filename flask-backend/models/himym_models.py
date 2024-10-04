#####################
# himym_models.py
# William Hotch
# September 2024
#####################

from flask_sqlalchemy import SQLAlchemy
from db import db

# Define a model for the himym_ep_info table
class HimymEpInfo(db.Model):
    __tablename__ = 'himym_ep_info'
    id = db.Column(db.Integer, primary_key=True)
    season_num = db.Column(db.Integer, nullable=False)
    ep_num = db.Column(db.Integer, nullable=False)
    ep_name = db.Column(db.String, nullable=False)

# Define a model for the himym_series_totals table
class HimymSeriesTotals(db.Model):
    __tablename__ = 'himym_series_totals' 
    id = db.Column(db.Integer, primary_key=True)  
    char_name = db.Column(db.String, nullable=False) 
    line_count = db.Column(db.Integer, nullable=False)
    ep_count = db.Column(db.Integer, nullable=False)
    rank = db.Column(db.Integer, nullable=False)

# Define a model for the himym_season_totals table
class HimymSeasonTotals(db.Model):
    __tablename__ = 'himym_season_totals'
    id = db.Column(db.Integer, primary_key=True)  
    season_num = db.Column(db.Integer, nullable=False)
    char_name = db.Column(db.String, nullable=False) 
    line_count = db.Column(db.Integer, nullable=False)
    ep_count = db.Column(db.Integer, nullable=False)
    rank = db.Column(db.Integer, nullable=False)

# Define a model for the himym_ep_totals table
class HimymEpTotals(db.Model):
    __tablename__ = 'himym_ep_totals'
    id = db.Column(db.Integer, primary_key=True)  
    ep_id = db.Column(db.Integer, nullable=False)
    char_name = db.Column(db.String, nullable=False) 
    line_count = db.Column(db.Integer, nullable=False)
    rank = db.Column(db.Integer, nullable=False)