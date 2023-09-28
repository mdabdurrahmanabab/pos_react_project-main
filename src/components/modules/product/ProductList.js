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

function ProductList() {
	const [itemsCountPerPage, setItemsCountPerPage] = useState(0);
	const [totalItemsCount, setTotalItemsCount] = useState(1);
	const [startFrom, setStartFrom] = useState(1);
	const [activePage, setActivePage] = useState(1);
	const [products, setProducts] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const [input, setInput] = useState({
		search:'',
		order_by:'created_at',
		direction:'desc',
		per_page:10
	});
	

	const handleInput = (e) =>{
		setInput(prevState => ({...prevState,[e.target.name]:e.target.value}));
	}


	const getProducts =(pageNumber) =>{
		setIsLoading(true);
		axios.get(`${Constants.BASE_URL}/product?page=${pageNumber}&search=${input.search}&order_by=${input.order_by}&direction=${input.direction}&per_page=${input.per_page}`).then((res)=>{
			setProducts(res.data.data);
			setItemsCountPerPage(res.data.meta.per_page);
			setTotalItemsCount(res.data.meta.total);
			setStartFrom(res.data.meta.from);
			setActivePage(res.data.meta.current_page);
			setIsLoading(false);
		});

	}

	const handleProductDelete =(id)=>{
		Swal.fire({
          title: 'Are you sure?',
          text: "Brand will be Deleted",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, Delete it'
        }).then((result) => {
          if (result.isConfirmed) {
            axios.delete(`${Constants.BASE_URL}/product/${id}`).then((res)=>{
            	Swal.fire({
							  position: 'top-end',
							  icon: res.data.cls,
							  title: res.data.msg,
							  showConfirmButton: false,
							  toast:true,
							  timer: 2500
							});
							getProducts();
            }).catch((err)=>{
            	console.log(err);
            });

          }
        })
	}

	useEffect(()=>{
		getProducts();
	},[]);

  return (
	<>
		<BreadCrumb title={'Product List'}/>

        <div className="row">
        	<div className="col-md-12">
        		<div className="card">
        			<div className="card-header">
        					<CardHeader title={'Product List'} link={'/product/create'} icon={'fa-add'} button_text={'Add'}/>
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
      								<button className="btn btn-sm theme-button" onClick={()=>getProducts(1)}><i className="fa-solid fa-magnifying-glass"></i> Search</button>
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
	        							<th>Price</th>
	        							<th>Status</th>
	        							<th>Category</th>
	        							<th>Photo</th>
	        							<th>Date Time</th>
	        							<th>Action</th>
	        						</tr>
	        					</thead>
	        					<tbody>
	        					{Object.keys(products).length > 0 ?
	        						products.map((product, index)=>(
	        							<tr key={index}>
			        							<td>{startFrom+index}</td>
			        							<td>
			        								<p className="text-theme">Name : {product.name}</p>
			        								<p className="text-success">Slug : {product.slug}</p>
			        								{
			        									product.attributes != undefined && Object.keys(product.attributes).length > 0 ? product.attributes.map((attribute, index)=>(
			        										<p>{attribute.name} : {attribute.value}</p>
			        									)) :null
			        								}
			        							</td>
			        							<td>
			        								<p className="text-theme">Price : {product.price}</p>
			        								<p className="text-success">Discount % : {product.discount_percent} + {product.discount_fixed}</p>
			        								<p className="text-theme">Cost : {product.cost}</p>
			        								<p className="text-theme">Discount Start : {product.discount_start}</p>
			        								<p className="text-theme">Discount End : {product.discount_end}</p>
			        							</td>
			        							<td>
			        								<p className="text-theme">Status : {product.status}</p>
			        								<p className="text-success">SKU : {product.sku}</p>
			        								<p className="text-theme">Stock : {product.stock}</p>
			        							</td>
			        							<td>
			        								<p className="text-theme">Category : {product.category}</p>
			        								<p className="text-success">Sub Category : {product.sub_category}</p>
			        								<p className="text-theme">Brand : {product.brand}</p>
			        								<p className="text-success">Origin : {product.country}</p>
			        								<p className="text-theme">Supplier : {product.supplier}</p>
			        							</td>
			        							<td>
			        								<img 
			        								src={product.primary_photo} alt={product.name} 
			        								className={'img-thumbnail table-image'}/>
			        							</td>
			        							<td>
			        								<p className="text-theme">Created At: {product.created_at}</p>
			        								<p className="text-success">Updated At: {product.updated_at}</p>
			        								<p className="text-theme">Created By: {product.created_by}</p>
			        								<p className="text-success">Updated By: {product.updated_by}</p>
			        							</td>
			        							<td>
			        								<button className={'btn btn-sm btn-info my-1'}><i className="fa-regular fa-eye"></i></button>
			        								<Link to={`/product/edit/${product.id}`}><button className={'btn btn-sm btn-warning my-1 mx-1'}><i className="fa-regular fa-edit"></i></button> </Link>
			        								<button onClick={()=>handleProductDelete(product.id)} className={'btn btn-sm btn-danger my-1'}><i className="fa-regular fa-trash-can"></i></button>
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
						          onChange={getProducts}
						        />
					       </nav>
        			</div>

        		</div>
        	</div>
        </div>
	</>
  );
}

export default ProductList;