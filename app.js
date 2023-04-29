const API = "https://api.github.com/users/";
const main = document.querySelector("#main");
const searchBox = document.querySelector("#search")

const User = async (username) => {
    
  const response = await fetch(API + username);
  const data = await response.json();
  console.log(data)

  const card = `
  
  <div class="card">
    <div>
        <img class="avatar" src="${data.avatar_url}" alt="florin pop">
    </div>

    <div class="user-info">
        <h2>${data.name}</h2>
        <p>${data.bio}</p>
        <p>${data.blog}</p>

        <ul class="info">
            <li>${data.followers}<strong>Followers</strong></li>
            <li>${data.following}<strong>Following</strong></li>
            <li>${data.public_repos}<strong>Repos</strong></li>
        </ul>

        <div id="repos">
            
            </div>
           
        </div>

    </div>
</div>

`;
  main.innerHTML = card;

  getRepos(username);
};



const getRepos = async (username) => {
    const repos = document.querySelector("#repos")
  const res = await fetch(API + username + "/repos");
  const data = await res.json();
data.forEach(
    (item) => {
        
        const elem =  document.createElement("a")
        elem.classList.add("repo")
        elem.href = item.html_url
        elem.innerText = item.name
        elem.target = "_blank"
        repos.appendChild(elem)
    }
)
 
};



const formSubmit = () =>{
   
    if(searchBox.value != ""){
        User(searchBox.value)
        User(searchBox.name)
        searchBox.value = "";   
    }
    return false
   
}

searchBox.addEventListener(
    "focusout",
    function () {
        formSubmit()
    }
)