import time
from datetime import datetime

def check_valid_date(
    datestr: str, 
    format: str,
) -> bool:
    """Check if the date is valid based on the date format
    """
    try:
        datetime.strptime(datestr, format)
        return True
    except: 
        return False
    
def date_to_unixtime(date, datetime_format) -> int:
    """Return UNIX Time Stamp give a date and datetime format
    Parameters
    =============
    date -> [str]               : date string
    datetime_format -> [str]    : date string date format
    """
    d = datetime.strptime(date, datetime_format)
    unixtime = time.mktime(d.timetuple())
    return int(unixtime)