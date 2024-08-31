import { useState } from "react";
import { useForm } from "react-hook-form";
import Percentage from "../../Components/Percentage/Percentage";

const Percent_Details = () => {
    const [Student_EnrlId, setStudent_EnrlId] = useState()
    const [Start_Date, setStart_Date] = useState()
    const [End_Date, setEnd_Date] = useState()
    const [ready, setready] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        // const attendanceRecords =
        //     {
        //         Student_EnrlId: data.enrollemnt_no,
        //         Start_Date:  data.start_date,
        //         End_Date:  data.end_date
        //     }
        // console.log(attendanceRecords)
        setStudent_EnrlId(data.enrollemnt_no)
        setStart_Date(data.start_date)
        setEnd_Date(data.end_date)
        setready(true)
        
    }
    return (

        <div >

            <form onSubmit={handleSubmit(onSubmit)}>

                <input  {...register('enrollemnt_no', { required: true })} className="peer rounded-lg border border-[#1B8EF8] px-4 py-2 text-[#1B8EF8] focus:outline-none" type="text" placeholder="" />
                <input  {...register('start_date', { required: true })} className="peer rounded-lg border border-[#1B8EF8] px-4 py-2 text-[#1B8EF8] focus:outline-none" type="date" placeholder="" />
                <input  {...register('end_date', { required: true })} className="peer rounded-lg border border-[#1B8EF8] px-4 py-2 text-[#1B8EF8] focus:outline-none" type="date" placeholder="" />
                <input type="submit" />
            </form>
            {ready ?
                <div>
                    <Percentage Student_EnrlId={Student_EnrlId} Start_Date={Start_Date} End_Date = {End_Date}></Percentage>
                </div>
                
                :
                <div></div>}
        </div>

    );
};

export default Percent_Details;