import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import stack from '../contentstack.js';

const HeroSection = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const contentTypeUid = 'herosection';
        const result = await stack.ContentType(contentTypeUid).Query().toJSON().find();

        if (result && result.length > 0) {
          setData(result[0][0]);
          console.log(data,"hehe");
          
        } else {
          setError('No content found');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="mt-56 flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-56 flex items-center justify-center">
        <div className="text-xl text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="mt-56 flex flex-col items-center justify-center space-y-4 gap-8">
      {data?.herosection?.[0]?.headingtext?.single_line && (
        <div className="text-black text-5xl font-inter">
          {data.herosection[0].headingtext.single_line}
        </div>
      )}

      <div className="max-w-2xl">
        <p className="text-center">{data?.herosection?.[1]?.subheading_text?.single_line}</p>
      </div>

      <div>
        <button
          className="bg-blue-600 text-white font-bold rounded-lg p-4 hover:bg-blue-700 transition-colors"
          onClick={() => navigate('/login')}
        >
          {data?.herosection?.[2]?.button_text?.single_line}
        </button>
      </div>

      <div className="w-full">
        <video
          src="https://www.adobe.com/creativecloud/media_1167374e3354ef57f126fa78a55cbc1708ac4babd.mp4"
          autoPlay
          muted
          loop
          className="w-full"
        />
        <div className="flex justify-center mt-4">
          <p className="max-w-2xl text-center">{data?.multi_line}</p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
