import React, { useState, useEffect } from 'react';

const JobSearch = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('active');
  const [showAlert, setShowAlert] = useState(false);
  const [alertEmail, setAlertEmail] = useState('');

  const API_URL = 'http://localhost:5000/api';

  const categories = [
    'all',
    'technology',
    'marketing',
    'design',
    'sales',
    'finance',
    'healthcare',
    'education'
  ];

  useEffect(() => {
    fetchJobs();
  }, [selectedStatus, searchTerm]);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      if (selectedStatus !== 'all') {
        queryParams.append('status', selectedStatus);
      }
      if (searchTerm) {
        queryParams.append('search', searchTerm);
      }

      const response = await fetch(`${API_URL}/jobs?${queryParams}`);
      const data = await response.json();
      
      if (response.ok) {
        let filteredJobs = data.jobs;
        
        // Filter by category if not 'all'
        if (selectedCategory !== 'all') {
          filteredJobs = filteredJobs.filter(job => 
            job.title.toLowerCase().includes(selectedCategory.toLowerCase()) ||
            job.description.toLowerCase().includes(selectedCategory.toLowerCase())
          );
        }
        
        setJobs(filteredJobs);
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubscribe = () => {
    if (alertEmail) {
      alert(`Job alerts subscribed for: ${alertEmail}`);
      setAlertEmail('');
      setShowAlert(false);
    }
  };

  const formatSalary = (salary) => {
    return salary || 'Competitive';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '400px',
        fontSize: '18px'
      }}>
        Loading jobs...
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      {/* Header Section */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ 
          fontSize: '36px', 
          fontWeight: 'bold', 
          margin: '0 0 10px 0',
          color: '#333'
        }}>
          Find Your Dream Job
        </h1>
        <p style={{ 
          fontSize: '18px', 
          color: '#666', 
          margin: '0 0 20px 0' 
        }}>
          Discover opportunities that match your skills and aspirations
        </p>
        
        {/* Job Count */}
        <div style={{ 
          display: 'inline-block',
          backgroundColor: '#f8f9fa',
          padding: '15px 30px',
          borderRadius: '10px',
          margin: '20px 0'
        }}>
          <span style={{ 
            fontSize: '32px', 
            fontWeight: 'bold', 
            color: '#007bff' 
          }}>
            {jobs.length}
          </span>
          <p style={{ 
            margin: '5px 0 0 0', 
            color: '#666',
            fontSize: '14px'
          }}>
            Available positions
          </p>
        </div>
      </div>

      {/* Search Section */}
      <div style={{ 
        backgroundColor: '#f8f9fa', 
        padding: '30px', 
        borderRadius: '12px', 
        marginBottom: '30px' 
      }}>
        <div style={{ 
          display: 'flex', 
          gap: '15px', 
          alignItems: 'center',
          flexWrap: 'wrap'
        }}>
          <input
            type="text"
            placeholder="Search Jobs"
            value={searchTerm}
            onChange={handleSearch}
            style={{
              flex: '1',
              minWidth: '200px',
              padding: '12px 16px',
              border: '1px solid #ddd',
              borderRadius: '6px',
              fontSize: '16px',
              backgroundColor: 'white'
            }}
          />
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{
              padding: '12px 16px',
              border: '1px solid #ddd',
              borderRadius: '6px',
              fontSize: '16px',
              backgroundColor: 'white',
              minWidth: '150px'
            }}
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
          
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            style={{
              padding: '12px 16px',
              border: '1px solid #ddd',
              borderRadius: '6px',
              fontSize: '16px',
              backgroundColor: 'white',
              minWidth: '120px'
            }}
          >
            <option value="active">Active</option>
            <option value="all">All Status</option>
            <option value="paused">Paused</option>
          </select>
          
          <button
            onClick={fetchJobs}
            style={{
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '6px',
              fontSize: '16px',
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            Search
          </button>
        </div>
      </div>

      {/* Jobs List */}
      {jobs.length === 0 ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '60px 20px',
          backgroundColor: '#f8f9fa',
          borderRadius: '12px'
        }}>
          <h3 style={{ 
            fontSize: '24px', 
            margin: '0 0 15px 0',
            color: '#333'
          }}>
            No jobs found
          </h3>
          <p style={{ 
            color: '#666', 
            fontSize: '16px',
            margin: '0'
          }}>
            Try adjusting your search criteria or explore different categories
          </p>
        </div>
      ) : (
        <div style={{ 
          display: 'grid', 
          gap: '20px',
          marginBottom: '40px'
        }}>
          {jobs.map(job => (
            <div key={job._id} style={{
              backgroundColor: 'white',
              border: '1px solid #e9ecef',
              borderRadius: '12px',
              padding: '25px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              transition: 'transform 0.2s, box-shadow 0.2s'
            }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'flex-start',
                marginBottom: '15px'
              }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ 
                    fontSize: '22px', 
                    fontWeight: 'bold', 
                    margin: '0 0 10px 0',
                    color: '#333'
                  }}>
                    {job.title}
                  </h3>
                  <p style={{ 
                    fontSize: '16px', 
                    color: '#007bff', 
                    margin: '0 0 5px 0',
                    fontWeight: '500'
                  }}>
                    {job.company}
                  </p>
                  <p style={{ 
                    color: '#666', 
                    margin: '0 0 5px 0',
                    fontSize: '14px'
                  }}>
                    📍 {job.location}
                  </p>
                  <p style={{ 
                    color: '#666', 
                    margin: '0 0 15px 0',
                    fontSize: '14px'
                  }}>
                    💰 {formatSalary(job.salary)}
                  </p>
                </div>
                
                <div style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'flex-end',
                  gap: '10px'
                }}>
                  <span style={{
                    backgroundColor: job.status === 'active' ? '#28a745' : '#ffc107',
                    color: 'white',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: 'bold'
                  }}>
                    {job.status.toUpperCase()}
                  </span>
                  <span style={{
                    backgroundColor: '#e9ecef',
                    color: '#495057',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: '500'
                  }}>
                    {job.jobType.toUpperCase()}
                  </span>
                </div>
              </div>
              
              <p style={{ 
                color: '#555', 
                lineHeight: '1.6',
                margin: '0 0 15px 0',
                fontSize: '15px'
              }}>
                {job.description}
              </p>
              
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                borderTop: '1px solid #e9ecef',
                paddingTop: '15px'
              }}>
                <div style={{ 
                  display: 'flex', 
                  gap: '20px',
                  fontSize: '14px',
                  color: '#666'
                }}>
                  <span>👁️ {job.views} views</span>
                  <span>📝 {job.applications.length} applications</span>
                  <span>📅 Posted {formatDate(job.createdAt)}</span>
                </div>
                
                <button style={{
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  padding: '8px 20px',
                  borderRadius: '6px',
                  fontSize: '14px',
                  cursor: 'pointer',
                  fontWeight: '500'
                }}>
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Job Alerts Section */}
      <div style={{
        backgroundColor: '#f8f9fa',
        padding: '40px',
        borderRadius: '12px',
        textAlign: 'center',
        marginTop: '40px'
      }}>
        <h2 style={{ 
          fontSize: '24px', 
          margin: '0 0 15px 0',
          color: '#333'
        }}>
          Get Job Alerts
        </h2>
        <p style={{ 
          color: '#666', 
          margin: '0 0 25px 0',
          fontSize: '16px'
        }}>
          Never miss opportunities that match your skills and preferences
        </p>
        
        {!showAlert ? (
          <button
            onClick={() => setShowAlert(true)}
            style={{
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              padding: '12px 30px',
              borderRadius: '6px',
              fontSize: '16px',
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            Subscribe
          </button>
        ) : (
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            gap: '15px',
            flexWrap: 'wrap'
          }}>
            <input
              type="email"
              placeholder="Enter your email"
              value={alertEmail}
              onChange={(e) => setAlertEmail(e.target.value)}
              style={{
                padding: '12px 16px',
                border: '1px solid #ddd',
                borderRadius: '6px',
                fontSize: '16px',
                minWidth: '250px'
              }}
            />
            <button
              onClick={handleSubscribe}
              style={{
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '6px',
                fontSize: '16px',
                cursor: 'pointer',
                fontWeight: '500'
              }}
            >
              Subscribe
            </button>
            <button
              onClick={() => setShowAlert(false)}
              style={{
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '6px',
                fontSize: '16px',
                cursor: 'pointer',
                fontWeight: '500'
              }}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobSearch;