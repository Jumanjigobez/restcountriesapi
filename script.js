/*for theme_change events*/
var theme_btn = document.getElementById("theme_btn"); 

$(document).ready(function(){
	$("#theme_btn").click(function(){
		$("body").toggleClass("dark");
		if($("body").attr("class")=="light dark"){
			$("#theme_btn").html('<i class="fa fa-sun-o"></i> Light Mode');
		}else{
			$("#theme_btn").html('<i class="fa fa-moon-o"></i> Dark Mode');
		}
	});
});

/*For Dynamic Data Api*/
let search = document.getElementById("search");//input field for searching
const country_part = document.getElementById("country_part");//section where data will show

//for loading part to emphasize fetching of data
$(document).ready(function(){
	$("#loading").fadeOut(3500);
});

//searchterm search country
function searchterm(){
	let countryName = search.value;
		
	let url = `https://restcountries.com/v2/name/${countryName}`;
	$("#loading").fadeIn(1000);
	fetch(url).then((response) => response.json())
	.then((data) => {
		if(countryName!=" " && countryName.length >= 4){
			$("#loading").fadeOut(3000);
			country_part.innerHTML = `
				<a href="#${countryName}" id="link" value="${countryName}" onclick="getName(this);"><div class="card">
						<div class="flag">
							<img src="${data[0].flags.svg}" alt="${countryName} Flag Image">
						</div>
						<div class="details">
							<div class="country_name">
								<h2>${countryName}</h2>
							</div>
							<div class="country_info">
								<p><b style="font-weight:600;">Population:</b> ${data[0].population.toLocaleString()}</p>
								<p><b style="font-weight:600;">Region:</b> ${data[0].region}</p>
								<p><b style="font-weight:600;">Capital:</b> ${data[0].capital}</p>
							</div>
						</div>
					</div></a>`;
		}else{
			$("#loading").fadeOut(3000);
			fetch("https://restcountries.com/v2/all")
			.then((response) => response.json())
			.then((data) => {
				country_part.innerHTML = "";
				data.forEach(elem =>{
					country_part.innerHTML += `
						<a href="#${elem.name}" id="link" value="${elem.name}" onclick="getName(this);"><div class="card">
								<div class="flag">
									<img src="${elem.flags.svg}" alt="${elem.name} Flag Image">
								</div>
								<div class="details">
									<div class="country_name">
										<h2>${elem.name}</h2>
									</div>
									<div class="country_info">
										<p><b style="font-weight:600;">Population:</b> ${elem.population.toLocaleString()}</p>
										<p><b style="font-weight:600;">Region:</b> ${elem.region}</p>
										<p><b style="font-weight:600;">Capital:</b> ${elem.capital}</p>
									</div>
								</div>
							</div></a>`;
				});
					
				})

			.catch((error) =>{
				console.log(error);
			});
		}
			
	});
}

//filter by continent region
function filter(){
	var select = document.getElementById("region");
	var continent = select.options[select.selectedIndex].value;
	$("#loading").fadeIn(1000);
	if(continent != "all"){
		$("#loading").fadeOut(3000);
		var url = `https://restcountries.com/v2/region/${continent}`;
		fetch(url).then((response) => response.json()).then((data) => {
			country_part.innerHTML = " ";
			data.forEach(elem =>{
				country_part.innerHTML += `
						<a href="#${elem.name}" id="link" value="${elem.name}" onclick="getName(this);"><div class="card">
							<div class="flag">
								<img src="${elem.flags.svg}" alt="${elem.name} Flag Image">
							</div>
							<div class="details">
								<div class="country_name">
									<h2>${elem.name}</h2>
								</div>
								<div class="country_info">
									<p><b style="font-weight:600;">Population:</b> ${elem.population.toLocaleString()}</p>
									<p><b style="font-weight:600;">Region:</b> ${elem.region}</p>
									<p><b style="font-weight:600;">Capital:</b> ${elem.capital}</p>
								</div>
							</div>
						</div></a>`;
			});
			
		});
	}else{
		$("#loading").fadeOut(3500);
		fetch("https://restcountries.com/v2/all")
			.then((response) => response.json())
			.then((data) => {
				country_part.innerHTML = "";
				data.forEach(elem =>{
					country_part.innerHTML += `
						<a href="#${elem.name}" id="link" value="${elem.name}" onclick="getName(this);"><div class="card">
								<div class="flag">
									<img src="${elem.flags.svg}" alt="${elem.name} Flag Image">
								</div>
								<div class="details">
									<div class="country_name">
										<h2>${elem.name}</h2>
									</div>
									<div class="country_info">
										<p><b style="font-weight:600;">Population:</b> ${elem.population.toLocaleString()}</p>
										<p><b style="font-weight:600;">Region:</b> ${elem.region}</p>
										<p><b style="font-weight:600;">Capital:</b> ${elem.capital}</p>
									</div>
								</div>
							</div></a>`;
				});
					
				})

			.catch((error) =>{
				console.log(error);
			});
	}
}

