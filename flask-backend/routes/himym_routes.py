#####################
# himym_routes.py
# William Hotch
# September 2024
#####################

from flask import jsonify
from db import db
from models.himym_models import HimymEpInfo, HimymSeriesTotals, HimymSeasonTotals, HimymEpTotals
from data_proc import sort_by_rank

# register all routes for HIMYM
def register_himym_routes(app):

    # get the seasons
    @app.route('/api/himym_unique_seasons', methods=['GET'])
    def get_himym_unique_seasons():
        unique_seasons = db.session.query(HimymEpInfo.season_num).distinct().all()
        unique_seasons_list = [season[0] for season in unique_seasons]
        return jsonify(unique_seasons_list)
    
    # get the episodes
    @app.route('/api/himym_unique_episodes/<int:season_num>', methods=['GET'])
    def get_himym_unique_episodes(season_num):
        unique_episodes = db.session.query(HimymEpInfo.ep_num).filter_by(season_num=season_num).distinct().all()
        unique_episodes_list = [episode[0] for episode in unique_episodes]
        return jsonify(unique_episodes_list)

    # get the series totals
    @app.route('/api/himym_series_totals', methods=['GET'])
    def get_himym_series_totals():
        totals = HimymSeriesTotals.query.all()
        totals_list = [{'char_name': total.char_name,
                        'line_count': total.line_count,
                        'ep_count': total.ep_count,
                        'rank': total.rank} for total in totals]
        totals_list = sort_by_rank(totals_list) 
        return jsonify(totals_list)

    # get the season totals
    @app.route('/api/himym_season_totals/<int:season_num>', methods=['GET'])
    def get_himym_season_totals(season_num):
        totals = HimymSeasonTotals.query.filter_by(season_num=season_num).all()
        totals_list = [{'char_name': total.char_name,
                    'line_count': total.line_count,
                    'ep_count': total.ep_count,
                    'rank': total.rank} for total in totals]
        totals_list = sort_by_rank(totals_list) 
        return jsonify(totals_list)

    # get the episode totals
    @app.route('/api/himym_ep_totals/<int:season_num>/<int:ep_num>', methods=['GET'])
    def get_himym_ep_totals(season_num, ep_num):
        # get the ep_id from the ep_info table
        episode_info = HimymEpInfo.query.filter_by(season_num=season_num, ep_num=ep_num).first()
        if not episode_info:
            return jsonify({'error': 'Episode not found'}), 404
        
        ep_id = episode_info.id
        totals = HimymEpTotals.query.filter_by(ep_id=ep_id).all()
        if not totals:
            return jsonify({'message': 'No data available for this episode'}), 404

        totals_list = [{'char_name': total.char_name,
                    'line_count': total.line_count,
                    'rank': total.rank} for total in totals]
        totals_list = sort_by_rank(totals_list) 
        return jsonify(totals_list)

    # get the episode name
    @app.route('/api/himym_ep_name/<int:season_num>/<int:ep_num>', methods=['GET'])
    def get_himym_ep_name(season_num, ep_num):
        episode = HimymEpInfo.query.filter_by(season_num=season_num, ep_num=ep_num).first()
        
        if episode:
            return jsonify({"ep_name": episode.ep_name}), 200
        else:
            return jsonify({"error": "Episode not found"}), 404
