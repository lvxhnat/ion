import zipfile
import pandas as pd
import urllib.request

from ion_clients.clients.common.types.area_latlon import GeoNamesData


def geonames_info() -> pd.DataFrame:
    url = "http://download.geonames.org/export/dump/cities15000.zip"

    filehandle, _ = urllib.request.urlretrieve(url)

    zip_file_object = zipfile.ZipFile(filehandle, "r")
    first_file = zip_file_object.namelist()[0]
    file = zip_file_object.open(first_file)

    content = file.read().decode("utf-8")
    
    return pd.DataFrame(
        [*map(lambda x: x.split("\t"), content.split("\n"))],
        columns=GeoNamesData.__fields__.keys()
    )