import React, { useState } from 'react';
import MusicSelector from './MusicSelector';

const Form = ({ onSubmit, apiError }) => {
    const [formData, setFormData] = useState({
        campaignName: '',
        objective: 'Traffic',
        adText: '',
        cta: 'LEARN_MORE',
        musicOption: 'A',
        musicId: ''
    });
    const [clientErrors, setClientErrors] = useState({});

    // Field-level validation [cite: 80]
    const validate = () => {
        let errors = {};
        if (formData.campaignName.length < 3) errors.campaignName = "Min 3 characters required [cite: 42]";
        if (!formData.adText) errors.adText = "Ad text is required [cite: 46]";
        if (formData.musicOption === 'A' && !formData.musicId) errors.musicId = "Music ID is required [cite: 58]";
        
        setClientErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            onSubmit(formData);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-xl shadow-lg border border-gray-100">
            {/* Campaign Name [cite: 40] */}
            <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Campaign Name*</label>
                <input 
                    type="text"
                    className={`w-full p-3 border rounded-md ${clientErrors.campaignName ? 'border-red-500' : 'border-gray-300'}`}
                    value={formData.campaignName}
                    onChange={(e) => setFormData({...formData, campaignName: e.target.value})}
                />
                {clientErrors.campaignName && <p className="text-red-500 text-xs mt-1">{clientErrors.campaignName}</p>}
            </div>

            {/* Objective [cite: 43] */}
            <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Objective</label>
                <select 
                    className="w-full p-3 border border-gray-300 rounded-md"
                    value={formData.objective}
                    onChange={(e) => {
                        const val = e.target.value;
                        // Enforce Option C rule [cite: 68]
                        setFormData({
                            ...formData, 
                            objective: val,
                            musicOption: val === 'Conversions' && formData.musicOption === 'C' ? 'A' : formData.musicOption
                        });
                    }}
                >
                    <option value="Traffic">Traffic</option>
                    <option value="Conversions">Conversions</option>
                </select>
            </div>

            {/* Ad Text [cite: 45] */}
            <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Ad Text ({formData.adText.length}/100)*</label>
                <textarea 
                    maxLength="100"
                    className="w-full p-3 border border-gray-300 rounded-md"
                    value={formData.adText}
                    onChange={(e) => setFormData({...formData, adText: e.target.value})}
                />
            </div>

            <MusicSelector formData={formData} setFormData={setFormData} />

            <button type="submit" className="w-full bg-black text-white font-bold py-4 rounded-md hover:bg-gray-800 transition-all">
                Submit Ad Creation Flow
            </button>
        </form>
    );
};

export default Form;