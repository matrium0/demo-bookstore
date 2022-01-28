import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMars, faTransgenderAlt, faVenus} from '@fortawesome/free-solid-svg-icons';
import React from 'react';

interface GenderDisplayProps {
  gender: "MALE" | "FEMALE" | "NON_BINARY"
}

const GenderDisplay = (props: GenderDisplayProps) => {

  return (
    <>
      {props.gender === "MALE" ? <><FontAwesomeIcon icon={faMars} size={'2x'} className="me-2"/><span
        className="d-none d-lg-inline"> Male</span></> : ""}
      {props.gender === "FEMALE" ? <><FontAwesomeIcon icon={faVenus} size={'2x'} className="me-2"/><span
        className="d-none d-lg-inline"> Female</span></> : ""}
      {props.gender === "NON_BINARY" ? <><FontAwesomeIcon icon={faTransgenderAlt} size={'2x'} className="me-2"/><span
        className="d-none d-lg-inline"> Non-binary</span></> : ""}
    </>
  )
}

export default GenderDisplay;
