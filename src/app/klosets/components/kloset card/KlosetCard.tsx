import { followKloset } from "../../../../api/User"
import { loadUserData } from "../../../../Helpers"
import { KlosetData } from "../../../../Types"
import { useState } from "react"

const Klosetcard = ({kloset}:{kloset:KlosetData}) => {
  const user = loadUserData()
  const [localFollowers, setLocalFollowers] = useState(kloset.followers||[])

  const handleFollow = async () => {
    followKloset(kloset.id)
    const follower = user? user.id:''
    setLocalFollowers([...localFollowers, follower])
  }

  const isFollowing = user && localFollowers.includes(user.id)

  return (
    <div>
      <h4>{kloset.name}</h4>
      <h6>{kloset.type}</h6>
      <div>
        <button>view</button>
        {!isFollowing &&
          <button onClick={handleFollow}>Follow</button>
        }
        {isFollowing &&
          <p>Following</p>
        }
      </div>
    </div>
  )
}
export default Klosetcard