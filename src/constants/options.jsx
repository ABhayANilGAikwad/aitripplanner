export const SelectTravelesList=[
    {
        id:1,
        title:"Just Me",
        desc:"A sole travel in exploration",
        icon:"✈️",
        people:'1'

    },
    {
        id:2,
        title:"A Couple",
        desc:"Two Traveles in tandem",
        icon:"🥂",
        people:'2 People'

    },
    {
        id:3,
        title:"Family",
        desc:"A group of fun loving adventurers",
        icon:"🏡",
        people:'3 to 5 People'

    },
    {
        id:4,
        title:"Friends",
        desc:"A bunch of Thrill-seekes",
        icon:"🫂",
        people:'5 to 10 People'

    },
]

export const SelectBudgetOptions=[
    {
        id:1,
        title:"Cheap",
        desc:"Stay  concious of costs",
        icon:"💴",
    },
    {
        id:2,
        title:"Moderate",
        desc:"Keep Cost on average side",
        icon:"💰",
    },
    {
        id:3,
        title:"Luxury",
        desc:"Dont worrry about the cost",
        icon:"💸",
    },
    
]


export const AI_PROMPT = `
Generate a detailed Travel Plan for the location: {location} for {noOfDays} days for a {People} with a {budget} Budget. Provide the response strictly in JSON format with no additional text.

The JSON structure should include:

1. **Hotels**:
   - \`hotelName\`: Name of the hotel
   - \`address\`: Address of the hotel
   - \`price\`: Price per night in US Dollar
   - \`imageUrl\`: URL of the hotel image
   - \`geoCoordinates\`: Latitude and Longitude of the hotel
   - \`rating\`: Rating of the hotel
   - \`description\`: Brief description of the hotel

2. **Itinerary**:
   - An array of days for the entire trip:
     - \`day\`: The day of the plan (e.g., Day 1, Day 2, Day 3)
     - \`activities\`: Array of time-slotted activities for that day:
       - \`timeSlot\`: Time slot for the activity (e.g., "9:00 AM - 11:00 AM")
       - \`placeName\`: Name of the place
       - \`placeDetails\`: Details about the place
       - \`imageUrl\`: URL of the place image
       - \`geoCoordinates\`: Latitude and Longitude of the place
       - \`ticketPricing\`: Approximate ticket price
       - \`rating\`: Rating of the place
       - \`travelTime\`: Estimated travel time to the location
       - \`bestTimeToVisit\`: Best time of day to visit

Ensure the following:
-Give minimum 4 hotels
- The response includes activities for **every day** up to \`noOfDays\`.
- Each day is divided into **time slots** for morning, afternoon, and evening activities.
- Include unique places for each day to ensure variety.
- Distribute the activities evenly and realistically based on the time of day and travel time between locations.
- Use a valid JSON format with no additional text.
`;
