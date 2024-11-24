

const UtcToLocalTime = ({date}) => {

  return (
    <>{new Date(date).toLocaleString()}</>
  )
}

export default UtcToLocalTime