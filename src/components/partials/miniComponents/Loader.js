import React from 'react';
import loader from '../../../assets/img/loader.gif';

function Loader() {
  return (
	<div className={'loader'}>
	<img src={loader} alt={'Loading...'} width={'100px'}/>
	</div>
  );
}

export default Loader;