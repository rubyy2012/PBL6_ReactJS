import './styles.scss';
import ButtonAccess from '../../components/Forms/ButtonAccess/ButtonAccess';
import { useState } from 'react';
import BaseFormImage from '../../components/BaseFolder/BaseFormImage';
import { useEffect } from 'react';
import * as request from '../../utils/request';


function CarRegister() {
    const [brands, setBrands] = useState([])
    const [models, setModels] = useState([])
    const [capacities,setCapacities] = useState([])
    const [years,setYears] = useState([])
    const [transmissions,setTransmissions] = useState([])
    const [fuelTypes,setFuelTypes] = useState([])
    const [districts, setDistricts] = useState([])
    const [wards,setWards] = useState([])
    const [idBrand,setIdBrand] = useState()
    // const [idDistrict,setIdDistrict] = useState('490')

    const [data,setData] = useState({
        idBrand:'1',
        CarModelId:'',
        FuelTypeId:'',
        TransmissionId:'',
        YearManufacture:'',
        idDistrict: '490',
        WardId:'',
        Plate_number: '',
        FuelConsumption: '',
        Cost: '',
        Capacity: '',
        Description:'',
        Address:'',
        Rule:''
    })

     //GET AUX INFOR
    useEffect(()=>{
        const getAuxInfor = async () => {
            try 
            {
                const res = await request.get('Car/CarMoreInfor')
                setCapacities(res.capacities)
                setYears(res.yearManufactures)
                setTransmissions(res.transmissions)
                setFuelTypes(res.fuelTypes)
                // console.log(res) OK
            }
            catch(error)
            {
                console.log('brands:something error')
            }  
        }
        getAuxInfor()},[])
        //GET BRAND - MODEL
    useEffect(()=>{
        const getBrands = async () => {
            try 
            {
                const res = await request.get('Brand')
                setBrands(res)
                console.log(res) 
                // console.log(res) OK
            }
            catch(error)
            {
                console.log('brands:something error')
            }  
        }
        getBrands()},[])

    useEffect(()=>{
        const getModels= async () => {
            try {
                console.log(data.idBrand)
                const res = await request.get(`Brand/${data.idBrand}`)
                setModels(res)
            }
            catch(error)
            {
                console.log('models:something error')
            }  
        }
        getModels()
    },[data.idBrand])

     //GET LOCATION
    useEffect(()=>{
 
        const getDistrict = async () => {
            try {
                const res = await request.get('District')
                setDistricts(res)
            }

            catch(error)
            {
                console.log('districts:something error')
            }  
        }
        getDistrict()},[data])

    useEffect(()=>{
            const getWards = async() => 
            {
                try
                {
                    const res = await request.get(`District/${data.idDistrict}`)
                    setWards(res)
                }
                catch(error)
                {
                    console.log('wards:something error',error)
                }   
            }
            getWards()     
        },[data.idDistrict])

      

        //X??? L?? ???NH
        const formData = new FormData()
       const [selectedImages,setSelectedImages] = useState([])
       const [images,setImages] = useState([])
       const onFileChange = async (e) =>
        {
            const selectedFiles = e.target.files;
            setImages(selectedFiles)
            //X??? l?? hi???n th??? h??nh ???nh
            const selectedFilesArray = Array.from(selectedFiles);
            const imagesArray = selectedFilesArray.map((image)=>{
                return URL.createObjectURL(image);
            })
            setSelectedImages([...selectedImages,...imagesArray]); 
        }
        //  X??? l?? d??? li???u g???i ??i
        // console.log(images)
            if(images)
            {
                for(let i = 0; i<images.length;i++)
                {
                    formData.append('image',images[i]);
                }
            }
            formData.append('CarModelId',data.CarModelId)
            formData.append('FuelTypeId',data.FuelTypeId)
            formData.append('TransmissionId',data.TransmissionId)
            formData.append('YearManufacture',data.YearManufacture)
            formData.append('WardId',data.WardId)
            formData.append('Address',data.Address)
            formData.append('Plate_number',data.Plate_number)
            formData.append('FuelConsumption',data.FuelConsumption)
            formData.append('Rule',data.Rule)
            formData.append('Description',data.Description)
            formData.append('Cost',data.Cost)
            formData.append('Capacity',data.Capacity)
        
            //HANDLE ON-CHANGE
       const handleOnChange = (e) => {
        setData({...data,[e.target.name]:e.target.value})        
        }

        
        // SEND API
        const handleSubmit = async () => {
            try
            {
                const res = await request.postWithFormData('Car/CarAdd',formData)
                console.log(res)
            }
            catch(error)
            {
                console.log(error)
            } 
        }

    if(brands)
    {
    return (
        
        <div className='module-register'>
        
            <div className="register-container">
                <div className="content-register">
                <form>
                <div className="group form-default">
                        <h6>Bi???n s??? xe</h6>
                        <p className="fl">
                            <span className='note'>L??u ??: Bi???n s??? s??? kh??ng th??? thay ?????i sau khi ????ng k??.</span>
                        </p>
                        <div className="col-left">
                            <div className="line-form">
                                <div className="wrap-input">
                                    <input 
                                    type="text" 
                                    name='Plate_number' 
                                    onChange={e=>handleOnChange(e)} 
                                    value={data.Plate_number}                                       
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="clear"></div>

                        <h6>Th??ng tin c?? b???n</h6>
                        <p className="fl">
                            <span className='note'>L??u ??: C??c th??ng tin c?? b???n s??? kh??ng th??? thay ?????i sau khi ????ng k??.</span>
                        </p>
                        <div className="space clear"></div>
                        <div className="col-left">
                            <div className="line-form">
                                <label htmlFor="" className='label'>H??ng xe</label>
                                <span className='wrap-select'>
                                    <select 
                                    name="idBrand" 
                                    id="" 
                                    onChange={e=>handleOnChange(e)} 
                                    value={data.idBrand}
                                    >
                                    {
                                        brands.map((item)=>(
                                            <option value={item.id} key={item.id}>{item.name}</option>
                                        ))
                                    }
                                    </select>
                                </span>
                            </div>
                        </div>
                        <div className="col-right">
                         <div className="line-form">
                                 <label htmlFor="" className='label'>M???u xe</label>
                                 <span className='wrap-select'>
                                    <select 
                                    name="CarModelId" 
                                    id="" 
                                    onChange={e=>handleOnChange(e)} 
                                    value={data.CarModelId}
                                    >
                                    {
                                        models.map((item)=>(
                                            <option value={item.id} key={item.id}>{item.name}</option>
                                        ))
                                    }
                                    </select>
                                </span>
                            </div>
                        </div>
                        <div className="space clear"></div>

                        <div className="col-left">
                            <div className="line-form">
                                <label htmlFor="" className='label'>S??? gh???</label>
                                <span className='wrap-select'>
                                    <select 
                                    name='Capacity' 
                                    id="" 
                                    onChange={e=>handleOnChange(e)} 
                                    value={data.Capacity}
                                    >
                                    {
                                        capacities.map((item)=>(
                                            <option value={item.capacity} key={item.id}>{item.capacity}</option>
                                        ))
                                    }
                                    </select>
                                </span>
                            </div>
                        </div>

                        <div className="col-right">
                         <div className="line-form">
                                 <label htmlFor="" className='label'>N??m s???n xu???t</label>
                                 <span className='wrap-select'>
                                    <select 
                                    name='YearManufacture' 
                                    id="" 
                                    onChange={e=>handleOnChange(e)} 
                                    value={data.YearManufacture}
                                    >
                                    {
                                        years.map((item)=>(
                                            <option value={item.year} key={item.id}>{item.year}</option>
                                        ))
                                    }
                                    </select>
                                </span>
                            </div>
                        </div>
                        <div className="space clear"></div>

                        <div className="col-left">
                            <div className="line-form">
                                <label htmlFor="" className='label'>Truy???n ?????ng</label>
                                <span className='wrap-select'>
                                    <select 
                                    name='TransmissionId' 
                                    id="" 
                                    onChange={e=>handleOnChange(e)} 
                                    value={data.TransmissionId}
                                    >
                                    {
                                        transmissions.map((item,index)=>(
                                            <option value={item.id} key={index}>{item.name}</option>
                                        ))
                                    }
                                    </select>
                                </span>
                            </div>
                        </div>

                        <div className="col-right">
                         <div className="line-form">
                                 <label htmlFor="" className='label'>Lo???i nhi??n li???u</label>
                                 <span className='wrap-select'>
                                    <select 
                                    name="FuelTypeId" 
                                    id="" 
                                    onChange={e=>handleOnChange(e)} 
                                    value={data.FuelTypeId}
                                    >
                                    {
                                        fuelTypes.map((item)=>(
                                            <option value={item.id} key={item.id}>{item.name}</option>
                                        ))
                                    }
                                    </select>
                                </span>
                            </div>
                        </div>
                        <div className="space clear"></div>
                        <h6>M???c ti??u th??? nhi??n li???u</h6>
                        <p className="fl">
                            <span className="">
                            S??? l??t nhi??n li???u cho qu??ng ???????ng 100km.
                            </span>
                        </p>
                        <div className="clear"></div>
                        <div className="col-left">
                        <div className="line-form">
                                <label htmlFor="" className="label"></label>
                                <div className="wrap-input">
                                    <input 
                                    type="text" 
                                    name='FuelConsumption' 
                                    onChange={e=>handleOnChange(e)} 
                                    value={data.FuelConsumption}
                                    />
                                </div>
                            </div>
                        </div>
                        <h6>M?? t???</h6>
                        <textarea 
                         id="" cols="30" rows="10" 
                         className='textarea'
                         placeholder='M?? t??? t???ng quan v??? xe...' 
                        name='Description' 
                        onChange={e=>handleOnChange(e)} 
                        value={data.Description}
                        >
                        </textarea>
                        <h6>????n gi?? thu?? m???c ?????nh</h6>
                        <div className="fl">
                            <span className="note">
                            ????n gi?? ??p d???ng cho t???t c??? c??c ng??y. 
                            </span>
                        </div>
                        <div className="col-left">
                            <div className="abc">
                                <div className="line-form">
                                    <p className="pl">
                                        <span className="note">
                                          Gi?? ????? xu???t: 3050K
                                        </span>
                                    </p>
                                    <div className='wrap-input-label d-flex'>
                                        <div className="wrap-input">
                                            <input 
                                                type="text" 
                                                name='Cost' 
                                                onChange={e=>handleOnChange(e)} 
                                                value={data.Cost}
                                                />
                                        </div>
                                        <span className='phay'>K</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="space m"></div>
                        <div className="space m clear"></div>
                        <h6>??i???u kho???n thu?? xe</h6>
                        <p><span className='note'>Ghi r?? y??u c???u kh??ch c?? th??? thu?? xe</span></p>
                        <div className="line-form end">
                            <textarea 
                               id="" cols="30" rows="10" 
                               className='textarea' 
                               placeholder='Ghi r?? ??i???u kho???n thu?? xe...'
                               name="Rule"
                               value={data.Rule} 
                               onChange={e=>handleOnChange(e)}
                             >
                            </textarea>
                        </div>

                        <h6>?????a ch??? xe</h6>
                        <div className="col-left">
                            <div className="line-form">
                                <label htmlFor="" className='label'>Qu???n</label>
                                <span className='wrap-select'>
                                    <select 
                                        name="idDistrict" 
                                        id="" 
                                        onChange={e=>handleOnChange(e)} 
                                        value={data.idDistrict}
                                        >
                                        {
                                        districts.map((district)=>(
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
                                        name="WardId" 
                                        id=""  
                                        onChange={e=>handleOnChange(e)}
                                        value={data.WardId}
                                        >
                                        {wards.map(ward => 
                                        (<option key={ward.id} value={ward.id}>{ward.name}</option>))}
                                    </select>
                                </span>
                            </div>
                        </div>

                        <p className="ward-input">
                            <span className=''>???????ng</span>
                        </p>
                        <div className="col-left">
                            <div className="line-form">
                                <div className="wrap-input">
                                    <input 
                                        type="text" 
                                        name='Address' 
                                        onChange={e=>handleOnChange(e)} 
                                        value={data.Address}
                                        />
                                </div>
                            </div>
                        </div>

                        <h6>H??nh ???nh</h6>
                        <BaseFormImage selectedImages={selectedImages} setSelectedImages={selectedImages} onFileChange={onFileChange}/>
                        <ButtonAccess namebtn='????NG K??' onHandleSubmit={handleSubmit}/>
                </div>
              </form>
            </div>
        </div>
        </div>
    );
}
}

export default CarRegister;