// for restoring the home page after searching
let body = document.querySelector(".main_content_header");
const lastHeader = body.cloneNode(true);
body = document.querySelector(".courses_section");
const lastCourses = body.cloneNode(true);
body = document.querySelector(".students_viewing_section");
const lastStudents = body.cloneNode(true);
body = document.querySelector(".categories");
const lastCategories = body.cloneNode(true);
//===================================================
// myData is storing the fetch return
let myData = [];
// the targeted data from search
let wantedData = [];
// holding the main content to override it
let mContent = document.querySelector(".main_content");
// results container should hold the header and results section
let resultsContainer = document.createElement("div");
resultsContainer.classList.add("search_container");
// search page's header that showing the number of results and back button
let searchHeader = document.createElement("header");
searchHeader.classList.add("results_header");
let backBtn = document.createElement("button");
backBtn.classList.add("back_btn");
backBtn.innerText = "Back";
// creating results section
let coursesSection = document.createElement("section");
coursesSection.classList.add("results_section");
// grapping the search bar input and search button 
let searchBar = document.getElementById("my_search_bar");
let searchBtn = document.getElementById("search_btn");

// activating the "Enter" to search
searchBar.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    searchBtn.click();
  }
});

// start search using search button
searchBtn.addEventListener("click", () => {
  // if user tried to search without entering any data
  if (searchBar.value === "") {
    alert("you didn't enter any thing");
  } 
  else {
    //removing every thing from home page to start the search page
    mContent.innerHTML = "";
    resultsContainer.innerHTML = "";
    searchHeader.innerHTML = "";
    coursesSection.innerHTML = "";
    // holding search input
    let key = searchBar.value;
    //taking the last targeted elements away to start a new search operation
    wantedData = [];
    // a function that appends matches to the wantedData array
    filter(key);
    let resultsNumber = document.createElement("h1");
   
    if (wantedData.length === 0) { // when no result found 
      resultsNumber.innerText = `Sorry, we couldn't find any results for "${key}"`;
      searchHeader.appendChild(resultsNumber);
      searchHeader.appendChild(backBtn);
      resultsContainer.appendChild(searchHeader);
    } else { 
      resultsNumber.innerText = `${wantedData.length} results for "${key}"`;
      searchHeader.appendChild(resultsNumber);
      searchHeader.appendChild(backBtn);
      resultsContainer.appendChild(searchHeader);
    }
     // rendering the results into the search section
    for (let i = 0; i < wantedData.length; i++) {
      createCoursesSearch(wantedData[i]);
    }
    resultsContainer.appendChild(coursesSection);
    //then pushing the results section to the main content
    mContent.appendChild(resultsContainer);
  }
});

