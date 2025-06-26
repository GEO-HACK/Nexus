import React, { useEffect, useState } from "react";
import { getPapersByUser, deletePapers } from "../services/paperServices";
import { Link } from "react-router-dom";
import { FiEdit, FiTrash } from "react-icons/fi";
import EditModal from "../components/editModal"; // Import the EditModal component

const Profile = () => {
  const [user, setUser] = useState(null);
  const [bio, setBio] = useState("");
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [papers, setPapers] = useState([]);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Control modal visibility
  const [paperToEdit, setPaperToEdit] = useState(null); // Store the paper to edit

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPhotoPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPhotoPreview(null);
    }
  };

  const handleBioChange = (e) => setBio(e.target.value);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      fetchUserPapers(parsedUser.id);
    }
  }, []);

  const fetchUserPapers = async (userId) => {
    try {
      const userPapers = await getPapersByUser(userId);
      setPapers(userPapers.papers);
    } catch (err) {
      console.error("Error fetching user papers:", err);
      setError("Failed to fetch user papers");
    }
  };
  console.log("this are the user papers", papers);

  const handleEdit = (paperId) => {
    const selectedPaper = papers.find((paper) => paper._id === paperId);
    if (!selectedPaper) {
      console.error("Paper not found for editing:", paperId);
      return;
    }
    console.log("Selected paper for editing:", selectedPaper); // Debugging log
    setPaperToEdit(selectedPaper); // Set the selected paper to edit
    setIsModalOpen(true); // Open the modal
  };

  const handleDelete = async (paperId) => {
    try {
      await deletePapers(paperId);

      // Update the state for the deleted paper
      setPapers((prevPapers) =>
        prevPapers.filter((paper) => paper._id !== paperId)
      );

      console.log(`Deleted paper with ID: ${paperId}`);
    } catch (err) {
      console.error("Error deleting paper:", err);
      setError("Failed to delete paper");
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
    setPaperToEdit(null); // Clear the selected paper
  };

  const handleEditSubmit = async (formData) => {
    try {
      // Call the API to update the paper
      console.log("Updated paper data:", formData);
      // You can call the edit API here and update the state accordingly
      await fetchUserPapers(user.id); // Refresh the papers after editing
      setIsModalOpen(false); // Close the modal after submission
    } catch (err) {
      console.error("Error updating paper:", err);
      setError("Failed to update the paper");
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-gray-500">Loading Profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 px-6 py-8">
      <div className="max-w-5xl mx-auto">
          <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Bio</h2>
          <div className="flex flex-col items-center gap-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Photo
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="mb-2"
              />
              {photoPreview && (
                <img
                  src={photoPreview}
                  alt="Profile Preview"
                  className="w-32 h-32 object-cover rounded-full border"
                />
              )}
            </div>
            <div className="w-full">
              <label className="block text-gray-700 font-semibold mb-2">Bio</label>
              <textarea
                value={bio}
                onChange={handleBioChange}
                className="w-full border rounded-lg p-2"
                rows={4}
                placeholder="Tell us about yourself..."
              />
            </div>
          </div>
        </div>
        {/* Profile Card */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Profile</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-600">
                First Name
              </label>
              <p className="mt-1 text-gray-800 bg-gray-100 px-4 py-2 rounded-md">
                {user.fname}
              </p>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-600">
                Last Name
              </label>
              <p className="mt-1 text-gray-800 bg-gray-100 px-4 py-2 rounded-md">
                {user.lname}
              </p>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-600">
                Username
              </label>
              <p className="mt-1 text-gray-800 bg-gray-100 px-4 py-2 rounded-md">
                {user.username}
              </p>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-600">
                Email
              </label>
              <p className="mt-1 text-gray-800 bg-gray-100 px-4 py-2 rounded-md">
                {user.email}
              </p>
            </div>
          </div>
        </div>

        {/* Bio and Photo Section */}
      

        {/* Papers Section */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Papers</h2>
         
          { ( papers.length === 0 ) ? (
            <p className="text-gray-500">No papers found. Start adding your research
            </p>
          ) : (
            papers.map((paper) => (
              <div
                key={paper._id}
                className="flex items-center justify-between bg-gray-50 p-4 rounded-lg mb-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <div>
                  <h3 className="text-lg font-semibold text-blue-600 hover:underline">
                    <Link to={`/browser/${paper._id}`}>
                      {paper.paper_name}
                    </Link>
                  </h3>
                  <p className="text-sm text-gray-600">
                    Published:{" "}
                    {new Date(paper.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex space-x-4">
                  <button
                    onClick={() => handleEdit(paper._id)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <FiEdit size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(paper._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FiTrash size={20} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {isModalOpen && (
        <EditModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleEditSubmit}
          paperData={paperToEdit} // Pass the selected paper data to the modal
        />
      )}
    </div>
  );
};

export default Profile;