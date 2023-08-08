import React from 'react'
import { useSelector } from 'react-redux';
import { selectCurrentSSN} from '../../Slices/AuthSlicer';

function UserInfo() {
    const ssn = useSelector(selectCurrentSSN);
    return (
        <div>
        {/* Display the accessToken */}
        <p>ssn: {ssn}</p>
      </div>
    )
}

export default UserInfo