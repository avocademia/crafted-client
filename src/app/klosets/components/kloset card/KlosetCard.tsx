import { KlosetData } from "./src/Types"

const Klosetcard = ({kloset}:{kloset:KlosetData}) => {
  return (
    <div>{kloset.name}</div>
  )
}
export default Klosetcard