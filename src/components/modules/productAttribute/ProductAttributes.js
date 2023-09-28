import React, {useState,useEffect} from 'react';
import BreadCrumb from '../../partials/BreadCrumb';
import {Link,useNavigate} from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Constants from '../../../Constants';
import Loader from '../../partials/miniComponents/Loader';
import DataNotFound from '../../partials/miniComponents/DataNotFound';
import Pagination from "react-js-pagination";
import axios from 'axios';
import Swal from 'sweetalert2';

function ProductAttributes() {
	const [itemsCountPerPage, setItemsCountPerPage] = useState(0);
	const [totalItemsCount, setTotalItemsCount] = useState(1);
	const [startFrom, setStartFrom] = useState(1);
	const [activePage, setActivePage] = useState(1);

	const navigate = useNavigate();
	const [input, setInput] = useState({status:1});
	const [errors, setErrors] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [attributes, setAttributes] = useState([]);
	const [modalShow, setModalShow] = useState(false);
	const [modalTitle, setModalTitle] = useState('Add');
	const [isEditMode, setIsEditMode] = useState(false);

	const [valueModalShow, setValueModalShow] = useState(false);
	const [valueModalTitle, setValueModalTitle] = useState('Add');

	const [valueDetailsModalShow, setValueDetailsModalShow] = useState(false);
	const [modalValueDetails, setModalValueDetails] = useState({});

	const handleInput = (e) =>{
		setInput(prevState => ({...prevState,[e.target.name]:e.target.value}));
	}

	const getAttributes = () =>{
		setIsLoading(true);
		axios.get(`${Constants.BASE_URL}/attribute`).then((res)=>{
			setAttributes(res.data.data);
			setItemsCountPerPage(res.data.meta.per_page);
			setTotalItemsCount(res.data.meta.total);
			setStartFrom(res.data.meta.from);
			setActivePage(res.data.meta.current_page);
			setIsLoading(false);
		}).catch((err)=>{
			console.log(err);
		});
	}

	const handleAttributeDelete = (attribute_id) =>{
		Swal.fire({
          title: 'Are you sure?',
          text: "Attribute will be Deleted",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, Delete it'
        }).then((result) => {
          if (result.isConfirmed) {
            axios.delete(`${Constants.BASE_URL}/attribute/${attribute_id}`).then((res)=>{
            	Swal.fire({
				  position: 'top-end',
				  icon: res.data.cls,
				  title: res.data.msg,
				  showConfirmButton: false,
				  toast:true,
				  timer: 2500
				});
				getAttributes();
            }).catch((err)=>{
            	console.log(err);
            });

          }
        })
	}

	const handleModal = (attribute=undefined)=>{
		if(attribute!=undefined){
			setIsEditMode(true);
			setModalTitle('Update');
			setInput({id:attribute.id,name:attribute.name,status:attribute.origin_status})
		}else{
			setIsEditMode(false);
			setModalTitle('Add');
			setInput({status:1});
		}
		setModalShow(true);
		setErrors([]);
	}

	const handleAttributeCreate = () =>{
		setIsLoading(true);
		axios.post(`${Constants.BASE_URL}/attribute`,input).then((res)=>{
			setIsLoading(false);
			Swal.fire({
			  position: 'top-end',
			  icon: res.data.cls,
			  title: res.data.msg,
			  showConfirmButton: false,
			  toast:true,
			  timer: 2500
			});
			setErrors([]);
			setModalShow(false);
			getAttributes();
		}).catch((err)=>{
			setIsLoading(false);
			if(err?.response?.status == 422){
				setErrors(err.response.data.errors);
			}
		});
	}

	const handleAttributeUpdate = (attribute_id) =>{
		setIsLoading(true);
		axios.put(`${Constants.BASE_URL}/attribute/${attribute_id}`,input).then((res)=>{
			setIsLoading(false);
			Swal.fire({
			  position: 'top-end',
			  icon: res.data.cls,
			  title: res.data.msg,
			  showConfirmButton: false,
			  toast:true,
			  timer: 2500
			});
			setErrors([]);
			setModalShow(false);
			getAttributes();
		}).catch((err)=>{
			setIsLoading(false);
			if(err?.response?.status == 422){
				setErrors(err.response.data.errors);
			}
		});
	}

	const handleValueDetailsModal = (value)=>{
		setModalValueDetails(value);
		setValueDetailsModalShow(true);
	}
	const handleValueCreateModal = (attribute_id)=>{
		setIsEditMode(false);
		setValueModalShow(true);
		setValueModalTitle('Add');
		setInput({status:1,attribute_id:attribute_id});
	}

	const handleValueEditModal = (value)=>{
		setIsEditMode(true);
		setValueModalTitle('Update');
		setValueModalShow(true);
		setInput({id:value.id,name:value.name,status:value.origin_status});
		setErrors([]);
	}

	const handleValueCreate = ()=>{
		setIsLoading(true);
		axios.post(`${Constants.BASE_URL}/value`,input).then((res)=>{
			setIsLoading(false);
			Swal.fire({
			  position: 'top-end',
			  icon: res.data.cls,
			  title: res.data.msg,
			  showConfirmButton: false,
			  toast:true,
			  timer: 2500
			});
			setErrors([]);
			setValueModalShow(false);
			getAttributes();
		}).catch((err)=>{
			setIsLoading(false);
			if(err?.response?.status == 422){
				setErrors(err.response.data.errors);
			}
		});
	}

	const handleValueDelete = (value_id)=>{
		Swal.fire({
          title: 'Are you sure?',
          text: "Product attribute will be Deleted",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, Delete it'
        }).then((result) => {
          if (result.isConfirmed) {
            axios.delete(`${Constants.BASE_URL}/value/${value_id}`).then((res)=>{
            	Swal.fire({
					  position: 'top-end',
					  icon: res.data.cls,
					  title: res.data.msg,
					  showConfirmButton: false,
					  toast:true,
					  timer: 2500
					});
					getAttributes();
            }).catch((err)=>{
            	console.log(err);
            });

          }
        })
	}

	const handleValueEdit =(value_id)=>{
		setIsLoading(true);
		axios.put(`${Constants.BASE_URL}/value/${value_id}`,input).then((res)=>{
			setIsLoading(false);
			Swal.fire({
			  position: 'top-end',
			  icon: res.data.cls,
			  title: res.data.msg,
			  showConfirmButton: false,
			  toast:true,
			  timer: 2500
			});
			setErrors([]);
			setValueModalShow(false);
			getAttributes();
		}).catch((err)=>{
			setIsLoading(false);
			if(err?.response?.status == 422){
				setErrors(err.response.data.errors);
			}
		});
	}

	useEffect(()=>{
		getAttributes();
	},[]);

  return (
	<>
		<BreadCrumb title={'Product Attribute'}/>

        <div className="row">
        	<div className="col-md-12">
        		<div className="card">
        			<div className="card-header">
        				<div className="d-flex justify-content-between align-items-center">
							<h4 className={"text-theme"}>Product Attribute</h4>
							<button onClick={()=>handleModal()} className="{btn theme-button}"><i className={`fa-solid fa-plus`}></i> Add</button>
						</div>
        			</div>
        			<div className={"card-body"}>
        				<div className={'col-md-12'}>
        				{
		    				isLoading? <Loader /> :
		      			<div className={'table-responsive'}>
		      				<table className={'my-table table table-hover table-striped table-bordered'}>
		      					<thead>
		      						<tr>
		      							<th>SL</th>
		      							<th>Name</th>
		      							<th>Value</th>
		      							<th>Status</th>
		      							<th>Created By</th>
		      							<th>Date Time</th>
		      							<th>Action</th>
		      						</tr>
		      					</thead>
		      					<tbody>
		      					{Object.keys(attributes).length > 0 ?
		      						attributes.map((attribute, index)=>(
		      							<tr key={index}>
			        							<td>{startFrom+index}</td>
			        							<td>
			        								<p>{attribute.name}</p>
			        							</td>
			        							<td className={'text-center'}>
			        								<div className={'value-container-parent'}>
				        							{
				        								attribute.value != undefined? attribute.value.map((value, valIndex)=>(
				        									<div className={'value-container'}>
				        									{value.name}
				        										<div className={'value-buttons'}>
				        											<button onClick={()=>handleValueDetailsModal(value)} className={'btn-info'}><i className="fa-regular fa-eye"></i></button>
				        											<button onClick={()=>handleValueEditModal(value)} className={'btn-warning'}><i className="fa-regular fa-edit"></i></button>
				        											<button onClick={()=>handleValueDelete(value.id)} className={'btn-danger'}><i className="fa-regular fa-trash-can"></i></button>
				        										</div>
				        									</div>
				        								)):null
				        							}
				        							</div>
			        								<button onClick={()=>handleValueCreateModal(attribute.id)} className={'small-button'}><i className={`fa-solid fa-plus`}></i></button>
			        							</td>
			        							<td>
			        								<p>{attribute.status}</p>
			        							</td>
			        							<td>{attribute.created_by}</td>
			        							<td>
			        								<p>{attribute.created_at}</p>
			        								<p>{attribute.updated_at}</p>
			        							</td>
			        							<td>
			        								<button onClick={()=>handleModal(attribute)} className={'btn btn-sm btn-warning my-1 mx-1'}><i className="fa-regular fa-edit"></i></button>
			        								<button onClick={()=>handleAttributeDelete(attribute.id)} className={'btn btn-sm btn-danger my-1'}><i className="fa-regular fa-trash-can"></i></button>
			        							</td>
		        						</tr>
		      						)) : <DataNotFound />
		      					}
		      					</tbody>
		      				</table>
		    				</div>
		    				}
        				</div>
        				<div className="card-footer mb-2">
			      			<nav className="pagination-sm">
			      				 <Pagination
							          activePage={activePage}
							          itemsCountPerPage={itemsCountPerPage}
							          totalItemsCount={totalItemsCount}
							          pageRangeDisplayed={5}
							          nextPageText={'Next'}
							          prevPageText={'Previous'}
							          firstPageText={'First'}
							          lastPageText={'Last'}
							          itemClass={'page-item'}
							          linkClass={'page-link'}
							          onChange={getAttributes}
							        />
						       </nav>
			    			</div>
        				</div>
        			</div>
        		</div>
        </div>

        <Modal
        	show={modalShow}
			onHide={() => setModalShow(false)}
	      	centered
	    >
	      <Modal.Header closeButton>
	        <Modal.Title id="contained-modal-title-vcenter">
	          {modalTitle} Attribute Value
	        </Modal.Title>
	      </Modal.Header>

	      <Modal.Body>
	        <label className={"w-100 mt-4"}>
				<p>Name</p>
				<input 
					className={errors.name != undefined ? "form-control mt-2 is-invalid" : "form-control mt-2"}
					name={"name"}
					type={"text"}
					value={input.name}
					onChange={handleInput}
					placeholder={"Enter attribute name"}
				/>
				<p className="{login-error-msg}"><small>{errors.name != undefined ? errors.name[0]:''}</small></p>
			</label>
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
			<div className="d-grid mt-4">
				<button className="btn theme-button" onClick={isEditMode?()=>handleAttributeUpdate(input.id):handleAttributeCreate} dangerouslySetInnerHTML={{__html: isLoading ? '<span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>Loading...' : `${modalTitle} Attribute`}}/>
			</div>
	      </Modal.Body>

	    </Modal>

	    <Modal
        	show={valueModalShow}
			onHide={() => setValueModalShow(false)}
	      	centered
	    >
	      <Modal.Header closeButton>
	        <Modal.Title id="contained-modal-title-vcenter">
	          {valueModalTitle} Value
	        </Modal.Title>
	      </Modal.Header>

	      <Modal.Body>
	        <label className={"w-100 mt-4"}>
				<p>Name</p>
				<input 
					className={errors.name != undefined ? "form-control mt-2 is-invalid" : "form-control mt-2"}
					name={"name"}
					type={"text"}
					value={input.name}
					onChange={handleInput}
					placeholder={"Enter attribute name"}
				/>
				<p className="{login-error-msg}"><small>{errors.name != undefined ? errors.name[0]:''}</small></p>
			</label>
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
			<div className="d-grid mt-4">
				<button className="btn theme-button" onClick={isEditMode?()=>handleValueEdit(input.id):handleValueCreate} dangerouslySetInnerHTML={{__html: isLoading ? '<span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>Loading...' : `${valueModalTitle} Value`}}/>
			</div>
	      </Modal.Body>

	    </Modal>

	    <Modal
        	show={valueDetailsModalShow}
			onHide={() => setValueDetailsModalShow(false)}
	      	centered
	    >
	      <Modal.Header closeButton>
	        <Modal.Title id="contained-modal-title-vcenter">
	          Value Details
	        </Modal.Title>
	      </Modal.Header>
	      	<table className={'table table-bordered table-hover table-striped'}>
	      		<tbody>
		      		<tr>
		      			<th>ID</th>
		      			<td>{modalValueDetails.id}</td>
		      		</tr>
		      		<tr>
		      			<th>Name</th>
		      			<td>{modalValueDetails.name}</td>
		      		</tr>
		      		<tr>
		      			<th>Status</th>
		      			<td>{modalValueDetails.status}</td>
		      		</tr>
		      		<tr>
		      			<th>Created By</th>
		      			<td>{modalValueDetails.created_by}</td>
		      		</tr>
		      		<tr>
		      			<th>Created At</th>
		      			<td>{modalValueDetails.created_at}</td>
		      		</tr>
		      		<tr>
		      			<th>Updated At</th>
		      			<td>{modalValueDetails.updated_at}</td>
		      		</tr>
	      		</tbody>
	      	</table>
	      <Modal.Body>

	      </Modal.Body>

	    </Modal>
	</>
  );
}

export default ProductAttributes;