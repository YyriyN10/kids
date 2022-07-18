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

US_STATES = ['Alaska', 'Alabama', 'Arkansas', 'American Samoa', 'Arizona',
             'California', 'Colorado', 'Connecticut', 'District of Columbia',
             'Delaware', 'Florida', 'Georgia', 'Guam', 'Hawaii', 'Iowa', 'Idaho',
             'Illinois', 'Indiana', 'Kansas', 'Kentucky', 'Louisiana', 'Massachusetts',
             'Maryland', 'Maine', 'Michigan', 'Minnesota', 'Missouri', 'Mississippi',
             'Montana', 'North Carolina', ' North Dakota', 'Nebraska', 'New Hampshire',
             'New Jersey', 'New Mexico', 'Nevada', 'New York', 'Ohio', 'Oklahoma', 'Oregon',
             'Pennsylvania', 'Puerto Rico', 'Rhode Island', 'South Carolina', 'South Dakota',
             'Tennessee', 'Texas', 'Utah', 'Virginia', 'Virgin Islands', 'Vermont',
             'Washington', 'Wisconsin', 'West Virginia', 'Wyoming']

print(len(US_STATES))

DISTRICT_NUMS = ['At Large', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th',  '8th', '9th', '10th', '11th', '12th', '13th', 
                '14th', '15th', '16th', '17th', '18th', '19th', '20th', '21st', '22nd', '23rd', '24th', '25th',
                '26th', '27th', '28th', '29th', '30th', '31st', '32nd', '33rd', '34th', '35th', '36th', '37th',
                '38th', '39th', '40th', '41st', '42nd', '43rd', '44th', '45th', '46th', '47th', '48th', '49th',
                '50th', '51st', '52nd', '53rd', '54th', '55th', '56th', '57th', '58th', '59th', '60th', '61st',
                '62nd', '63rd', '64th', '65th', '66th', '67th', '68th', '69th', '70th', '71st', '72nd', '73rd',
                '74th', '75th', '76th', '77th', '78th', '79th', '80th', '81st', '82nd', '83rd', '84th', '85th',
                '86th', '87th', '88th', '89th', '90th', '91st', '92nd', '93rd', '94th', '95th', '96th', '97th',
                '98th', '99th', '100th', '101st', '102nd', '103rd', '104th', '105th', '106th', '107th', '108th',
                '109th', '110th', '111th', '112th', '113th', '114th', '115th', '116th', '117th', '118th', '119th',
                '120th', '121st', '122nd', '123rd', '124th', '125th', '126th', '127th', '128th', '129th', '130th',
                '131st', '132nd', '133rd', '134th', '135th', '136th', '137th', '138th', '139th', '140th', '141st',
                '142nd', '143rd', '144th', '145th', '146th', '147th', '148th', '149th', '150th', '151st', '152nd']

def exist_in_districts(district_num):
    """
    Check if district_num is in DISTRICT_NUMS.
    """
    return district_num in DISTRICT_NUMS


# finds a valid twitter url from list of strings
def find_twitter(list): 
    for item in list:
        if item.startswith('https://twitter.com/'):
            return item
    return None


# finds a valid facebook url from list of strings
def find_facebook(list): 
    for item in list:
        if 'facebook.com' in item:
            return item
    return None

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
    data = parse_csv('congress.csv')

    last_state = ''
    last_district = ''

    users = []
    user = None
    for (i, row) in enumerate(data):
        if row[1] in US_STATES:
            last_state = row[1]
            continue
        if row[1] in DISTRICT_NUMS:
            if user:
                users.append(user)
            user = {'fb': '', 'tw': ''}
            user['state'] = last_state
            user['district'] = row[1]
            user['name'] = row[2]
        
        tw = find_twitter(row)
        fb = find_facebook(row)
        if (tw):
            user['tw'] = cut_off_slash(cut_off_url(tw))
        if (fb):
            user['fb'] = cut_off_url(fb)
        
    if user:
        users.append(user)

    json.dump(users, open('output-congress.json', 'w'))

