import React, { useState } from 'react'
import './AddNewFood.css'
import { MdOutlineCancel } from 'react-icons/md'
import axios from 'axios';
import Swal from 'sweetalert2';

const AddNewSpecial = ({ handleAddDish }) => {

    const [food_name, setFood_Name] = useState('');
    const [price, setPrice] = useState('');

    const accessToken = localStorage.getItem("Access-Token-vendor");

    const headers = {
        Authorization: `Bearer ${accessToken}`
    };

    const handleAddNewSpecial = (e) => {
        e.preventDefault()
        axios.post("https://api-chow.onrender.com/api/vendors/menu/specials", {
            food_name: food_name,
            price: price
        }, {headers})
        .then(response => {
            console.log(response)
            Swal.fire({
                icon: 'success',
                title: 'SUCCESS',
                text: 'Food added successfully, Click OK to continue'
            });
            setTimeout(() => {
                window.location.reload()
            }, 1000)
        }).catch(e => {
            console.log(e)
            Swal.fire({
                icon: 'error',
                title: 'ERROR',
                text: 'An Error Occured'
            });
        })
    }

    return (
        <div>
            <div className="payment-container-add">
                <div className="cancel-icon-add"><MdOutlineCancel className='cancel-add' onClick={handleAddDish} /></div>
                <div className='input-food-div'>
                    <form onSubmit={handleAddNewSpecial}>
                        <div className="form">
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label label-text-add">Name</label>
                                <input type="text"
                                    className="form-control input-add"
                                    id="name"
                                    placeholder="Special Name"
                                    value={food_name}
                                    onChange={(e) => setFood_Name(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="price" className="form-label label-text-add">Price</label>
                                <input type='text'
                                    className="form-control input-add"
                                    id="price" placeholder="₦ 00.00"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    required
                                />
                            </div>
                            <button type='Submit' className='add-btn'>Save Item</button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddNewSpecial
