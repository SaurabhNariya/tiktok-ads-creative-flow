import React from 'react';
import { useAuth } from './hooks/useAuth';
import { useAds } from './hooks/useAds';
import Form from './components/Form';
import { ErrorBanner } from './components/ErrorBanner';
import Footer from './components/Footer';

function App() {
  // Authentication hook handles TikTok OAuth simulation [cite: 17, 21]
  const { token, authError, login, logout, setAuthError } = useAuth();
  
  // Ads hook handles API submission logic and global errors [cite: 70, 72]
  const { submitAd, loading, error: apiError, success, setError: setApiError } = useAds();

  // Triggered when user clicks "Connect TikTok Ads Account" [cite: 23, 24]
  const handleConnect = () => {
    // Simulating the code exchange for Mock Mode [cite: 25, 27]
    const mockCode = "premium_access_code_12345";
    login(mockCode);
  };

  const handleFormSubmit = async (formData) => {
    try {
      await submitAd(formData, token); // Calls the backend to create the ad [cite: 72]
    } catch (err) {
      console.error("Submission failed", err);
    }
  };

  const clearError = () => {
    setAuthError(null);
    setApiError(null);
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 font-sans">
      <div className="w-full max-w-3xl">
        
        {/* Requirement: System-level global error banner [cite: 81] */}
        {(authError || apiError) && (
          <ErrorBanner message={authError || apiError} clearError={clearError} />
        )}

        {/* Success Feedback after successful submission */}
        {success && (
          <div className="bg-green-100 border-l-4 border-green-500 p-4 mb-6 text-green-700 font-bold text-center rounded shadow-sm">
            🎉 Ad Created Successfully!
          </div>
        )}

        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            TikTok <span className="text-pink-600 font-black">Ads</span> Creative Flow
          </h1>
          <p className="mt-2 text-gray-600 font-medium italic">Simulating premium TikTok Ads API integration [cite: 4, 116]</p>
        </div>

        {!token ? (
          /* Step 1: Connect TikTok Ads Account [cite: 14, 23] */
          <div className="bg-white p-10 rounded-2xl shadow-2xl border border-gray-100 text-center flex flex-col items-center">
            <div className="w-24 h-24 bg-black rounded-full flex items-center justify-center mb-6 shadow-lg animate-bounce">
              <span className="text-4xl">🎵</span>
            </div>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">Connect your Account</h2>
            <p className="text-gray-500 mb-8 max-w-sm">Connect your TikTok Ads account using OAuth 2.0 flow [cite: 21]</p>
            
            <button 
              onClick={handleConnect}
              className="w-full sm:w-auto px-10 py-4 bg-black text-white font-bold rounded-full hover:bg-gray-800 transition-all active:scale-95 shadow-xl cursor-pointer"
            >
              Connect TikTok Ads Account
            </button>
          </div>
        ) : (
          /* Step 2: Ad Creation Form [cite: 15, 37] */
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
             <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm border border-gray-100 mb-6">
                <span className="text-green-600 font-bold text-sm flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span> Account Connected
                </span>
                <button 
                  onClick={logout} 
                  className="text-red-500 font-bold text-sm hover:underline cursor-pointer"
                >
                  Disconnect Account
                </button>
             </div>
             
             {loading ? (
                <div className="text-center py-20">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto"></div>
                  <p className="mt-4 text-gray-600 font-medium">Processing Request... [cite: 16]</p>
                </div>
             ) : (
                <Form onSubmit={handleFormSubmit} />
             )}
          </div>
        )}

        <Footer />
      </div>
    </div>
  );
}

export default App;