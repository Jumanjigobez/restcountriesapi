//Function to ease retrieval of DOM elements
const elem = x => {
  return document.querySelector(x);
};

/*for theme_change events*/
var theme_btn = elem("#theme_btn"),
  body = elem("body");

theme_btn.onclick = () => {
  body.classList.toggle("dark");
  theme_btn.innerHTML =
    body.className == "light dark"
      ? '<i class="fa fa-sun-o"></i> Light Mode'
      : '<i class="fa fa-moon-o"></i> Dark Mode';
};

/*For Dynamic Data Api*/
var search = elem("#search"), //input field for searching
  loading = elem("#loading"),
  country_part = elem("#country_part"); //section where data will show

//searchterm search country
const SearchTerm = async () => {
  let countryName = search.value;

  let url = `https://restcountries.com/v2/name/${countryName}`;
  loading.classList.remove("loaded");
  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (countryName != " " && countryName.length >= 3) {
        loading.classList.add("loaded");

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
      } else {
        fetch("https://restcountries.com/v2/all")
          .then(response => response.json())
          .then(data => {
            country_part.innerHTML = "";
            loading.classList.add("loaded");
            data.forEach(elem => {
              country_part.innerHTML += `
						<a href="#${elem.name}" id="link" value="${
                elem.name
              }" onclick="getName(this);"><div class="card">
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
      }
    })
    .catch(error => {
      console.log(error);
    });
};

//filter by continent region
const Filter = async () => {
  var select = elem("#region");
  var continent = select.options[select.selectedIndex].value;
  loading.classList.remove("loaded");

  if (continent != "all") {
    var url = `https://restcountries.com/v2/region/${continent}`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        loading.classList.add("loaded");

        country_part.innerHTML = " ";
        data.forEach(elem => {
          country_part.innerHTML += `
						<a href="#${elem.name}" id="link" value="${
            elem.name
          }" onclick="getName(this);"><div class="card">
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
  } else {
    fetch("https://restcountries.com/v2/all")
      .then(response => response.json())
      .then(data => {
        country_part.innerHTML = "";
        loading.classList.add("loaded");
        data.forEach(elem => {
          country_part.innerHTML += `
						<a href="#${elem.name}" id="link" value="${
            elem.name
          }" onclick="getName(this);"><div class="card">
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

      .catch(error => {
        console.log(error);
      });
  }
};

//default fetching without searchterm and filter selected
fetch("https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital")
  .then(response => response.json())
  .then(data => {
    country_part.innerHTML = "";
    loading.classList.add("loaded");
    data.forEach(elem => {
      country_part.innerHTML += `
				<a href="#${elem.name}" id="link" value="${
        elem.name
      }" onclick="getName(this);"><div class="card">
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
  .catch(error => {
    console.log(error);
  });

//when a country is clicked
const getName = name => {
  var country = name.getAttribute("value");
  var full_link = name.getAttribute("href");

  var link_name = full_link.substr(0, 0) + full_link.substr(0 + 1); //get the name of the country alone

  //the details page
  var contents = elem("#contents");
  contents.innerHTML = `<a href="index.html"><button class="back_btn"><i class="fa fa-long-arrow-left"></i> Back</button></a>`;

  var url = `https://restcountries.com/v2/name/${link_name}`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
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
												<li><b style="font-weight:600;">Top Level Domain:</b> ${
                          data[0].topLevelDomain[0]
                        }</li>
												<li><b style="font-weight:600;">Currencies:</b> ${data[0].currencies.map(
                          elem => elem.name
                        )}</li>
												<li><b style="font-weight:600;">Languages:</b> ${data[0].languages.map(
                          elem => elem.name
                        )}</li>
												
											</div>
										</ul>

								</div>
								<div class="borders">
									<p><b style="font-weight:800;">Border Countries:</b>
									 ${
                     data[0].borders
                       ? data[0].borders
                           .map(
                             elem =>
                               `<button class="border_btn">${elem}</button>`
                           )
                           .join(" ")
                       : "No Borders."
                   }
									</p>
								</div>
							</div>
						</div>
						`;
    });
};
