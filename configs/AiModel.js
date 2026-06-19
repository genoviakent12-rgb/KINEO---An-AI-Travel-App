import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.EXPO_PUBLIC_GOOGLE_GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("Missing Gemini API key");
}

const genAI = new GoogleGenerativeAI(apiKey);

export const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

export const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json", // This forces JSON output without markdown
};

export const chatSession = model.startChat({ 
  generationConfig, 
  history: [
    {
      role: 'user',
      parts: [
        {
          text: `Generate Travel Plan for Location: Las Vegas, NV, USA, for 2 Days and 1 Night for Partner with a Economy with a Flight details, Flight Price with Booking url, Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and Places to Visit nearby with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, Time to travel each of the location for 2 days and 1 night with each day plan with best time to visit in JSON format`,
        },
      ],
    },
    {
      role: 'model',
      parts: [
        {
          text: JSON.stringify({
            "travelPlan": {
              "location": "Las Vegas, NV, USA",
              "duration": "2 Days, 1 Night",
              "travelers": "Partner/Couple",
              "budgetType": "Economy",
              "flightDetails": {        
                "route": "Los Angeles (LAX) to Las Vegas (LAS)",
                "airline": "Spirit Airlines / Frontier / Southwest",
                "estimatedPrice": "$44 - $56 (Round-trip)",
                "bookingUrl": "https://www.skyscanner.com/transport/flights/lax/las",
                "flightClass": "Economy"
              },
              "hotels": [
                {
                  "hotelName": "Luxor Hotel & Casino",
                  "address": "3900 S Las Vegas Blvd, Las Vegas, NV 89119",
                  "price": "$65 - $110 per night",
                  "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/e/e3/Luxor_Hotel.jpg",
                  "geoCoordinates": {
                    "latitude": 36.0956,
                    "longitude": -115.1758
                  },
                  "rating": 4.1,
                  "description": "An iconic Egyptian-themed pyramid hotel featuring the world's strongest light beam and a large atrium with various dining and entertainment options."
                }
              ],
              "itinerary": {
                "day1": {
                  "theme": "The Glitz of the Strip",
                  "bestTimeToVisit": "Late Afternoon to Late Night",
                  "plan": [
                    {
                      "time": "14:00",
                      "placeName": "Hotel Check-in & Freshen Up",
                      "placeDetails": "Arrive at your chosen Strip hotel and settle in.",
                      "ticketPricing": "Included in Hotel Cost",
                      "timeToTravel": "20 mins from Airport"
                    }
                  ]
                }
              }
            }
          })
        },
      ],
    },
  ],
});