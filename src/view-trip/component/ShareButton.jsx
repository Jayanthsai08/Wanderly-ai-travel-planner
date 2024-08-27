import React from 'react';
import { FaShareFromSquare } from "react-icons/fa6";


function ShareButton({ trip }) {
    const handleEmailShare = () => {
        const subject = encodeURIComponent('Check out this trip!');
        const body = encodeURIComponent(`Hi there,\n\nI wanted to share this trip with you:\n\nTrip Details:\nTitle: ${trip.title}\nDescription: ${trip.description}\n\nYou can view more details here: ${window.location.href}`);
        window.location.href = `mailto:?subject=${subject}&body=${body}`;
    };

    const handleWebShare = () => {
        if (navigator.share) {
            navigator.share({
                title: 'Check out this trip!',
                text: `Trip Details:\nTitle: ${trip.title}\nDescription: ${trip.description}`,
                url: window.location.href
            })
            .then(() => console.log('Successful share'))
            .catch(err => console.error('Error sharing:', err));
        } else {
            alert('Web Share API not supported in this browser.');
        }
    };

    return (
        <div className="flex flex-col space-x-4 mr-2">
            <button onClick={handleWebShare} className="bg-black text-white p-2 rounded-lg hover:scale-110 transition-all shadow-xl flex flex-row ">
            <FaShareFromSquare className='size-7 '/>
            
            </button>
        </div>
    );
}

export default ShareButton;
