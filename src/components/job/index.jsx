import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Navbar from '../navbar';
import JobsCard from '../jobsCard';
import JobsFilter from '../jobsFilter';
import './index.css';

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
};

const Jobs = () => {
  const [jobsList, setJobsList] = useState([]);
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);
  const [activeEmploymentTypes, setActiveEmploymentTypes] = useState([]);
  const [activeSalaryRange, setActiveSalaryRange] = useState('');
  const [searchInput, setSearchInput] = useState('');

  const getJobs = async () => {
    setApiStatus(apiStatusConstants.inProgress);
    const token = Cookies.get("myToken");
    const employmentTypeStr = activeEmploymentTypes.join(',');
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentTypeStr}&minimum_package=${activeSalaryRange}&search=${searchInput}`;
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
        setJobsList(data.jobs);
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
    getJobs();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeEmploymentTypes, activeSalaryRange]);

  const onEnterSearchInput = (event) => {
    if (event.key === 'Enter') {
      getJobs();
    }
  };

  const updateEmploymentTypes = (value, isChecked) => {
    if (isChecked) {
      setActiveEmploymentTypes([...activeEmploymentTypes, value]);
    } else {
      setActiveEmploymentTypes(activeEmploymentTypes.filter((type) => type !== value));
    }
  };

  const updateSalaryRange = (value) => {
    setActiveSalaryRange(value);
  };

  const renderJobsView = () => {
    if (jobsList.length === 0) {
      return (
        <div className="text-center mt-5">
          <img src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png" alt="no jobs" className="img-fluid mb-3 w-50" />
          <h3 className="fw-bold text-dark">No Jobs Found</h3>
          <p className="text-secondary">We could not find any jobs. Try other filters.</p>
        </div>
      );
    }

    return (
      <ul className='list-unstyled mb-0'>
        {jobsList.map((job) => (
          <li key={job.id}>
            <JobsCard job={job} />
          </li>
        ))}
      </ul>
    );
  };

  const renderLoadingView = () => (
    <div className="d-flex justify-content-center align-items-center mt-5" style={{ height: '50vh' }}>
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );

  const renderFailureView = () => (
    <div className="text-center mt-5">
      <img src="https://assets.ccbp.in/frontend/react-js/failure-img.png" alt="failure view" className="img-fluid mb-3 w-50" />
      <h3 className="fw-bold text-dark">Oops! Something Went Wrong</h3>
      <p className="text-secondary">We cannot seem to find the page you are looking for.</p>
      <button className="btn btn-primary" onClick={getJobs}>Retry</button>
    </div>
  );

  const renderJobs = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderJobsView();
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
      <div className='container mt-4'>
        <div className='row'>
          {/* Sidebar */}
          <div className='col-12 col-md-4 col-lg-3 d-none d-md-block'>
            <JobsFilter 
              updateEmploymentTypes={updateEmploymentTypes} 
              updateSalaryRange={updateSalaryRange} 
            />
          </div>

          {/* Main Content */}
          <div className='col-12 col-md-8 col-lg-9'>
            {/* Search Bar */}
            <div className="d-flex mb-4 gap-2">
              <input
                type="text"
                className="form-control premium-input w-100"
                placeholder="Search premium jobs..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={onEnterSearchInput}
              />
              <button 
                className="btn btn-premium px-4"
                type="button" 
                onClick={getJobs}
                aria-label="search button"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                </svg>
              </button>
            </div>
            
            {/* Mobile Filter (Optional placeholder) */}
            <div className="d-md-none mb-4">
               <JobsFilter 
                updateEmploymentTypes={updateEmploymentTypes} 
                updateSalaryRange={updateSalaryRange} 
              />
            </div>

            {renderJobs()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;