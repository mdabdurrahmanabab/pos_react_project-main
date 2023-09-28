import React from 'react';
import {Helmet} from 'react-helmet';

function BreadCrumb(props) {
  return (
	<>
			<Helmet>
				<title>Dashboard | {props.title} </title>
			</Helmet>

	    <ol className="breadcrumb mb-2 mt-2">
	        <li className="breadcrumb-item text-theme-light">Dashboard</li>
	        <li className="breadcrumb-item active">{props.title}</li>
	    </ol>
	</>
  );
}

export default BreadCrumb;