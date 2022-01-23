import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMars, faTransgenderAlt, faVenus} from '@fortawesome/free-solid-svg-icons';
import React from 'react';

interface GenderDisplayProps {
  gender: "MALE" | "FEMALE" | "NON_BINARY"
}

const GenderDisplay = (props: GenderDisplayProps) => {

  return (
      <>
        {props.gender === "MALE" ? <><FontAwesomeIcon icon={faMars} size={'2x'}/> Male</> : ""}
        {props.gender === "FEMALE" ? <><FontAwesomeIcon icon={faVenus} size={'2x'}/> Female</> : ""}
        {props.gender === "NON_BINARY" ? <><FontAwesomeIcon icon={faTransgenderAlt} size={'2x'}/> Non-binary</> : ""}
      </>
  )
}

export default GenderDisplay;
