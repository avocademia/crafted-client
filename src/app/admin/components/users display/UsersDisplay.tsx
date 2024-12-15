import { UserData } from '../../../../Types'
import styles from './usersDisplay.module.scss'
import UserCard from '../user card/UserCard'

const UsersDisplay = ({users}:{users:UserData[]}) => {
  return (
    <div className={styles.display}>
        {users.map((user, index) => 
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