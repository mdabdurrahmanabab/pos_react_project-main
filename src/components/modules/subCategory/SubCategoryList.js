import React,{useState,useEffect} from 'react';
import BreadCrumb from '../../partials/BreadCrumb';
import {Link} from 'react-router-dom';
import CardHeader from '../../partials/miniComponents/CardHeader';
import Loader from '../../partials/miniComponents/Loader';
import DataNotFound from '../../partials/miniComponents/DataNotFound';
import CategoryPhotoModal from '../../partials/modals/CategoryPhotoModal';
import CategoryDetailsModal from '../../partials/modals/CategoryDetailsModal';
import axios from 'axios';
import Constants from '../../../Constants';
import Pagination from "react-js-pagination";
import Swal from 'sweetalert2';

function SubCategoryList() {
	const [itemsCountPerPage, setItemsCountPerPage] = useState(0);
	const [totalItemsCount, setTotalItemsCount] = useState(1);
	const [startFrom, setStartFrom] = useState(1);
	const [activePage, setActivePage] = useState(1);

	const [modalShow, setModalShow] = React.useState(false);
	const [detailsModalShow, setDetailsModalShow] = React.useState(false);
	const [modalPhoto, setModalPhoto] = useState('');
	const [subCategories, setSubCategories] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [subCategory, setSubCategory] = useState({});

	const [input, setInput] = useState({
		search:'',
		order_by:'serial',
		direction:'asc',
		per_page:10
	});
	

	const handleInput = (e) =>{
		setInput(prevState => ({...prevState,[e.target.name]:e.target.value}));
	}


	const getSubCategories =(pageNumber) =>{
		setIsLoading(true);
		axios.get(`${Constants.BASE_URL}/sub-category?page=${pageNumber}&search=${input.search}&order_by=${input.order_by}&direction=${input.direction}&per_page=${input.per_page}`).then((res)=>{
			setSubCategories(res.data.data);
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
	const handleDetailsModal =(subCategory) =>{
		setSubCategory(subCategory);
		setDetailsModalShow(true);
	}
	const handleSubCategoryDelete =(id)=>{
		Swal.fire({
          title: 'Are you sure?',
          text: "Sub Category will be Deleted",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, Delete it'
        }).then((result) => {
          if (result.isConfirmed) {
            axios.delete(`${Constants.BASE_URL}/sub-category/${id}`).then((res)=>{
            	Swal.fire({
							  position: 'top-end',
							  icon: res.data.cls,
							  title: res.data.msg,
							  showConfirmButton: false,
							  toast:true,
							  timer: 2500
							});
							getSubCategories();
            }).catch((err)=>{
            	console.log(err);
            });

          }
        })
	}

	useEffect(()=>{
		getSubCategories();
	},[]);

  return (
	<>
		<BreadCrumb title={'Sub Category List'}/>

    <div className="row">
    	<div className="col-md-12">
    		<div className="card">
    			<div className="card-header">
    					<CardHeader title={'Sub Category List'} link={'/sub-category/create'} icon={'fa-add'} button_text={'Add'}/>
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
        						<option value="serial">Serial</option>
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
  								<button className="btn btn-sm theme-button" onClick={()=>getSubCategories(1)}><i className="fa-solid fa-magnifying-glass"></i> Search</button>
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
      							<th>Category</th>
      							<th>Name/Slug</th>
      							<th>Serial/Status</th>
      							<th>Photo</th>
      							<th>Created By</th>
      							<th>Date Time</th>
      							<th>Action</th>
      						</tr>
      					</thead>
      					<tbody>
      					{Object.keys(subCategories).length > 0 ?
      						subCategories.map((subcategory, index)=>(
      							<tr key={index}>
	        							<td>{startFrom+index}</td>
	        							<td>
	        								<p>{subcategory.category_name}</p>
	        							</td>
	        							<td>
	        								<p>Name : {subcategory.name}</p>
	        								<p>Slug : {subcategory.slug}</p>
	        							</td>
	        							<td>
	        								<p>Serial : {subcategory.serial}</p>
	        								<p>Status : {subcategory.status}</p>
	        							</td>
	        							<td>
	        								<img 
	        								onClick={()=>handlePhotoModal(subcategory.photo_full)} 
	        								src={subcategory.photo} alt={subcategory.name} 
	        								className={'img-thumbnail table-image'}/>
	        							</td>
	        							<td>{subcategory.created_by}</td>
	        							<td>
	        								<p>{subcategory.created_at}</p>
	        								<p>{subcategory.updated_at}</p>
	        							</td>
	        							<td>
	        								<button onClick={()=>handleDetailsModal(subcategory)}  className={'btn btn-sm btn-info my-1'}><i className="fa-regular fa-eye"></i></button>
	        								<Link to={`/sub-category/edit/${subcategory.id}`}><button className={'btn btn-sm btn-warning my-1 mx-1'}><i className="fa-regular fa-edit"></i></button> </Link>
	        								<button onClick={()=>handleSubCategoryDelete(subcategory.id)} className={'btn btn-sm btn-danger my-1'}><i className="fa-regular fa-trash-can"></i></button>
	        							</td>
        						</tr>
      						)) : <DataNotFound />
      					}
      					</tbody>
      				</table>

      				<CategoryPhotoModal
				        show={modalShow}
				        onHide={() => setModalShow(false)}
				        title={'Sub Category Photo'}
				        size={''}
				        photo={modalPhoto}
				      />

				      <CategoryDetailsModal
				        show={detailsModalShow}
				        onHide={() => setDetailsModalShow(false)}
				        title={'Sub Category Details'}
				        size={''}
				        category={subCategory}
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
				          onChange={getSubCategories}
				        />
			       </nav>
    			</div>

    		</div>
    	</div>
    </div>
	</>
  );
}

export default SubCategoryList;