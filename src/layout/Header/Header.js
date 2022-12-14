import React, { useState } from 'react';
import  './styles.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../../assets/images/Header/logo.png'
import leftImg from '../../assets/images/Header/left.c988b015.jpg';
import {BiPhone} from "react-icons/bi";
import {BiCar} from "react-icons/bi";
import {BsEnvelope} from "react-icons/bs";
import {Container} from 'reactstrap';
import { BsList } from "react-icons/bs";
import avatar from '../../assets/images/Header/Avatar.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import jwt from 'jwt-decode';

function Header(props) {
    // console.log('userdata',props.userData)
    const [isLogin,setIsLogin] = useState(false);
    const [userToken,setUserToken] = useState(localStorage.getItem('userToken')||null)
    const [name,setName] = useState('')
    
    useEffect(()=>{
        let token =localStorage.getItem('userToken')
        if(token!==null)
        {
            setUserToken(token)
            const user = jwt(userToken)
            setName(user.family_name)
            setIsLogin(true);
        }
        else{
            setUserToken(null)
            setIsLogin(false);
        }
    },[userToken,isLogin]);

    const navigate = useNavigate();
    const handleLogout = () =>
    {
        if(userToken!==null)
        {
            localStorage.removeItem('userToken');          
        }
        setIsLogin(false)
        navigate('/');
    }
    const [showAccountBlock,setShowAccoutBlock] = useState(false)
    function handleOpenAccount (e)
    {
        setShowAccoutBlock(!showAccountBlock);
    }


    return (

        
        <div>
            {/* <header> */}
            <Container fluid className="bg-dark border" id='header'>
                <div className ="header__container">        
                    <div className="header__container-left">
                        <div className='logo__container'>
                            <Link to ='/'><img src={logo} alt="error" /></Link>
                        </div> 
                        <div className="header__info">
                        <span className='header__icon'>
                            <BiPhone size="24px"/> <Link to ="">1900 3267</Link>
                        </span>
                        <span className='header__icon'>
                            <BsEnvelope size="24px"/><Link to ="">mioto@contact.vn</Link>
                        </span>
                        </div>     
                    </div>

                    <div className="header__container-right">
                        <BiCar size="24px"/>
                        <ul className='header__chosen'>                            
                             <li>
                                <Link to='/owner-home' className='.host__btn'>Tr??? th??nh ch??? xe</Link>
                             </li>
                             {
                                isLogin?<li>
                                <button onClick={handleOpenAccount}>
                                    <img src={avatar} alt="" className='img_avt'/>
                                    {name}
                                </button>
                                {/* <select onChange={props.onChange} */}
                                { showAccountBlock? <div className="user__account">
                                    <ul className="user__account-list">
                                        <li><Link to ="/profile">T??i kho???n</Link></li>
                                        <li><Link to ="/myCars">Xe c???a t??i</Link></li>
                                        <li><Link to ="/myTrips">Chuy???n c???a t??i</Link></li>
                                        {/* <li><button onClick={props.openChangePw}>?????i m???t kh???u</button></li> */}
                                        <li><button onClick={handleLogout}>????ng xu???t</button></li>
                                    </ul>
                                </div>: ''}
                            </li>: <><li>
                                    {/* <button onClick={props.openLogin} className='log'>????ng nh???p</button> */}
                                    </li>
                            <li>
                                    {/* <button onClick={props.openRegister} className='log btn__style'>????ng k??</button> */}
                            </li></> 
                            }
                          
                        </ul>
                        <button className='header__menu-btn'>
                            <BsList/>
                        </button>
                    </div>
                </div>
                <img src={leftImg} className="header__img-left"alt="erorr" />
                <img src={leftImg} className="header__img-right"alt="erorr" />
            </Container>
            {/* </header> */}
        </div>
    );
}

export default Header;