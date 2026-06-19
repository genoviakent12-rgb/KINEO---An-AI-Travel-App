import { createContext, useState } from "react";

// CREATES THE CONTEXT OBJECT THAT OTHER COMPONENTS WILL IMPORT AND READ FROM
export const LikedTripsContext = createContext();

export default function LikedTripsProvider({ children }) {
   // STORES THE ARRAY OF PLACES THE USER HAS SWIPED RIGHT ON
  const [likedTrips, setLikedTrips] = useState([]);

  // ADDS A PLACE TO THE LIKED LIST WHEN THE USER SWIPES RIGHT IN DISCOVER
  // ALSO PREVENTS THE SAME PLACE FROM BEING ADDED TWICE
  const addLikedTrip = (place) => {
    setLikedTrips((prev) => {
      const exists = prev.some((p) => p.docId === place.docId);
      if (exists) return prev;
      return [...prev, place];
    });
  };
// REMOVES A PLACE FROM THE LIKED LIST IF THE USER CHANGES THEIR MIND
  const removeLikedTrip = (docId) => {
    setLikedTrips((prev) =>
      prev.filter((item) => item.docId !== docId)
    );
  };

  return (
    // WRAPS THE APP SO likedTrips, addLikedTrip, AND removeLikedTrip
    // ARE ACCESSIBLE FROM ANY SCREEN THAT CONSUMES THIS CONTEXT
    <LikedTripsContext.Provider
      value={{ likedTrips, addLikedTrip, removeLikedTrip }}
    >
      {children}
    </LikedTripsContext.Provider>
  );
}