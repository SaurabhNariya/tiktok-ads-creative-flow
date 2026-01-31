import React from 'react';

const MusicSelector = ({ formData, setFormData, error }) => {
  return (
    <div className="space-y-4 border p-4 rounded-lg bg-white shadow-sm">
      <p className="font-semibold text-gray-700">3. Music Selection</p>
      
      <div className="space-y-2">
        {/* Option A: Existing Music ID */}
        <label className="flex items-center space-x-2 cursor-pointer">
          <input 
            type="radio" 
            name="music" 
            value="A" 
            checked={formData.musicOption === 'A'} 
            onChange={() => setFormData({...formData, musicOption: 'A'})} 
          />
          <span>Option A: Existing Music ID</span>
        </label>
        {formData.musicOption === 'A' && (
          <input 
            type="text"
            placeholder="Enter Music ID (e.g. 12345)"
            className="w-full border p-2 rounded mt-1 text-sm"
            value={formData.musicId}
            onChange={(e) => setFormData({...formData, musicId: e.target.value})}
          />
        )}

        {/* Option B: Upload Simulation */}
        <label className="flex items-center space-x-2 cursor-pointer">
          <input 
            type="radio" 
            name="music" 
            value="B" 
            checked={formData.musicOption === 'B'} 
            onChange={() => setFormData({...formData, musicOption: 'B'})} 
          />
          <span>Option B: Upload Custom Music (Simulated)</span>
        </label>

        {/* Option C: No Music (Conditional Logic) */}
        <label className={`flex items-center space-x-2 ${formData.objective === 'Conversions' ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}`}>
          <input 
            type="radio" 
            name="music" 
            value="C" 
            disabled={formData.objective === 'Conversions'} 
            checked={formData.musicOption === 'C'} 
            onChange={() => setFormData({...formData, musicOption: 'C', musicId: ''})} 
          />
          <span>Option C: No Music (Traffic Only)</span>
        </label>
        {formData.objective === 'Conversions' && (
          <p className="text-xs text-amber-600 font-medium italic">
            * No Music is not allowed for Conversions objective.
          </p>
        )}
      </div>
    </div>
  );
};

export default MusicSelector;