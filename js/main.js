let title=document.getElementById("title");
let price=document.getElementById("price");
let taxes=document.getElementById("taxes");
let ads=document.getElementById("ads");
let totle=document.getElementById("totle");
let discont=document.getElementById("discont");
let cont=document.getElementById("cont");
let category=document.getElementById("category");
let submit=document.getElementById("submit");
let search=document.getElementById("search");

let mood='create';
let tmp;

function gettitle(){
       
if(price.value !=''){
  

    var resould=(+price.value+ +taxes.value+ +ads.value)-discont.value;
     
    totle.innerHTML=resould
    totle.style.backgroundColor='#040';
}
else{
    
    totle.innerHTML='';
    totle.style.backgroundColor='#a00d02';
}

}



let datapro;
if(localStorage.product != null){
    datapro= JSON.parse(localStorage.product)

}
else{
    datapro=[];
}

submit.onclick=function()
{
    var newpro={
        title:title.value,
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discont:discont.value,
        totle:totle.innerHTML,
        cont:cont.value,
        category:category.value

    }

    if(title.value != ''&& category.value!=''&& price.value!=''&& newpro.cont<100){
        if(mood=== 'create'){
            if(newpro.cont> 1){
              for(let i=0;i < newpro.cont;i++){
               
                datapro.push(newpro)
        
              }
              
            }
            else{
                datapro.push(newpro)
            }
    
        }
        else{
            datapro[tmp] = newpro;
            mood='create';
            submit.innerHTML='create';
            cont.style.display='block';
        }
       
    }




 
    localStorage.setItem('product', JSON.stringify(datapro))
    


    
    clearedata()


    
    
}




function clearedata(){
    
    title.value='';
    price.value='';
    taxes.value='';
    ads.value='';
    discont.value='';
    totle.innerHTML='';
    cont.value='';
    category.value='';
    
    showdata()
}




function showdata(){
     let table='';
    gettitle()
     for(let i=0;i< datapro.length;i++){
        table +=
        `
        <tr>
        <td>${i+1}</td>
        <td>${datapro[i].title}</td>
        <td>${datapro[i].price}</td>
        <td>${datapro[i].taxes}</td>
        <td>${datapro[i].ads}</td>
        <td>${datapro[i].discont}</td>
        <td>${datapro[i].totle}</td>
        <td>${datapro[i].category}</td>
        
        <td> <button  onclick="updatedata(${i})"   id="update" >update </button>  </td>
        <td> <button  onclick="deletedata(${i})"   id="delete" >delete </button>  </td>
        </tr> 
        
        `
     }
     document.getElementById("tbody").innerHTML=table

     let btndelete= document.getElementById("deleteall");

     if(datapro.length > 0 )[
         btndelete.innerHTML=
         `
         <button onclick="deleteall()" >delete all (${datapro.length}) </button>

         `
     ]
     else{
        btndelete.innerHTML='';
     }

}
showdata()



function deletedata(i){
   datapro.splice(i,1)
   localStorage.product= JSON.stringify(datapro)
   showdata()
}


function deleteall(){
    localStorage.clear()
    datapro.splice(0)
    showdata()
}



function updatedata(i){
    title.value=datapro[i].title;
    price.value=datapro[i].price;
    taxes.value=datapro[i].taxes;
    ads.value=datapro[i].ads;
    discont.value=datapro[i].discont;
    gettitle();
    cont.style.display ='none';
    submit.innerHTML='update';
    category.value=datapro[i].category;
    mood='update';
    tmp=i;
    scroll({
        top:0,
        behavior:"smooth"
    })
}





