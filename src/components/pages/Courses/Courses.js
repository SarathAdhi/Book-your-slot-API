import React from 'react';
import './courses.css';

const url = "https://book-your-slot-api.herokuapp.com/CourseLists";

function Courses() {

    fetch(url)
    .then(res => res.json())
    .then(data=> {
        console.log(data.length)
        for(var i=0; i<data.length; i++) {

            var heading = document.createElement('h1');
            heading.innerHTML = data[i].id + ". " + data[i].cname;


            var h1 = document.querySelector('.course-list')

            h1.appendChild(heading)

        }  
    })

    return (
        <div className='courses'>
            <div className='courses-container'>
                <h1 className='heading'>Courses</h1>
                <div className='course-list'>
                            
                </div>
            </div>
        </div>
    );
}

export default Courses;