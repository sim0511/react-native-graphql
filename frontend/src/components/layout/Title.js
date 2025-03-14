const Title = ({content}) => {
  const styles = getStyles()

  return <h1 style={styles.title}>{content}</h1>

}

const getStyles = () => ({
  title: {
    fontSize: 20, 
    padding: '15px',
    marginBottom: '10px'
  }
})

export default Title
