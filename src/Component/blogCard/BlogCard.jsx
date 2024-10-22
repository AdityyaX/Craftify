import React, { useState, useEffect } from 'react';
import stack from '../contentstack.js';

function ProductCard() {
  const [data, setData] = useState(null);
  const [blogData, setBlogData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const contentTypeUid = 'blogcard';
        const result = await stack.ContentType(contentTypeUid).Query().toJSON().find();

        if (result && result[0] && result[0].length > 0) {
          setData(result[0][0]);
          // Only set blogData if modular_blocks exists
          if (result[0][0].modular_blocks) {
            setBlogData(result[0][0].modular_blocks);
          }
        } else {
          setError('No content found');
        }
      } catch (err) {
        setError(err.message);
        console.error('Error fetching data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once on mount

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 py-8">
        <p>Error loading blog data: {error}</p>
      </div>
    );
  }

  if (!blogData || blogData.length === 0) {
    return (
      <div className="text-center py-8">
        <p>No blog posts available.</p>
      </div>
    );
  }

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-8 md:py-16 mx-auto">
        <div className="lg:w-1/2 w-full mb-6 lg:mb-10">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
            Our Latest Blogs
          </h1>
          <div className="h-1 w-20 bg-pink-600 rounded"></div>
        </div>

        <div className="flex flex-wrap -m-4">
          {blogData.map((item, index) => {
            const bgColor = index % 2 === 0 ? '#001777' : '#3b9fff';

            return (
              <div key={index} className="p-4 md:w-1/3 drop-shadow-lg">
                <div
                  className="h-full px-4 border-2 transition-shadow duration-300 ease-in-out border-gray-200 border-opacity-60 rounded-2xl overflow-hidden"
                  style={{ backgroundColor: bgColor }}
                >
                  <div className={`p-4 ${index % 2 === 0 ? 'text-white' : 'text-black'}`}>
                    <h2 className="title-font text-[28px] font-poppins">
                      {item.card?.single_line || 'Untitled'}
                    </h2>
                  </div>

                  <div className="flex justify-center cursor-pointer">
                    {item.card?.file?.url && (
                      <img
                        className="rounded-2xl w-full p-2 hover:scale-110 transition-transform duration-300 ease-in-out"
                        src={item.card.file.url}
                        style={{
                          height: '190px',
                          width: '360px',
                        }}
                        alt={item.card.file.filename || 'Blog image'}
                      />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ProductCard;
