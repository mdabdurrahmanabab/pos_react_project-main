import React, {useState} from 'react';
import axios from 'axios';
import Constants from '../../Constants';

function Login() {

	const [input, setInput] = useState({});
	const [errors, setErrors] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const handleInput = (e) =>{
		setInput(prevState => ({...prevState,[e.target.name]:e.target.value}));
	}

	const handleLogin = () =>{
		setIsLoading(true);
		axios.post(`${Constants.BASE_URL}/login`,input).then((res)=>{
			localStorage.setItem("token", res.data.token);
			localStorage.setItem("name", res.data.name);
			localStorage.setItem("email", res.data.email);
			localStorage.setItem("phone", res.data.phone);
			localStorage.setItem("photo", res.data.photo);
			localStorage.setItem("role_id", res.data.role_id);
			setIsLoading(false);
			window.location.reload();
		}).catch((err)=>{
			setIsLoading(false);
			if(err?.response?.status == 422){
				setErrors(err.response.data.errors);
			}
		});
	}

  return (
	<div className="container-fluid bg-theme" id="login">
		<div className="card bg-theme">
			<div className="card-header">
				<h4>Login</h4>
			</div>

			<div className="card-body">

				<label className={"w-100"}>
					<p>Email/Phone</p>
					<input 
						className={errors.email != undefined ? "form-control mt-2 is-invalid" : "form-control mt-2"}
						type={"text"}
						name={"email"}
						onChange ={handleInput} 
					/>
				</label>
				<p className="{login-error-msg}"><small>{errors.email != undefined ? errors.email[0]:''}</small></p>

				<label className={"w-100 mt-2"}>
					<p>Password</p>
					<input 
						className={errors.password != undefined ? "form-control mt-2 is-invalid" : "form-control mt-2"}
						type={"password"}
						name={"password"}
						onChange ={handleInput} 
					/>
				</label>
				<p className="{login-error-msg}"><small>{errors.password != undefined ? errors.password[0]:''}</small></p>

				<div className="d-grid mt-4">
					<button onClick={handleLogin} className="btn btn-outline-warning" dangerouslySetInnerHTML={{__html: isLoading ? '<span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>Loading...' : "Login"}} />
				</div>

			</div>

		</div>
	</div>
  );
}

export default Login;