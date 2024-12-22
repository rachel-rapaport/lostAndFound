import { useEffect, useState, useRef } from "react";
import { GoogleMap, LoadScript, DrawingManager, Marker } from "@react-google-maps/api";
import { Circle} from "../types/props/circle";



const MapModal:React.FC<{circles: Circle[];setCircles: (circles: Circle[]) => void;}> = ({ circles, setCircles }) => {
  const [googleLoaded, setGoogleLoaded] = useState(false);
  // const [circle, setCircle] = useState<google.maps.Circle | null>(null);
  // const [isInside, setIsInside] = useState<boolean>(false);
  const [userLocation, setUserLocation] = useState<google.maps.LatLng | null>(null);//no
  const [drawingMode, setDrawingMode] = useState<boolean>(false);
  const [drawingManager, setDrawingManager] = useState<google.maps.drawing.DrawingManager | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const [mapKey, setMapKey] = useState(0);

  //nooo
  // const checkIfPointInsideCircle = (circle: google.maps.Circle | null, point: google.maps.LatLng) => {
  //   if (circle) {
  //     const center = circle.getCenter();
  //     if (center) {
  //       const radius = circle.getRadius();
  //       const distance = google.maps.geometry.spherical.computeDistanceBetween(point, center);
  //       setIsInside(distance <= radius);
  //     } else {
  //       setIsInside(false);
  //     }
  //   }
  // };

  ///noooo
  const getUserLocation = () => {
    if (navigator.geolocation && googleLoaded) {
      navigator.geolocation.getCurrentPosition((position) => {
        if (window.google) {
          const userLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
          setUserLocation(userLatLng);
        }
      }, () => {
        console.error("לא ניתן לאתר את המיקום שלך");
      });
    }
  };

  // //no
  // useEffect(() => {
  //   if (googleLoaded && circle && userLocation) {
  //     checkIfPointInsideCircle(circle, userLocation);
  //   }
  // }, [googleLoaded, circle, userLocation]);

  //noo
  useEffect(() => {
    if (googleLoaded) {
      getUserLocation();
    }
  }, [googleLoaded]);


  const handleDrawCircle = (newCircle: google.maps.Circle) => {
    console.log("innnnnn");
    
    // newCircle.setEditable(false);

    const circleData = {
      center: {
        lat: newCircle.getCenter()?.lat() || 0,
        lng: newCircle.getCenter()?.lng() || 0,
      },
      radius: newCircle.getRadius(),
    };

    // setCircle(newCircle);//no
    setCircles([...circles, circleData]); // הוספת העיגול החדש למערך
    
  };
    console.log("cirle in",circles);

  const toggleDrawingMode = (event:React.FormEvent) => {
    event.preventDefault();
    if (drawingManager) {
      if (drawingMode) {
        drawingManager.setDrawingMode(null);
      } else {
        drawingManager.setDrawingMode(google.maps.drawing.OverlayType.CIRCLE);
      }
      setDrawingMode(!drawingMode);
    } else {
      if (mapRef.current) {
        const newDrawingManager = new google.maps.drawing.DrawingManager({
          drawingControl: false,
          circleOptions: {
            fillColor: "transparent",
            fillOpacity: 0,
            strokeColor: "#000",
            strokeWeight: 2,
          },
        });
        newDrawingManager.setMap(mapRef.current);
        setDrawingManager(newDrawingManager);
        newDrawingManager.setDrawingMode(google.maps.drawing.OverlayType.CIRCLE);
        setDrawingMode(true);
      }
    }
  };

  // const stopDrawingManager = () => {
  //   if (drawingManager) {
  //     drawingManager.setDrawingMode(null);
  //     drawingManager.setMap(null);
  //     setDrawingManager(null);
  //     setDrawingMode(false);
  //   }
  // };

  const handleResetCircles = () => {
    // circles.forEach((circle) => {
    //   if (circle.getMap()) {
    //     circle.setMap(null); // הסרת העיגול מהמפ
    //   }
    // });
    setCircles([]); // מאפס את מערך העיגולים
    setMapKey((prevKey) => prevKey + 1); // מאפס את מפתח המפה מחדש
    setDrawingMode(false); // מכבה את מצב הציור
    // setCircle(null); // מאפס את העיגול הנוכחי
    // setIsInside(false); // מאפס את הסטטוס של הנקודה
  };
  

  return (
    <div>
      {/* <h3>צייר עיגול על המפה</h3>
      <h4>{isInside ? "הנקודה בתוך עיגול!" : "הנקודה לא בתוך עיגול."}</h4> */}
    <div className="buttons-container flex justify-between items-center mb-4">
  <button onClick={toggleDrawingMode} className="btn">
    {drawingMode ? "הפסק ציור" : "התחל ציור"}
  </button>
  <h4 className="font-bold mb-2">סמן את האזורים האבודים</h4>
  <button onClick={handleResetCircles} className="btn">
    איפוס
  </button>
</div>

<div className="border border-primary ">

      <LoadScript
        googleMapsApiKey="AIzaSyBNVjEXhyDOUvcCECJFY5x_OGKt38dxVBk"
        libraries={["drawing", "geometry"]}
        onLoad={() => setGoogleLoaded(true)}
      >
        <GoogleMap
          key={mapKey}
          mapContainerStyle={{ height: "500px", width: "100%" }}
          center={userLocation || { lat: 31.0461, lng: 34.8516 }}
          zoom={7}
          options={{
            restriction: {
              latLngBounds: {
                north: 33.5,
                south: 29.0,
                west: 33.5,
                east: 36.0,
              },
              strictBounds: true,
            },
            mapTypeControl: false,
            streetViewControl: false,
          }}
          onLoad={(map) => {
            mapRef.current = map;
          }}
        >
          {googleLoaded && (
            <>
              <DrawingManager
                onCircleComplete={handleDrawCircle}
                drawingMode={drawingMode ? google.maps.drawing.OverlayType.CIRCLE : null}
                // onLoad={setDrawingManager}
                options={{
                  drawingControl: false,
                  circleOptions: {
                    fillColor: "#c9c8c7",
                    fillOpacity: 0.3,
                    strokeColor: "#000",
                    strokeWeight: 2,
                  },
                }}
              />
              {userLocation && (
                <Marker
                  position={userLocation}
                  title="מיקומך הנוכחי"
                />
              )}
              {/* {circles.map((circle, index) => (
                <Circle
                  key={index}
                  center={circle.getCenter()?.toJSON() || { lat: 0, lng: 0 }}
                  radius={circle.getRadius()}
                  options={{
                    fillColor: "transparent",
                    fillOpacity: 0,
                    strokeColor: "#000",
                    strokeOpacity: 1,
                    strokeWeight: 2,
                  }}
                />
              ))} */}
            </>
          )}
        </GoogleMap>
      </LoadScript>
      </div>
    </div>
  );
};

export default MapModal;
