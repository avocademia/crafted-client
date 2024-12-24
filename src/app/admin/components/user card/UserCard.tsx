import { Icon } from "@iconify/react"
import Image from "next/image"
import styles from './UserCard.module.scss'
import { changeRole } from "../../../../api/Admin"
import { UserData } from "../../../../Types"

const UserCard = ({username,whatsapp_number,role}: UserData) => {

  const handleRoleChange = async () => {
    const confirmChange = window.confirm(`Are you sure you want to change @${username}'s role?`)

    if (confirmChange) {
      changeRole(role)
    }

  }
  return (
    <article className={styles.card}>
        <Image src='/user.png' alt="profile picture" height={20} width={20}/>
        <h4>@{username}</h4>
        <div className={styles.role}>
          <h5>{role}</h5>
          <button onClick={() => handleRoleChange()}>
            <Icon icon="material-symbols:question-exchange-rounded" width={24} height={24} color= '#3b0000' />
          </button>
          
        </div>
        <a href={`https://wa.me/${whatsapp_number}`} target="_blank" >
            <Icon icon="mingcute:whatsapp-line" width={30} height={30} color='#002d00'/>
        </a>
    </article>
  )
}
export default UserCard