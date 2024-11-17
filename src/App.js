import logo from './logo.svg';
import './App.css';
import {MdClose} from "react-icons/md"
import { IoPersonAdd } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBinFill } from "react-icons/ri";
import { useEffect, useState } from 'react';
import axios from "axios"
import Form from './Comp/Form';

axios.defaults.baseURL = "http://localhost:8080/"


function App() {

  const[addSection,setAddSection] = useState(false)
  const[editSection,setEditSection] = useState(false)
  const[formData,setFormData] = useState({
    Firstname : "",
    Lastname : "",
    Email : "",
    Phone : "",
    Company : "",
    JobTittle : "",
  })
  const[formDataEdit,setFormDataEdit] = useState({
    Firstname : "",
    Lastname : "",
    Email : "",
    Phone : "",
    Company : "",
    JobTittle : "",
    _id : ""
  })

const [dataList,setDataList] = useState([])

  const handelOnChange = (e) =>
  {
    const{value,name} = e.target
    setFormData((preve)=>{
      return{
        ...preve,
        [name] : value
      }
    })
  }

  const handelSubmit = async(e)=>{
      e.preventDefault()
      const data = await axios.post("/create",formData)

      console.log(data)
      if(data.data.success)
      {
        setAddSection(false)
        alert(data.data.message)
        getFetchData()
        setFormData(
          {
            Firstname :"",
            Lastname :"",
            Email :"",
            Phone :"",
            Company :"",
            JobTittle :"",

          }
        )
      }
  }
  const getFetchData = async()=>{
    const data = await axios.get("/")
    console.log(data)
    if(data.data.success)
    {
      setDataList(data.data.data)
      
      
    }
  }
  useEffect(()=>{
    getFetchData()
  },[])

  const handelDelete = async(id)=>{
    const data = await axios.delete("/delete/"+id)
    if(data.data.success)
    {
      getFetchData()
      alert(data.data.message)
    }
    
  }



  const handelUpdate = async(e)=>{
    e.preventDefault()
    const data = await axios.put("/update",formDataEdit)
    if(data.data.success)
      {
        getFetchData()
        alert(data.data.message)
        setEditSection(false)
      }
  }




  const handelEditOnChange = async(e)=>{
    const{value,name} = e.target
    setFormDataEdit((preve)=>{
      return{
        ...preve,
        [name] : value
      }
    })

  }

    const handelEdit = (el)=>{
      setFormDataEdit(el)
      setEditSection(true)
    }


  return (
   <>
   <div className = "container">
   <h1 className='center'>CONTACT MANAGEMENT</h1>
    <button className="btn btn-add" onClick={()=>setAddSection(true)}><IoPersonAdd/></button>

    {
      addSection && (
        <Form
        handelSubmit = {handelSubmit}
        handelOnChange = {handelOnChange}
        handelclose = {()=>setAddSection(false)}
        rest={formData}
        />
      )
    }

    {
      editSection && (
        <Form
        handelSubmit = {handelUpdate}
        handelOnChange = {handelEditOnChange}
        handelclose = {()=>setEditSection(false)}
        rest={formDataEdit}
        />
      )
    }

    <div className='tablecontainer'>

     <table>
      <thead>
        <tr>
          <th>FirstName</th>
          <th>LastName</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Company</th>
          <th>Job-Tittle</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {
          dataList[0] ?(
          dataList.map((el)=>{
            console.log(el)
            return(
              <tr>
                <td>{el.Firstname}</td>
                <td>{el.Lastname}</td>
                <td>{el.Email}</td>
                <td>{el.Phone}</td>
                <td>{el.Company}</td>
                <td>{el.JobTittle}</td>
                <td>
                <button className='btn btn-edit'onClick={()=>handelEdit(el)}><FaEdit/></button>
                <button className='btn btn-delete' onClick={()=>handelDelete(el._id)}><RiDeleteBinFill/></button>
                </td>
              </tr>
            )
          }))
          :(
            <p className='no'>No Data</p>
          )
        }
      </tbody>
     </table>


    </div>




   </div>
   </>
  );
}

export default App;