function filter(key) {
  wantedData = [];
  for (let i = 0; i < myData.length; i++) {
    for (let j = 0; j < myData[i]["courses"].length; j++) {
      reg = new RegExp(key, "ig");//creating pattern
      if (myData[i]["courses"][j]["title"].match(reg))// check if the key in the course title
        wantedData.push(myData[i]["courses"][j]);
    }
  }
}
// creating container for course and push it into results section
function createCoursesSearch(courseData) {
  //to make the hole card act like link
  let link = document.createElement("a");
  link.classList.add("card_anchor");
  link.setAttribute("href", "/");
  //======================================
  //the card container
  let container = document.createElement("div");
  container.classList.add("course_card_for_search");
  //================================
  //image container 
  let courseImg = document.createElement("div"); 
  courseImg.classList.add("card_photo");
  let img = document.createElement("img");
  img.setAttribute("src", courseData["image"]);
  img.classList.add("search_reuslt_img");
  //=======================================
  // main information about the card
  let courseInfo = document.createElement("div"); 
  courseInfo.classList.add("card_info");
  let title = document.createElement("h3"); // title
  title.style.fontWeight = "700";
  title.style.marginBottom = "8px";
  title.innerText = courseData.title;
  let author = document.createElement("p"); // author
  author.classList.add("course_author", "search_author");
  author.innerText = courseData.author[0]["name"];
  let description = document.createElement("p"); // description
  description.classList.add("course_description_search");
  description.innerText = courseData.headline;
  let rate = document.createElement("div"); // rate
  rate.classList.add("rate");
  // handling the rate with icons 
  rate.innerText = Math.round(courseData["rating"] * 10) / 10 + " "; // taking one digit after decimal point
  let starsArr = [];
  for (let i = 1; i <= Math.round(courseData["rating"]); i++) {
    starsArr[i] = document.createElement("i");
    starsArr[i].classList.add("fa-solid", "fa-star");
    rate.appendChild(starsArr[i]);}
  //==========================================
  // the price of course and discount
  let priceDv = document.createElement("div");
  priceDv.classList.add("card_price"); 
  let price = document.createElement("h3");
  price.innerText = courseData["price"] + " $";
  let sale = document.createElement("h3");
  sale.classList.add("sale");
  sale.innerText = "35.99 $";
  //========================================
  courseImg.appendChild(img);
  courseInfo.appendChild(title);
  courseInfo.appendChild(description);
  courseInfo.appendChild(author);
  courseInfo.appendChild(rate);
  priceDv.appendChild(price);
  priceDv.appendChild(sale);
  container.appendChild(courseImg);
  container.appendChild(courseInfo);
  container.appendChild(priceDv);
  link.appendChild(container);
  coursesSection.appendChild(link);
  //
  let hr = document.createElement("hr");
  coursesSection.appendChild(hr);
}
// to go back from results page to the home page
backBtn.addEventListener("click", () => {
  searchBar.value = "";
  mContent.innerHTML = "";
  // mentioned above
  mContent.appendChild(lastHeader);
  mContent.appendChild(lastCourses);
  mContent.appendChild(lastStudents);
  mContent.appendChild(lastCategories);
});
//the ul element we are going to append in based on explore nav bar selection
let coursesList = document.querySelector(".courses_list");

