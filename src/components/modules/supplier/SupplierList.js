import React,{useState,useEffect} from 'react';
import BreadCrumb from '../../partials/BreadCrumb';
import {Link} from 'react-router-dom';
import CardHeader from '../../partials/miniComponents/CardHeader';
import Loader from '../../partials/miniComponents/Loader';
import DataNotFound from '../../partials/miniComponents/DataNotFound';
import CategoryPhotoModal from '../../partials/modals/CategoryPhotoModal';
import SupplierDetails from './partials/SupplierDetails';
import axios from 'axios';
import Constants from '../../../Constants';
import Pagination from "react-js-pagination";
import Swal from 'sweetalert2';

function SupplierList() {
	const [itemsCountPerPage, setItemsCountPerPage] = useState(0);
	const [totalItemsCount, setTotalItemsCount] = useState(1);
	const [startFrom, setStartFrom] = useState(1);
	const [activePage, setActivePage] = useState(1);

	const [modalShow, setModalShow] = React.useState(false);
	const [detailsModalShow, setDetailsModalShow] = React.useState(false);
	const [modalPhoto, setModalPhoto] = useState('');
	const [suppliers, setSuppliers] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [supplier, setSupplier] = useState({});

	const [input, setInput] = useState({
		search:'',
		order_by:'created_at',
		direction:'desc',
		per_page:10
	});
	

	const handleInput = (e) =>{
		setInput(prevState => ({...prevState,[e.target.name]:e.target.value}));
	}


	const getSupplier =(pageNumber) =>{
		setIsLoading(true);
		axios.get(`${Constants.BASE_URL}/supplier?page=${pageNumber}&search=${input.search}&order_by=${input.order_by}&direction=${input.direction}&per_page=${input.per_page}`).then((res)=>{
			setSuppliers(res.data.data);
			setItemsCountPerPage(res.data.meta.per_page);
			setTotalItemsCount(res.data.meta.total);
			setStartFrom(res.data.meta.from);
			setActivePage(res.data.meta.current_page);
			setIsLoading(false);
			console.log(res.data);
		});

	}

	const handlePhotoModal =(photo) =>{
		setModalPhoto(photo);
		setModalShow(true);
	}
	const handleDetailsModal =(supplier) =>{
		setSupplier(supplier);
		setDetailsModalShow(true);
	}
	const handleSupplierDelete =(id)=>{
		Swal.fire({
          title: 'Are you sure?',
          text: "Supplier will be Deleted",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, Delete it'
        }).then((result) => {
          if (result.isConfirmed) {
            axios.delete(`${Constants.BASE_URL}/supplier/${id}`).then((res)=>{
            	Swal.fire({
							  position: 'top-end',
							  icon: res.data.cls,
							  title: res.data.msg,
							  showConfirmButton: false,
							  toast:true,
							  timer: 2500
							});
							getSupplier();
            }).catch((err)=>{
            	console.log(err);
            });

          }
        })
	}

	useEffect(()=>{
		getSupplier();
	},[]);

  return (
	<>
		<BreadCrumb title={'Supplier List'}/>

    <div className="row">
    	<div className="col-md-12">
    		<div className="card">
    			<div className="card-header">
    					<CardHeader title={'Supplier List'} link={'/supplier/create'} icon={'fa-add'} button_text={'Add'}/>
    			</div>
    			<div className={"card-body"}>
    			<div className="search-area">
    				<div className="row">
    					<div className="col-md-3">
    						<label className={"w-100 mb-2"}>
      						<p>Search</p>
      						<input 
      							className={"form-control form-control-sm mt-1"}
      							name={"search"}
      							type={"text"}
      							value={input.search}
      							onChange={handleInput}
      							placeholder={"Search..."}
      						/>
      					</label>
    					</div>
    					<div className="col-md-3">
    						<label className={"w-100 mb-2"}>
      						<p>Order By</p>
      						<select 
      							className={"form-select form-select-sm mt-1"}
      							name={"order_by"}
      							value={input.order_by}
      							onChange={handleInput} >

        						<option value="name">Name</option>
        						<option value="created_at">Created At</option>
        						<option value="updated_at">Updated At</option>
        						<option value="status">Status</option>

      						</select>
      					</label>
    					</div>
    					<div className="col-md-2">
    						<label className={"w-100 mb-2"}>
      						<p>Order Direction</p>
      						<select 
      							className={"form-select form-select-sm mt-1"}
      							name={"direction"}
      							value={input.direction}
      							onChange={handleInput} >

        						<option value="asc">ASC</option>
        						<option value="desc">DESC</option>

      						</select>
      					</label>
    					</div>
    					<div className="col-md-2">
    						<label className={"w-100 mb-2"}>
      						<p>Per Page</p>
      						<select 
      							className={"form-select form-select-sm mt-1"}
      							name={"per_page"}
      							value={input.per_page}
      							onChange={handleInput} >

        						<option value="10">10</option>
        						<option value="25">25</option>
        						<option value="50">50</option>
        						<option value="100">100</option>

      						</select>
      					</label>
    					</div>
    					<div className="col-md-2">
  							<div className="d-grid mt-4">
  								<button className="btn btn-sm theme-button" onClick={()=>getSupplier(1)}><i className="fa-solid fa-magnifying-glass"></i> Search</button>
  							</div>
  						</div>
    				</div>
    			</div>
    			{
    				isLoading? <Loader /> :
      			<div className={'table-responsive'}>
      				<table className={'my-table table table-hover table-striped table-bordered'}>
      					<thead>
      						<tr>
      							<th>SL</th>
      							<th>Name</th>
      							<th>Email/Phone</th>
      							<th>Logo</th>
      							<th>Created By</th>
      							<th>Date Time</th>
      							<th>Action</th>
      						</tr>
      					</thead>
      					<tbody>
      					{Object.keys(suppliers).length > 0 ?
      						suppliers.map((supplier, index)=>(
      							<tr key={index}>
	        							<td>{startFrom+index}</td>
	        							<td>
	        								<p>Name : {supplier.name}</p>
	        							</td>
	        							<td>
	        								<p className={'text-success'}>Email : {supplier.email}</p>
	        								<p className={'text-info'}>Phone : {supplier.phone}</p>
	        							</td>
	        							<td>
	        								<img 
	        								onClick={()=>handlePhotoModal(supplier.logo_full)} 
	        								src={supplier.logo} alt={supplier.name} 
	        								className={'img-thumbnail table-image'}/>
	        							</td>
	        							<td>{supplier.created_by} </td>
	        							<td>
	        								<p>{supplier.created_at}</p>
	        								<p>{supplier.updated_at}</p>
	        							</td>
	        							<td>
	        								<button onClick={()=>handleDetailsModal(supplier)}  className={'btn btn-sm btn-info my-1'}><i className="fa-regular fa-eye"></i></button>
	        								<Link to={`/supplier/edit/${supplier.id}`}><button className={'btn btn-sm btn-warning my-1 mx-1'}><i className="fa-regular fa-edit"></i></button> </Link>
	        								<button onClick={()=>handleSupplierDelete(supplier.id)} className={'btn btn-sm btn-danger my-1'}><i className="fa-regular fa-trash-can"></i></button>
	        							</td>
        						</tr>
      						)) : <DataNotFound />
      					}
      					</tbody>
      				</table>

      				<CategoryPhotoModal
				        show={modalShow}
				        onHide={() => setModalShow(false)}
				        title={'Supplier Photo'}
				        size={''}
				        photo={modalPhoto}
				      />

				      <SupplierDetails
				        show={detailsModalShow}
				        onHide={() => setDetailsModalShow(false)}
				        title={'Supplier Details'}
				        size={''}
				        supplier={supplier}
				      />

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
				          onChange={getSupplier}
				        />
			       </nav>
    			</div>

    		</div>
    	</div>
    </div>
	</>
  );
}

export default SupplierList;