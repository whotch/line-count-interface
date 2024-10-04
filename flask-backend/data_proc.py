#####################
# data_proc.py
# William Hotch
# September 2024
#####################

# return the data sorted by its rank
def sort_by_rank(totals):
    # sort totals by rank
    return sorted(totals, key=lambda x: x['rank'])
