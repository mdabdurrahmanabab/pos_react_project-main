import React, {useState,useEffect} from 'react';
import BreadCrumb from '../../partials/BreadCrumb';
import CardHeader from '../../partials/miniComponents/CardHeader';
import {Link,useNavigate, useParams} from 'react-router-dom';
import Constants from '../../../Constants';
import axios from 'axios';
import Swal from 'sweetalert2';
import $ from 'jquery';

function AddProductPhoto() {
	const navigate = useNavigate();
	const params = useParams();
	const [errors, setErrors] = useState([]);
	const [photos, setPhotos] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [progress, setProgress] = useState(0);

	const handlePhotoUploadInput = (e)=>{
		const images = e.target.files;

		for (let i =0; i<images.length; i++) {

			let reader = new FileReader();
			reader.onloadend =()=>{
				setPhotos(prevState=>({...prevState,[i]:{
					...prevState[i],photo:reader.result,
					...prevState[i],is_primary:i==0?1:0
				}}));
			}
			reader.readAsDataURL(images[i]);

		}

	}

	const handlePrimaryPhoto = (key)=>{
		for (let i =0; i<Object.keys(photos).length; i++) {
			setPhotos(prevState=>({...prevState,[i]:{
					...prevState[i],is_primary:i==key?1:0
				}}));
		}
	}

	const handlePhotoInputField = ()=>{
		$('#photo_input').trigger('click');
	}

	const handleUploadPhoto = ()=>{
		setIsLoading(true);
		axios.post(`${Constants.BASE_URL}/product_photo_upload/${params.id}`,{photos},{
			onUploadProgress:(progressEvent)=>{
				const value = Math.round(
						(progressEvent.loaded * 100) / progressEvent.total
					)
				setProgress(value);
			}
		}).then((res)=>{
			setIsLoading(false);
			Swal.fire({
			  position: 'top-end',
			  icon: res.data.cls,
			  title: res.data.msg,
			  showConfirmButton: false,
			  toast:true,
			  timer: 2500
			});
			navigate('/product');
		}).catch((err)=>{
			setIsLoading(false);
			if(err?.response?.status == 422){
				setErrors(err.response.data.errors);
			}
		});
	}

	useEffect(()=>{
		console.log(photos);
	},[photos]);

  return (
	<>
		<BreadCrumb title={'Add Product Photo'}/>

      <div className="row">
      	<div className="col-md-12">
      		<div className="card">
      			<div className="card-header">
      					<CardHeader title={'Add Product Photo'} link={'/product'} icon={'fa-list'} button_text={'List'}/>
      			</div>
      			<div className={"card-body"}>
      				<div className={'photo-upload-container'}>
      					<div className={'icon'} onClick={handlePhotoInputField} >
      						<i className={'fa-solid fa-camera fa-2x'}></i>
      					</div>
      				</div>
      			</div>
      			<input 
      				id={'photo_input'}
      				type={'file'}
      				className={'d-none'}
      				multiple={true}
      				accept={"image/png,image/jpg,image/jpeg,image/webp"}
      				onChange={handlePhotoUploadInput}
      				/>

      				<div className={'row'}>
      					{
      						Object.keys(photos).map((key)=>
      							<div className={'col-md-3 m-2'} key={key}>
      								<img src={photos[key].photo} onClick={()=>handlePrimaryPhoto(key)} alt={'preview'} className={photos[key].is_primary==1?'primary-photo img-thumbnail w-100 preview-photo':'img-thumbnail w-100 preview-photo'}/>
      							</div>
      						)
      					}

      					<div className={'row align-items-center'}>

      						<div className={'col-md-9'}>
      							<div className="progress" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100" style={{display: `${progress<1? 'none' :'block'}`}}>
										  <div className="progress-bar progress-bar-striped progress-bar-animated" style={{width: `${progress}%`}}>
										  	{`${progress}%`}
										  </div>
										</div>
      						</div>

      						<div className={'col-md-3 text-end'}>
	      						<button className="btn theme-button m-1" onClick={handleUploadPhoto} disabled={isLoading} dangerouslySetInnerHTML={{__html: isLoading ? '<span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>Loading...' : "Upload Photo"}}/>
	      					</div>

      					</div>
      				</div>
      		</div>
      	</div>
      </div>
	</>
  );
}

export default AddProductPhoto;