//default fetching without searchterm and filter selected
fetch("https://restcountries.com/v2/all")
	.then((response) => response.json())
	.then((data) => {
		country_part.innerHTML = "";
		data.forEach(elem =>{
			country_part.innerHTML += `
				<a href="#${elem.name}" id="link" value="${elem.name}" onclick="getName(this);"><div class="card">
						<div class="flag">
							<img src="${elem.flags.svg}" alt="${elem.name} Flag Image">
						</div>
						<div class="details">
							<div class="country_name">
								<h2>${elem.name}</h2>
							</div>
							<div class="country_info">
								<p><b style="font-weight:600;">Population:</b> ${elem.population.toLocaleString()}</p>
								<p><b style="font-weight:600;">Region:</b> ${elem.region}</p>
								<p><b style="font-weight:600;">Capital:</b> ${elem.capital}</p>
							</div>
						</div>
					</div></a>`;
		});
			
		}).catch((error) =>{
		console.log(error);
});


//when a country is clicked
function getName(name){
	var country = name.getAttribute("value");
	var full_link = name.getAttribute("href");
	
	var link_name = full_link.substr(0, 0) + full_link.substr(0 + 1);//get the name of the country alone

	//the details page
	var contents = document.getElementById("contents");
	contents.innerHTML = `<a href="index.html"><button class="back_btn"><i class="fa fa-long-arrow-left"></i> Back</button></a>`;

	var url = `https://restcountries.com/v2/name/${link_name}`;
	fetch(url).then((response) => response.json()).then((data) => {
		country_part.innerHTML = " ";
			
			country_part.innerHTML = `
						<div class="details_part">
							<div class="flag">
								<img src="${data[0].flags.svg}" alt="${link_name} Flag Image">
							</div>

							<div class="details_info">
								<div class="country_name">
									<h2>${link_name}</h2>
								</div>
								<div class="info">
										<ul>
											<div class="c1">
												<li><b style="font-weight:600;">Native Name:</b> ${data[0].nativeName} </li>
												<li><b style="font-weight:600;">Population:</b> ${data[0].population.toLocaleString()}</li>
												<li><b style="font-weight:600;">Region:</b> ${data[0].region}</li>
												<li><b style="font-weight:600;">Sub Region:</b> ${data[0].subregion}</li>
												<li><b style="font-weight:600;">Capital:</b> ${data[0].capital}</li>
											</div>
											<div class="c2">
												<li><b style="font-weight:600;">Top Level Domain:</b> ${data[0].topLevelDomain[0]}</li>
												<li><b style="font-weight:600;">Currencies:</b> ${data[0].currencies.map(elem => elem.name)}</li>
												<li><b style="font-weight:600;">Languages:</b> ${data[0].languages.map(elem => elem.name)}</li>
												
											</div>
										</ul>

								</div>
								<div class="borders">
									<p><b style="font-weight:800;">Border Countries:</b>
									 ${
										data[0].borders ? data[0].borders.map((elem) => `<button class="border_btn">${elem}</button>`).join(" ") : "No Borders."
									  }
									</p>
								</div>
							</div>
						</div>
						`;
	});
		
};
