import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaMagnifyingGlass } from "react-icons/fa6";


const searchPhrases = ["Top 10 bars in Bengaluru", "Hiking trips in Nepal", "Best clubs in Berlin", "Where to get local food", "Car rental in Rome"];

const TypingEffect = () => {
	const [displayedText, setDisplayedText] = useState("");
	const [isVisible, setIsVisible] = useState(true);

	useEffect(() => {
		const interval = setInterval(() => {
			setIsVisible((prev) => !prev);
		}, 250); // Change 500 to adjust blinking speed

		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		let currentPhraseIndex = 0;
		let currentCharIndex = 0;
		let isTyping = true;

		const typeText = () => {
			setTimeout(
				() => {
					if (isTyping) {
						const currentPhrase = searchPhrases[currentPhraseIndex];
						setDisplayedText(currentPhrase.substring(0, currentCharIndex + 1));
						currentCharIndex++;

						if (currentCharIndex === currentPhrase.length) {
							isTyping = false;
							setTimeout(typeText, 1000); // Wait before starting to backspace
						} else {
							typeText();
						}
					} else {
						setDisplayedText((prev) => prev.slice(0, -1));
						currentCharIndex--;

						if (currentCharIndex === 0) {
							isTyping = true;
							currentPhraseIndex = (currentPhraseIndex + 1) % searchPhrases.length;
							setTimeout(typeText, 500); // Wait before typing next phrase
						} else {
							typeText();
						}
					}
				},
				isTyping ? 100 : 75 // Adjust typing and backspacing speed
			);
		};
		typeText();

		// Cleanup function
		return () => {
			isTyping = false;
		};
	}, []);

	return (
		<div className="  flex h-[70px] w-[600px] items-center space-x-6 sm:ml-20 md:ml-[100px] lg:ml-[460px] rounded-full bg-white px-6 py-3">
			<FontAwesomeIcon className="text-2xl text-gray-500" />
			
			<p className="text-xl sm:text-3xl flex flex-auto">
				{displayedText}
				<span className="ml-1 text-gray-500">{isVisible ? "|" : ""}</span>
			</p>
			<FaMagnifyingGlass className="size-6"/>
		</div>
	);
};

export default TypingEffect;
