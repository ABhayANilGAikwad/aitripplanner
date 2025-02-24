import { GoogleGenerativeAI } from "@google/generative-ai";

  const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  

export  const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "Generate a Travel Plan for the location \"Pune\" for 3 days for a couple with a cheap budget. Provide the response strictly in JSON format with no additional text. \n\nThe JSON structure should include:\n\n1. **Hotels**:\n   - `hotelName`: Name of the hotel\n   - `address`: Address of the hotel\n   - `price`: Price per night\n   - `imageUrl`: URL of the hotel image\n   - `geoCoordinates`: Latitude and Longitude of the hotel\n   - `rating`: Rating of the hotel\n   - `description`: Brief description of the hotel\n\n2. **Itinerary**:\n   - `day`: The day of the plan (e.g., Day 1, Day 2, Day 3)\n   - `places`: Array of places to visit with:\n     - `placeName`: Name of the place\n     - `placeDetails`: Details about the place\n     - `imageUrl`: URL of the place image\n     - `geoCoordinates`: Latitude and Longitude of the place\n     - `ticketPricing`: Approximate ticket price\n     - `rating`: Rating of the place\n     - `travelTime`: Estimated travel time to the location\n     - `bestTimeToVisit`: Best time of day to visit\n\nEnsure the response is a valid JSON object.\n"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"hotels\": [\n    {\n      \"hotelName\": \"Hotel Sagar Plaza\",\n      \"address\": \"123, Deccan Gymkhana, Pune\",\n      \"price\": 1500,\n      \"imageUrl\": \"https://example.com/sagarplaza.jpg\",\n      \"geoCoordinates\": {\n        \"latitude\": 18.5196,\n        \"longitude\": 73.8554\n      },\n       \"rating\": 4.0,\n      \"description\": \"Budget-friendly hotel with basic amenities, located in a central area.\"\n    },\n     {\n      \"hotelName\": \"FabHotel Silverkey Pune Station\",\n       \"address\": \"Near Pune Railway Station, Pune\",\n      \"price\": 1200,\n      \"imageUrl\": \"https://example.com/fabhotel.jpg\",\n       \"geoCoordinates\": {\n         \"latitude\": 18.5347,\n          \"longitude\": 73.8733\n      },\n      \"rating\": 3.8,\n      \"description\": \"Simple hotel, suitable for quick overnight stay near the railway station.\"\n    }\n\n  ],\n  \"itinerary\": [\n    {\n      \"day\": \"Day 1\",\n      \"places\": [\n        {\n          \"placeName\": \"Shaniwar Wada\",\n          \"placeDetails\": \"Historical fort of the Peshwa rulers.\",\n           \"imageUrl\": \"https://example.com/shanivarwada.jpg\",\n          \"geoCoordinates\": {\n             \"latitude\": 18.5193,\n            \"longitude\": 73.8577\n          },\n          \"ticketPricing\": 25,\n           \"rating\": 4.2,\n           \"travelTime\": \"15 min from Hotel Sagar Plaza\",\n           \"bestTimeToVisit\": \"Morning or late afternoon\"\n        },\n        {\n           \"placeName\": \"Aga Khan Palace\",\n           \"placeDetails\": \"Historic palace, linked to India's freedom struggle.\",\n           \"imageUrl\": \"https://example.com/agakhanpalace.jpg\",\n           \"geoCoordinates\": {\n             \"latitude\": 18.5483,\n            \"longitude\": 73.9006\n           },\n           \"ticketPricing\": 30,\n           \"rating\": 4.3,\n          \"travelTime\": \"30 min from Shaniwar Wada\",\n           \"bestTimeToVisit\": \"Anytime during the day\"\n        },\n         {\n           \"placeName\": \"Raja Dinkar Kelkar Museum\",\n          \"placeDetails\": \"Museum showcasing Indian artifacts and art.\",\n            \"imageUrl\": \"https://example.com/kelkarmuseum.jpg\",\n           \"geoCoordinates\": {\n             \"latitude\": 18.5151,\n             \"longitude\": 73.8540\n            },\n           \"ticketPricing\": 50,\n           \"rating\": 4.4,\n           \"travelTime\":\"15 min from Aga Khan Palace\",\n           \"bestTimeToVisit\": \"Morning or afternoon\"\n        }\n      ]\n    },\n    {\n      \"day\": \"Day 2\",\n      \"places\": [\n        {\n          \"placeName\": \"Lal Mahal\",\n          \"placeDetails\": \"Reconstructed palace known for its historical importance.\",\n          \"imageUrl\": \"https://example.com/lalmahal.jpg\",\n           \"geoCoordinates\": {\n            \"latitude\": 18.5193,\n             \"longitude\": 73.8577\n           },\n           \"ticketPricing\": 15,\n          \"rating\": 3.9,\n          \"travelTime\": \"20 min from the museum\",\n           \"bestTimeToVisit\": \"Morning\"\n         },\n          {\n          \"placeName\": \"Dagdusheth Halwai Ganpati Temple\",\n           \"placeDetails\": \"Famous Hindu temple dedicated to Lord Ganesha.\",\n           \"imageUrl\":\"https://example.com/dagdusheth.jpg\",\n          \"geoCoordinates\": {\n           \"latitude\": 18.5191,\n             \"longitude\": 73.8549\n           },\n            \"ticketPricing\": \"Free\",\n            \"rating\": 4.5,\n          \"travelTime\": \"5 min from Lal Mahal\",\n          \"bestTimeToVisit\": \"Morning or evening\"\n         },\n          {\n            \"placeName\":\"Okayama Friendship Garden\",\n            \"placeDetails\":\"Beautiful garden with Japanese-style landscapes.\",\n             \"imageUrl\": \"https://example.com/okayama.jpg\",\n              \"geoCoordinates\":{\n               \"latitude\": 18.5331,\n               \"longitude\": 73.8477\n             },\n            \"ticketPricing\":30,\n             \"rating\": 4.1,\n             \"travelTime\":\"30 min from Dagdusheth\",\n             \"bestTimeToVisit\":\"Afternoon or evening\"\n           }\n      ]\n    },\n    {\n      \"day\": \"Day 3\",\n      \"places\": [\n       {\n           \"placeName\": \"Pataleshwar Cave Temple\",\n          \"placeDetails\":\"Ancient rock-cut cave temple dedicated to Lord Shiva.\",\n          \"imageUrl\":\"https://example.com/pataleshwar.jpg\",\n            \"geoCoordinates\": {\n            \"latitude\":18.5160,\n             \"longitude\": 73.8459\n            },\n            \"ticketPricing\":\"Free\",\n            \"rating\":4.0,\n            \"travelTime\":\"20 min from Okayama\",\n             \"bestTimeToVisit\":\"Morning or evening\"\n         },\n        {\n          \"placeName\": \"Sinhagad Fort\",\n           \"placeDetails\": \"Historic fort located on a hill, offering great views.\",\n           \"imageUrl\": \"https://example.com/sinhagad.jpg\",\n          \"geoCoordinates\": {\n              \"latitude\": 18.3655,\n              \"longitude\": 73.7681\n          },\n          \"ticketPricing\": 50,\n          \"rating\": 4.6,\n           \"travelTime\": \"1 hour from Pataleshwar Cave Temple\",\n          \"bestTimeToVisit\": \"Morning or evening\"\n        }\n      ]\n    }\n  ]\n}\n```\n"},
          ],
        },
      ],
    });
  

