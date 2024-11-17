import React from 'react'
import "../App.css"
import { MdClose } from 'react-icons/md'

const Form = ({handelSubmit,handelOnChange,handelclose,rest}) => {
  return (
    <div className="addcointainer">

<form onSubmit={handelSubmit}>
<div className="close-btn" onClick={handelclose}><MdClose/></div>

  <label htmlFor="name">FirstName : </label>
  <input type="text" id="Firstname" name="Firstname" onChange={handelOnChange} value={rest.Firstname}/>

  <label htmlFor="name">LastName : </label>
  <input type="text" id="Lastname" name="Lastname"onChange={handelOnChange} value={rest.Lastname}/>

  <label htmlFor="email">Email : </label>
  <input type="email" id="Email" name="Email"onChange={handelOnChange} value={rest.Email}/>

  <label htmlFor="phone">Phone : </label>
  <input type="number" id="Phone" name="Phone"onChange={handelOnChange} value={rest.Phone}/>

  <label htmlFor="company">Company : </label>
  <input type="text" id="Company" name="Company"onChange={handelOnChange} value={rest.Company} />

  <label htmlFor="jobtittle">JobTittle : </label>
  <input type="text" id="JobTittle" name="JobTittle"onChange={handelOnChange} value={rest.JobTittle}/>

  <button className="btn">Submit</button>
</form>
</div>

  )
}

export default Form