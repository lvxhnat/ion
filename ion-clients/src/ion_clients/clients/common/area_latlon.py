import zipfile
import urllib.request
from typing import List

from ion_clients.clients.common.types.area_latlon import GeoNamesData

def geonames_info() -> List[GeoNamesData]:    
    url = "http://download.geonames.org/export/dump/cities15000.zip"

    filehandle, _ = urllib.request.urlretrieve(url)

    zip_file_object = zipfile.ZipFile(filehandle, 'r')
    first_file = zip_file_object.namelist()[0]
    file = zip_file_object.open(first_file)

    content = file.read().decode("utf-8") 
        
    return [*map(lambda x: x.split("\t"), content.split("\n"))]