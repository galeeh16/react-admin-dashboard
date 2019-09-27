import React from 'react';

const UserDropdown = ({user}) => {
    return (
        <option value={user.username}>{user.username}</option>
    )
}

export default UserDropdown