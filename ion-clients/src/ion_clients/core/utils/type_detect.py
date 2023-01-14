import ast
import math
import string
import datetime
from dateutil import parser
from typing import List, Literal, Dict
from pydantic import BaseModel

ParseableTypes = Literal["DATETIME", "INT", "TEXT", "FLOAT", "BLANK", "BOOL"]


def dataType(s) -> ParseableTypes:

    if type(s) == datetime.datetime:
        return "DATETIME"
    if type(s) == int:
        return "INT"

    if not s or (type(s) is float and math.isnan(s)) or s == "":
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
                if t < 100_000_000:
                    return "INT"
                else:
                    return "BIGINT"
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
    type: Dict[ParseableTypes, int]  # { type: count }
    nullable: bool
    primary_key: bool
    type_guessed: ParseableTypes


def cast_col_name(col: str):
    """Remove punctuation, lowercase, multiple whitespace, and join on underscore"""
    return "_".join(
        col.translate(str.maketrans("", "", string.punctuation)).split()
    ).lower()


def detect_types(
    cols: List[str], body: List[List[str]]
) -> Dict[str, TypeDetectEntry]:

    dtypes = {}

    for col in cols:
        col: str = cast_col_name(col)
        dtypes[col] = {
            "name": col,
            "types": {},
            "nullable": False,
            "primary_key": False,
            "type_guessed": "",
        }
        if "_id" in col or "id_" in col or "id" in col:
            dtypes[col]["primary_key"] = True

    for row in body:

        for col, el in zip(dtypes.keys(), row):

            dtype = dataType(el)

            if dtype in dtypes[col]["types"]:
                dtypes[col]["types"][dtype] += 1
            else:
                dtypes[col]["types"][dtype] = 0

            if not el:
                dtypes[col]["nullable"] = True

    for col in dtypes.keys():

        tmp = None  # To store our blank values temporarily

        if "BLANK" in dtypes[col]["types"]:

            dtypes[col]["nullable"] = True

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
