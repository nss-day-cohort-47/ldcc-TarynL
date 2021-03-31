import { getLoggedInUser } from "../data/apiManager.js"

import { useSnackToppingsCollection, getSnackToppings } from "../data/apiManager.js"




export const renderToppings = () => {

	// const toppingTarget = document.querySelector(".toppingDropdown")
	const toppingList = useSnackToppingsCollection();
	let toppingOptions = toppingList.map(singleTopping => {
		return `<option value="${singleTopping.id}">${singleTopping.name}</option>`


	})
	return toppingOptions.join("")

	// toppingTarget.innerHTML = 
	
		
		

}

export const populateToppings = () => {
	getSnackToppings()
		.then(() => {
			const selectTopping = useSnackToppingsCollection()
			renderToppings(selectTopping);
		})
}


	


export const NavBar = () => {
	//only show navItems and addTypeButton if user is logged in

	const navItems = getLoggedInUser().id ? `
	<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
		<span class="navbar-toggler-icon"></span>
	</button>
	<div class="collapse navbar-collapse" id="navbarSupportedContent">
	<ul class="navbar-nav me-auto mb-2 mb-lg-0">
		<li class="nav-item ms-1">
			<button class="btn btn-info" type="button" id="allSnacks">All Snacks</button>
		</li>
		<li class="nav-item ms-1">
		 <div class ="toppingDropdown btn btn-info" id = "toppingDropdown" aria-label="Select A Topping">
		
			<select id ="dropdown"  class="toppingDropdown btn btn-info"><option value=0>Select A Topping</option>${renderToppings()}</select>
			</div>
		</li>
		<li class="nav-item ms-1">
			<button class="btn btn-info" type="button" id="addTopping">Add/Edit Topping</button>
		</li>
		<li class="nav-item ms-1">
			<button class="btn btn-info" type="button" id="logout">Logout</button>
		</li>
	</ul>
	</div>` : ""

	const addTypeButton = getLoggedInUser().admin ? `
	<nav class="navbar navbar-light"">
		<div class="container-fluid">
			<button class="btn btn-outline-primary" id = "addTypeBtn" type="button">Add A Type</button>
			
		</div>
	</nav>` : ""

	return `
	<nav class="navbar navbar-expand-lg navbar-dark bg-primary">
  		<div class="container-fluid">
		  <span class="navbar-brand mb-0 h1">LDCC
		  	<span class="navbar-text">Little Debbie Collector Club</span>
		  </span>
		${navItems}
  		</div>
	</nav>
	${addTypeButton}
	`
}