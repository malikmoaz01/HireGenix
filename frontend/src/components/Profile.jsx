import React, { useState, useEffect } from 'react';
import { User, Phone, BookOpen, Briefcase, Upload, X, Edit3, Save, FileText, Download } from 'lucide-react';
import { Navigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState({});
  const [profile, setProfile] = useState({
    phone: '',
    skills: [],
    experience: '',
    education: '',
    resume: '',
    resumeFile: null
  });
  const [newSkill, setNewSkill] = useState('');
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [tempProfile, setTempProfile] = useState(profile);
  const [saving, setSaving] = useState(false);
  const [unauthorized, setUnauthorized] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      // Get token from memory/state instead of localStorage
      const token = window.sessionToken || localStorage?.getItem('token');
      
      if (!token) {
        setUnauthorized(true);
        setLoading(false);
        return;
      }

      const response = await fetch('http://localhost:5000/api/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        setUnauthorized(true);
        setLoading(false);
        return;
      }

      const data = await response.json();
      
      // Check if user is jobseeker, if not redirect to appropriate profile
      if (data.user?.role !== 'jobseeker') {
        setUnauthorized(true);
        setLoading(false);
        return;
      }

      setUser(data.user || {});
      const profileData = {
        phone: data.profile?.phone || '',
        skills: data.profile?.skills || [],
        experience: data.profile?.experience || '',
        education: data.profile?.education || '',
        resume: data.profile?.resume || '',
        resumeFile: null
      };
      setProfile(profileData);
      setTempProfile(profileData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching profile:', error);
      setUnauthorized(true);
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setTempProfile({...profile});
    setIsEditing(true);
  };

  const handleCancel = () => {
    setTempProfile(profile);
    setIsEditing(false);
    setNewSkill('');
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const token = window.sessionToken || localStorage?.getItem('token');
      
      // Handle file upload if there's a new resume
      let profileToSave = {...tempProfile};
      if (tempProfile.resumeFile) {
        const formData = new FormData();
        formData.append('resume', tempProfile.resumeFile);
        
        const uploadResponse = await fetch('http://localhost:5000/api/upload-resume', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: formData
        });
        
        if (uploadResponse.ok) {
          const uploadData = await uploadResponse.json();
          profileToSave.resume = uploadData.filename;
        }
      }
      
      // Remove resumeFile from the data to save
      const { resumeFile, ...profileData } = profileToSave;
      console.log('Sending profile data:', profileData);
      const response = await fetch('http://localhost:5000/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(profileData)
      });
      
      if (response.ok) {
        setProfile(profileToSave);
        setIsEditing(false);
        alert('Profile updated successfully!');
      } else {
        alert('Error updating profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error updating profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const addSkill = () => {
    if (newSkill.trim() && !tempProfile.skills.includes(newSkill.trim())) {
      setTempProfile({
        ...tempProfile,
        skills: [...tempProfile.skills, newSkill.trim()]
      });
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setTempProfile({
      ...tempProfile,
      skills: tempProfile.skills.filter(skill => skill !== skillToRemove)
    });
  };

  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setTempProfile({
        ...tempProfile,
        resume: file.name,
        resumeFile: file
      });
    } else {
      alert('Please select a PDF file');
    }
  };

  // Download uploaded CV function
  const downloadCV = async () => {
    if (!profile.resume) {
      alert('No resume available to download');
      return;
    }

    try {
      const token = window.sessionToken || localStorage?.getItem('token');
      const response = await fetch(`http://localhost:5000/api/download-resume/${profile.resume}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = profile.resume;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        alert('Error downloading resume');
      }
    } catch (error) {
      console.error('Error downloading resume:', error);
      alert('Error downloading resume');
    }
  };

  // Download profile as PDF function
  const downloadProfilePDF = () => {
    // Create HTML content for PDF
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Profile - ${user.name || 'User'}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 40px; color: #333; }
          .header { border-bottom: 3px solid #2563eb; padding-bottom: 20px; margin-bottom: 30px; }
          .header h1 { color: #2563eb; margin: 0; font-size: 28px; }
          .header p { color: #666; margin: 5px 0 0 0; }
          .section { margin-bottom: 25px; }
          .section-title { color: #2563eb; font-size: 18px; font-weight: bold; margin-bottom: 10px; border-bottom: 1px solid #e5e7eb; padding-bottom: 5px; }
          .info-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-bottom: 20px; }
          .info-item { background: #f8fafc; padding: 12px; border-radius: 8px; border: 1px solid #e5e7eb; }
          .info-label { font-size: 12px; color: #666; text-transform: uppercase; font-weight: bold; }
          .info-value { font-weight: 500; margin-top: 2px; }
          .skills { display: flex; flex-wrap: wrap; gap: 8px; }
          .skill-tag { background: #dbeafe; color: #1e40af; padding: 4px 12px; border-radius: 20px; font-size: 14px; border: 1px solid #bfdbfe; }
          .text-content { background: #f8fafc; padding: 15px; border-radius: 8px; border: 1px solid #e5e7eb; white-space: pre-wrap; line-height: 1.6; }
          .resume-info { background: #f0f9ff; padding: 12px; border-radius: 8px; border: 1px solid #0ea5e9; color: #0c4a6e; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Professional Profile - HireGenix </h1>
          <p>Generated on ${new Date().toLocaleDateString()}</p>
        </div>
        
        <div class="section">
          <div class="section-title">Basic Information</div>
          <div class="info-grid">
            <div class="info-item">
              <div class="info-label">Name</div>
              <div class="info-value">${user.name || 'Not provided'}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Email</div>
              <div class="info-value">${user.email || 'Not provided'}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Role</div>
              <div class="info-value">${user.role || 'Not provided'}</div>
            </div>
          </div>
        </div>

        <div class="section">
          <div class="section-title">Contact Information</div>
          <div class="text-content">${profile.phone || 'Not provided'}</div>
        </div>

        <div class="section">
          <div class="section-title">Skills</div>
          <div class="skills">
            ${profile.skills?.map(skill => `<span class="skill-tag">${skill}</span>`).join('') || '<span>No skills added</span>'}
          </div>
        </div>

        <div class="section">
          <div class="section-title">Work Experience</div>
          <div class="text-content">${profile.experience || 'Not provided'}</div>
        </div>

        <div class="section">
          <div class="section-title">Education</div>
          <div class="text-content">${profile.education || 'Not provided'}</div>
        </div>

        <div class="section">
          <div class="section-title">Resume</div>
          <div class="resume-info">
            ${profile.resume ? `Resume file: ${profile.resume}` : 'No resume uploaded'}
          </div>
        </div>
      </body>
      </html>
    `;

    // Create blob and download
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${user.name || 'Profile'}_Profile.html`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  // Redirect if unauthorized or wrong role
  if (unauthorized) {
    return <Navigate to="/profile" replace />;
  }

  const currentProfile = isEditing ? tempProfile : profile;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-white/20 rounded-full p-2">
                  <User className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">Job Seeker Profile</h1>
                  <p className="text-blue-100 text-sm">Manage your professional information</p>
                </div>
              </div>
              <div className="flex gap-2">
                {/* Download Profile Button */}
                <button
                  onClick={downloadProfilePDF}
                  className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 text-sm font-medium"
                >
                  <Download className="h-4 w-4" />
                  Download Profile
                </button>
                
                {!isEditing ? (
                  <button
                    onClick={handleEdit}
                    className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 text-sm font-medium"
                  >
                    <Edit3 className="h-4 w-4" />
                    Edit
                  </button>
                ) : (
                  <>
                    <button
                      onClick={handleCancel}
                      className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-all duration-300 text-sm font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      disabled={saving}
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 text-sm font-medium disabled:opacity-50"
                    >
                      {saving ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      ) : (
                        <Save className="h-4 w-4" />
                      )}
                      {saving ? 'Saving...' : 'Save'}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="p-6">
            {/* User Info */}
            <div className="mb-6 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200">
              <h3 className="text-lg font-semibold mb-3 text-gray-800 flex items-center">
                <User className="h-4 w-4 mr-2 text-blue-600" />
                Basic Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="bg-white p-3 rounded-lg">
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Name</p>
                  <p className="font-medium text-gray-800">{user.name || 'Not provided'}</p>
                </div>
                <div className="bg-white p-3 rounded-lg">
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Email</p>
                  <p className="font-medium text-gray-800">{user.email || 'Not provided'}</p>
                </div>
                <div className="bg-white p-3 rounded-lg">
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Role</p>
                  <p className="font-medium text-gray-800 capitalize">{user.role || 'Not provided'}</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-blue-600" />
                  Phone Number
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={tempProfile.phone}
                    onChange={(e) => setTempProfile({...tempProfile, phone: e.target.value})}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Your phone number"
                  />
                ) : (
                  <div className="p-3 bg-gray-50 rounded-lg border">
                    <p className="text-gray-800">{profile.phone || 'Not provided'}</p>
                  </div>
                )}
              </div>

              {/* Skills */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <BookOpen className="h-4 w-4 mr-2 text-blue-600" />
                  Skills
                </label>
                {isEditing && (
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      className="flex-1 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Add skill (React, Node.js, Python...)"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                    />
                    <button
                      type="button"
                      onClick={addSkill}
                      className="px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 font-medium"
                    >
                      Add
                    </button>
                  </div>
                )}
                <div className="flex flex-wrap gap-2">
                  {currentProfile.skills?.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2 border border-blue-200"
                    >
                      {skill}
                      {isEditing && (
                        <button
                          type="button"
                          onClick={() => removeSkill(skill)}
                          className="text-blue-600 hover:text-red-600 transition-colors"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      )}
                    </span>
                  ))}
                </div>
              </div>

              {/* Experience */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <Briefcase className="h-4 w-4 mr-2 text-blue-600" />
                  Work Experience
                </label>
                {isEditing ? (
                  <textarea
                    value={tempProfile.experience}
                    onChange={(e) => setTempProfile({...tempProfile, experience: e.target.value})}
                    className="w-full p-3 border border-gray-200 rounded-lg h-24 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    placeholder="Describe your work experience, achievements, and responsibilities..."
                  />
                ) : (
                  <div className="p-3 bg-gray-50 rounded-lg border">
                    <p className="text-gray-800 whitespace-pre-wrap">{profile.experience || 'Not provided'}</p>
                  </div>
                )}
              </div>

              {/* Education */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <BookOpen className="h-4 w-4 mr-2 text-blue-600" />
                  Education
                </label>
                {isEditing ? (
                  <textarea
                    value={tempProfile.education}
                    onChange={(e) => setTempProfile({...tempProfile, education: e.target.value})}
                    className="w-full p-3 border border-gray-200 rounded-lg h-24 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    placeholder="Your educational background, degrees, certifications..."
                  />
                ) : (
                  <div className="p-3 bg-gray-50 rounded-lg border">
                    <p className="text-gray-800 whitespace-pre-wrap">{profile.education || 'Not provided'}</p>
                  </div>
                )}
              </div>

              {/* Resume Upload */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <Upload className="h-4 w-4 mr-2 text-blue-600" />
                  Resume (PDF)
                </label>
                {isEditing ? (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={handleResumeUpload}
                      className="hidden"
                      id="resume-upload"
                    />
                    <label
                      htmlFor="resume-upload"
                      className="cursor-pointer bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300 inline-block font-medium text-sm"
                    >
                      Choose PDF File
                    </label>
                    {tempProfile.resume && (
                      <p className="text-sm text-gray-600 mt-2 bg-green-50 text-green-700 p-2 rounded-lg">
                        Selected: {tempProfile.resume}
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="p-3 bg-gray-50 rounded-lg border flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {profile.resume ? (
                        <>
                          <FileText className="h-4 w-4 text-blue-600" />
                          <p className="text-gray-800">{profile.resume}</p>
                        </>
                      ) : (
                        <p className="text-gray-500">No resume uploaded</p>
                      )}
                    </div>
                    {profile.resume && (
                      <button
                        onClick={downloadCV}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg transition-all duration-300 flex items-center gap-1 text-sm font-medium"
                      >
                        <Download className="h-3 w-3" />
                        Download CV
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;