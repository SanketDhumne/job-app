import Navbar from '../navbar';
import JobsCard from '../jobsCard';
import JobsFilter from '../jobsFilter';
import './index.css';

const Jobs = () =>{

  return (
    <>
    <Navbar/>
    <div className='container'>
      <div className='row'>
        <div className='col-4 border border-primary'>
          <JobsFilter/>
        </div>
        <ul className='col-8 border border-danger'>
          <JobsCard/>
        </ul>
      </div>

    </div>
    </>
  )
}

export default Jobs;