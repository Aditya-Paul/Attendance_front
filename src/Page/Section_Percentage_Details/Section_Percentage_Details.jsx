import { useState } from "react";
import { useForm } from "react-hook-form";

const Section_Percentage_Details = () => {
    const [Student_Year, setStudent_Year] = useState()
    const [Student_Section, setStudent_Section] = useState()
    const [Start_Date, setStart_Date] = useState()
    const [End_Date, setEnd_Date] = useState()
    const [attendanceData, setAttendanceData] = useState(null);
    //const [ready, setready] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        setStudent_Year(data.Year)
        setStudent_Section(data.Section)
        setStart_Date(data.start_date)
        setEnd_Date(data.end_date)
        //setready(true)
        //console.log(data.Year,data.Section,data.start_date,data.end_date)
        if (Student_Year && Student_Section && Start_Date && End_Date) {
            // Make the fetch request to the backend
            fetch(`http://localhost:3000/section_attendance?Student_Year=${Student_Year}&Student_Section=${Student_Section}&Start_Date=${Start_Date}&End_Date=${End_Date}`)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    setAttendanceData(data)
                    // setAttendanceData(data); // Set the data in state
                    // const present = data.filter(record => record.status === 'Present').length;
                    // //const absent = data.filter(record => record.status === 'Absent').length;

                    // setPresentCount(present);
                    // setAbsentCount(absent);

                })
                .catch(error => {
                    console.error('Error fetching attendance data:', error);
                });
        }

    }
    // useEffect(() => {
    //     // Ensure all required parameters are available

    // }, [Student_Year,Student_Section,Start_Date,End_Date]);
    return (
        <div >

            <form onSubmit={handleSubmit(onSubmit)}>

                <select {...register('Year', { required: true })} className="peer rounded-lg border border-[#1B8EF8] px-4 py-2 text-[#1B8EF8] focus:outline-none" type="text" placeholder="">
                    <option>2nd</option>
                    <option>3rd</option>
                </select>
                <select {...register('Section', { required: true })} className="peer rounded-lg border border-[#1B8EF8] px-4 py-2 text-[#1B8EF8] focus:outline-none" type="text" placeholder="">
                    <option>A</option>
                    <option>B</option>
                    <option>C</option>
                    <option>AI</option>
                </select>
                <input  {...register('start_date', { required: true })} className="peer rounded-lg border border-[#1B8EF8] px-4 py-2 text-[#1B8EF8] focus:outline-none" type="date" placeholder="" />
                <input  {...register('end_date', { required: true })} className="peer rounded-lg border border-[#1B8EF8] px-4 py-2 text-[#1B8EF8] focus:outline-none" type="date" placeholder="" />
                <input type="submit" />
            </form>
            <table className="table table-zebra">
                {/* head */}
                <thead>
                    <tr>
                        <th>Serial</th>
                        <th>Enrollment No</th>
                        <th>Name</th>
                        <th>Total Period</th>
                        <th>Total Present</th>
                        <th>Total Absent</th>
                        <th>Total Percentage</th>
                        <th>View</th>
                        {/* <th>Period_Name</th>
                        <th>Date</th>
                        <th>status</th> */}
                    </tr>
                </thead>
                <tbody>
                    {/* row 1 */}
                    {
                        attendanceData?.map((student, index) => <tr key={student[0].Student_EnrlId}>
                            <th>{index + 1}</th>
                            <td>{student[0].Student_EnrlId}</td>
                            <td>{student[0].Student_Name}</td>
                            <td>{student.length / 2}</td>
                            <td>{student.filter(record => record.status === 'Present').length / 2}</td>
                            <td>{student.filter(record => record.status === 'Absent').length / 2}</td>
                            
                            {(((student.filter(record => record.status === 'Present').length / 2) / (student.length / 2)) * 100).toFixed(2) < 65 ?

                                <td className="bg-red-400 text-white">{(((student.filter(record => record.status === 'Present').length / 2) / (student.length / 2)) * 100).toFixed(3)}%</td>
                                :
                                <td >{(((student.filter(record => record.status === 'Present').length / 2) / (student.length / 2)) * 100).toFixed(3)}%</td>}

                        </tr>)
                    }

                </tbody>
            </table>

        </div>
    );
};

export default Section_Percentage_Details;