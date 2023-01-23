import React, { useState } from "react";
import {
  TextField,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  LinearProgress,
  Typography,
} from "@mui/material";

const CategoryList = ({ ballot }) => {
  const [categoryList, setCategoryList] = useState({});
  const [isDisabled, setIsDisabled] = useState(false);
  const [modal, setModal] = useState(false);
  const [rand, setRand] = useState({})
  console.log(ballot)

  const handleSelect = (title, id) => {
    const newCategoryList = {
      ...categoryList,
      [id]: title,
    };
    setCategoryList(newCategoryList);

    if (Object.keys(newCategoryList).length === Object.keys(ballot).length) {
      setIsDisabled(true);
    }
    
  };

  const handleRandomSelect = () => {
    const newList = {
    }
    // setCategoryList(newCategoryList);
    // console.log(Object.keys(categoryList).length)
    // const len = Object.keys(categoryList).length
    // const ran = Math.random()
    // console.log("ran: ",ran)
    // const multiply = Math.floor(ran * len)
    // console.log("multiply: ",multiply)
    // // setRand(Math.floor(Math.random() * len))

    // // const option = Object.keys(ballot).length
    
  
    // console.log(option)
    // setRand(Math.floor(Math.random() * option))
  }

  const randomSelect = () => {
    const newList = {}
    for (let item of ballot) {
      // console.log(item)
      const lent = item.items.length
      const ran = Math.floor(Math.random() * lent)
      // console.log(ran)
      const randomlySelected = item.items[ran]
      // console.log(randomlySelected)
      console.log(typeof(randomlySelected.title))
      newList[item.id] = randomlySelected.title
    }
    console.log("newlist: ",newList)
    setCategoryList(newList)
  }

  
  const handleSubmit = () => {
    if (Object.keys(ballot).length) {
      setModal(true);
      // console.log(categoryList)
    }
  };

  return (
    <>
      <div className="container">
        <button 
          className="random"
          onClick={() => randomSelect()}
        >
          Random Vote
        </button>
        {ballot.map(({ id, title, items }) => {
          return (
            <div key={id} className="itemsContainer">
              <p className="titleName">{title}</p>
              <div className="items">
                {items.map(({ id: index, photoUrL, title }) => {
                  return (
                    <div key={index} className='card-content'>
                      <div className='card-wrapper'>
                          <div 
                            className={`card ${
                              categoryList[id] === title ? "selected_image" : "" 
                            }`}>
                          <div className='card-image-content'>
                              <span className='card-overlay'>
                              </span>
                              <div 
                                className='card-image'
                              >
                              <img className="card-img" src={photoUrL} alt="myPicture" />
                              <p className="name">{title}</p>
                              </div>
                          </div>
                          <div className='card-content'>
                              <button 
                                className={`vote ${
                                  categoryList[id] === title ? "voted" : "" 
                              }`}
                                onClick={() => handleSelect(title, id)}
                              >
                                { categoryList[id] === title ? "selected" : "Vote" }
                              </button>
                          </div>
                          </div>
                      </div>
                  </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        <Dialog
          open={modal}
          onClose={() => setModal(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle
            sx={{
              fontWeight: '750',
              textAlign: 'center',
              marginBottom: '5px'
            }}
          >
            Image Details
          </DialogTitle>
          <DialogContent>
            <Box
              component="div"
              sx={{
                "& .MuiTextField-root": {
                  m: 1,
                  width: {
                    xs: "29ch",
                    sm: "44ch",
                    md: "44ch",
                    xl: "60ch",
                    lg: "60ch",
                  },
                },
              }}
            >
              <Typography
                sx={{
                  fontSize: '15px',
                  fontWeight: '500'
                }}
              >
                Please View the selected votes below
              </Typography>
              {Object.keys(categoryList)?.map((cat) => (
                <div>
                  <span className={`${cat ? 'list' : ''}`}>
                    {`${cat}`} {"->"}
                  </span>
                  <span>
                    {`[${categoryList[cat]}]`}
                  </span>
                </div>
              ))}
            </Box>
          </DialogContent>
        </Dialog>

        <button
          className={!isDisabled ? "btn-disable" : "btn"}
          onClick={() => handleSubmit()}
          disabled={!isDisabled}
        >
          Submit
        </button>
      </div>
    </>
  );
};

export default CategoryList;
