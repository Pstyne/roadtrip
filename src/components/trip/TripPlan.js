import L from 'leaflet';
import { useContext, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Row, Container } from "react-bootstrap";
import { RoadTripMap } from "../map/RoadTripMap";
import { PointOfInterestContext } from "../pointOfInterest/PointOfInterestProvider";
import { PointOfInterest } from "../pointOfInterest/PointOfInterest";
import { POIRoutesContext } from '../poiRoutes/POIRoutesProvider';


//! For some reason we have to manually delete the default icon
//! and pull it locally... manually...
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});




export const TripPlan = ({ homeCoords }) => {

  const { pointOfInterests, getPointOfInterests, setPointOfInterests } = useContext(PointOfInterestContext);

  const { getRoutes, setRoutes } = useContext(POIRoutesContext);

  const { tripId } = useParams();

  useEffect(() => {
    getPointOfInterests(tripId)
    .then((pois) => {
      if (pois.length !== 0) {
        setPointOfInterests(pois);
        const POICoords = [ [homeCoords[0], homeCoords[1]], ...pois.map(poi => [poi.latlon.lat, poi.latlon.lng]) ];
        getRoutes(POICoords)
        .then((res) => setRoutes(res));
      } else {
        setPointOfInterests([]);
        setRoutes([]);
      }
    });
  }, [tripId, pointOfInterests.length]);

  return (
    <div className="d-flex">
      <div className="point-of-interest-list">
        <Container className="mt-2" >
          <Link to="/" >&larr; Trips</Link>
        </Container>
        <Container>
          <Row xs={1} className="g-4 pt-3">
            {pointOfInterests.map((poi) => (
              <PointOfInterest key={poi.id} poi={poi} />
            ))}
          </Row>
        </Container>
      </div>
      <RoadTripMap homeCoords={homeCoords} pointOfInterests={pointOfInterests} tripId={tripId}/>
    </div>
  );
}