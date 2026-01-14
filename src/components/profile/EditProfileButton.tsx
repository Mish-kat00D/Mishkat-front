"use client";
import React, { useState } from "react";
import { Edit } from "lucide-react";
import { UserProfile } from "./Header";
import EditProfileModal from "./EditProfileModal";

interface EditProfileButtonProps {
  user: UserProfile;
}

const EditProfileButton = ({ user }: EditProfileButtonProps) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsEditModalOpen(true)}
        className="justify-center self-center items-center gap-2 rounded-full bg-secondary-500 px-5 py-3 font-medium text-white transition hover:bg-secondary-700 flex"
      >
        <Edit className="h-4 w-4" />
        Edit Profile
      </button>

      <EditProfileModal
        user={user}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />
    </>
  );
};

export default EditProfileButton;
