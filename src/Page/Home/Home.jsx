import {  useState } from 'react';
import { useForm } from 'react-hook-form';
import Studentlist from '../../Components/StudentList/Studentlist';

const Home = () => {
    const [teachername, setteachername] = useState()
    const [first_period, setfirst_period] = useState()
    const [second_period, setsecond_period] = useState()
    const [classDate, setclassDate] = useState()
    const [year, setyear] = useState()
    const [ready, setready] = useState(false)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        setteachername(data.teacherName)
        setfirst_period(data.First_period)
        setsecond_period(data.Second_period)
        setyear(data.year)
        setclassDate(data.date)
        setready(true)
    }

    // useEffect(() => {
    //     console.log(teachername);
    //     console.log(period);
    //     console.log(year);
    //     console.log(classDate);
    // }, [teachername, period, year,classDate]);
    return (
        <div>
            this is home page

            <form onSubmit={handleSubmit(onSubmit)}>

                {/* <input {...register('age',{ required: true })} />
                {errors.age && <p>Please enter number for age.</p>} */}

                <select {...register('teacherName', { required: true })} className="peer rounded-lg border border-[#1B8EF8] px-4 py-2 text-[#1B8EF8] focus:outline-none" type="text" placeholder="">
                    <option>Darothi Maam</option>
                    <option>Anupam Sir</option>
                </select>
                <select {...register('First_period', { required: true })} className="peer rounded-lg border border-[#1B8EF8] px-4 py-2 text-[#1B8EF8] focus:outline-none" type="text" placeholder="">
                    <option>1st</option>
                    <option>2nd</option>
                    <option>3rd</option>
                    <option>4th</option>
                    <option>5th</option>
                    <option>6th</option>
                    <option>7th</option>
                </select>

                <select {...register('Second_period', { required: true })} className="peer rounded-lg border border-[#1B8EF8] px-4 py-2 text-[#1B8EF8] focus:outline-none" type="text" placeholder="">
                    <option>None</option>
                    <option>1st</option>
                    <option>2nd</option>
                    <option>3rd</option>
                    <option>4th</option>
                    <option>5th</option>
                    <option>6th</option>
                    <option>7th</option>
                </select>


                <input  {...register('date', { required: true })} className="peer rounded-lg border border-[#1B8EF8] px-4 py-2 text-[#1B8EF8] focus:outline-none" type="date" placeholder=""/>

                <select {...register('year', { required: true })} className="peer rounded-lg border border-[#1B8EF8] px-4 py-2 text-[#1B8EF8] focus:outline-none" type="text" placeholder="">
                    <option>2nd</option>
                    <option>3rd</option>
                </select>
                <input type="submit" />
            </form>
            {ready ?
                <div>
                    <Studentlist Teacher={teachername} Class_Date={classDate} First_Period = {first_period} Second_Period = {second_period} year ={year} classDate = {classDate}></Studentlist>
                </div>
                
                :
                <div></div>}
        </div>
    );
};

export default Home;