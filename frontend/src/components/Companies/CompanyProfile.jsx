import React, { useState, useEffect } from 'react';
import { Building2, Phone, MapPin, Users, FileText, Upload, X, Edit3, Save, Download, Globe, Mail } from 'lucide-react';

const CompanyProfile = () => {
  const [user, setUser] = useState({});
  const [profile, setProfile] = useState({
    companyName: '',
    phone: '',
    address: '',
    website: '',
    description: '',
    industry: '',
    companySize: '',
    establishedYear: '',
    logo: '',
    logoFile: null,
    benefits: [],
    socialLinks: {
      linkedin: '',
      twitter: '',
      facebook: ''
    }
  });
  const [newBenefit, setNewBenefit] = useState('');
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [tempProfile, setTempProfile] = useState(profile);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = window.sessionToken || localStorage?.getItem('token');
      const response = await fetch('http://localhost:5000/api/company-profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setUser(data.user || {});
      const profileData = {
        companyName: data.profile?.companyName || '',
        phone: data.profile?.phone || '',
        address: data.profile?.address || '',
        website: data.profile?.website || '',
        description: data.profile?.description || '',
        industry: data.profile?.industry || '',
        companySize: data.profile?.companySize || '',
        establishedYear: data.profile?.establishedYear || '',
        logo: data.profile?.logo || '',
        logoFile: null,
        benefits: data.profile?.benefits || [],
        socialLinks: data.profile?.socialLinks || {
          linkedin: '',
          twitter: '',
          facebook: ''
        }
      };
      setProfile(profileData);
      setTempProfile(profileData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching company profile:', error);
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
    setNewBenefit('');
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const token = window.sessionToken || localStorage?.getItem('token');
      
      // Handle logo upload if there's a new logo
      let profileToSave = {...tempProfile};
      if (tempProfile.logoFile) {
        const formData = new FormData();
        formData.append('logo', tempProfile.logoFile);
         
        const uploadResponse = await fetch('http://localhost:5000/api/upload-logo', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: formData
        });
        
        if (uploadResponse.ok) {
          const uploadData = await uploadResponse.json();
          profileToSave.logo = uploadData.filename;
        }
      }
      
      // Remove logoFile from the data to save
      const { logoFile, ...profileData } = profileToSave;
      
      const response = await fetch('http://localhost:5000/api/company-profile', {
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
        alert('Company profile updated successfully!');
      } else {
        alert('Error updating company profile');
      }
    } catch (error) {
      console.error('Error updating company profile:', error);
      alert('Error updating company profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const addBenefit = () => {
    if (newBenefit.trim() && !tempProfile.benefits.includes(newBenefit.trim())) {
      setTempProfile({
        ...tempProfile,
        benefits: [...tempProfile.benefits, newBenefit.trim()]
      });
      setNewBenefit('');
    }
  };

  const removeBenefit = (benefitToRemove) => {
    setTempProfile({
      ...tempProfile,
      benefits: tempProfile.benefits.filter(benefit => benefit !== benefitToRemove)
    });
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg')) {
      setTempProfile({
        ...tempProfile,
        logo: file.name,
        logoFile: file
      });
    } else {
      alert('Please select a valid image file (JPG, PNG)');
    }
  };

  // Download company profile as HTML
  const downloadCompanyProfile = () => {
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Company Profile - ${profile.companyName || 'Company'}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 40px; color: #333; }
          .header { border-bottom: 3px solid #2563eb; padding-bottom: 20px; margin-bottom: 30px; text-align: center; }
          .header h1 { color: #2563eb; margin: 0; font-size: 32px; }
          .header p { color: #666; margin: 5px 0 0 0; }
          .logo { width: 100px; height: 100px; margin: 0 auto 20px; background: #f3f4f6; border-radius: 50%; display: flex; align-items: center; justify-content: center; }
          .section { margin-bottom: 25px; }
          .section-title { color: #2563eb; font-size: 18px; font-weight: bold; margin-bottom: 10px; border-bottom: 1px solid #e5e7eb; padding-bottom: 5px; }
          .info-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin-bottom: 20px; }
          .info-item { background: #f8fafc; padding: 12px; border-radius: 8px; border: 1px solid #e5e7eb; }
          .info-label { font-size: 12px; color: #666; text-transform: uppercase; font-weight: bold; }
          .info-value { font-weight: 500; margin-top: 2px; }
          .benefits { display: flex; flex-wrap: wrap; gap: 8px; }
          .benefit-tag { background: #dbeafe; color: #1e40af; padding: 4px 12px; border-radius: 20px; font-size: 14px; border: 1px solid #bfdbfe; }
          .text-content { background: #f8fafc; padding: 15px; border-radius: 8px; border: 1px solid #e5e7eb; white-space: pre-wrap; line-height: 1.6; }
          .social-links { display: flex; gap: 15px; }
          .social-link { background: #f0f9ff; padding: 8px 16px; border-radius: 6px; border: 1px solid #0ea5e9; color: #0c4a6e; text-decoration: none; }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo">
            ${profile.logo ? `<img src="${profile.logo}" alt="Logo" style="width: 80px; height: 80px; border-radius: 50%;">` : '<span style="color: #666;">Logo</span>'}
          </div>
          <h1>${profile.companyName || 'Company Name'}</h1>
          <p>Company Profile - Generated on ${new Date().toLocaleDateString()}</p>
        </div>
        
        <div class="section">
          <div class="section-title">Company Information</div>
          <div class="info-grid">
            <div class="info-item">
              <div class="info-label">Industry</div>
              <div class="info-value">${profile.industry || 'Not specified'}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Company Size</div>
              <div class="info-value">${profile.companySize || 'Not specified'}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Established Year</div>
              <div class="info-value">${profile.establishedYear || 'Not specified'}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Website</div>
              <div class="info-value">${profile.website || 'Not provided'}</div>
            </div>
          </div>
        </div>

        <div class="section">
          <div class="section-title">Contact Information</div>
          <div class="info-grid">
            <div class="info-item">
              <div class="info-label">Phone</div>
              <div class="info-value">${profile.phone || 'Not provided'}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Address</div>
              <div class="info-value">${profile.address || 'Not provided'}</div>
            </div>
          </div>
        </div>

        <div class="section">
          <div class="section-title">Company Description</div>
          <div class="text-content">${profile.description || 'No description provided'}</div>
        </div>

        <div class="section">
          <div class="section-title">Employee Benefits</div>
          <div class="benefits">
            ${profile.benefits?.map(benefit => `<span class="benefit-tag">${benefit}</span>`).join('') || '<span>No benefits listed</span>'}
          </div>
        </div>

        <div class="section">
          <div class="section-title">Social Media</div>
          <div class="social-links">
            ${profile.socialLinks?.linkedin ? `<a href="${profile.socialLinks.linkedin}" class="social-link">LinkedIn</a>` : ''}
            ${profile.socialLinks?.twitter ? `<a href="${profile.socialLinks.twitter}" class="social-link">Twitter</a>` : ''}
            ${profile.socialLinks?.facebook ? `<a href="${profile.socialLinks.facebook}" class="social-link">Facebook</a>` : ''}
            ${!profile.socialLinks?.linkedin && !profile.socialLinks?.twitter && !profile.socialLinks?.facebook ? '<span>No social media links</span>' : ''}
          </div>
        </div>
      </body>
      </html>
    `;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${profile.companyName || 'Company'}_Profile.html`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const currentProfile = isEditing ? tempProfile : profile;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading company profile...</p>
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
                  <Building2 className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">Company Profile</h1>
                  <p className="text-blue-100 text-sm">Manage your company information</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={downloadCompanyProfile}
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
            {/* Basic Company Info */}
            <div className="mb-6 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200">
              <h3 className="text-lg font-semibold mb-3 text-gray-800 flex items-center">
                <Building2 className="h-4 w-4 mr-2 text-blue-600" />
                Basic Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="bg-white p-3 rounded-lg">
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Contact Person</p>
                  <p className="font-medium text-gray-800">{user.name || 'Not provided'}</p>
                </div>
                <div className="bg-white p-3 rounded-lg">
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Email</p>
                  <p className="font-medium text-gray-800">{user.email || 'Not provided'}</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {/* Company Logo */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <Upload className="h-4 w-4 mr-2 text-blue-600" />
                  Company Logo
                </label>
                {isEditing ? (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                      id="logo-upload"
                    />
                    <label
                      htmlFor="logo-upload"
                      className="cursor-pointer bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300 inline-block font-medium text-sm"
                    >
                      Choose Image File
                    </label>
                    {tempProfile.logo && (
                      <p className="text-sm text-gray-600 mt-2 bg-green-50 text-green-700 p-2 rounded-lg">
                        Selected: {tempProfile.logo}
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="p-3 bg-gray-50 rounded-lg border">
                    {profile.logo ? (
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-blue-600" />
                        <p className="text-gray-800">{profile.logo}</p>
                      </div>
                    ) : (
                      <p className="text-gray-500">No logo uploaded</p>
                    )}
                  </div>
                )}
              </div>

              {/* Company Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <Building2 className="h-4 w-4 mr-2 text-blue-600" />
                  Company Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={tempProfile.companyName}
                    onChange={(e) => setTempProfile({...tempProfile, companyName: e.target.value})}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Your company name"
                  />
                ) : (
                  <div className="p-3 bg-gray-50 rounded-lg border">
                    <p className="text-gray-800">{profile.companyName || 'Not provided'}</p>
                  </div>
                )}
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      placeholder="Company phone number"
                    />
                  ) : (
                    <div className="p-3 bg-gray-50 rounded-lg border">
                      <p className="text-gray-800">{profile.phone || 'Not provided'}</p>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                    <Globe className="h-4 w-4 mr-2 text-blue-600" />
                    Website
                  </label>
                  {isEditing ? (
                    <input
                      type="url"
                      value={tempProfile.website}
                      onChange={(e) => setTempProfile({...tempProfile, website: e.target.value})}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="https://www.company.com"
                    />
                  ) : (
                    <div className="p-3 bg-gray-50 rounded-lg border">
                      <p className="text-gray-800">{profile.website || 'Not provided'}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-blue-600" />
                  Address
                </label>
                {isEditing ? (
                  <textarea
                    value={tempProfile.address}
                    onChange={(e) => setTempProfile({...tempProfile, address: e.target.value})}
                    className="w-full p-3 border border-gray-200 rounded-lg h-20 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    placeholder="Company address"
                  />
                ) : (
                  <div className="p-3 bg-gray-50 rounded-lg border">
                    <p className="text-gray-800 whitespace-pre-wrap">{profile.address || 'Not provided'}</p>
                  </div>
                )}
              </div>

              {/* Company Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Industry</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={tempProfile.industry}
                      onChange={(e) => setTempProfile({...tempProfile, industry: e.target.value})}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="e.g., Technology, Healthcare"
                    />
                  ) : (
                    <div className="p-3 bg-gray-50 rounded-lg border">
                      <p className="text-gray-800">{profile.industry || 'Not specified'}</p>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                    <Users className="h-4 w-4 mr-2 text-blue-600" />
                    Company Size
                  </label>
                  {isEditing ? (
                    <select
                      value={tempProfile.companySize}
                      onChange={(e) => setTempProfile({...tempProfile, companySize: e.target.value})}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    >
                      <option value="">Select size</option>
                      <option value="1-10">1-10 employees</option>
                      <option value="11-50">11-50 employees</option>
                      <option value="51-200">51-200 employees</option>
                      <option value="201-500">201-500 employees</option>
                      <option value="501-1000">501-1000 employees</option>
                      <option value="1000+">1000+ employees</option>
                    </select>
                  ) : (
                    <div className="p-3 bg-gray-50 rounded-lg border">
                      <p className="text-gray-800">{profile.companySize || 'Not specified'}</p>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Established Year</label>
                  {isEditing ? (
                    <input
                      type="number"
                      value={tempProfile.establishedYear}
                      onChange={(e) => setTempProfile({...tempProfile, establishedYear: e.target.value})}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="e.g., 2010"
                      min="1800"
                      max={new Date().getFullYear()}
                    />
                  ) : (
                    <div className="p-3 bg-gray-50 rounded-lg border">
                      <p className="text-gray-800">{profile.establishedYear || 'Not specified'}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Company Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-blue-600" />
                  Company Description
                </label>
                {isEditing ? (
                  <textarea
                    value={tempProfile.description}
                    onChange={(e) => setTempProfile({...tempProfile, description: e.target.value})}
                    className="w-full p-3 border border-gray-200 rounded-lg h-32 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    placeholder="Tell us about your company, mission, values, and culture..."
                  />
                ) : (
                  <div className="p-3 bg-gray-50 rounded-lg border">
                    <p className="text-gray-800 whitespace-pre-wrap">{profile.description || 'No description provided'}</p>
                  </div>
                )}
              </div>

              {/* Employee Benefits */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Employee Benefits</label>
                {isEditing && (
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      value={newBenefit}
                      onChange={(e) => setNewBenefit(e.target.value)}
                      className="flex-1 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Add benefit (Health Insurance, Remote Work...)"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addBenefit())}
                    />
                    <button
                      type="button"
                      onClick={addBenefit}
                      className="px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 font-medium"
                    >
                      Add
                    </button>
                  </div>
                )}
                <div className="flex flex-wrap gap-2">
                  {currentProfile.benefits?.map((benefit, index) => (
                    <span
                      key={index}
                      className="bg-gradient-to-r from-green-100 to-blue-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2 border border-green-200"
                    >
                      {benefit}
                      {isEditing && (
                        <button
                          type="button"
                          onClick={() => removeBenefit(benefit)}
                          className="text-green-600 hover:text-red-600 transition-colors"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      )}
                    </span>
                  ))}
                </div>
              </div>

              {/* Social Media Links */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Social Media Links</label>
                <div className="space-y-3">
                  {['linkedin', 'twitter', 'facebook'].map((platform) => (
                    <div key={platform}>
                      <label className="block text-xs text-gray-500 mb-1 capitalize">{platform}</label>
                      {isEditing ? (
                        <input
                          type="url"
                          value={tempProfile.socialLinks[platform]}
                          onChange={(e) => setTempProfile({
                            ...tempProfile,
                            socialLinks: {
                              ...tempProfile.socialLinks,
                              [platform]: e.target.value
                            }
                          })}
                          className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                          placeholder={`https://${platform}.com/company`}
                        />
                      ) : (
                        <div className="p-2 bg-gray-50 rounded-lg border text-sm">
                          <p className="text-gray-800">{profile.socialLinks?.[platform] || 'Not provided'}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;