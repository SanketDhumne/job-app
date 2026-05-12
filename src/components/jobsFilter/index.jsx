import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import './index.css';

const employmentTypesList = [
  { label: 'Full Time', employmentTypeId: 'FULLTIME' },
  { label: 'Part Time', employmentTypeId: 'PARTTIME' },
  { label: 'Internship', employmentTypeId: 'INTERNSHIP' },
  { label: 'Freelance', employmentTypeId: 'FREELANCE' },
];

const salaryRangesList = [
  { salaryRangeId: '1000000', label: '10LPA & Above' },
  { salaryRangeId: '2000000', label: '20LPA & Above' },
  { salaryRangeId: '3000000', label: '30LPA & Above' },
  { salaryRangeId: '4000000', label: '40LPA & Above' },
];

const JobsFilter = ({ updateEmploymentTypes, updateSalaryRange }) => {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const getProfile = async () => {
      const token = Cookies.get("myToken");
      const api = 'https://apis.ccbp.in/profile';
      const options = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      try {
        const response = await fetch(api, options);
        const data = await response.json();
        if (response.ok) {
          setProfileData(data.profile_details);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getProfile();
  }, []);

  return (
    <div className="filters-container mt-0">
      {/* Profile Section */}
      <div className="profile-section glass-card p-4 mb-4 text-center">
        {profileData ? (
          <div className="profile-content">
            <img src={profileData.profile_image_url} alt="profile" className="profile-img mb-3 rounded-circle shadow-sm" style={{width: '70px', border: '3px solid var(--primary-color)'}} />
            <h5 className="fw-bold m-0 text-dynamic">{profileData.name}</h5>
            <p className="text-dynamic-muted small mt-2 mb-0">{profileData.short_bio}</p>
          </div>
        ) : (
          <div className="text-center text-dynamic">Loading Profile...</div>
        )}
      </div>

      <div className="glass-card p-4">
        {/* Employment Type Filter */}
        <div className="filter-group mb-4">
          <h6 className="fw-bold text-dynamic mb-3">Employment Type</h6>
          {employmentTypesList.map((type) => (
            <div className="form-check mb-2" key={type.employmentTypeId}>
              <input
                className="form-check-input"
                type="checkbox"
                value={type.employmentTypeId}
                id={type.employmentTypeId}
                onChange={(e) => updateEmploymentTypes(e.target.value, e.target.checked)}
              />
              <label className="form-check-label text-dynamic-muted" htmlFor={type.employmentTypeId}>
                {type.label}
              </label>
            </div>
          ))}
        </div>

        <hr className="text-dynamic-muted opacity-25" />

        {/* Salary Range Filter */}
        <div className="filter-group mt-4">
          <h6 className="fw-bold text-dynamic mb-3">Salary Range</h6>
          {salaryRangesList.map((range) => (
            <div className="form-check mb-2" key={range.salaryRangeId}>
              <input
                className="form-check-input"
                type="radio"
                name="salary"
                value={range.salaryRangeId}
                id={range.salaryRangeId}
                onChange={(e) => updateSalaryRange(e.target.value)}
              />
              <label className="form-check-label text-dynamic-muted" htmlFor={range.salaryRangeId}>
                {range.label}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobsFilter;