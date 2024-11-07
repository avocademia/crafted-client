import { Icon } from "@iconify/react"
import Image from "next/image"
import styles from './UserCard.module.css'
import { changeRole } from "@/api/Admin"

const UserCard = ({username,number,role,id}) => {

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
          <a href={`https://wa.me/${number}`} target="_blank" >
            <Icon icon="ic:baseline-whatsapp"/>
          </a>
        </div>
    </article>
  )
}
export default UserCard