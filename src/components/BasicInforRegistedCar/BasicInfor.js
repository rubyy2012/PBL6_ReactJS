
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import * as request from '../../utils/request';
import './styles.scss';
// import 
function BasicInfor() {
    const location = useLocation()
    const id = location.state
    console.log(id)
    const [dataCar,setDataCar] = useState({
        name:'',
        status:'',
        plate_number:'1',
        location:'1',
        capacity:4,
        transmission:'',
        fuelType:'',
        carImages:[],
        districtId:490,
        wardId:'1',
        address:'',
        fuelConsumption:10,
        description:'',
        cost:'',

    })

    const [wards,setWards] = useState([])
    const [districts, setDistricts] = useState([])
    useEffect(()=>{
        const getCar = async () => {
            try 
            {     
                const url = `Car/${id}/CarInfor`
                const res = await request.getWithToken(url)
                setDataCar(res)
                console.log(res)
            }
            catch(error)
            {
                console.log("error in get carInfor",error)
            }
        }
        getCar()
    },[])
      //GET LOCATION
      useEffect(()=>{
 
        const getDistrict = async () => {
            try 
            {
                const res = await request.get('District')
                setDistricts(res)
            }
            catch(error)
            {
                console.log(error)
            }  
        }
        getDistrict()
    },[])
        // console.log(districts)
    useEffect(()=>{
            const getWards = async() => 
            {
                try
                {
                    const res = await request.get(`District/${dataCar.districtId}`)
                    setWards(res)
                }
                catch(error)
                {
                    console.log('wards:something error',error)
                }   
            }
            getWards()     
        },[dataCar.districtId])
    //HANDLE ON-CHANGE
    const handleOnChange = (e) => {
        setDataCar({...dataCar,[e.target.name]:e.target.value})     
        console.log(e.target.value)
        }

    const handleSubmit = async(e)=> {
        // e.preventDefault()
        try 
        {
            console.log('check',dataCar)
            const res = await request.put(`Car/${id}/CarInfor`,dataCar)
            window.location.reload()
        }
        catch(error)
        {
            console.log('error update car infor',error)
        }
    }
    if(dataCar&&districts)
    {
    return (
        <div className="basic__infor-layout">
           <form action="">
                <div className="group form-default">
                   <h6 className="basic__infor-label">Bi???n s??? xe</h6>
                   <div className="col-left">
                            <div className="line-form">
                                <div className="wrap-input">
                                    <input 
                                        type="text" 
                                        readOnly 
                                        name='plateNumber'
                                        className='inactive' 
                                        value={dataCar.plate_number||''}  
                                        onChange={e=>handleOnChange(e)}
                                    />
                                </div>
                            </div>
                    </div>

                    <span className="takenote">
                        Th??ng tin kh??ng th??? thay ?????i!
                    </span>

                   <h6 className="basic__infor-label">?????a ch??? xe</h6>
                   <div className="col-left">
                            <div className="line-form">
                                <label htmlFor="" className='label'>Qu???n</label>
                                <span className='wrap-select'>
                                    <select 
                                        name="districtId" 
                                        id="" 
                                        value={dataCar.districtId||''}
                                        onChange={e=>handleOnChange(e)} 
                                        >
                                    {
                                    districts.map(district=>(
                                        <option value={district.id} key={district.id}>{district.name}</option>
                                    ))
                                    }
                                    </select>
                                </span>
                            </div>
                    </div>

                    <div className="col-right">
                         <div className="line-form">
                                 <label htmlFor="" className='label'>Ph?????ng</label>
                                 <span className='wrap-select'>
                                    <select 
                                        name='wardId' 
                                        id=""
                                        value={dataCar.wardId||''}
                                        onChange={e=>handleOnChange(e)}
                                        >
                                       {
                                        wards.map(ward=>(
                                            <option value={ward.id} key={ward.id}>{ward.name}</option>
                                        ))
                                    }
                                    </select>
                                </span>
                            </div>
                    </div>

                       
                    <div className="col-left">
                        <div className="line-form">
                            <label className='label'>???????ng</label>
                            <div className="wrap-input">
                                <input 
                                    type="text" 
                                    name='address'
                                    value={dataCar.address||''}
                                    onChange={e=>handleOnChange(e)}
                                 />
                            </div>
                        </div>
                    </div>

                   <h6 className="basic__infor-label">Th??ng tin c?? b???n</h6>
                   <div className="col-left">
                            <label htmlFor="" className='label-input'>S??? gh???</label>
                            <div className="line-form">
                                <div className="wrap-input">
                                    <input 
                                        type="text" 
                                        readOnly 
                                        className='inactive' 
                                        name='capacity'
                                        value={dataCar.capacity||''}
                                        onChange={e=>handleOnChange(e)}
                                 
                                    />
                                </div>
                            </div>
                   </div>

                   <div className="col-right">
                            <label htmlFor="" className='label-input'>Truy???n ?????ng</label>
                            <div className="line-form">
                                <div className="wrap-input">
                                    <input                                         
                                    type="text"                                        
                                    readOnly                                        
                                    className='inactive'
                                    name='transmission'                                         
                                    value={dataCar.transmission.name||''}  
                                    onChange={e=>handleOnChange(e)}                                 
                                    />
                                </div>
                            </div>
                   </div>

                   <div className="col-left">
                   <label htmlFor="" className='label-input'>Lo???i nhi??n li???u</label>
                            <div className="line-form">
                                <div className="wrap-input">
                                <input                                     
                                type="text"                                     
                                readOnly                                     
                                className='inactive' 
                                name='fuelType'                                   
                                value={dataCar.fuelType.name ||''}  
                                onChange={e=>handleOnChange(e)}                                
                                 />
                                </div>
                            </div>
                   </div>

                   <div className="col-right">
                   <label htmlFor="" className='label-input'>M???c ti??u th??? nhi??n li???u (l??t/100km)</label>
                            <div className="line-form">
                                <div className="wrap-input">
                                    <input 
                                        type="text" 
                                        name='fuelConsumption'
                                        value={dataCar.fuelConsumption||''}   
                                        onChange={e=>handleOnChange(e)}                                     
                                    />
                                </div>
                            </div>
                   </div>

                   <h6 className="basic__infor-label">M?? t???</h6>
                   <div className="line-form end">
                            <textarea 
                                id="" 
                                cols="30" 
                                rows="10" 
                                className='textarea' 
                                name='description'
                                style={{color:'black'}}
                                placeholder='Kh??ng s??? d???ng xe v??o m???c ????ch phi ph??p. L??i xe c???n th???n, gi??? xe s???ch s???, tr??? xe ????ng gi???. Ph??? thu 500k n???u h??t thu???c l?? trong xe.'
                                value={dataCar.description||''}
                                onChange={e=>handleOnChange(e)}
                            >
                            </textarea>
                    </div>

                    <input className="btn-save" type='button' value='L??u thay ?????i' onClick={handleSubmit}/>
                </div>
           </form>          
        </div>
    );
}
}


export default BasicInfor;