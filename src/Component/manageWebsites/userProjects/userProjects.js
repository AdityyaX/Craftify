import React, { useState, useEffect } from 'react';
import { useUser } from '../../auth/useUser';
import { useToken } from '../../auth/useToken';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function UserProjects(props) {
  const user = useUser();
  const [token] = useToken();
  const { id } = user;

  const [userProj, setUserProj] = useState({
    loadingProj: false,
    currentPage: 1,
    perPage: 10,
    loadFailed: false,
    userProject: [],
  });

  useEffect(() => {
    loadUserProject();
  }, []);

  const loadUserProject = async () => {
    setUserProj({ ...userProj, loadingProj: true });

    try {
      const response = await axios.post(
        '/api/my-projects/',
        {
          id,
          pageNum: userProj.currentPage,
          perPage: userProj.perPage,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setUserProj({
        ...userProj,
        loadingProj: false,
        loadFailed: false,
        userProject: response.data.result,
        currentPage: userProj.currentPage + 1,
      });
    } catch (err) {
      console.error(err);
      setUserProj({ ...userProj, loadingProj: false, loadFailed: true });
    }
  };

  return (
    <div className="p-4">
      <div className="space-y-4">
        {userProj.loadingProj && <div className="text-center text-gray-600">Loading...</div>}
        {userProj.loadFailed && (
          <div className="text-center text-red-600">Loading failed. Please try again.</div>
        )}
        {userProj.userProject.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {userProj.userProject.map((e, i) => (
              <div
                key={i}
                className="bg-white rounded-md shadow-md cursor-pointer transition-transform transform hover:scale-105"
              >
                <Link to={`/designer/${e._id}/${e.pages[0].pageId}/`}>
                  <div className="relative">
                    <img
                      src={e.prevImgUri || '/assets/images/elements/html/dummyImage.jpg'}
                      alt={e.websiteName}
                      className="w-full h-40 object-cover rounded-t-md"
                    />
                    <div
                      className={`absolute top-0 left-0 right-0 bottom-0 ${
                        e.published ? 'bg-green-500' : 'bg-red-500'
                      } bg-opacity-50 flex items-center justify-center text-white`}
                    >
                      {e.published ? 'Live' : 'Unpublished'}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold">{e.websiteName}</h3>
                    <p className="text-gray-500">{e.pages.length} page(s)</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <h4 className="text-lg font-bold">Let's get started with your first website</h4>
            <button
              onClick={props.createNewWeb}
              className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Create my first website!
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
