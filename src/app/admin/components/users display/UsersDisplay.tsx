import { UserData } from '../../../../Types'
import styles from './usersDisplay.module.scss'
import UserCard from '../user card/UserCard'
import { useState } from 'react'

const UsersDisplay = ({users}:{users:UserData[]}) => {

  const [filterRole, setFilterRole] = useState<string>('')

  const handleFilterChange = (role: string) => {
    setFilterRole(role);
  };

  const filteredUsers = filterRole
    ? users.filter((user) => user.role === filterRole)
    : users
  
  return (
    <div className={styles.display}>
      <div className={styles.filterControls}>
        <button
          className={filterRole === '' ? styles.active : styles.filterBtn}
          onClick={() => handleFilterChange('')}
        >
          all
        </button>
        <button
          className={filterRole === 'admin' ? styles.active : styles.filterBtn}
          onClick={() => handleFilterChange('admin')}
        >
          admin
        </button>
        <button
          className={filterRole === 'customer' ? styles.active : styles.filterBtn}
          onClick={() => handleFilterChange('customer')}
        >
          customer
        </button>
      </div>
        {filteredUsers.map((user, index) => 
            (<UserCard 
                key={index} 
                username={user.username} 
                whatsapp_number={user.whatsapp_number} 
                role={user.role} 
                first_name={user.first_name}
                profile_picture={user.profile_picture}
                authenticated={user.authenticated}
                id={user.id}
            />))
        }
    </div>
  )
}
export default UsersDisplay