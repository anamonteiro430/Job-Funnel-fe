import React, { useState, useEffect } from 'react';
import axiosWithAuth from "../../../utils/axiosWithAuth"

import { Link } from "react-router-dom";
import { connect } from "react-redux"

function JobCard(props) {

    //variables
    const user_id = props.currentUser.id
    const job_id = props.id;

    const [toggle, setToggle] = useState(false)
    const [applytoggle, setApplytoggle] = useState(false)

    //state for saved status
    const [saved, setSaved] = useState({
        user_id: user_id,
        job_id: job_id,
        status: "saved"
    })

    //state for applied status
    const [applied, setApplied] = useState({
        user_id: user_id,
        job_id: job_id,
        status: "applied"
    })


    //handles save, sends the saved jobs to the saved endpoint.
    const handleSave = () => {
        if (toggle === false) {
            axiosWithAuth().post('/saved/', saved)
                .then(res => {
                    console.log('handle save job response', res.data)
                    setSaved({ ...saved })
                    setToggle(true)
                })
                .catch(error => {
                    console.error(error)
                })
            //Delete save
        } else if (toggle === true) {
            axiosWithAuth().delete(`/saved/${job_id}`)
                .then(res => {
                    console.log('erased job from saved table?', res.data)
                    setToggle(false)
                    setSaved({ ...saved })
                })
                .catch(error => {
                    console.error(error)
                })
        } 

    }

    //the card display/stylings
    return (
        <div className="jobCard">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <p className="company-name">{props.company}</p>
            </div>
            <div className="card-text">
                <div className="card-image">
                    <img className="image" src="https://pngimage.net/wp-content/uploads/2018/06/logo-placeholder-png-2.png" />
                </div>
                <div className="card-info">
                    {/* {slice the job titles so we only get 30 chars back} */}
                    <h3>{props.title.slice(0, 30)}..</h3>
                    <span>📍 {props.location}</span>
                </div>
            </div>
            <p className="job-desc">{props.description.slice(0, 100)}...</p>
            <div className='jobButtons' >
                {/* buttons to save and unsave jobs, or view jobs description. */}
                {(toggle === false ? <button onClick={handleSave}>Save</button> : <button onClick={handleSave} style={{ color: 'white', backgroundColor: 'green' }}>Unsave</button>)}
                <Link to={`/Dashboard/Job/${props.id}`}>
                    <button>View</button>
                </Link>
            </div>
        </div>
    )
}


const mapStateToProps = state => {
    return {
        currentUser: state.AppReducer.currentUser,
    }
}

export default connect(mapStateToProps, {})(JobCard)


