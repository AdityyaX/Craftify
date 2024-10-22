import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useUser } from '../../auth/useUser';
import { useToken } from '../../auth/useToken';
import { useNavigate } from 'react-router-dom';
import { userDetailsContext } from '../../../Context/contexts';

export default function CreateNewWebsite(props) {
  const navigate = useNavigate();
  const user = useUser();
  const [token] = useToken();
  const UserDetailsState = useContext(userDetailsContext);
  const { id } = user;

  const [newWebSetting, setNewWebSetting] = useState({
    webName: 'My Website',
  });

  const createNewWebsite = async () => {
    if (!newWebSetting.webName.trim()) {
      alert('Website name cannot be blank');
      return;
    }

    let __webName = newWebSetting.webName.toLowerCase().replace(/[^a-zA-Z0-9]+/g, ' ');

    try {
      const response = await axios.put(
        `/api/create-website/${id}`,
        {
          websiteName: __webName,
          pages: [],
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      UserDetailsState.setEditorState({
        ...UserDetailsState.editorState,
        websiteId: response.data.webId,
        pageId: response.data.pageId,
      });

      props.closeModal();
      navigate(`/designer/${response.data.webId}/${response.data.pageId}/`);
    } catch (err) {
      alert('Unable to create a website');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-md shadow-lg w-96">
        <div className="flex justify-between items-center bg-blue-100 p-4 rounded-t-md">
          <span className="text-sm font-semibold">Create New Website</span>
          <button onClick={props.closeModal} className="text-red-500">
            <i className="las la-times"></i>
          </button>
        </div>
        <div className="p-4">
          <h5 className="mb-2 text-sm font-medium">Website Name:</h5>
          <input
            type="text"
            onChange={(e) => setNewWebSetting({ ...newWebSetting, webName: e.target.value })}
            value={newWebSetting.webName}
            className="w-full p-2 border border-gray-300 rounded-md mb-4"
          />
          <button
            onClick={createNewWebsite}
            className="w-full py-2 bg-blue-600 text-white rounded-md transition duration-200 hover:bg-blue-700"
          >
            Create new website
          </button>
        </div>
      </div>
    </div>
  );
}
