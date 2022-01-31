import React from 'react';
import Separator from '../../separator/index';
import AvailableSlot from '../avaliableSlot/AvailableSlot';
import BookSlot from '../bookSlot/BookSlot';
import Courses from '../Courses/Courses';

function Home() {
    return (
        <>
        <Courses />
        <Separator />
        <AvailableSlot />
        <Separator />
        <BookSlot />
        <Separator />
        </>
    );
}

export default Home;