import React, {useState,useEffect} from 'react';
import BreadCrumb from '../../partials/BreadCrumb';
import CardHeader from '../../partials/miniComponents/CardHeader';
import {Link,useNavigate} from 'react-router-dom';
import Constants from '../../../Constants';
import axios from 'axios';
import Swal from 'sweetalert2';

function AddShop() {
	const navigate = useNavigate();
	const [input, setInput] = useState({status:1});
	const [errors, setErrors] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [divisions, setDivisions] = useState([]);
	const [districts, setDistricts] = useState([]);
	const [areas, setAreas] = useState([]);

	const getDivision=(e)=>{
		axios.get(`${Constants.BASE_URL}/division`).then((res)=>{
			setDivisions(res.data);
		}).catch((err)=>{
			console.log(err);
		});
	}

	const getDistrict=(division_id)=>{
			axios.get(`${Constants.BASE_URL}/district/${division_id}`).then((res)=>{
				setDistricts(res.data);
			}).catch((err)=>{
				console.log(err);
			});
		}

	const getArea=(district_id)=>{
			axios.get(`${Constants.BASE_URL}/area/${district_id}`).then((res)=>{
				setAreas(res.data);
			}).catch((err)=>{
				console.log(err);
			});
		}

	const handleInput = (e) =>{
		if(e.target.name=='division_id'){
			setDistricts([]);
			setAreas([]);
			let division_id = parseInt(e.target.value);
			if(!isNaN(division_id)){
				getDistrict(division_id);
			}
		}
		if(e.target.name=='district_id'){
			setAreas([]);
			let district_id = parseInt(e.target.value);
			if(!isNaN(district_id)){
				getArea(district_id);
			}
		}

		setInput(prevState => ({...prevState,[e.target.name]:e.target.value}));
	}
	const handleLogo = (e) =>{
		let file = e.target.files[0];
		let reader = new FileReader();
		reader.onloadend = () =>{
			setInput(prevState => ({...prevState,logo : reader.result}));
		}
		reader.readAsDataURL(file);
	}

	const handleShopCreate = () =>{
		setIsLoading(true);
		axios.post(`${Constants.BASE_URL}/shop`,input).then((res)=>{
			setIsLoading(false);
			Swal.fire({
			  position: 'top-end',
			  icon: res.data.cls,
			  title: res.data.msg,
			  showConfirmButton: false,
			  toast:true,
			  timer: 2500
			});
			if(res.data.flag == undefined){
				navigate('/shop');
			}
		}).catch((err)=>{
			setIsLoading(false);
			if(err?.response?.status == 422){
				setErrors(err.response.data.errors);
			}
		});
	}

	useEffect(()=>{
		getDivision();
	},[]);

  return (
	<>
		<BreadCrumb title={'Add Shop'}/>

      <div className="row">
      	<div className="col-md-12">
      		<div className="card">
      			<div className="card-header">
      					<CardHeader title={'Add Shop'} link={'/shop'} icon={'fa-list'} button_text={'List'}/>
      			</div>
      			<div className={"card-body"}>
        			<div className="row">
	        			<div className="col-md-6">
	        				<div className="card">
	        					<div className="card-header">
	        						<h5>Shop Details</h5>
	        					</div>
	        					<div className="card-body">

	        						<label className={"w-100"}>
		        						<p>Shop Name</p>
		        						<input 
		        							className={errors.name != undefined ? "form-control mt-2 is-invalid" : "form-control mt-2"}
		        							name={"name"}
		        							type={"text"}
		        							value={input.name}
		        							onChange={handleInput}
		        							placeholder={"Enter shop name"}
		        						/>
		        						<p className="{login-error-msg}"><small>{errors.name != undefined ? errors.name[0]:''}</small></p>
		        					</label>

		        					<label className={"w-100"}>
		        						<p>Phone</p>
		        						<input 
		        							className={errors.phone != undefined ? "form-control mt-2 is-invalid" : "form-control mt-2"}
		        							name={"phone"}
		        							type={"text"}
		        							value={input.phone}
		        							onChange={handleInput}
		        							placeholder={"Enter shop phone"}
		        						/>
		        						<p className="{login-error-msg}"><small>{errors.phone != undefined ? errors.phone[0]:''}</small></p>
		        					</label>

		        					<label className={"w-100"}>
		        						<p>E-mail</p>
		        						<input 
		        							className={errors.email != undefined ? "form-control mt-2 is-invalid" : "form-control mt-2"}
		        							name={"email"}
		        							type={"email"}
		        							value={input.email}
		        							onChange={handleInput}
		        							placeholder={"Enter shop email"}
		        						/>
		        						<p className="{login-error-msg}"><small>{errors.email != undefined ? errors.email[0]:''}</small></p>
		        					</label>

		        					<label className={"w-100"}>
		        						<p>Details</p>
		        						<textarea 
		        							className={errors.details != undefined ? "form-control mt-2 is-invalid" : "form-control mt-2"}
		        							name={"details"}
		        							value={input.details}
		        							onChange={handleInput}
		        							placeholder={"Enter shop details"}
		        						/>
		        						<p className="{login-error-msg}"><small>{errors.details != undefined ? errors.details[0]:''}</small></p>
		        					</label>

		        					<label className={"w-100"}>
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

		        					<label className={"w-100"}>
		        						<p>Logo</p>
		        						<input 
		        							className={errors.logo != undefined ? "form-control mt-2 is-invalid" : "form-control mt-2"}
		        							name={"logo"}
		        							type={"file"}
		        							onChange={handleLogo}
		        						/>
		        						<p className="{login-error-msg}"><small>{errors.logo != undefined ? errors.logo[0]:''}</small></p>
		        					</label>
		        					{
		        						input.logo != undefined ?
		        						<div className="row">
		        							<div className="col-md-6">
					        					<div className={"logo-preview mt-3"}>
					        						<img src={input.logo} className="img-thumbnail aspect-one" alt={'Photo'}/>
					        					</div>
		        							</div>
		        						</div> : null
		        					}

	        					</div>
	        				</div>
	        			</div>

	        			<div className="col-md-6">
	        				<div className="card">
	        					<div className="card-header">
	        						<h5>Shop Address</h5>
	        					</div>
	        					<div className="card-body">

	        						<label className={"w-100"}>
		        						<p>Address <small>(House/Road/Village etc)</small></p>
		        						<input 
		        							className={errors.address != undefined ? "form-control mt-2 is-invalid" : "form-control mt-2"}
		        							name={"address"}
		        							type={"text"}
		        							value={input.address}
		        							onChange={handleInput}
		        							placeholder={"Enter shop address"}
		        						/>
		        						<p className="{login-error-msg}"><small>{errors.address != undefined ? errors.address[0]:''}</small></p>
		        					</label>

		        					<label className={"w-100 mt-2"}>
		        						<p>Division</p>
		        						<select
		        						className={errors.division_id != undefined ? "form-select mt-2 is-invalid" : "form-select mt-2"}
		        							name={"division_id"}
		        							value={input.division_id}
		        							onChange={handleInput}
		        						>
		        						<option>Select Division</option>
		        						{
		        							divisions.map((division, index)=>(
		        								<option key={index} value={division.id}>{division.name}</option>
		        							))
		        						}
		        						</select>
		        						<p className="{login-error-msg}"><small>{errors.division_id != undefined ? errors.division_id[0]:''}</small></p>
		        					</label>

		        					<label className={"w-100"}>
		        						<p>District/City</p>
		        						<select
		        						className={errors.district_id != undefined ? "form-select mt-2 is-invalid" : "form-select mt-2"}
		        							name={"district_id"}
		        							value={input.district_id}
		        							onChange={handleInput}
		        							disabled = {Object.keys(districts) < 1}
		        						>
		        						<option>Select District</option>
		        						{
		        							districts.map((district, index)=>(
		        								<option key={index} value={district.id}>{district.name}</option>
		        							))
		        						}
		        						</select>
		        						<p className="{login-error-msg}"><small>{errors.district_id != undefined ? errors.district_id[0]:''}</small></p>
		        					</label>

		        					<label className={"w-100"}>
		        						<p>Area</p>
		        						<select
		        						className={errors.area_id != undefined ? "form-select mt-2 is-invalid" : "form-select mt-2"}
		        							name={"area_id"}
		        							value={input.area_id}
		        							onChange={handleInput}
		        							disabled = {Object.keys(areas) < 1}
		        						>
		        						<option>Select Area</option>
		        						{
		        							areas.map((area, index)=>(
		        								<option key={index} value={area.id}>{area.name}</option>
		        							))
		        						}
		        						</select>
		        						<p className="{login-error-msg}"><small>{errors.area_id != undefined ? errors.area_id[0]:''}</small></p>
		        					</label>

		        					<label className={"w-100"}>
		        						<p>Landmark</p>
		        						<input 
		        							className={errors.landmark != undefined ? "form-control mt-2 is-invalid" : "form-control mt-2"}
		        							name={"landmark"}
		        							type={"text"}
		        							value={input.landmark}
		        							onChange={handleInput}
		        							placeholder={"Enter shop landmark"}
		        						/>
		        						<p className="{login-error-msg}"><small>{errors.landmark != undefined ? errors.landmark[0]:''}</small></p>
		        					</label>

	        					</div>
	        				</div>
	        			</div>

        				<div className="col-md-12">
        					<div className="row justify-content-center">
        						<div className="col-md-4">
        							<div className="d-grid mt-4">
        								<button className="btn theme-button" onClick={handleShopCreate} dangerouslySetInnerHTML={{__html: isLoading ? '<span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>Loading...' : "Add Shop"}}/>
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

export default AddShop;