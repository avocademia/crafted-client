import { KlosetData } from "../../../../Types"
import KlosetCard from "..//kloset card/KlosetCard"

const KlosetDisplay = ({results}:{results: KlosetData[]}) => {

    const searchResults = results.map(kloset => <KlosetCard kloset={kloset}/>)
    const content = searchResults.length? searchResults: <div><p>No Matches</p></div>

  return (
    <article>{content}</article>
  )
}
export default KlosetDisplay