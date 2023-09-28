import React from 'react';

function DataNotFound() {
  return (
	<div className={'data-not-found-container'}>
		<div className={'data-not-found text-center mt-3 w-100'}>
			<p className={'text-danger'}>Data not found</p>
		</div>
	</div>
  );
}

export default DataNotFound;