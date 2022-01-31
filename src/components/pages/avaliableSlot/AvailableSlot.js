import React from 'react';
import './availableSlot.css';

console.clear()


const url = "https://book-your-slot-api.herokuapp.com/CourseLists";

function displayData(){
fetch(url)
.then(res => res.json())
.then(data=> {
    console.log(data.length)
    for(var i=0; i<data.length; i++) {
        console.log(data[i])
        var course = document.createElement('tr');
        course.innerHTML = data[i].cname

        var maxSlot = document.createElement('tr');
        maxSlot.innerHTML = data[i].maxUsers

        var AvaSlot = document.createElement('tr');
        AvaSlot.innerHTML = data[i].regUsers

        var td1 = document.querySelector('#course')
        var td2 = document.querySelector('#mslot')
        var td3 = document.querySelector('#aslot')
        
        td1.appendChild(course)
        td2.appendChild(maxSlot)
        td3.appendChild(AvaSlot)
    }  
})
}
    
displayData();

function AvailableSlot() {

    return (
        <div className='availableSlot'>
            <div className='availableSlot-container'>
                <h1 className='heading'>Available Slots</h1>
                <div className='availableSlot-list'>
                    <table>
                        <tr>
                            <th>Course</th>
                            <th>Maximum Slot</th>
                            <th>Available Slot</th>
                        </tr>

                        <tr>
                            <td id='course'></td>
                            <td id='mslot'></td>
                            <td id='aslot'></td>
                        </tr>  

                    </table>
                </div>
            </div>
        </div>
    );
}

export default AvailableSlot;