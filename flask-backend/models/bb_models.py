#####################
# bb_models.py
# William Hotch
# September 2024
#####################

from flask_sqlalchemy import SQLAlchemy
from db import db

# Define a model for the bb_ep_info table
class BbEpInfo(db.Model):
    __tablename__ = 'bb_ep_info'
    id = db.Column(db.Integer, primary_key=True)
    season_num = db.Column(db.Integer, nullable=False)
    ep_num = db.Column(db.Integer, nullable=False)
    ep_name = db.Column(db.String, nullable=False)

# Define a model for the bb_series_totals table
class BbSeriesTotals(db.Model):
    __tablename__ = 'bb_series_totals' 
    id = db.Column(db.Integer, primary_key=True)  
    char_name = db.Column(db.String, nullable=False) 
    line_count = db.Column(db.Integer, nullable=False)
    ep_count = db.Column(db.Integer, nullable=False)
    rank = db.Column(db.Integer, nullable=False)

# Define a model for the bb_season_totals table
class BbSeasonTotals(db.Model):
    __tablename__ = 'bb_season_totals'
    id = db.Column(db.Integer, primary_key=True)  
    season_num = db.Column(db.Integer, nullable=False)
    char_name = db.Column(db.String, nullable=False) 
    line_count = db.Column(db.Integer, nullable=False)
    ep_count = db.Column(db.Integer, nullable=False)
    rank = db.Column(db.Integer, nullable=False)

# Define a model for the bb_ep_totals table
class BbEpTotals(db.Model):
    __tablename__ = 'bb_ep_totals'
    id = db.Column(db.Integer, primary_key=True)  
    ep_id = db.Column(db.Integer, nullable=False)
    char_name = db.Column(db.String, nullable=False) 
    line_count = db.Column(db.Integer, nullable=False)
    rank = db.Column(db.Integer, nullable=False)

## EL CAMINO ##
# Define a model for the bb_elcamino_totals table
class BbElcaminoTotals(db.Model):
    __tablename__ = 'bb_elcamino_totals'
    id = db.Column(db.Integer, primary_key=True)  
    char_name = db.Column(db.String, nullable=False) 
    line_count = db.Column(db.Integer, nullable=False)
    rank = db.Column(db.Integer, nullable=False)

# Define a model for the bb_series_combined_totals table
class BbSeriesCombinedTotals(db.Model):
    __tablename__ = 'bb_series_combined_totals' 
    id = db.Column(db.Integer, primary_key=True)  
    char_name = db.Column(db.String, nullable=False) 
    line_count = db.Column(db.Integer, nullable=False)
    ep_count = db.Column(db.Integer, nullable=False)
    rank = db.Column(db.Integer, nullable=False)
    elcamino_bool = db.Column(db.Boolean, nullable=False)

## PART ##
# Define a model for the bb_part_ep_info table
class BbPartEpInfo(db.Model):
    __tablename__ = 'bb_part_ep_info' 
    id = db.Column(db.Integer, primary_key=True)
    season_num = db.Column(db.Integer, nullable=False)
    part = db.Column(db.String, nullable=False)
    ep_num = db.Column(db.Integer, nullable=False)
    ep_name = db.Column(db.String, nullable=False)

# Define a model for the bb_part_totals table
class BbPartTotals(db.Model):
    __tablename__ = 'bb_part_totals'
    id = db.Column(db.Integer, primary_key=True)  
    season_num = db.Column(db.Integer, nullable=False)
    part = db.Column(db.String, nullable=False)
    char_name = db.Column(db.String, nullable=False) 
    line_count = db.Column(db.Integer, nullable=False)
    ep_count = db.Column(db.Integer, nullable=False)
    rank = db.Column(db.Integer, nullable=False)

# Define a model for the bb_part_ep_totals table
class BbPartEpTotals(db.Model):
    __tablename__ = 'bb_part_ep_totals'
    id = db.Column(db.Integer, primary_key=True)  
    ep_id = db.Column(db.Integer, nullable=False)
    season_num = db.Column(db.Integer, nullable=False)
    part = db.Column(db.String, nullable=False)
    char_name = db.Column(db.String, nullable=False) 
    line_count = db.Column(db.Integer, nullable=False)
    rank = db.Column(db.Integer, nullable=False)