
import { createBrowserRouter } from "react-router-dom";
import Main from '../Layout/Main';
import Home from '../Page/Home/Home';
import DetailsPage from '../Page/Percent_Details/Percent_Details';
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
            }
        ]
    },
]);

export default Router;