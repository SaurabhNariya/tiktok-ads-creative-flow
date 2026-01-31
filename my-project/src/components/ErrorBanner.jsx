export const ErrorBanner = ({ message, clearError }) => (
  <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 flex justify-between items-center shadow-sm animate-pulse">
    <div className="flex">
      <div className="flex-shrink-0">⚠️</div>
      <div className="ml-3 text-red-800 font-medium">{message}</div>
    </div>
    <button onClick={clearError} className="text-red-500 hover:text-red-700 font-bold">✕</button>
  </div>
);