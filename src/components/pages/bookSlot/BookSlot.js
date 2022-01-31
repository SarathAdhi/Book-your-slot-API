import React from 'react';
import './bookSlot.css';

let userName = ""
let id;


const url = "https://book-your-slot-api.herokuapp.com/CourseLists";
const url2 = "https://book-your-slot-api.herokuapp.com/waitingList/";

function BookSlot() {
    document.querySelectorAll('tr td').innerHTML = "";
    function displayData(){
        
    fetch(url)
    .then(res => res.json())
    .then(data=> {

        for(var i=0; i<data.length; i++) {
            var course = document.createElement('tr');
            course.innerHTML = data[i].cname+'<br/><br/><br/>'

            var maxSlot = document.createElement('tr');
            maxSlot.innerHTML = data[i].maxUsers+'<br/><br/><br/>'

            var AvaSlot = document.createElement('tr');
            AvaSlot.id = "availableSlot"+data[i].id
            AvaSlot.innerHTML = data[i].regUsers+'<br/><br/><br/>'

            var time = document.createElement('tr');
            time.innerHTML = data[i].time+'<br/><br/><br/>'

            var btn1 = document.createElement('button');
            btn1.className = 'book-btn'
            btn1.id = "book"+data[i].id
            btn1.onclick = (button)=>bookSlotNow(button)
            btn1.innerHTML = "Book";

            var btn2 = document.createElement('button');
            btn2.className = 'drop-btn'
            btn2.id = "drop"+data[i].id
            btn2.onclick = (button)=> dropSlotNow(button)
            btn2.innerHTML = "Drop";

            var td1 = document.querySelector('#course-name')
            var td2 = document.querySelector('#maxUsers')
            var td3 = document.querySelector('#regUsers')
            var td4 = document.querySelector('#time')
            var td5 = document.querySelector('#btn')
            
            td1.appendChild(course)
            td2.appendChild(maxSlot)
            td3.appendChild(AvaSlot)
            td4.appendChild(time)
            td5.appendChild(btn1)
            td5.appendChild(btn2)
        }  
    })
    }
        
    displayData();

    function bookSlotNow(button){

        console.log(button.target);
        var text = button.target.id.match(/\d+/g);
        id = text[0] - 1;

        fetch(url)
        .then(res => res.json())
        .then(data=> {

        if(data[id].regUsers + 1 > data[id].maxUsers){
            alert("Sorry the slot is full. We will Add your in waiting list.");
            fetch(url2, {
                method: 'POST',
                body: JSON.stringify({
                    name: userName,
                    course: data[id].cname
                }),
                headers: {
                "Content-type": "application/json; charset=UTF-8"
                }
                })
                .then(response => response.json())
                .then(json => console.log(json))
            
        }
        else{
            document.querySelector(".confirm-slot").style.display = "flex";
            document.querySelector("#cname").innerText = "Press Confirm to Book your Slot for " + data[id].cname;
        }
    })
        
    }

    function dropSlotNow(button){

        var text = button.target.id.match(/\d+/g);
        var id2 = text[0] - 1;

        fetch(url)
        .then(res => res.json())
        .then(data=> {

            fetch(url2)
            .then(res2 => res2.json())
            .then(data2=> {

                if(data2[1].name === ""){
                    fetch(url+"/"+data[id2].id, {
                        method: 'PATCH',
                        body: JSON.stringify({
                        regUsers: data[id2].regUsers - 1
                        }),
                        headers: {
                        "Content-type": "application/json; charset=UTF-8"
                        }
                        })
                        .then(response => response.json())
                        .then(json => console.log(json))
                        
                        document.querySelector(`tr #availableSlot${data[id2].id}`).innerHTML = data[id2].regUsers-1;
                }
                else{
                    fetch(url2+data2[1].id , {
                    method: 'DELETE'
                    })

                    console.log(data2[1].name + " is assigned to the course "+data2[1].course);
                }
            })
            
            document.querySelector(`#book${id2+1}`).style.display = "block";
            document.querySelector(`#drop${id2+1}`).style.display = "none";
        })
    }


    function updateSlot(){
        fetch(url)
        .then(res => res.json())
        .then(data=> {

                fetch(url+"/"+data[id].id, {
                    method: 'PATCH',
                    body: JSON.stringify({
                    regUsers: data[id].regUsers + 1
                    }),
                    headers: {
                    "Content-type": "application/json; charset=UTF-8"
                    }
                    })
                    .then(response => response.json())
                    .then(json => console.log(json))
        

        document.querySelector(".confirm-slot").style.display = "none";

        document.querySelector(`tr #availableSlot${data[id].id}`).innerText = data[id].regUsers+1;
        document.querySelector(`#book${id+1}`).style.display = "none";
        document.querySelector(`#drop${id+1}`).style.display = "block";
        document.querySelector(`#drop${id+1}`).style.backgroundColor = "red"
    })
}

    return (
        <div className='bookSlot'>
            <div className='bookSlot-container'>
                <h1 className='heading'>Book Slots</h1>
                <div className='bookSlot-list'>
                    <table>
                        <tr>
                            <th>Course</th>
                            <th>Maximum Slot</th>
                            <th>Available Slot</th>
                            <th>Timing</th>
                            <th>Book</th>
                        </tr>
                        <tr id='tr2'>
                            <td id='course-name'></td>
                            <td id='maxUsers'></td>
                            <td id="regUsers"></td>
                            <td id='time'></td>
                            <td id='btn'>
                                    {/* <button id={"book"+ele.id} onClick={(button)=> bookSlotNow(button)} >Book Slot</button>
                                    <button className='drop-btn' id={"drop"+ele.id} onClick={(button)=> dropSlotNow(button)} >Drop Slot</button> */}
                            </td>
                        </tr>  
                    </table>
                </div>
            </div>
            <div className='info-box'>
                <div className='info-box-container'>
                    <h1>Enter your name to continue</h1>

                    <input 
                    type="text" 
                    name="uname" 
                    id='userName'
                    placeholder='Enter Your name here..'
                    />

                    <input 
                    type="button" 
                    className='confirm-btn' 
                    value="Confirm" 
                    onClick={()=>{
                        userName = document.querySelector("#userName").value;
                        document.querySelector(".info-box").style.display = "none"
                    }}
                    />

                </div>
            </div>
            <div className='confirm-slot'>
                <div className='confirm-slot-container'>
                    <h1 id='cname'></h1>

                    <input 
                    type="button" 
                    className='confirm-btn' 
                    value="Confirm" 
                    onClick={updateSlot}/>

                    <br/>

                    <input type="button" 
                    className='cancel-btn' 
                    value="Cancel" 
                    onClick={()=> {
                        document.querySelector(".confirm-slot").style.display = "none";
                    }
                    }/> 
                </div>
            </div>
        </div>
        

    );
}

export default BookSlot;