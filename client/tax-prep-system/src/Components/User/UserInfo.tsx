import React from 'react'
import { useSelector } from 'react-redux';
import { selectCurrentSSN, selectCurrentToken } from '../../Slices/AuthSlicer';

function UserInfo() {
    const accessToken = useSelector(selectCurrentToken);
    const ssn = useSelector(selectCurrentSSN);
    return (
        <div>
        {/* Display the accessToken */}
        <p>Access Token: {accessToken}</p>
        <p>ssn: {ssn}</p>
      </div>
    )
}

export default UserInfo