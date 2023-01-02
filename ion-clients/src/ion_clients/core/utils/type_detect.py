import math
import ast
import datetime
from dateutil import parser
from typing import List, Literal
from pydantic import BaseModel


def dataType(s) -> Literal["DATETIME", "INT", "TEXT", "FLOAT", "BLANK"]:

    if type(s) == datetime.datetime:
        return "DATETIME"
    if type(s) == int:
        return "INT"

    if not s or (type(s) is float and math.isnan(s)):
        return "BLANK"

    try:
        t = ast.literal_eval(str(s))
    except ValueError:
        return "TEXT"
    except SyntaxError:
        return "TEXT"

    else:
        if type(t) in [int, float, bool]:
            if type(t) is int:
                return "INT"
            if type(t) is float:
                return "FLOAT"
            if type(t) is bool:
                return "BOOL"
        else:
            try:
                parser.parse(t)
                return "DATETIME"
            except parser.ParserError:
                return "TEXT"
            except TypeError:
                return "TEXT"


class TypeDetectEntry(BaseModel):
    name: str
    type: dict  # { type: count }
    nullable: bool
    type_guessed: str


def detect_types(
    cols: List[str], body: List[List[str]]
) -> List[TypeDetectEntry]:

    dtypes = {}

    for col in cols:
        dtypes[col] = {
            "name": col,
            "types": {},
            "nullable": False,
            "type_guessed": "",
        }

    for row in body:

        for col, el in zip(cols, row):

            dtype = dataType(el)

            if dtype in dtypes[col]["types"]:
                dtypes[col]["types"][dtype] += 1
            else:
                dtypes[col]["types"][dtype] = 0

            if not el:
                dtypes[col]["nullable"] = True

    for col in cols:

        tmp = None  # To store our blank values temporarily

        if "BLANK" in dtypes[col]["types"]:
            if len(dtypes[col]["types"]) == 1:
                dtypes[col]["type_guessed"] = "BLANK"
                continue
            else:
                tmp = dtypes[col]["types"]["BLANK"]
                del dtypes[col]["types"]["BLANK"]

        dtypes[col]["type_guessed"] = max(
            dtypes[col]["types"], key=dtypes[col]["types"].get
        )

        if tmp:
            dtypes[col]["types"]["BLANK"] = tmp

    return dtypes
