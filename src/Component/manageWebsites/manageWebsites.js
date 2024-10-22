import React, { useContext, useState, useEffect } from 'react';
import { userDetailsContext } from '../../Context/contexts';
import CreateNewWebsite from './createNewWebsite/createNewWebsite';
import UserProjects from './userProjects/userProjects';
import Navbar from '../Navbar/navbar';

export default function ManageWebsites() {
  const [mPr, setMPr] = useState({
    showNewWebsite: false,
  });

  const userDets = useContext(userDetailsContext);

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <main className="bg-white shadow-md rounded-lg p-6">
          {mPr.showNewWebsite && (
            <CreateNewWebsite closeModal={() => setMPr({ ...mPr, showNewWebsite: false })} />
          )}

          <div className="mt-4">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  Welcome back, {userDets.user.user}!
                </h1>
                <p className="text-gray-600">Select one of your sites to edit.</p>
              </div>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                onClick={() => setMPr({ ...mPr, showNewWebsite: true })}
              >
                Create new website
              </button>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-700 mb-2">My Sites</h2>
              <UserProjects createNewWeb={() => setMPr({ ...mPr, showNewWebsite: true })} />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
