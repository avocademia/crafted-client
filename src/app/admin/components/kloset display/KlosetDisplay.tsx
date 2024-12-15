import Link from "next/link"
import { Icon } from "@iconify/react"
import styles from './klosetDisplay.module.scss'
import { Kloset } from "../../../../Types"
import KlosetCard from "../kloset card/KlosetCard"

const KlosetDisplay = ({klosets}:{klosets:Kloset[]}) => {
  return (
    <div className={styles.display}>
        <div className={styles.addButtonContainer}>
            <Link href='/admin/add-kloset'>
                <Icon  icon="ic:round-plus" className={styles.icon}/>
            </Link>
        </div>
        <div className={styles.klosets}>
            { klosets.map((kloset) => 
                (<Link key={kloset.id} href={`admin/${kloset.id}`} className={styles.klosetLink}>
                    <KlosetCard kloset={kloset}/>
                </Link>))
            }
        </div>
    </div>
  )
}
export default KlosetDisplay