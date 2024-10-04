#####################
# bb_routes.py
# William Hotch
# September 2024
#####################

from flask import jsonify
from db import db
from models.bb_models import BbEpInfo, BbSeriesTotals, BbSeasonTotals, BbEpTotals, BbElcaminoTotals, BbSeriesCombinedTotals, BbPartEpInfo, BbPartTotals, BbPartEpTotals
from data_proc import sort_by_rank

# register all routes for BB
def register_bb_routes(app):

    # get the seasons
    @app.route('/api/bb_unique_seasons', methods=['GET'])
    def get_bb_unique_seasons():
        unique_seasons = db.session.query(BbEpInfo.season_num).distinct().all()
        unique_seasons_list = [season[0] for season in unique_seasons]
        return jsonify(unique_seasons_list)
    
    # get the episodes
    @app.route('/api/bb_unique_episodes/<int:season_num>', methods=['GET'])
    def get_bb_unique_episodes(season_num):
        unique_episodes = db.session.query(BbEpInfo.ep_num).filter_by(season_num=season_num).distinct().all()
        unique_episodes_list = [episode[0] for episode in unique_episodes]
        return jsonify(unique_episodes_list)

    # get the series totals
    @app.route('/api/bb_series_totals', methods=['GET'])
    def get_bb_series_totals():
        totals = BbSeriesTotals.query.all()
        totals_list = [{'char_name': total.char_name,
                        'line_count': total.line_count,
                        'ep_count': total.ep_count,
                        'rank': total.rank} for total in totals]
        totals_list = sort_by_rank(totals_list) 
        return jsonify(totals_list)

    # get the season totals
    @app.route('/api/bb_season_totals/<int:season_num>', methods=['GET'])
    def get_bb_season_totals(season_num):
        totals = BbSeasonTotals.query.filter_by(season_num=season_num).all()
        totals_list = [{'char_name': total.char_name,
                    'line_count': total.line_count,
                    'ep_count': total.ep_count,
                    'rank': total.rank} for total in totals]
        totals_list = sort_by_rank(totals_list) 
        return jsonify(totals_list)

    # get the episode totals
    @app.route('/api/bb_ep_totals/<int:season_num>/<int:ep_num>', methods=['GET'])
    def get_bb_ep_totals(season_num, ep_num):
        # get the ep_id from the ep_info table
        episode_info = BbEpInfo.query.filter_by(season_num=season_num, ep_num=ep_num).first()
        if not episode_info:
            return jsonify({'error': 'Episode not found'}), 404
        
        ep_id = episode_info.id
        totals = BbEpTotals.query.filter_by(ep_id=ep_id).all()
        if not totals:
            return jsonify({'message': 'No data available for this episode'}), 404

        totals_list = [{'char_name': total.char_name,
                    'line_count': total.line_count,
                    'rank': total.rank} for total in totals]
        totals_list = sort_by_rank(totals_list) 
        return jsonify(totals_list)

    # get the episode name
    @app.route('/api/bb_ep_name/<int:season_num>/<int:ep_num>', methods=['GET'])
    def get_bb_ep_name(season_num, ep_num):
        episode = BbEpInfo.query.filter_by(season_num=season_num, ep_num=ep_num).first()
        
        if episode:
            return jsonify({"ep_name": episode.ep_name}), 200
        else:
            return jsonify({"error": "Episode not found"}), 404

    ## EL CAMINO ##
    # get El Camino totals
    @app.route('/api/bb_elcamino_totals', methods=['GET'])
    def get_bb_elcamino_totals():
        totals = BbElcaminoTotals.query.filter_by().all()
        totals_list = [{'char_name': total.char_name,
                    'line_count': total.line_count,
                    'rank': total.rank} for total in totals]
        totals_list = sort_by_rank(totals_list) 
        return jsonify(totals_list)
    
    # get the combined series totals
    @app.route('/api/bb_series_combined_totals', methods=['GET'])
    def get_bb_series_combined_totals():
        totals = BbSeriesCombinedTotals.query.all()
        totals_list = [{'char_name': total.char_name,
                        'line_count': total.line_count,
                        'ep_count': total.ep_count,
                        'rank': total.rank,
                        'elcamino_bool': total.elcamino_bool} for total in totals]
        totals_list = sort_by_rank(totals_list) 
        return jsonify(totals_list)

    ## PART ##
    # get the episodes for when a part is selected
    @app.route('/api/bb_unique_part_episodes/<int:season_num>/<string:part>', methods=['GET'])
    def get_bb_unique_part_episodes(season_num, part):
        unique_part_episodes = db.session.query(BbPartEpInfo.ep_num).filter_by(season_num=season_num, part=part).distinct().all()
        unique_part_episodes_list = [episode[0] for episode in unique_part_episodes]
        return jsonify(unique_part_episodes_list)
    
    # get the part totals
    @app.route('/api/bb_part_totals/<int:season_num>/<string:part>', methods=['GET'])
    def get_bb_part_totals(season_num, part):
        totals = BbPartTotals.query.filter_by(season_num=season_num, part=part).all()
        totals_list = [{'char_name': total.char_name,
                    'line_count': total.line_count,
                    'ep_count': total.ep_count,
                    'rank': total.rank} for total in totals]
        totals_list = sort_by_rank(totals_list) 
        return jsonify(totals_list)
    
    # get the episode totals from a part
    @app.route('/api/bb_part_ep_totals/<int:season_num>/<string:part>/<int:ep_num>', methods=['GET'])
    def get_bb_part_ep_totals(season_num, part, ep_num):
        # get the ep_id from the part_ep_info table
        episode_info = BbPartEpInfo.query.filter_by(season_num=season_num, part=part, ep_num=ep_num).first()
        if not episode_info:
            return jsonify({'error': 'Episode not found'}), 404
        
        ep_id = episode_info.id
        totals = BbPartEpTotals.query.filter_by(ep_id=ep_id).all()
        if not totals:
            return jsonify({'message': 'No data available for this episode'}), 404

        totals_list = [{'char_name': total.char_name,
                    'line_count': total.line_count,
                    'rank': total.rank} for total in totals]
        totals_list = sort_by_rank(totals_list) 
        return jsonify(totals_list)
    
    # get the episode name from a part
    @app.route('/api/bb_part_ep_name/<int:season_num>/<string:part>/<int:ep_num>', methods=['GET'])
    def get_bb_part_ep_name(season_num, part, ep_num):
        episode = BbPartEpInfo.query.filter_by(season_num=season_num, part=part, ep_num=ep_num).first()
        
        if episode:
            return jsonify({"ep_name": episode.ep_name}), 200
        else:
            return jsonify({"error": "Episode not found"}), 404