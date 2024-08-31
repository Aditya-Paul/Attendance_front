/* eslint-disable react/prop-types */
import axios from 'axios';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const Studentlist = ({ Teacher,First_Period,Second_Period,Class_Date }) => {
    const [studentsData, setstudentsData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/students')
            .then(res => res.json())
            .then(data => setstudentsData(data));
    }, [Teacher,First_Period,Second_Period,Class_Date]);
    // Add present attendance 
    const handlePresent = async (name, EnrlId) => {
        // const attendanceRecords = [
        //     {
        //         Student_Name: name,
        //         Student_EnrlId: EnrlId,
        //         Period_Teacher: Teacher,
        //         Period_Name: First_Period,
        //         status: "Present"
        //     }
        // ];
        const attendanceRecords = [
            {
                Student_Name: name,
                Student_EnrlId: EnrlId,
                Period_Teacher: Teacher,
                Period_Name: First_Period,
                Date: new Date(Class_Date),
                status: "Present"
            }
        ]
        // if (Second_Period !== "None") {
        //     attendanceRecords.push({
        //         Student_Name: name,
        //         Student_EnrlId: EnrlId,
        //         Period_Teacher: Teacher,
        //         Period_Name: Second_Period,
        //         status: "Present"
        //     });
        // }
        if(Second_Period !== "None"){
            attendanceRecords.push({
                Student_Name: name,
                Student_EnrlId: EnrlId,
                Period_Teacher: Teacher,
                Period_Name: Second_Period,
                Date: new Date(Class_Date),
                status: "Present"
            })
        }
        try{
            for (const record of attendanceRecords){
                const addAttendance = await axios.post("http://localhost:3000/student_attendance", record)
                //console.log(addAttendance.data) 
                if(addAttendance.data.insertedId){
                    // Swal.fire({
                    //     position: "top-end",
                    //     icon: "success",
                    //     title: `${record.Period_Name} period attendance recorded successfully of faculty ${record.Period_Teacher}.`,
                    //     showConfirmButton: false,
                    //     timer: 2000
                    //   });
                    console.log(`${record.Period_Name} period attendance recorded successfully of faculty ${record.Period_Teacher}.`);
                    //console.log('done')
                }
            }
        }catch(error){
            if(error.response ){
                //console.log(error.response)
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Attendance already recorded for this period.",
                    footer: '<a href="#">Why do I have this issue?</a>'
                  });
                console.log("Attendance already recorded for this period.");
            }
            else{
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "An error occurred while recording attendance:",
                    footer: '<a href="#">Why do I have this issue?</a>'
                  });
                console.error("An error occurred while recording attendance:", error);
            }
        }
    };
    // Add absent attendance 
    const handleAbsent = async (name, EnrlId) => {
    
        const attendanceRecords = [
            {
                Student_Name: name,
                Student_EnrlId: EnrlId,
                Period_Teacher: Teacher,
                Period_Name: First_Period,
                Date: new Date(Class_Date),
                status: "Absent"
            }
        ]

        if(Second_Period !== "None"){
            attendanceRecords.push({
                Student_Name: name,
                Student_EnrlId: EnrlId,
                Period_Teacher: Teacher,
                Period_Name: Second_Period,
                Date: new Date(Class_Date),
                status: "Absent"
            })
        }

        try{
            for (const record of attendanceRecords){
                const addAttendance = await axios.post("http://localhost:3000/student_attendance", record)
                //console.log(addAttendance.data)
                if(addAttendance.data.insertedId){
                    // Swal.fire({
                    //     position: "top-end",
                    //     icon: "success",
                    //     title: `${record.Period_Name} period attendance recorded successfully of faculty ${record.Period_Teacher}.`,
                    //     showConfirmButton: false,
                    //     timer: 2000
                    //   });
                    console.log(`${record.Period_Name} period attendance recorded successfully of faculty ${record.Period_Teacher}.`);
                    //console.log('done')
                }
            }
        }catch(error){
            if(error.response ){
                //console.log(error.response)
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Attendance already recorded for this period.",
                    footer: '<a href="#">Why do I have this issue?</a>'
                  });
                console.log("Attendance already recorded for this period.");
            }
            else{
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "An error occurred while recording attendance:",
                    footer: '<a href="#">Why do I have this issue?</a>'
                  });
                console.error("An error occurred while recording attendance:", error);
            }
        }
    };
    
    return (
        <div><div className="overflow-x-auto">
            <table className="table table-zebra">
                {/* head */}
                <thead>
                    <tr>
                        <th>Serial</th>
                        <th>Enrollment No</th>
                        <th>Name</th>
                        <th>Roll No</th>
                        <th>Year</th>
                        <th>Section</th>
                        <th>Group</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {/* row 1 */}
                    {
                        studentsData.map((student,index) => <tr key={student.Student_Enrollment_Id}>
                            <th>{index+1}</th>
                            <td>{student.Student_Enrollment_Id}</td>
                            <td>{student.Student_Name}</td>
                            <td>{student.Roll_No}</td>
                            <td>{student.Year}</td>
                            <td>{student.Section}</td>
                            <td>{student.Section_group}</td>
                            <td> <button onClick={()=>handlePresent(student.Student_Name, student.Student_Enrollment_Id)}  className="text-xl w-32 h-14 bg-sky-500 text-white relative overflow-hidden group z-10 hover:text-white duration-1000"><span className="absolute bg-sky-600 size-36 rounded-full group-hover:scale-100 scale-0 -z-10 -left-2 -top-10 group-hover:duration-500 duration-700 origin-center transform transition-all"></span><span className="absolute bg-sky-800 size-36 -left-2 -top-10 rounded-full group-hover:scale-100 scale-0 -z-10 group-hover:duration-700 duration-500 origin-center transform transition-all"></span>Present</button> </td>

                            <td> <button onClick={()=>handleAbsent(student.Student_Name, student.Student_Enrollment_Id)} className="text-xl w-32 h-14 bg-sky-500 text-white relative overflow-hidden group z-10 hover:text-white duration-1000"><span className="absolute bg-sky-600 size-36 rounded-full group-hover:scale-100 scale-0 -z-10 -left-2 -top-10 group-hover:duration-500 duration-700 origin-center transform transition-all"></span><span className="absolute bg-sky-800 size-36 -left-2 -top-10 rounded-full group-hover:scale-100 scale-0 -z-10 group-hover:duration-700 duration-500 origin-center transform transition-all"></span>Absent</button> </td>
                        </tr>)
                    }

                </tbody>
            </table>
        </div>



        </div>
    );
};

export default Studentlist;