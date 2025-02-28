'use client'

import Loader from '@/app/components/Loader/Loader';
import { useLoadUserQuery } from '@/redux/features/api/apiSilce';
import { redirect } from 'next/navigation';
import React, { useEffect } from 'react'
import CourseContent from "../../components/Course/CourseContent"


type Props = {
    params:any;
}

const Page = ({params}: Props) => {
    const { id } : any = React.use(params);

    const {isLoading,error, data} = useLoadUserQuery(undefined,{});

    useEffect(() => {
        if(data){
            const registeredUsers = data?.user?.courses.find((item:any) => item._id === id);
            if(!registeredUsers){
                redirect("/");
            }
            if(error){
                redirect("/");
            }
        }
    },[data,error]);

    return ( 
        <>
        {
            isLoading ? (
                <Loader />
            ) : (
                <div>
                    <CourseContent id={id} user={data.user} />
                </div>
            )
        }
        </>
    )
}

export default Page