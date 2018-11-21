function createKmlDocument(features) {
    const NAMESPACE = "http://www.opengis.net/kml/2.2";
    const NAMESPACE1 = "http://www.w3.org/2001/XMLSchema-instance";
    const NAMESPACE2 = "http://www.opengis.net/kml/2.2 http://schemas.opengis.net/kml/2.2.0/ogckml22.xsd";

    var documentImplementation = document.implementation;

    var kmlDoc = documentImplementation.createDocument(null, null);

    var kmlProcInstruction = kmlDoc.createProcessingInstruction('xml', 'version="1.0" encoding="UTF-8"');
    kmlDoc.appendChild(kmlProcInstruction);

    var comment = kmlDoc.createComment(`Генериран на ${new Date()} (Eastern European Standard Time)`);
    kmlDoc.appendChild(comment);

    var kmlElement = kmlDoc.createElementNS(NAMESPACE, 'kml');
    kmlDoc.appendChild(kmlElement);
    kmlElement.setAttributeNS(NAMESPACE1, "xsi:schemaLocation",NAMESPACE2);

    var placeMarkCont = kmlElement;
    if (features.length != 1){
        var newFolder = kmlDoc.createElementNS(NAMESPACE, 'Folder');
        kmlElement.appendChild(newFolder);
        placeMarkCont = newFolder;
    }

    for (var i = 0; i < features.length; i++) {
        var feature = features[i];

        var newPlacemark = kmlDoc.createElementNS(NAMESPACE, 'Placemark');
        placeMarkCont.appendChild(newPlacemark);
        newPlacemark.setAttribute('id', "placemark" + i);

        var newName = kmlDoc.createElementNS(NAMESPACE,'name');
        newPlacemark.appendChild(newName);

        var nameAsText = kmlDoc.createTextNode(feature.name);
        newName.appendChild(nameAsText);

        var newPoint = kmlDoc.createElementNS(NAMESPACE, 'Point');
        newPlacemark.appendChild(newPoint);

        var newCoordinates = kmlDoc.createElementNS(NAMESPACE, 'coordinates');
        newPoint.appendChild(newCoordinates);

        var coordsAsText = kmlDoc.createTextNode(feature.gsmCoordinates);
        newCoordinates.appendChild(coordsAsText);

        console.log('Име:', feature.name);
        console.log('Координати:', feature.gsmCoordinates);
    }

    return kmlDoc;
}
