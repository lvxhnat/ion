import re
from datetime import datetime


def clean_time(x):
    return datetime.strptime(
        re.findall("....-..-..T..:..:..", x)[0].replace("T", " "),
        "%Y-%m-%d %H:%M:%S",
    )