/*
making buttons in explore nav bar alive
*/
// holding the head line and description of every category
let head_line = document.querySelector(".head_line");
let short_explination = document.querySelector(".short_explination");
////////////////////////////////
// holding every single button to perform action
let python = document.querySelector(".py");
let excel = document.querySelector(".excel");
let web = document.querySelector(".web");
let data = document.querySelector(".data");
let aws = document.querySelector(".aws");
let java = document.querySelector(".java");
let draw = document.querySelector(".draw");
// holding all buttons in array to set its color value to default then change the targeted one
let all = document.querySelectorAll(".click");
python.addEventListener("click", () => {
  for (let i = 0; i < 6; i++) {
    all[i].style.color = "gray";
  }
  python.style.color = "black";
  head_line.innerHTML = myData[0].sectionTitle;
  short_explination.innerHTML = myData[0].courseDesc;
  coursesList.innerHTML = "";
  for (let j = 0; j < myData[0]["courses"].length; j++) {
    createCoursesSection(myData[0]["courses"][j]);
  }
});
excel.addEventListener("click", () => {
  for (let i = 0; i < 7; i++) {
    all[i].style.color = "gray";
  }
  excel.style.color = "black";
  head_line.innerHTML = myData[1].sectionTitle;
  short_explination.innerHTML = myData[1].courseDesc;
  coursesList.innerHTML = "";
  for (let j = 0; j < myData[1]["courses"].length; j++) {
    createCoursesSection(myData[1]["courses"][j]);
  }
});
web.addEventListener("click", () => {
  for (let i = 0; i < 7; i++) {
    all[i].style.color = "gray";
  }
  web.style.color = "black";
  head_line.innerHTML = myData[2].sectionTitle;
  short_explination.innerHTML = myData[2].courseDesc;
  coursesList.innerHTML = "";
  for (let j = 0; j < myData[2]["courses"].length; j++) {
    createCoursesSection(myData[2]["courses"][j]);
  }
});
java.addEventListener("click", () => {
  for (let i = 0; i < 7; i++) {
    all[i].style.color = "gray";
  }
  java.style.color = "black";
  head_line.innerHTML = myData[3].sectionTitle;
  short_explination.innerHTML = myData[3].courseDesc;
  coursesList.innerHTML = "";
  for (let j = 0; j < myData[3]["courses"].length; j++) {
    createCoursesSection(myData[3]["courses"][j]);
  }
});
draw.addEventListener("click", () => {
  for (let i = 0; i < 7; i++) {
    all[i].style.color = "gray";
  }
  draw.style.color = "black";
  head_line.innerHTML = myData[6].sectionTitle;
  short_explination.innerHTML = myData[6].courseDesc;
  coursesList.innerHTML = "";
  for (let j = 0; j < myData[6]["courses"].length; j++) {
    createCoursesSection(myData[6]["courses"][j]);
  }
});
data.addEventListener("click", () => {
  for (let i = 0; i < 7; i++) {
    all[i].style.color = "gray";
  }
  data.style.color = "black";
  head_line.innerHTML = myData[4].sectionTitle;
  short_explination.innerHTML = myData[4].courseDesc;
  coursesList.innerHTML = "";
  for (let j = 0; j < myData[4]["courses"].length; j++) {
    createCoursesSection(myData[4]["courses"][j]);
  }
});
aws.addEventListener("click", () => {
  for (let i = 0; i < 7; i++) {
    all[i].style.color = "gray";
  }
  aws.style.color = "black";
  head_line.innerHTML = myData[5].sectionTitle;
  short_explination.innerHTML = myData[5].courseDesc;
  coursesList.innerHTML = "";
  for (let j = 0; j < myData[5]["courses"].length; j++) {
    createCoursesSection(myData[5]["courses"][j]);
  }
});
// rendering the course into the courses section
function createCoursesSection(courseData) {
  let link = document.createElement("a");
  link.setAttribute("href", "/");
  let listItem = document.createElement("li");
  let cardContainer = document.createElement("div");
  cardContainer.classList.add("card_container");
  let photoContainer = document.createElement("div");
  photoContainer.classList.add("course_photo");
  let img = document.createElement("img");
  img.setAttribute("src", courseData.image);
  photoContainer.appendChild(img);
  cardContainer.appendChild(photoContainer);
  let title = document.createElement("div");
  title.classList.add("course_decription");
  title.innerText = courseData.title;
  cardContainer.appendChild(title);
  let author = document.createElement("div");
  author.classList.add("course_author");
  author.innerText = courseData["author"][0]["name"];
  cardContainer.appendChild(author);
  let rate = document.createElement("div");
  rate.classList.add("rate");
  rate.innerText = Math.round(courseData["rating"] * 10) / 10 + " ";
  let starsArr = [];
  for (let i = 1; i <= Math.round(courseData["rating"]); i++) {
    starsArr[i] = document.createElement("i");
    starsArr[i].classList.add("fa-solid", "fa-star");
    rate.appendChild(starsArr[i]);
  }
  cardContainer.appendChild(rate);
  let price = document.createElement("div");
  price.classList.add("course_price");
  price.innerText = courseData["price"] + " $";
  cardContainer.appendChild(price);
  listItem.appendChild(cardContainer);
  link.appendChild(listItem);
  coursesList.appendChild(link);
}

fetch("https://mocki.io/v1/e65cdce3-bbfa-4c52-bcbe-169775dd3ba5")
  .then((response) => {
    return response.json();
  })
  .then((arr) => {
    myData = arr;
    for (let i = 0; i < arr[0]["courses"].length; i++) {
      createCoursesSection(arr[0]["courses"][i]);
    }
  });
