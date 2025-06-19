import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Camera, Edit, Save, X } from 'lucide-react';

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const initialUserData = {
  name: "Marcus Johnson",
  email: "marcus.j@example.com",
  profilePic: "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?q=80&w=1974&auto=format&fit=crop",
};

const ProfilePage = () => {
  const [userData, setUserData] = useState(initialUserData);
  const [originalUserData, setOriginalUserData] = useState(initialUserData);
  const [isEditing, setIsEditing] = useState(false);
  const [passwordFields, setPasswordFields] = useState({
    currentPassword: '',
    newPassword: '',
  });

  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordFields(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newProfilePic = URL.createObjectURL(file);
      setUserData((prev) => ({ ...prev, profilePic: newProfilePic }));
    }
  };

  const handleEditClick = () => {
    setOriginalUserData(userData);
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setUserData(originalUserData);
    setIsEditing(false);
  };

  const handleProfileSave = (e) => {
    e.preventDefault();
    console.log("Profile updated:", userData);
    alert("Profile updated successfully!");
    setIsEditing(false);
  };
  
  const handlePasswordSave = (e) => {
    e.preventDefault();
    if (passwordFields.newPassword.length < 8) {
        alert("New password must be at least 8 characters long.");
        return;
    }
    console.log("Password change requested for:", userData.email);
    alert("Password changed successfully!");
    setPasswordFields({ currentPassword: '', newPassword: '' });
  };

  return (
    <motion.div
      className="min-h-screen p-4 bg-background text-slate-800"
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
    >
      <motion.header variants={itemVariants} className="max-w-4xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Account Settings</h1>
        <p className="mt-1 text-slate-500">Manage your profile information and password.</p>
      </motion.header>

      <div className="grid max-w-4xl grid-cols-1 gap-8 mx-auto lg:grid-cols-3">
        <motion.div variants={itemVariants} className="lg:col-span-1">
          <div className="p-6 text-center bg-white border border-slate-200 rounded-xl shadow-sm">
            <div className="relative inline-block group">
              <img
                src={userData.profilePic}
                alt="Profile"
                className="object-cover w-32 h-32 mx-auto rounded-full ring-4 ring-[#F43F5E]/30"
              />
              <label 
                htmlFor="profilePicInput"
                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Camera className="w-8 h-8 text-white" />
              </label>
            </div>
            
            <input
              type="file"
              id="profilePicInput"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            
            <h2 className="mt-4 text-xl font-bold text-slate-900">{userData.name}</h2>
            <p className="text-sm text-slate-500">{userData.email}</p>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-8 lg:col-span-2">
          
          <form onSubmit={handleProfileSave} className="p-6 bg-white border border-slate-200 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-900">Profile Information</h3>
              {isEditing ? (
                <div className="flex gap-2">
                  <button type="button" onClick={handleCancelClick} className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-slate-600 bg-slate-100 rounded-md hover:bg-slate-200 transition-colors">
                    <X className="w-4 h-4" /> Cancel
                  </button>
                  <button type="submit" className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-white bg-[#F43F5E] rounded-md hover:bg-[#E11D48] transition-colors">
                    <Save className="w-4 h-4" /> Save
                  </button>
                </div>
              ) : (
                <button type="button" onClick={handleEditClick} className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-[#B91C1C] bg-[#F43F5E]/10 rounded-md hover:bg-[#F43F5E]/20 transition-colors">
                  <Edit className="w-4 h-4" /> Edit
                </button>
              )}
            </div>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block mb-1 text-sm font-medium text-slate-700">Full Name</label>
                <div className="relative">
                   <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                   <input 
                      type="text" 
                      id="name"
                      name="name"
                      value={userData.name}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-md bg-slate-50 disabled:bg-slate-200 disabled:cursor-not-allowed focus:ring-2 focus:ring-[#F43F5E] focus:border-[#F43F5E]"
                   />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block mb-1 text-sm font-medium text-slate-700">Email Address</label>
                 <div className="relative">
                   <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                   <input 
                      type="email" 
                      id="email"
                      name="email"
                      value={userData.email}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-md bg-slate-50 disabled:bg-slate-200 disabled:cursor-not-allowed focus:ring-2 focus:ring-[#F43F5E] focus:border-[#F43F5E]"
                   />
                </div>
              </div>
            </div>
          </form>

          <form onSubmit={handlePasswordSave} className="p-6 bg-white border border-slate-200 rounded-xl shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Change Password</h3>
            <div className="space-y-4">
               <div>
                 <label htmlFor="currentPassword"  className="block mb-1 text-sm font-medium text-slate-700">Current Password</label>
                 <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input type="password" name="currentPassword" id="currentPassword" value={passwordFields.currentPassword} onChange={handlePasswordChange} className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-md bg-slate-50 focus:ring-2 focus:ring-[#F43F5E] focus:border-[#F43F5E]" placeholder="••••••••" />
                 </div>
               </div>
               <div>
                 <label htmlFor="newPassword"  className="block mb-1 text-sm font-medium text-slate-700">New Password</label>
                 <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input type="password" name="newPassword" id="newPassword" value={passwordFields.newPassword} onChange={handlePasswordChange} className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-md bg-slate-50 focus:ring-2 focus:ring-[#F43F5E] focus:border-[#F43F5E]" placeholder="••••••••" />
                 </div>
                 <p className="mt-1 text-xs text-slate-500">Must be at least 8 characters long.</p>
               </div>
               <div className="pt-2">
                 <button type="submit" className="w-full px-4 py-2 font-semibold text-white bg-[#F43F5E] rounded-md hover:bg-[#E11D48] disabled:bg-[#F43F5E]/50 disabled:cursor-not-allowed transition-colors">
                    Update Password
                 </button>
               </div>
            </div>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProfilePage;