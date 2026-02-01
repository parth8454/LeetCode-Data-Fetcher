document.addEventListener("DOMContentLoaded",function(){

const username = document.getElementById('username');
const search = document.getElementById('searchbtn');
const displayname = document.getElementById('display-name');
const displayrank = document.getElementById('user-rank');
const easysolved = document.getElementById('easy-solved');
const medsolved = document.getElementById('medium-solved');
const hardsolved = document.getElementById('hard-solved');
const totalsolved = document.getElementById('total-solved');


function shiusername(username){
    if(username.trim() === ""){
        alert("username should not be empty");
        return false;
    }
    const leetcodeRegex = /^[a-zA-Z0-9_-]{3,30}$/;
    const match = leetcodeRegex.test(username);
    if(!match){
        alert("invalid username");
    }
    return match;
}

async function fetchuserdetails(yourusername){

    try{
        search.textContent = "searching...";
        search.disabled = true;

        const response = await fetch(`https://leetcode-stats-api.herokuapp.com/${yourusername}`);
        const data = await response.json();

        if(data.status === "success"){
            console.log(data);
            displaydata(data,yourusername);
        }
        else{
            alert("bro.. check your username very dhyan se");
        }
    }
    catch(error){
        console.error("Error:",error);
        alert("either your network is slow or the server is down");
    }
    
    function displaydata(data,yourusername){
        search.textContent = "Get Stats";
        search.disabled = false;
        displayname.textContent = yourusername;
        displayrank.textContent = data.ranking;
        easysolved.textContent = data.easySolved;
        medsolved.textContent = data.mediumSolved;
        hardsolved.textContent = data.hardSolved;
        totalsolved.textContent = data.totalSolved;
    }

}

search.addEventListener('click',()=>{
    const yourusername = username.value;
    if(shiusername(yourusername)){
    fetchuserdetails(yourusername);
    }

})

})