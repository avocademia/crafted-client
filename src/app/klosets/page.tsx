'use client'

import { act, useEffect, useState } from "react"
import { populateKlosets } from "../../api/Public"
import KlosetPageNav from './components/nav/KlosetPageNav'
import AllKlosets from "./components/all klosets/AllKlosets"
import { KlosetData } from "../../Types"
import { loadUserData } from "../../Helpers"
import { toast } from "react-toastify"
import FollowingKlosets from "./components/following klosets/FollowingKlosets"

type Displays = 'all'|'following'

const Klosets = () => {

    const [activeDisplay, setDisplay] = useState<Displays>('all')
    const [klosets, setKlosets]= useState<KlosetData[]>([]) 
    const [followedKlosets, setFollowedKlosets] = useState<KlosetData[]>([])
    useEffect(() => {
        populateKlosets().then (json => {
            if (json) {
              setKlosets(json)
            }
            return json
        }).then(json => {
            const user = loadUserData()
            if (json && user) {
              const following = json.filter(kloset => kloset.followers?.includes(user.id))
              setFollowedKlosets(following)
            }
        }).catch(err => {
            toast.error('unexpected error populating page')
        })
    }, [])

    console.log('all:', klosets)
    console.log('following', followedKlosets)

    return (
      <div>
        {activeDisplay === 'all' && <AllKlosets klosets={klosets}/>}
        {activeDisplay === 'following' && <FollowingKlosets followedKlosets={followedKlosets}/>}
        <KlosetPageNav setDisplay={setDisplay}/>
      </div>
    )
}
export default Klosets