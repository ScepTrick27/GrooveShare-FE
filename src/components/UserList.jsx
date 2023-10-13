import React from "react"
import UserItem from './UserItem';

function UserList(props) {
  return (
    <ul>
      {props.users.map(user => (
        <UserItem key={user.userId} user={user} />
      ))}
    </ul>
  )
}

export default UserList;

