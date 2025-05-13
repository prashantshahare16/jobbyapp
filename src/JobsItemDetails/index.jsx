import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import { MdLocationOn } from "react-icons/md";
import { BsFillBriefcaseFill } from "react-icons/bs";
import Cookies from "js-cookie";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import Header from "../header";
import Skills from "../Skills";
import SimilarJobCard from "../SimilarJobSection";
import "./index.css";

const apiStatusView = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS",
};

const JobsItemDetails= () => {
  const [JobsItemData, setJobsItemData] = useState({});
  const [apiStatus, setApiStatus] = useState(apiStatusView.initial);
  const [similarJobList, setSimilarJobList] = useState([]);
  const [skillsList, setSkillsList] = useState([]);
  const [lifeAtCompanyDetails, setLifeAtCompanyDetails] = useState({});

  const { id } = useParams();
  const token = Cookies.get("jwtToken");

  useEffect(() => {
    getJobsDetails();
  }, []);

  const getJobsDetails = async () => {
    setApiStatus(apiStatusView.inProgress);

    const url = `https://apis.ccbp.in/jobs/${id}`;
    console.log(url);
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: "GET",
    };

    try {
      const response = await fetch(url, options);

      if (response.ok) {
        const data = await response.json();
        setJobsItemData(data.job_details);
        setLifeAtCompanyDetails(data.job_details.life_at_company);
        setSkillsList(data.job_details.skills);
        setSimilarJobList(data.similar_jobs);
        setApiStatus(apiStatusView.success);
      } 
      else {
        setApiStatus(apiStatusView.failure);
       
      }
    } catch (error) {
      setApiStatus(apiStatusView.failure);
     
    }
  };

  const handleRetry = () => {
    getJobsDetails();
  };

  const renderSuccessView = () => (
    <div className="bg-container">
      <div className="job-item-detail-card-container">
        <div className="job-item-full-details-main-container">
          <div className="job-details-logo-name-rating-container">
            <div className="job-details-logo-container">
              <img
                alt="job details company logo"
                src={JobsItemData.company_logo_url}
              />
            </div>
            <div className="job-details-name-rating-container">
              <h1>{JobsItemData.title}</h1>
              <p>
                <AiFillStar className="star-tag" /> {JobsItemData.rating}
              </p>
            </div>
          </div>

          <div className="job-details-location-type-package-container">
            <div className="job-details-location-type-container">
              <p>
                <MdLocationOn className="react-icon-location" />
                {JobsItemData.location}
              </p>
              <p>
                <BsFillBriefcaseFill className="react-icon-type" />
                {JobsItemData.employment_type}
              </p>
            </div>
            <p>{JobsItemData.package_per_annum}</p>
          </div>

          <hr className="horizontal-line" />

          <div className="job-description-container">
            <div className="job-description-heading-container">
              <h1>Description</h1>
              <a
                href={JobsItemData.company_website_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit
              </a>
            </div>
            <p>{JobsItemData.job_description}</p>
          </div>

          <div className="job-details-skills-container">
            <h1>Skills</h1>
            <ul>
              {skillsList.map((eachItem) => (
                <Skills key={eachItem.name} skillsDetails={eachItem} />
              ))}
            </ul>
          </div>

          <div className="life-at-company-container">
            <h1>Life At Company</h1>
            <div>
              <p>{lifeAtCompanyDetails.description}</p>
              <img
                alt="life at company"
                src={lifeAtCompanyDetails.image_url}
                className="life-at-company-image"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="similar-jobs-section-container">
        <h1 className="similar-jobs-section-container-head">Similar Jobs</h1>
        <ul className="similar-jobs-cards-container">
          {similarJobList.map((eachJob) => (
            <SimilarJobCard key={eachJob.id} jobDetail={eachJob} />
          ))}
        </ul>
      </div>
    </div>
  );

  const renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure-view"
      />
      <h3>Oops! Something went wrong.</h3>
      <p>We can not seem to find the page you are looking for.</p>
      <button
        type="button"
        className="retry-jobs-button"
        onClick={handleRetry}
      >
        Retry
      </button>
    </div>
  );

  const renderLoadingView = () => (
    <div className="loader-view">
      <Button variant="primary" disabled>
        <Spinner
          as="span"
          animation="grow"
          size="sm"
          role="status"
          aria-hidden="true"
        />
        Loading...
      </Button>
    </div>
  );

  const renderJobDetailsView = () => {
    switch (apiStatus) {
      case apiStatusView.success:
        return renderSuccessView();
      case apiStatusView.failure:
        return renderFailureView();
      case apiStatusView.inProgress:
        return renderLoadingView();
      default:
        return null;
    }
  };

  return (
    <div className="job-item-detail-main-container">
      <Header />
      {renderJobDetailsView()}
    </div>
  );
};

export default JobsItemDetails;
