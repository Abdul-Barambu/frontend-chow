import React from 'react'
import './VendorProfile.css'
import { useHistory } from 'react-router-dom/cjs/react-router-dom'
import Swal from 'sweetalert2'

const VendorProfile = () => {

    const history = useHistory()

    const out = () => {
        localStorage.clear();
        Swal.fire({
            icon: 'success',
            title: 'SUCCESS',
            text: 'Logged Out Successfully'
        });
        history.push("/")
    }

    return (
        <div>
            <h1>Vendor Profile Setting Coming up....</h1>
            <h2 onClick={out}>Logout</h2>
        </div>
    )
}

export default VendorProfile
