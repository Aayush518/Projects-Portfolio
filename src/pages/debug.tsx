import React, { useEffect, useState } from 'react';

export default function ImageDebugPage() {
  const [imageResults, setImageResults] = useState<{path: string, exists: boolean}[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Paths to test
  const imagePaths = [
    '/images/mypic1.png',
    '/mypic1.png',
    '/images/profile.png',
    '/profile.png',
    '/favicon.svg' // Should always exist as a control
  ];
  
  useEffect(() => {
    async function checkImages() {
      const results = await Promise.all(
        imagePaths.map(async (path) => {
          const response = await fetch(path, { method: 'HEAD' })
            .catch(() => ({ ok: false }));
          return { path, exists: response.ok };
        })
      );
      setImageResults(results);
      setLoading(false);
    }
    
    checkImages();
  }, []);
  
  return (
    <div className="min-h-screen bg-dark-100 text-white p-8">
      <h1 className="text-2xl font-bold mb-8">Image Path Debugging</h1>
      
      {loading ? (
        <p>Checking image paths...</p>
      ) : (
        <div className="space-y-6">
          <div className="bg-dark-200 p-4 rounded">
            <h2 className="text-xl mb-4">Image Path Status</h2>
            <ul className="space-y-2">
              {imageResults.map(({path, exists}) => (
                <li key={path} className="flex items-center gap-2">
                  <span className={`w-4 h-4 rounded-full ${exists ? 'bg-green-500' : 'bg-red-500'}`}></span>
                  <span className="font-mono text-sm">{path}</span>
                  <span className={exists ? 'text-green-400' : 'text-red-400'}>
                    {exists ? 'Found' : 'Not Found'}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-dark-200 p-4 rounded">
            <h2 className="text-xl mb-4">Image Preview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {imageResults.filter(r => r.exists).map(({path}) => (
                <div key={path} className="bg-dark-300 p-2 rounded">
                  <p className="text-xs font-mono mb-2">{path}</p>
                  <img 
                    src={path} 
                    alt={path}
                    className="max-h-40 object-contain mx-auto"
                  />
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-dark-200 p-4 rounded">
            <h2 className="text-xl mb-4">Public Directory Structure</h2>
            <pre className="font-mono text-xs bg-dark-300 p-4 rounded overflow-auto max-h-60">
              {/* This would require server-side rendering */}
              Unable to display directory structure client-side. Please check if your image is located at:
              /public/images/mypic1.png
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
