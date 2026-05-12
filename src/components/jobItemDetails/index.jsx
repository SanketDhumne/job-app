import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import Navbar from '../navbar';
import JobsCard from '../jobsCard';
import './index.css';

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
};

const JobItemDetails = () => {
  const { id } = useParams();
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);
  const [jobData, setJobData] = useState({});

  const getJobDetails = async () => {
    setApiStatus(apiStatusConstants.inProgress);
    const token = Cookies.get("myToken");
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`;
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    
    try {
      const response = await fetch(apiUrl, options);
      if (response.ok) {
        const data = await response.json();
        const formattedData = {
          jobDetails: data.job_details,
          similarJobs: data.similar_jobs,
        };
        setJobData(formattedData);
        setApiStatus(apiStatusConstants.success);
      } else {
        setApiStatus(apiStatusConstants.failure);
      }
    } catch (error) {
      console.log(error);
      setApiStatus(apiStatusConstants.failure);
    }
  };

  useEffect(() => {
    getJobDetails();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const renderLoadingView = () => (
    <div className="d-flex justify-content-center align-items-center mt-5" style={{ height: '60vh' }}>
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );

  const renderFailureView = () => (
    <div className="text-center mt-5">
      <img src="https://assets.ccbp.in/frontend/react-js/failure-img.png" alt="failure view" className="img-fluid mb-4" style={{ maxWidth: '400px' }} />
      <h3 className="fw-bold text-dark">Oops! Something Went Wrong</h3>
      <p className="text-secondary mb-4">We cannot seem to find the page you are looking for.</p>
      <button className="btn btn-primary px-4 py-2" onClick={getJobDetails}>Retry</button>
    </div>
  );

  const renderJobDetailsView = () => {
    const { jobDetails, similarJobs } = jobData;
    const {
      company_logo_url,
      company_website_url,
      employment_type,
      job_description,
      location,
      package_per_annum,
      rating,
      title,
      skills,
      life_at_company
    } = jobDetails;

    return (
      <div className="container mt-4 mb-5">
        <div className="glass-card p-4 p-md-5 mb-5 text-start">
          {/* Header */}
          <div className="d-flex align-items-center mb-4">
            <img 
              src={company_logo_url} 
              alt="job details company logo" 
              className="company-logo me-4 rounded shadow-sm bg-white p-2"
              style={{ width: '80px', height: '80px', objectFit: 'contain' }}
            />
            <div>
              <h3 className="fw-bold mb-1 text-dynamic">{title}</h3>
              <div className="d-flex align-items-center text-warning fs-5 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-star-fill me-2" viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                </svg>
                <span className="fw-bold">{rating}</span>
              </div>
            </div>
          </div>

          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4">
            <div className="d-flex flex-wrap gap-4 text-dynamic-muted mb-3 mb-md-0">
              <div className="d-flex align-items-center fs-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-geo-alt-fill me-2" viewBox="0 0 16 16">
                  <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/>
                </svg>
                <span>{location}</span>
              </div>
              <div className="d-flex align-items-center fs-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-briefcase-fill me-2" viewBox="0 0 16 16">
                  <path d="M6.5 1A1.5 1.5 0 0 0 5 2.5V3H1.5A1.5 1.5 0 0 0 0 4.5v1.384l7.614 2.03a1.5 1.5 0 0 0 .772 0L16 5.884V4.5A1.5 1.5 0 0 0 14.5 3H11v-.5A1.5 1.5 0 0 0 9.5 1zm0 1h3a.5.5 0 0 1 .5.5V3H6v-.5a.5.5 0 0 1 .5-.5"/>
                  <path d="M0 12.5A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5V6.85L8.129 8.947a.5.5 0 0 1-.258 0L0 6.85z"/>
                </svg>
                <span>{employment_type}</span>
              </div>
            </div>
            <h4 className="fw-bold mb-0 text-dynamic">{package_per_annum}</h4>
          </div>

          <hr className="text-dynamic-muted opacity-25 mb-4" />

          {/* Description */}
          <div className="mb-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="fw-bold text-dynamic m-0">Description</h4>
              <a href={company_website_url} target="_blank" rel="noopener noreferrer" className="btn btn-premium btn-sm d-flex align-items-center gap-2 px-3">
                Visit Website
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-up-right" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/>
                  <path fillRule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/>
                </svg>
              </a>
            </div>
            <p className="text-dynamic-muted fs-6" style={{ lineHeight: '1.8' }}>{job_description}</p>
          </div>

          {/* Skills */}
          <div className="mb-5">
            <h4 className="fw-bold text-dynamic mb-4">Skills</h4>
            <div className="row g-4">
              {skills.map(skill => (
                <div className="col-6 col-md-4 col-lg-3" key={skill.name}>
                  <div className="d-flex align-items-center p-3 rounded-4 shadow-sm" style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)' }}>
                    <img src={skill.image_url} alt={skill.name} className="me-3" style={{ width: '40px', height: '40px', objectFit: 'contain' }} />
                    <span className="fw-semibold text-dynamic">{skill.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Life at Company */}
          <div className="mb-2">
            <h4 className="fw-bold text-dynamic mb-4">Life at Company</h4>
            <div className="row g-4 align-items-center">
              <div className="col-12 col-md-7">
                <p className="text-dynamic-muted fs-6" style={{ lineHeight: '1.8' }}>{life_at_company.description}</p>
              </div>
              <div className="col-12 col-md-5">
                <img src={life_at_company.image_url} alt="life at company" className="img-fluid rounded-4 shadow-sm w-100" />
              </div>
            </div>
          </div>
        </div>

        {/* Similar Jobs */}
        <div>
          <h3 className="fw-bold text-dynamic mb-4">Similar Jobs</h3>
          <div className="row g-4">
            {similarJobs.map(job => (
              <div className="col-12 col-md-6 col-xl-4" key={job.id}>
                <JobsCard job={job} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderJobDetailsView();
      case apiStatusConstants.failure:
        return renderFailureView();
      case apiStatusConstants.inProgress:
        return renderLoadingView();
      default:
        return null;
    }
  };

  return (
    <div className="pb-5">
      <Navbar />
      {renderContent()}
    </div>
  );
};

export default JobItemDetails;
