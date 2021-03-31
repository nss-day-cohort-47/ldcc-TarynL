console.log('yum, yum, yum');

import { LoginForm } from "./auth/LoginForm.js";
import { RegisterForm } from "./auth/RegisterForm.js";
import { NavBar } from "./nav/NavBar.js";
// import {  renderToppings } from "./nav/NavBar.js";
import { SnackList } from "./snacks/SnackList.js";
import { SnackDetails } from "./snacks/SnackDetails.js";
import { Footer } from "./nav/Footer.js";
import {TypeEdit} from "./snacks/TypeEdit.js"
import {
	logoutUser, setLoggedInUser, loginUser, registerUser, getLoggedInUser,
	getSnacks, getSingleSnack, getToppings, getSnackToppings, useSnackToppingsCollection,getSnackSelection, createType 
} from "./data/apiManager.js";



const applicationElement = document.querySelector("#ldsnacks");

//login/register listeners
applicationElement.addEventListener("click", event => {
	event.preventDefault();
	if (event.target.id === "login__submit") {
		//collect all the details into an object
		const userObject = {
			name: document.querySelector("input[name='name']").value,
			email: document.querySelector("input[name='email']").value
		}
		loginUser(userObject)
			.then(dbUserObj => {
				if (dbUserObj) {
					sessionStorage.setItem("user", JSON.stringify(dbUserObj));
					startLDSnacks();
				} else {
					//got a false value - no user
					const entryElement = document.querySelector(".entryForm");
					entryElement.innerHTML = `<p class="center">That user does not exist. Please try again or register for your free account.</p> ${LoginForm()} <hr/> <hr/> ${RegisterForm()}`;
				}
			})
	} else if (event.target.id === "register__submit") {
		//collect all the details into an object
		const userObject = {
			name: document.querySelector("input[name='registerName']").value,
			email: document.querySelector("input[name='registerEmail']").value,
			admin: false
		}
		registerUser(userObject)
			.then(dbUserObj => {
				sessionStorage.setItem("user", JSON.stringify(dbUserObj));
				startLDSnacks();
			})
	}
})

applicationElement.addEventListener("click", event => {
	if (event.target.id === "logout") {
		logoutUser();
		sessionStorage.clear();
		checkForUser();
	}
})
// end login register listeners

// snack listeners
applicationElement.addEventListener("click", event => {
	event.preventDefault();

	if (event.target.id.startsWith("detailscake")) {
		const snackId = event.target.id.split("__")[1];
		getSingleSnack(snackId)
			.then(snackObj => {
				getSnackToppings(snackId)
				.then(snackToppings => {
					snackToppings
					showDetails(snackObj,snackToppings) ;
				})
				
			})
	}
})

applicationElement.addEventListener("click", event => {
	event.preventDefault();
	if (event.target.id === "allSnacks") {
		showSnackList();
	}
})




// const showToppingList = (select) => {
// 	getSnackCollection()
// 	.then(response => {
// 		return response;
// 	})
// 	.then ( () => {
// 		const toppingArray = useSnackToppingsCollection().filter (selectedTopping => {
// 			if (selectedTopping.name === select){
// 				currentSnack = selectedTopping
// 				return selectedTopping
// 			}
			
// 		})
// 		const listElement = document.querySelector("#mainContent")
// 		listElement.innerHTML = Snacklist(toppingArray)
// 	})

// }
applicationElement.addEventListener("change", event => {
	
		event.preventDefault()
		if (event.target.id === "dropdown"){
			
		let toppingValue = event.target.value
		getSnackSelection(toppingValue)
		
		.then (response => {
			let selectedToppingArray = [];
			response.forEach(topping => {
				selectedToppingArray.push(topping.snack)
			})
			const listElement = document.querySelector("#mainContent")
		listElement.innerHTML = SnackList(selectedToppingArray)
		})
	}
	})

// 		let toppings = getSnackCollection()
// 		for (let snack of toppings){
// 		if (event.target.value === snack.type.name ) {
// 			sSnackList(snack);
// 		}
// 	}
// }






const showDetails = (snackObj,snackToppings) => {
	const listElement = document.querySelector("#mainContent");
	listElement.innerHTML = SnackDetails(snackObj, snackToppings);
}


//end snack listeners

const checkForUser = () => {
	if (sessionStorage.getItem("user")) {
		setLoggedInUser(JSON.parse(sessionStorage.getItem("user")));
		startLDSnacks();
	} else {
		applicationElement.innerHTML = "";
		//show login/register
		showNavBar()
		showLoginRegister();
	}
}

const showLoginRegister = () => {
	//template strings can be used here too
	applicationElement.innerHTML += `${LoginForm()} <hr/> <hr/> ${RegisterForm()}`;
}

const showNavBar = () => {
	
	applicationElement.innerHTML += NavBar();
	
}

const showSnackList = () => {
	getSnacks().then(allSnacks => {
		const listElement = document.querySelector("#mainContent")
		listElement.innerHTML = SnackList(allSnacks);
	})
}


// working on Type Button
const showTypeEdit = () => {
    applicationElement.innerHTML = `${TypeEdit()}`
}


applicationElement.addEventListener("click", event => {
    if(event.target.id === "addTypeBtn"){
        applicationElement.innerHTML = ""
        showNavBar();
		showTypeEdit();
        
        
    }
})



applicationElement.addEventListener("click", event => {
    if(event.target.id === "submitType"){
        const typeObj = {
		
        name : document.querySelector(".newType").value
        }
        createType(typeObj)
        startLDSnacks();
    }
})

const cancel = () => {
    const cancelElement = documet.querySelector(".addType")
    cancelElement.innerHTML = startLDSnacks();
}

applicationElement.addEventListener("click", event => {
    if(event.target.id === "cancelType"){
        cancel();
        
    }
})


// toppings drop down 
// const showToppingsList = () => {
// 	getSnackToppings().then(allToppings =>{
// 		const toppingElement = document.querySelector(".toppingDropdown")
// 		toppingElement.innerHTML = useSnackToppingsCollection(allToppings);
// 	})
// }

const showFooter = () => {
	applicationElement.innerHTML += Footer();
}

const startLDSnacks = () => {
	getSnackToppings()
	.then(() => {
		applicationElement.innerHTML = "";
		showNavBar();
		applicationElement.innerHTML += `<div id="mainContent"></div>`;
		showSnackList();
		showFooter();
	})
	
	
	
}

checkForUser();
