const KlosetPageNav = ({setDisplay}:{setDisplay: Function}) => {

    const setAll = () => {
        setDisplay('all')
    }

    const setFollowing = () => {
        setDisplay('following')
    }
  return (
    <div>
        <button onClick={setAll}>all</button>
        <button onClick={setFollowing}>following</button>
    </div>
  )
}
export default KlosetPageNav