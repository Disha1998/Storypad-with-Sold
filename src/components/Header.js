import React, { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Stack, Box } from "@mui/material";
import { BookContext } from "../Context/BookContext";
import Avatar from 'react-avatar';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { api, utils } from "@epnsproject/frontend-sdk-staging";
import BellIcon from 'react-bell-icon';



function Header() {
  const notify = () => toast("You are logged in!");
  const [loading, setLoading] = useState(false);
  const [smShow, setSmShow] = useState(false);

  // const [notificationItems, setNotificationItems] = useState([]);
  const bookContext = React.useContext(BookContext);

  const { login } = bookContext;


  const { Moralis, isAuthenticated, user } = useMoralis();
  // console.log(user, 'user');



  // 

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  // 

  // ----Fetch notification from EPNS ------ 
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

  console.log('notificationItems=====', notificationItems);




  useEffect(() => {
    // EPNS
    fetchNotifications();
  }, []);

  // ----Fetch notification from EPNS ------



  return (
    <AppBar color="inherit" position="fixed" sx={{ height: "70px" }}>
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography  >
          <Link to="/">
            <img src="/ualogo.png" alt="logo" />
          </Link>
        </Typography>

        <div style={{ display: 'flex', justifyContent: 'end' }}>
          <Link to="upload-form">
            <button className="btn" style={{
              backgroundColor: '#D82148', color: 'white',
              fontWeight: '30px', borderRadius: '7%', padding: "auto"
            }}>Write Story</button>
          </Link>
          <Link to="/nft-upload">
            <button className="btn" style={{
              backgroundColor: '#D82148', color: 'white',
              fontWeight: '30px', borderRadius: '7%', padding: "auto", marginLeft: '10px',

            }}>Add NFT Readership</button>
          </Link>
          <Link to="readership-nft">
            <button className="btn" style={{
              backgroundColor: '#D82148', color: 'white',
              fontWeight: '30px', borderRadius: '7%', marginLeft: "7px", padding: "auto"
            }}>NFT Readership</button>
          </Link>

          <button onClick={() => login()} className="btn my-2 my-sm-0" type="submit" style={{
            backgroundColor: '#D82148',
            color: 'white',
            fontWeight: '20px',
            border: '2px solid #D82148',
            marginLeft: '10px',
            borderRadius: '7%',
            padding: "auto",
            // navigate("/dashboard");

          }} disabled={loading}>
            {isAuthenticated ? "Connected" : "Connect"}

            <ToastContainer />

          </button>


          {/* <Link to=" "> */}
          <div style={{ marginRight: "0px", marginLeft: "10px", padding: "auto" }}>

            <div>
              <Button aria-describedby={id} onClick={handleClick}>
                <BellIcon width='50' height='30' active={true} animate={true} />
              </Button>
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
              >
                <Typography sx={{ p: 2 }}>

                  <div>
                    {notificationItems.map((notific) => {
                      return (
                        <div>
                          {/* {notific.icon} */}
                          <p style={{ backgroundColor: "#E0E0E0" }}>
                            <img src={notific.icon} alt="imagee" style={{ height: "50px", width: "50px", marginRight: "15px" }}></img>
                            <b> {notific.app}</b>
                          </p>
                          <p >
                            {/* style={{ backgroundColor: "#F8F8F8" }} */}
                            <p><b>{notific.title}</b></p>
                            <p>{notific.message}</p>

                          </p>

                          {/* <div style={{ border: "1px solid #bbb" }}></div> */}

                        </div>
                      )

                    })

                    }
                  </div>

                </Typography>
              </Popover>
            </div>
            {/* 
              <Avatar onClick={() => setSmShow(true)} size={40} round="50px" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbJCyOWHgOxvauGWHPHOXO6ypRs1xkCYZCew&usqp=CAU" /> */}
            {/* <Notification /> */}
          </div>
          {/* </Link> */}

          <Link to="profile">

            <div style={{ marginRight: "30px", marginLeft: "30px", padding: "auto" }}>
              <Avatar size={40} round="50px" src="https://www.pinpng.com/pngs/m/615-6154495_avatar-png-icon-business-woman-icon-vector-transparent.png" />

            </div>
          </Link>

          {/* <Link to="notification"> */}

          {/* <div style={{ marginRight: "30px", marginLeft: "30px", padding: "auto" }}> */}
          {/* <BellIcon width='40' active={true} animate={true} /> */}
          {/* </div> */}
          {/* </Link> */}

        </div>

      </Toolbar>
    </AppBar>

  )
}

export default Header;