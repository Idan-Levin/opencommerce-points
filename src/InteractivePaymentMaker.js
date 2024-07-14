import React, { useState } from 'react';
import PaymentInterface from './PaymentInterface';
import { Image, Zap, Shield, Star } from 'lucide-react';

const placeholderIcons = [Image, Zap, Shield, Star];

const InteractivePaymentMaker = () => {
  const [customizations, setCustomizations] = useState({
    title: 'OpenCommerce',
    recipient: 'OpenCommerce',
    checks: [
      { label: 'Compliance Check', link: '' },
      { label: 'Eligibility Check', link: '' },
      { label: 'Promotion Application', link: '' },
      { label: 'Payment Distribution', link: '' }
    ],
    buttonText: 'Pay Now',
    pictureSquares: [
      { imageUrl: '', link: 'https://example.com/1' },
      { imageUrl: '', link: 'https://example.com/2' }
    ],
    darkMode: true,
    showPoints: true
  });

  const handleInputChange = (e, index = null) => {
    const { name, value } = e.target;
    if (index !== null) {
      const newChecks = [...customizations.checks];
      newChecks[index] = { ...newChecks[index], [name]: value };
      setCustomizations({ ...customizations, checks: newChecks });
    } else {
      setCustomizations({ ...customizations, [name]: value });
    }
  };

  const addCheck = () => {
    setCustomizations({
      ...customizations,
      checks: [...customizations.checks, { label: '', link: '' }]
    });
  };

  const removeCheck = (index) => {
    const newChecks = customizations.checks.filter((_, i) => i !== index);
    setCustomizations({ ...customizations, checks: newChecks });
  };

  const addPictureSquare = () => {
    setCustomizations({
      ...customizations,
      pictureSquares: [...customizations.pictureSquares, { imageUrl: '', link: '' }]
    });
  };

  const updatePictureSquare = (index, field, value) => {
    const newPictureSquares = [...customizations.pictureSquares];
    newPictureSquares[index] = { ...newPictureSquares[index], [field]: value };
    setCustomizations({ ...customizations, pictureSquares: newPictureSquares });
  };

  const removePictureSquare = (index) => {
    const newPictureSquares = customizations.pictureSquares.filter((_, i) => i !== index);
    setCustomizations({ ...customizations, pictureSquares: newPictureSquares });
  };

  const toggleDarkMode = () => {
    setCustomizations({ ...customizations, darkMode: !customizations.darkMode });
  };

  const togglePointsDisplay = () => {
    setCustomizations({ ...customizations, showPoints: !customizations.showPoints });
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 p-8 bg-gray-100 min-h-screen font-sans">
      <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Customize Your Payment Interface</h2>
        
        <div className="mb-6 space-y-4">
          <div className="flex items-center justify-between bg-gray-100 p-3 rounded">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={customizations.darkMode}
                onChange={toggleDarkMode}
                className="mr-2 h-5 w-5"
              />
              <label className="text-gray-700 font-medium">Dark Mode</label>
            </div>
          </div>
          <div className="flex items-center justify-between bg-gray-100 p-3 rounded">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={customizations.showPoints}
                onChange={togglePointsDisplay}
                className="mr-2 h-5 w-5"
              />
              <label className="text-gray-700 font-medium">Show Points</label>
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <div>
            <label className="block text-gray-700 font-bold mb-2" htmlFor="title">Title</label>
            <input
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="title"
              name="title"
              value={customizations.title}
              onChange={handleInputChange}
              placeholder="Enter title"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2" htmlFor="recipient">Recipient</label>
            <input
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="recipient"
              name="recipient"
              value={customizations.recipient}
              onChange={handleInputChange}
              placeholder="Enter recipient"
            />
          </div>
          <div>
            <h3 className="text-gray-700 font-bold mb-2">Checks</h3>
            {customizations.checks.map((check, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  className="flex-grow p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  name="label"
                  value={check.label}
                  onChange={(e) => handleInputChange(e, index)}
                  placeholder="Check Label"
                />
                <input
                  className="flex-grow p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  name="link"
                  value={check.link}
                  onChange={(e) => handleInputChange(e, index)}
                  placeholder="Check Link (optional)"
                />
                <button
                  className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 transition duration-300"
                  onClick={() => removeCheck(index)}
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 mt-2"
              onClick={addCheck}
            >
              Add Check
            </button>
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2" htmlFor="buttonText">Button Text</label>
            <input
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="buttonText"
              name="buttonText"
              value={customizations.buttonText}
              onChange={handleInputChange}
              placeholder="Enter button text"
            />
          </div>
          <div>
            <h3 className="text-gray-700 font-bold mb-2">Picture Squares</h3>
            {customizations.pictureSquares.map((square, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  className="flex-grow p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={square.imageUrl}
                  onChange={(e) => updatePictureSquare(index, 'imageUrl', e.target.value)}
                  placeholder="Image URL"
                />
                <input
                  className="flex-grow p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={square.link}
                  onChange={(e) => updatePictureSquare(index, 'link', e.target.value)}
                  placeholder="Link URL"
                />
                <button
                  className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 transition duration-300"
                  onClick={() => removePictureSquare(index)}
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 mt-2"
              onClick={addPictureSquare}
            >
              Add Picture Square
            </button>
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/2">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Preview</h2>
        <div className="bg-gray-300 p-4 rounded-lg shadow-inner">
          <PaymentInterface customizations={customizations} />
        </div>
      </div>
    </div>
  );
};

export default InteractivePaymentMaker;