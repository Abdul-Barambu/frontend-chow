import React, { useState } from 'react'
import './AddNewFood.css'
import { MdOutlineCancel } from 'react-icons/md'

const EditPrice = ({ handleEdit }) => {

    const [price, setPrice] = useState('');

    return (
        <div>
            <div className="payment-container-add">
                <div className="cancel-icon-add"><MdOutlineCancel className='cancel-add' onClick={handleEdit} /></div>
                <div className='input-food-div'>
                    <form action="">
                        <div className="form">
                            {/* <div className="mb-3">
                                <label htmlFor="name" className="form-label label-text-add">Old Price</label>
                                <input type="text"
                                    className="form-control input-add"
                                    placeholder="Dish Name"
                                    disabled
                                />
                            </div> */}
                            <div className="mb-3">
                                <label htmlFor="price" className="form-label label-text-add">New Price</label>
                                <input type='text'
                                    className="form-control input-add"
                                    id="price" placeholder="₦ 00.00"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    required
                                />
                            </div>
                            <button className='add-btn'>Save Item</button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditPrice
