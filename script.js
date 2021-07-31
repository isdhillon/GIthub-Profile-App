//declarations
let input=document.querySelector(".input");
let Username;
let submitBtn=document.querySelector(".submit")
let url="https://api.github.com/users/"
let uName=document.querySelector(".name")
let avatarImg=document.querySelector(".avatar-img")
let description=document.querySelector(".description");
let followers=document.querySelector(".followers")
let following=document.querySelector(".following")
let repo=document.querySelector(".repos");
let repoContainer=document.querySelector(".repo-container")
//submit btn event listener
submitBtn.addEventListener("click",function(){
    let userName=input.value;
    repoContainer.innerHTML=""
    getUser(userName)
})
//get user
async function getUser(userName){
    //await for link
    let resp= await fetch(url+userName);
    //json data file
    const respData=await resp.json();
    //assign data to html elements
    uName.innerText=respData.login;
    avatarImg.setAttribute("src",`${respData.avatar_url}`);
    description.innerText=respData.bio;
    followers.innerText="Followers:"+respData.followers;
    following.innerText="Following:"+respData.following;
    repo.innerText="Repos:"+respData.public_repos;
    input.value=""
    //get the repos
    getRepo(userName)
}
//repo function
async function getRepo(userName){
    //repo link await
    let repo= await fetch(url+userName+"/repos")
    //repo json object
    let repoData=await repo.json();
    //we only want 10 records
    for(let i=0;i<10;i++){
        let gName=repoData[i].name
        let gLink=repoData[i].html_url
        //create record
        createRepo(gName,gLink)
    }
}
function createRepo(name,link){
    //create div
    let repoInfo=document.createElement("div");
    repoInfo.setAttribute("class","repo-info");
    //create anchor tag
    let a=document.createElement("a");
    //assign link to anchor
    a.href=`${link}`
    //assign name to anchor
    a.innerText=`${name}`
    //append child
    repoInfo.appendChild(a);
    repoContainer.appendChild(repoInfo)

}
