/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

const Percentage = ({ Student_EnrlId,Start_Date,End_Date} ) => {
    const [attendanceData, setAttendanceData] = useState(null);
    const [PresentCount, setPresentCount] = useState(null);
    //const [AbsentCount, setAbsentCount] = useState(null);
    useEffect(() => {
        // Ensure all required parameters are available
        if (Student_EnrlId && Start_Date && End_Date) {
            // Make the fetch request to the backend
            fetch(`http://localhost:3000/single_student_attendance?Student_EnrlId=${Student_EnrlId}&Start_Date=${Start_Date}&End_Date=${End_Date}`)
                .then(response => response.json())
                .then(data => {
                    
                    setAttendanceData(data); // Set the data in state
                    const present = data.filter(record => record.status === 'Present').length;
                    //const absent = data.filter(record => record.status === 'Absent').length;

                    setPresentCount(present);
                    // setAbsentCount(absent);
                })
                .catch(error => {
                    console.error('Error fetching attendance data:', error);
                });
        }
    }, [Student_EnrlId, Start_Date, End_Date]);
    
    return (
        <div>
            <h1 className="text-2xl">Total Present Count of <span className="text-red-400">{Student_EnrlId}</span> :  <span className="text-red-400">{PresentCount/2}</span></h1>

            <h1 className="text-2xl">Total Period : <span  className="text-red-400">{attendanceData?.length/2}</span></h1>

            <h1 className="text-2xl">Total Percentage from <span className="text-3xl">{Start_Date}</span> to <span className="text-3xl">{End_Date}</span> is <span className="text-red-400">{((PresentCount/2)/(attendanceData?.length/2))*100 }%</span></h1>
            <table className="table table-zebra">
                {/* head */}
                <thead>
                    <tr>
                        <th>Serial</th>
                        <th>Enrollment No</th>
                        <th>Name</th>
                        <th>Period_Teacher</th>
                        <th>Period_Name</th>
                        <th>Date</th>
                        <th>status</th>
                    </tr>
                </thead>
                <tbody>
                    {/* row 1 */}
                    {
                        attendanceData?.map((student,index) => <tr key={student.Student_EnrlId}>
                            <th>{index+1}</th>
                            <td>{student.Student_EnrlId}</td>
                            <td>{student.Student_Name}</td>
                            <td>{student.Period_Teacher}</td>
                            <td>{student.Period_Name}</td>
                            <td>{student.Date}</td>
                            <td>{student.status}</td>
                            
                        </tr>)
                    }

                </tbody>
            </table>
        </div>
    );
};

export default Percentage;