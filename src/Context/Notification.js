import React, { useState, useEffect } from 'react'
import { api, utils } from "@epnsproject/frontend-sdk-staging";
// import Popover from '@mui/material/Popover';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';


export default function Notification() {

    const [notificationItems, setNotificationItems] = useState([]);


    async function fetchNotifications() {
        if (localStorage.getItem("currentUserAddress")) {
            // define the variables required to make a request
            const walletAddress = localStorage.getItem("currentUserAddress");
            const pageNumber = 1;
            const itemsPerPage = 20;

            // fetch the notifications

            const { count, results } = await api.fetchNotifications(walletAddress, itemsPerPage, pageNumber)
            // console.log('fetchedNotifications-----', { results });


            // parse all the fetched notifications
            const parsedResponse = utils.parseApiResponse(results);
            console.log('parsedResponse----', parsedResponse);
            setNotificationItems(parsedResponse);

        }

    }
    // fetchNotifications();

    console.log('notificationItems=====', notificationItems);

    notificationItems.map((notific) => {
        return <h1>{notific.url}</h1>


    })



    useEffect(() => {
        // EPNS
        fetchNotifications();
    }, []);

    // const [anchorEl, setAnchorEl] = React.useState(null);

    // const handleClick = (event) => {
    //     setAnchorEl(event.currentTarget);
    // };

    // const handleClose = () => {
    //     setAnchorEl(null);
    // };

    // const open = Boolean(anchorEl);
    // const id = open ? 'simple-popover' : undefined;


    return (
        <>
            <div style={{ marginTop: "10%" }}>
                hellooooooooo notificationnn
               

                <div>
                    {notificationItems.map((notific) => {
                        return (
                            <div>
                                <h1>{notific.title}</h1>
                                <h3>{notific.notification.body}</h3>
                            </div>
                        )

                    })

                    }
                </div>
            </div>
        </>
    )
}




