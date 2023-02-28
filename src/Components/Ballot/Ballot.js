import React, { useEffect, useState } from 'react';
import api from '../../Api/Api';
import CategoryList from '../CategoryList/CategoryList';


const Ballot = () => {
  const [ballot, setBallot] = useState([])

  const getData = () => {
    api.getBallotData()
      .then(data => {
        console.log(data);
        setBallot(data?.items)
      })
      .catch(
        err => console.log(err)
      )
  }

  useEffect(() => {

    getData()

  }, [])



  return (
    <>
      <CategoryList ballot={ballot} />
      <div></div>
    </>
  )
}

export default Ballot;