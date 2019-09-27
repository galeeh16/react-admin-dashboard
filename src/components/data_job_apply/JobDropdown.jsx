import React from 'react';

const JobDropdown = ({job}) => {
    return <option value={job.id_job}>{job.title_joblist}</option>
}

export default JobDropdown