import React from 'react';
import './courses.css';
import { CourseLists } from '../../data/courses';

function Courses() {

    

    return (
        <div className='courses'>
            <div className='courses-container'>
                <h1 className='heading'>Courses</h1>
                <div className='course-list'>
                    { 
                        CourseLists.map((index)=>(
                            
                        <h3>{index.id + "). " + index.cname}</h3>
                     )) }
                </div>
            </div>
        </div>
    );
}

export default Courses;