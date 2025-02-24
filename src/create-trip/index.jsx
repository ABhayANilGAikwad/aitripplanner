import React, { useEffect, useState } from 'react';
import { GeoapifyGeocoderAutocomplete, GeoapifyContext } from '@geoapify/react-geocoder-autocomplete';
import '@geoapify/geocoder-autocomplete/styles/minimal.css';
import { Input } from '@/components/ui/input';
import { AI_PROMPT, SelectBudgetOptions, SelectTravelesList } from '@/constants/options';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { chatSession } from '@/service/AIModal';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTrigger,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { doc, setDoc } from "firebase/firestore";
import { db } from '@/service/firebaseConfig';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';

const CreateTrip = () => {
    const [place, setPlace] = useState(null);
    const [formData, setFormData] = useState({});
    const [openDialog, setOpenDialog] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate=useNavigate();
    const type = 'city'; // Restrict to city searches
    const language = 'en'; // English language
    const position = null; // No specific position
    const countryCodes = null; // No restriction on countries
    const limit = 5; // Limit the number of suggestions

    const onPlaceSelect = (selectedPlace) => {
        console.log('Selected place:', selectedPlace);
        setPlace(selectedPlace);
        handleInputChange('location', selectedPlace.properties.formatted);
    };

    const onSuggestionChange = (suggestions) => {
        console.log('Suggestions updated:', suggestions);
    };

    const handleInputChange = (name, value) => {
        if (name === 'noOfDays' && value > 5) {
            toast.error('Please select trip days less than or equal to 5.');
            return;
        }
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    useEffect(() => {
        console.log(formData);
    }, [formData]);

    const onGenerateTrip = async () => {
        const user = localStorage.getItem("user");
        if (!user) {
            setOpenDialog(true);
            return;
        }

        if (!formData.location || !formData.budget || !formData.People || formData.noOfDays > 5) {
            toast.error("Please fill all details.");
            return;
        }
        setLoading(true);
        const Final_PROMPT = AI_PROMPT
            .replace('{location}', formData.location)
            .replace('{budget}', formData.budget)
            .replace('{People}', formData.People)
            .replace('{noOfDays}', formData.noOfDays);

        console.log(Final_PROMPT);

        try {
            const result = await chatSession.sendMessage(Final_PROMPT);

            SaveAiTrip(result?.response?.text());
            setLoading(false);
        } catch (error) {
            console.error("Error generating trip:", error);
            toast.error("Failed to generate trip.");
        }
    };

    const SaveAiTrip = async (TripData) => {
        TripData=TripData.replace("json","");
        TripData=TripData.replace("```","");
        TripData=TripData.replace("```","");
        console.log(TripData);
        setLoading(true);
        const user = JSON.parse(localStorage.getItem("user"));
        const docId = Date.now().toString();
        await setDoc(doc(db, "AiTrips", docId), {
            userSelection: formData,
            TripData: JSON.parse(TripData),
            userEmail: user?.email,
            id: docId

        });
        setLoading(false);

        navigate(`/view-trip/${docId}`)

    }
    const login = useGoogleLogin({
        onSuccess: (codeResp) => {
            console.log(codeResp);
            getUserProfile(codeResp);
        },
        onError: (err) => console.error("Google login error:", err),
    });

    const getUserProfile = (tokenInfo) => {
        axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo.access_token}`, {
            headers: {
                Authorization: `Bearer ${tokenInfo.access_token}`,
                Accept: 'application/json',
            },
        })
            .then((response) => {
                console.log(response);
                localStorage.setItem('user', JSON.stringify(response.data));
                setOpenDialog(false);
                onGenerateTrip();
            })
            .catch((error) => {
                console.error("Error fetching user profile:", error);
                toast.error("Failed to fetch user profile.");
            });
    };

    return (
        <div className='h-full sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10 mx-32'>
            <h1 className='font-bold text-3xl'>LET US KNOW YOUR STYLE – WE’LL PLAN YOUR PERFECT TRIP! 🏕️🌴</h1>
            <p className='mt-3 text-gray-500 text-xl'>
                Share your travel preferences—destinations, activities, and budget—and let our AI planner create a trip that’s perfectly tailored for you. From unforgettable experiences to seamless planning, we’ll handle every detail. Your dream journey is just a few clicks away!
            </p>

            <div className='mt-20 flex flex-col gap-10'>
                <div>
                    <h2 className='text-xl my-3 font-medium'>What is Destination of Choice?</h2>
                    <GeoapifyContext apiKey={import.meta.env.VITE_GEOCODER_PLACE_API_KEY}>
                        <GeoapifyGeocoderAutocomplete
                            placeholder="Enter address here"
                            type={type}
                            lang={language}
                            position={position}
                            countryCodes={countryCodes}
                            limit={limit}
                            placeSelect={onPlaceSelect}
                            suggestionsChange={onSuggestionChange}
                            className="autocomplete"
                        />
                    </GeoapifyContext>
                </div>

                <div>
                    <h2 className='text-xl my-3 font-medium'>How many days are you planning your trip?</h2>
                    <Input
                        placeholder='e.g., 3'
                        type='number'
                        onChange={(e) => handleInputChange("noOfDays", e.target.value)}
                    />
                </div>
            </div>

            <div>
                <h2 className='text-xl my-3 font-medium'>What is Your Budget?</h2>
                <div className='grid grid-cols-3 gap-5 mt-5'>
                    {SelectBudgetOptions.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => handleInputChange("budget", item.title)}
                            className={`p-4 border rounded-xl hover:shadow-xl flex flex-col items-center cursor-pointer ${formData?.budget === item.title ? 'shadow-lg border-black' : ''}`}
                        >
                            <h2 className='text-5xl mb-3'>{item.icon}</h2>
                            <h2 className='font-bold text-lg'>{item.title}</h2>
                            <h2 className='text-sm text-gray-500'>{item.desc}</h2>
                        </div>
                    ))}
                </div>
            </div>

            <div className='mb-10'>
                <h2 className='text-xl my-3 font-medium'>Who do you plan on travelling with on your next adventure?</h2>
                <div className='grid grid-cols-2 gap-12 mt-5'>
                    {SelectTravelesList.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => handleInputChange("People", item.people)}
                            className={`p-4 border rounded-xl hover:shadow-xl flex flex-col items-center cursor-pointer ${formData?.People === item.people ? 'shadow-lg border-black' : ''}`}
                        >
                            <h2 className='text-5xl mb-3'>{item.icon}</h2>
                            <h2 className='font-bold text-lg'>{item.title}</h2>
                            <h2 className='text-sm text-gray-500'>{item.desc}</h2>
                        </div>
                    ))}
                </div>
            </div>

            <div className="pb-10 flex justify-end">
                <Button disabled={loading} onClick={onGenerateTrip}>
                    {
                        loading ? (
                            <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin' />
                        ) : (
                            "Generate Trip"
                        )
                    }

                </Button>
            </div>

            <Dialog open={openDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogDescription>
                            <img src="/logo.svg" alt="Logo" />
                            <h2 className='font-bold text-lg mt-4'>Sign in with Google</h2>
                            <p>Sign in to the app with Google authentication security</p>
                            <Button onClick={login} className="w-full mt-5 flex gap-4 items-center">
                                Sign in with Google <FcGoogle className='w-6 h-6' />
                            </Button>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default CreateTrip;
