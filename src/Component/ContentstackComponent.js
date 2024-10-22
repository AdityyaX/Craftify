import React, { useState, useEffect } from 'react';
import stack from './contentstack';

const ContentstackComponent = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    const contentTypeUid = 'herosection';
    const entryUid = 'blt9070b4b1984e4ccf';

    stack
      .ContentType(contentTypeUid)
      .Entry(entryUid)
      .fetch()
      .then((entry) => {
        setData(entry);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
    {JSON.stringify(data)}
    </div>
  );
};

export default ContentstackComponent;
