#####################
# hotd_routes.py
# William Hotch
# September 2024
#####################

from flask import jsonify
from db import db
from models.hotd_models import HotdEpInfo, HotdSeriesTotals, HotdSeasonTotals, HotdEpTotals
from data_proc import sort_by_rank

# register all routes for HOTD
def register_hotd_routes(app):

    # get the seasons
    @app.route('/api/hotd_unique_seasons', methods=['GET'])
    def get_hotd_unique_seasons():
        unique_seasons = db.session.query(HotdEpInfo.season_num).distinct().all()
        unique_seasons_list = [season[0] for season in unique_seasons]
        return jsonify(unique_seasons_list)

    # get the episodes of the selected season
    @app.route('/api/hotd_unique_episodes/<int:season_num>', methods=['GET'])
    def get_hotd_unique_episodes(season_num):
        unique_episodes = db.session.query(HotdEpInfo.ep_num).filter_by(season_num=season_num).distinct().all()
        unique_episodes_list = [episode[0] for episode in unique_episodes]
        return jsonify(unique_episodes_list)

    # get the series totals
    @app.route('/api/hotd_series_totals', methods=['GET'])
    def get_hotd_series_totals():
        totals = HotdSeriesTotals.query.all()
        totals_list = [{'char_name': total.char_name,
                        'line_count': total.line_count,
                        'ep_count': total.ep_count,
                        'rank': total.rank} for total in totals]
        totals_list = sort_by_rank(totals_list) 
        return jsonify(totals_list)

    # get the season totals
    @app.route('/api/hotd_season_totals/<int:season_num>', methods=['GET'])
    def get_hotd_season_totals(season_num):
        totals = HotdSeasonTotals.query.filter_by(season_num=season_num).all()
        totals_list = [{'char_name': total.char_name,
                    'line_count': total.line_count,
                    'ep_count': total.ep_count,
                    'rank': total.rank} for total in totals]
        totals_list = sort_by_rank(totals_list) 
        return jsonify(totals_list)

    # get the episodes totals
    @app.route('/api/hotd_ep_totals/<int:season_num>/<int:ep_num>', methods=['GET'])
    def get_hotd_ep_totals(season_num, ep_num):
        # get the ep_id from the ep_info table
        episode_info = HotdEpInfo.query.filter_by(season_num=season_num, ep_num=ep_num).first()
        if not episode_info:
            return jsonify({'error': 'Episode not found'}), 404
        
        ep_id = episode_info.id
        totals = HotdEpTotals.query.filter_by(ep_id=ep_id).all()
        if not totals:
            return jsonify({'message': 'No data available for this episode'}), 404

        totals_list = [{'char_name': total.char_name,
                    'line_count': total.line_count,
                    'rank': total.rank} for total in totals]
        totals_list = sort_by_rank(totals_list) 
        return jsonify(totals_list)

    # get the episode name
    @app.route('/api/hotd_ep_name/<int:season_num>/<int:ep_num>', methods=['GET'])
    def get_hotd_ep_name(season_num, ep_num):
        episode = HotdEpInfo.query.filter_by(season_num=season_num, ep_num=ep_num).first()
        
        if episode:
            return jsonify({"ep_name": episode.ep_name}), 200
        else:
            return jsonify({"error": "Episode not found"}), 404
