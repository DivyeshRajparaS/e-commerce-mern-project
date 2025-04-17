import React, { useState, useEffect } from "react";

const Popup = () => {
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (isPopupVisible) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }

        return () => document.body.classList.remove("overflow-hidden");
    }, [isPopupVisible]);

    const handleYesClick = () => {
        setCount(count + 1);
        resetPopup();
    };

    const handleNoClick = () => {
        resetPopup();
    };

    const handleButtonClick = () => {
        resetPopup(true);
    };

    const resetPopup = (show = false) => {
        setIsPopupVisible(false);
        setTimeout(() => {
            setIsPopupVisible(show);
        }, 50);
    };

    return (
        <>
            <button onClick={handleButtonClick} className="bg-blue-500 text-white px-6 py-2 rounded-md transition-all hover:bg-blue-600" >Click Me</button>
            {isPopupVisible && (
                <>
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
                    <div className="fixed inset-0 flex items-start justify-center pt-10 z-50">
                        <div className="bg-white p-6 rounded-md shadow-lg border transform transition-all animate-slide-fade">
                            <p className="text-lg font-semibold mb-4 text-center">
                                Are you sure?
                            </p>
                            <div className="flex justify-center space-x-4">
                                <button onClick={handleYesClick} className="bg-green-500 text-white px-4 py-2 rounded-md transition-all hover:bg-green-600" >
                                    Yes
                                </button>
                                <button onClick={handleNoClick} className="bg-red-500 text-white px-4 py-2 rounded-md transition-all hover:bg-red-600">
                                    No
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default Popup;
