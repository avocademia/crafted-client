import { Icon } from "@iconify/react"
import Image from "next/image"
import styles from './UserCard.module.scss'
import { changeRole } from "../../../../api/Admin"
import { User } from "../../../../Types"

const UserCard = ({username,whatsapp_number,role,id}: User) => {

  const handleRoleChange = async () => {
    const confirmChange = window.confirm(`Are you sure you want to change @${username}'s role?`)

    if (confirmChange) {
      changeRole({role: role, id: id})
    }

  }
  return (
    <article>
        <div className={styles.ppContainer}>
          <Image src='/user.png' alt="profile picture" height={20} width={20}/>
        </div>
        <div className={styles.textContainer}>
          <h4>@{username}</h4>
          <button onClick={() => handleRoleChange()} >{role}</button>
          <a href={`https://wa.me/${whatsapp_number}`} target="_blank" >
            <Icon icon="ic:baseline-whatsapp"/>
          </a>
        </div>
    </article>
  )
}
export default UserCard