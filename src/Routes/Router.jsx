
import { createBrowserRouter } from "react-router-dom";
import Main from '../Layout/Main';
import Home from '../Page/Home/Home';
import DetailsPage from '../Page/Percent_Details/Percent_Details';
import Section_Percentage_Details from "../Page/Section_Percentage_Details/Section_Percentage_Details";
const Router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: "/",
                element: <Home></Home>,
            },
            {
                path: "/Percent_Details",
                element: <DetailsPage></DetailsPage>,
            },
            {
                path: "/Section_Percentage_Details",
                element: <Section_Percentage_Details></Section_Percentage_Details>,
            }
        ]
    },
]);

export default Router;