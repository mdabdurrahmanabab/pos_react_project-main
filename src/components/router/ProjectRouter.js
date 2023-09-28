import React from 'react';
import {createBrowserRouter} from 'react-router-dom';
import Master from '../layouts/Master';
import Dashboard from '../modules/Dashboard';
import AddCategory from '../modules/category/AddCategory';
import CategoryEdit from '../modules/category/CategoryEdit';
import CategoryList from '../modules/category/CategoryList';
import SubCategoryAdd from '../modules/subCategory/SubCategoryAdd';
import SubCategoryList from '../modules/subCategory/SubCategoryList';
import SubCategoryEdit from '../modules/subCategory/SubCategoryEdit';
import BrandAdd from '../modules/brand/BrandAdd';
import BrandList from '../modules/brand/BrandList';
import BrandEdit from '../modules/brand/BrandEdit';
import SupplierList from '../modules/supplier/SupplierList';
import SupplierAdd from '../modules/supplier/SupplierAdd';
import SupplierEdit from '../modules/supplier/SupplierEdit';
import ProductAttributes from '../modules/productAttribute/ProductAttributes';
import ProductAdd from '../modules/product/ProductAdd';
import ProductList from '../modules/product/ProductList';
import AddProductPhoto from '../modules/product/AddProductPhoto';
import AddShop from '../modules/shop/AddShop';
import ShopList from '../modules/shop/ShopList';
import EditShop from '../modules/shop/EditShop';
import AddSalesManager from '../modules/salesManager/AddSalesManager';
import Error500 from '../modules/Error500';


const ProjectRouter = createBrowserRouter([
		{
			path:'/',
			element: <Master/>,
			children:[
				{
					path:'/',
					element: <Dashboard/>
				},
				{
					path:'/category',
					element: <CategoryList/>
				},
				{
					path:'/category/create',
					element: <AddCategory/>
				},
				{
					path:'/category/edit/:id',
					element: <CategoryEdit/>
				},
				{
					path:'/sub-category',
					element: <SubCategoryList/>
				},
				{
					path:'/sub-category/create',
					element: <SubCategoryAdd/>
				},
				{
					path:'/sub-category/edit/:id',
					element: <SubCategoryEdit/>
				},
				{
					path:'/brand',
					element: <BrandList/>
				},
				{
					path:'/brand/create',
					element: <BrandAdd/>
				},
				{
					path:'/brand/edit/:id',
					element: <BrandEdit/>
				},
				{
					path:'/supplier',
					element: <SupplierList/>
				},
				{
					path:'/supplier/create',
					element: <SupplierAdd/>
				},
				{
					path:'/supplier/edit/:id',
					element: <SupplierEdit/>
				},
				{
					path:'/product-attributes',
					element: <ProductAttributes/>
				},
				{
					path:'/product',
					element: <ProductList/>
				},
				{
					path:'/product/create',
					element: <ProductAdd/>
				},
				{
					path:'/product/photo/:id',
					element: <AddProductPhoto/>
				},
				{
					path:'/shop',
					element: <ShopList/>
				},
				{
					path:'/shop/create',
					element: <AddShop/>
				},
				{
					path:'/sales-manager/create',
					element: <AddSalesManager/>
				},
				{
					path:'/shop/edit/:id',
					element: <EditShop/>
				},
				{
					path:'/error-500',
					element: <Error500/>
				},

				],
		},
	]);

export default ProjectRouter;