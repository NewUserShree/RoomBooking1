import './Form.css'
import { useState, useEffect, useMemo } from 'react';
export default function Form() {
    const initialvalue = useMemo(()=>{
        return  {
            firstname: "",
            lastname: "",
            roomtype: "",
            foodtype: "",
            mobile: 0,
            email: '',
            age : 0,
            password :"",
         
        }
    }, []) 
    const [formvalue, setFormvalue] = useState(initialvalue);
    const [formerrors, setFormerrors] = useState({});
    const [issubmit, setIssubmit] = useState(false);
    const [parsedata, setparsedata] = useState([])
    const[addarr, setAddarr] = useState([]);
    const[acc, setAcc] =useState(false);
    const[show, setShow] =useState("");
    // const[fillac, setFillac]=useState(true);
    // const[fillnonac, setFillnonac]=useState(true);
    const [fill, setFill]=useState()
  
    const [search, setSearch] =useState("");



    function handleChange(e) {
        const { name, value } = e.target;
        setFormvalue({ ...formvalue, [name]: value });


    }
        function handleroomtype(e){
            const roomtype = e.target.value;
            setFormvalue({...formvalue, roomtype});
        }
    const handleSubmit = (e) => {
        e.preventDefault();
        setFormerrors(validate(formvalue));
        setIssubmit(true);
        setAcc(false);
        
  

    }
    function handleFill(e){
            setFill(e.target.value)
        }
    // function handleFillac(){
    //     setFillac(!fillac)
    // }
    // function handleFillnonac(){
    //     setFillnonac(!fillnonac)
    // }
    function handleClick(){
        console.log(formvalue);
    }
    function handlepass(){
        setShow(!show)
    }
    useEffect(() => {
console.log(formerrors)
        if (Object.keys(formerrors).length === 0 && issubmit) {
            console.log(formvalue);
            setAddarr((pdata)=>[...pdata,formvalue]);
            setFormvalue(initialvalue);
            setIssubmit(false);
        //    localStorage.setItem("formdata", JSON.stringify(addarr));
        }
    }, [formerrors,issubmit]);
   

    useEffect(()=>{
        // console.log("final data : ",addarr)
        localStorage.setItem("formdata", JSON.stringify(addarr));
       
    },[issubmit])


useEffect(()=>{
    let storedData = JSON.parse(localStorage.getItem("formdata")); 
    console.log("parsed data",storedData) 
     setparsedata((parsedata)=>[...parsedata, ...storedData]);
    
},[addarr])


function handleacc(e){
   const isChecked =e.target.checked;
    setAcc(isChecked)
}


    const validate = (values) => {
        const errors = {};
        // const regex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
        if (!values.firstname) {
            errors.firstname = "firstname is required";
        }
        if (!values.lastname) {
            errors.lastname = "lastname is required";
        }
        if (!values.email) {
            errors.email = "email is required";
        }
        // else if(regex.test(values.email)){
        //     errors.email ="this is not a valid email";
        // }
        if (!values.foodtype) {
            errors.foodtype = "choose the foodtype";
        }
        if(!values.roomtype){
            errors.roomtype ="choose the roomtype";
        }
        if (!values.age) {
            errors.age = "enter your age";
        }
        if(!values.password){
            errors.password ="choose the password"
        }
        if (!values.mobile) {
            errors.mobile = "mobile number is required"
        }
        return errors;


    }
    

    
    return (
        <>
            <h1>Book Your Room</h1>
            <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label className='form-label' for="exfirst"> First Name :
                    <input className="form-control" id="exfirst" type="text" name="firstname" value={formvalue.firstname} onChange={handleChange}></input>
                    <p className='err'>{formerrors.firstname}</p>
                </label>
              </div>
              <div className="mb-3">
                <label className='form-label' for="exlast">Last Name :
                    <input className='form-control' type="text" name="lastname" id="exlast" value={formvalue.lastname} onChange={handleChange}></input>
                    <p className='err'>{formerrors.lastname}</p>
                </label></div>
                <div className="mb-3">
                <label className='form-label'>Age :
                    <input className='form-control' name="age" type="text" placeholder='Minimum age should be 18'value={formvalue.age} onChange={handleChange} ></input> 
                    <p className='err'>{formerrors.age}</p>
                </label>
                </div>
                <div className="mb-3">
                <label className='form-label'> Mobile Number :
                    <input className='form-control' type="number" name="mobile" value={formvalue.mobile} onChange={handleChange} ></input> 
                
                    <p className='err'>{formerrors.mobile}</p>
                </label></div>
                <div className="mb-3">
                <label className='form-label'> Password :
                    <input className='form-control' type={show?"text":"password"} name ="password" value={formvalue.password} onChange={handleChange}/> <label onClick={handlepass}>{show?"Hide":"show"}</label><br></br>
                    <p className='err'>{formerrors.password}</p>
                </label></div>
                <div className="mb-3">
                <label className='form-label'> Email :
                    <input className='form-control' type="text" name="email" value={formvalue.email} onChange={handleChange}></input> 
                    <p className='err'>{formerrors.email}</p>
                </label></div>
                <div className="mb-3">
                <label className='form-label'> Room Type :
                    <select name="roomtype" className='form-control' value={formvalue.roomtype} onChange={handleroomtype}>
                        <option key="a">Select Room Type(Ac/Non AC)</option>
                        <option key="ac" >Ac</option>
                        <option key="non-ac" >Non Ac</option>

                    </select> 
                  
                    <p className='err'>{formerrors.roomtype}</p>
                </label></div>
                <div className="mb-3">
                <label className='form-label'> Food Type :
                    <label> Veg <input type="radio" name="foodtype" value="veg" onChange={handleChange} ></input> </label>
                    <label> Non-Veg <input type="radio" name="foodtype" value="non-veg" onChange={handleChange}  ></input> </label>
                 
                    <p className='err'>{formerrors.foodtype}</p>
                </label> </div>
                <div className="mb-3">
                <label className='form-check-label'> Accept terms
                    <input className='form-check-input' type="checkbox" onChange={handleacc} required="required" checked={acc} ></input>
                </label>
                </div>
                <button className="btn btn-primary" type="submit" onClick={handleClick}>Submit</button><br></br>

             
   

            </form>
          
<br>
</br>
<br>
</br>            {/* <div className="mb-3">
                <label className='form-label'>Filterd by Room-Type:
                    <label> Ac <input type="radio"name="abc" value="Ac" onChange={handleFill} ></input> </label>
                    <label> Non-AC <input type="radio" name="abc" value="Non Ac" onChange={handleFill} ></input> </label>
                 
                 
                </label> </div> */}

                <div className="mb-3">

<input onChange={(e)=>setSearch(e.target.value)}  placeholder="search"></input> 
</div>

{/*table Data display*/}

<table className='table'>
            <thead>
                <tr>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Room Type</th>
                    <th scope="col">FOOD Type</th>
                    <th scope="col">Mobile</th>
                    <th scope="col">Email</th>
                </tr>
            </thead>
            <tbody className='table-group-divider'>
            {
               
                    
                    // addarr.filter((data, index)=>{
                    //     const isRoomTypeMatch = fill === "" || (data.roomtype && data.toLowerCase() === fill.toLowerCase();
                    //     const isSearchMatch = search.toLowerCase() === "" || data.firstname.toLowerCase().includes(search.toLowerCase());
                        
                    //     return isRoomTypeMatch && isSearchMatch

                        // addarr.filter((data, index) => {
                            // const isRoomTypeMatch = fill === "" || (data.roomtype && data.roomtype.toLowerCase() === fill.toLowerCase());
                            // const isSearchMatch = search.toLowerCase() === "" ||  index.firstname.toLowerCase().includes(search.toLowerCase());
                        
                            // return isRoomTypeMatch && isSearchMatch;

                               
                    addarr.filter((index)=>{
                        return search.toLowerCase() === "" ? index : index.firstname.toLowerCase().includes(search.toLowerCase())
                    }).map((data, index) => (
               
                        

                        // const isSearchMatch = search.toLowerCase() === "" || data.firstname.toLowerCase().includes(search.toLowerCase());
                        // return isSearchMatch;
                        // addarr.filter((data, index)=>{
                        // if(fillac && fillnonac){

                        //     return true;
                        // }
                        // return (fillac && data.roomtype==="Ac")||(fillnonac && data.roomtype==="Non Ac")
                    //   }).map((data, index) => (
           
             
            <tr key={index}>
                <td>{data.firstname}</td>
                <td>{data.lastname}</td>
                <td>{data.roomtype}</td>
                <td>{data.foodtype}</td>
                <td>{data.mobile}</td>
                <td>{data.email}</td>  
             
            </tr>
                    ))

                    }
                

                
          
            </tbody>
            
         
           
        </table>

        </>
    )
}