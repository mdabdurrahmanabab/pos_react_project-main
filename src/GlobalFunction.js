const GlobalFunction = {
	logout(){
		localStorage.removeItem("token");
        localStorage.removeItem("name");
        localStorage.removeItem("email");
        localStorage.removeItem("phone");
        localStorage.removeItem("photo");
        localStorage.removeItem("role_id");
        window.location.href = window.location.origin;
	},
}

export default GlobalFunction;