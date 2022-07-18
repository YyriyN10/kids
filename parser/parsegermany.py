import csv
import os
import json

def parse_csv(filename):
    """
    Parse a CSV file and return a list of dictionaries.
    """
    if not os.path.isfile(filename):
        raise FileNotFoundError(f"{filename} does not exist.")
    with open(filename, 'r') as csvfile:
        reader = csv.reader(csvfile)
        return [row for row in reader]


# cut off everything after question mark in url
def cut_off_url(url):
    if url is None:
        return None
    if (url.find('?') == -1):
        return url

    return url[:url.find('?')]


# cut off everything before last slash in url
def cut_off_slash(url):
    if url is None:
        return None
    return url[url.rfind('/')+1:]

if __name__ == '__main__':
    data = parse_csv('bundestag.csv')
    # print(data)
    officials = []
    parties = {}
    for (i, row) in enumerate(data):
        if i == 0:
            continue
        print (row)
        off = {}
        off['name'] = row[1] + ' ' + row[0]
        party = row[2]
        off['tw'] = ''
        off['fb'] = ''
        off['email'] = row[6]
        tw = row[3]
        fb = row[4]

        if (tw and tw != '-'):
            off['tw'] = cut_off_slash(cut_off_url(tw.strip()))
        else:
            continue

        if (off['email'] == '-' or off['email'] == ''):
            continue
    
        if (fb and fb != '-'):
            off['fb'] = cut_off_url(fb.strip())

        if (party not in parties):
            parties[party] = []
        parties[party].append(off)

    json.dump(parties, open('output-bundestag.json', 'w'))

