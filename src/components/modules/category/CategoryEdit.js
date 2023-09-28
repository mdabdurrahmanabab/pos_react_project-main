import React, {useState,useEffect} from 'react';
import BreadCrumb from '../../partials/BreadCrumb';
import CardHeader from '../../partials/miniComponents/CardHeader';
import {Link,useNavigate,useParams} from 'react-router-dom';
import Constants from '../../../Constants';
import axios from 'axios';
import Swal from 'sweetalert2';

function CategoryEdit() {
	const params = useParams();
	const navigate = useNavigate();
	const [input, setInput] = useState({status:1});
	const [errors, setErrors] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [category, setCategory] = useState({});

	const getCategory = ()=>{
		axios.get(`${Constants.BASE_URL}/category/${params.id}`).then((res)=>{
			setInput(res.data.data);
		}).catch((err)=>{

		});
	}

	const handleInput = (e) =>{
		if(e.target.name=='name'){
			let slug = e.target.value;
			slug = slug.toLowerCase();
			slug = slug.replaceAll(' ','-');
			setInput(prevState => ({...prevState,slug:slug}));
		}
		setInput(prevState => ({...prevState,[e.target.name]:e.target.value}));
	}

	const handlePhoto = (e) =>{
		let file = e.target.files[0];
		let reader = new FileReader();
		reader.onloadend = () =>{
			setInput(prevState => ({...prevState,photo : reader.result}));
		}
		reader.readAsDataURL(file);
	}

	const handleCategoryUpdate = () =>{
		setIsLoading(true);
		axios.put(`${Constants.BASE_URL}/category/${params.id}`,input).then((res)=>{
			setIsLoading(false);
			Swal.fire({
			  position: 'top-end',
			  icon: res.data.cls,
			  title: res.data.msg,
			  showConfirmButton: false,
			  toast:true,
			  timer: 2500
			});
			navigate('/category');
		}).catch((err)=>{
			setIsLoading(false);
			if(err?.response?.status == 422){
				setErrors(err.response.data.errors);
			}
		});
	}

	useEffect(()=>{
		getCategory();
	},[]);

  return (
	<>
		<BreadCrumb title={'Update Category'}/>

        <div className="row">
        	<div className="col-md-12">
        		<div className="card">
        			<div className="card-header">
        					<CardHeader title={'Update Category'} link={'/category'} icon={'fa-list'} button_text={'List'}/>
        			</div>
        			<div className={"card-body"}>
	        			<div className="row">

	        				<div className="col-md-6">
	        					<label className={"w-100 mt-4"}>
	        						<p>Name</p>
	        						<input 
	        							className={errors.name != undefined ? "form-control mt-2 is-invalid" : "form-control mt-2"}
	        							name={"name"}
	        							type={"text"}
	        							value={input.name}
	        							onChange={handleInput}
	        							placeholder={"Enter category name"}
	        						/>
	        						<p className="{login-error-msg}"><small>{errors.name != undefined ? errors.name[0]:''}</small></p>
	        					</label>
	        					
	        				</div>

	        				<div className="col-md-6">
	        					<label className={"w-100 mt-4"}>
	        						<p>Slug</p>
	        						<input 
	        							className={errors.slug != undefined ? "form-control mt-2 is-invalid" : "form-control mt-2"}
	        							name={"slug"}
	        							type={"text"}
	        							value={input.slug}
	        							onChange={handleInput}
	        							placeholder={"Enter category slug"}
	        						/>
	        						<p className="{login-error-msg}"><small>{errors.slug != undefined ? errors.slug[0]:''}</small></p>
	        					</label>
	        				</div>

	        				<div className="col-md-6">
	        					<label className={"w-100 mt-4"}>
	        						<p>Serial</p>
	        						<input 
	        							className={errors.serial != undefined ? "form-control mt-2 is-invalid" : "form-control mt-2"}
	        							name={"serial"}
	        							type={"number"}
	        							value={input.serial}
	        							onChange={handleInput}
	        							placeholder={"Enter category serial"}
	        						/>
	        						<p className="{login-error-msg}"><small>{errors.serial != undefined ? errors.serial[0]:''}</small></p>
	        					</label>
	        				</div>

	        				<div className="col-md-6">
	        					<label className={"w-100 mt-4"}>
	        						<p>Status</p>
	        						<select
	        						className={errors.status != undefined ? "form-select mt-2 is-invalid" : "form-select mt-2"}
	        							name={"status"}
	        							value={input.status}
	        							onChange={handleInput}
	        						>
	        						<option value={1}>Active</option>
	        						<option value={0}>Inactive</option>
	        						</select>
	        						<p className="{login-error-msg}"><small>{errors.status != undefined ? errors.status[0]:''}</small></p>
	        					</label>
	        				</div>

	        				<div className="col-md-6">
	        					<label className={"w-100 mt-4"}>
	        						<p>Description</p>
	        						<textarea 
	        							className={errors.description != undefined ? "form-control mt-2 is-invalid" : "form-control mt-2"}
	        							name={"description"}
	        							value={input.description}
	        							onChange={handleInput}
	        							placeholder={"Enter category description"}
	        						/>
	        						<p className="{login-error-msg}"><small>{errors.description != undefined ? errors.description[0]:''}</small></p>
	        					</label>
	        				</div>

	        				<div className="col-md-6">
	        					<label className={"w-100 mt-4"}>
	        						<p>Photo</p>
	        						<input 
	        							className={errors.photo != undefined ? "form-control mt-2 is-invalid" : "form-control mt-2"}
	        							name={"photo"}
	        							type={"file"}
	        							onChange={handlePhoto}
	        						/>
	        						<p className="{login-error-msg}"><small>{errors.photo != undefined ? errors.photo[0]:''}</small></p>
	        					</label>
	        					{
	        						input.photo != undefined || input.photo_preview != undefined?
	        						<div className="row">
	        							<div className="col-md-6">
				        					<div className={"photo-preview mt-3"}>
				        						<img src={input.photo == undefined?input.photo_preview:input.photo} className="img-thumbnail aspect-one" alt={'Photo'}/>
				        					</div>
	        							</div>
	        						</div> : null
	        					}
	        				</div>

	        				<div className="col-md-12">
	        					<div className="row justify-content-center">
	        						<div className="col-md-4">
	        							<div className="d-grid mt-4">
	        								<button className="btn theme-button" onClick={handleCategoryUpdate} dangerouslySetInnerHTML={{__html: isLoading ? '<span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>Loading...' : "Update Category"}}/>
	        							</div>
	        						</div>
	        					</div>
	        				</div>

	        			</div>
        			</div>
        		</div>
        	</div>
        </div>
	</>
  );
}

export default CategoryEdit;