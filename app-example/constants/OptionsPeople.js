export const SelectPeopleList = [
  { 
    id: 1,
    title: 'Alone',
    desc: 'One Person',
    icon: require('../../assets/images/SelectPeopleList/OnePerson.png')
  }, 

  { 
    id: 2,
    title: 'Partner',
    desc: '     2 people',
    icon: require('../../assets/images/SelectPeopleList/Couple.png')
  }, 

  {
    id: 3,
    title: 'Family',
    desc: '   3 or more',
    icon: require('../../assets/images/SelectPeopleList/Family.png')
  },

  {
    id: 4,
    title: 'Friends',
    desc: '    5 or more',
    icon: require('../../assets/images/SelectPeopleList/Friends.png')
  },
];
export const AI_PROMPT = 'Generate Travel Plan for Location: {location}, for {totalDays} Days and {totalNights} Night for {travellers} with a {budget} with a Flight details, Flight Price with Booking url, Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and Places to Visit nearby with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, Time to travel each of the location for {totalDays} days and {totalNights} night with each day plan with best time to visit in JSON format'