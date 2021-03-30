let domContainer = document.querySelector('#full-page-banner-container');
let domContainer2 = document.querySelector('#full-page-banner-container-2');

const FullPageBanner = () => {
  const memoizedImages = React.useMemo(() => {
    return domContainer.dataset.images.split(',');
  }, []);

  const memoizedText = React.useMemo(() => {
    return domContainer.dataset.title;
  }, []);

  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const [currentImage, setCurrentImage] = React.useState(
    `url(${memoizedImages[currentImageIndex]})`
  );

  const handleImageUpdate = () => {
    console.log(memoizedImages);
    if (currentImageIndex <= 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    } else {
      setCurrentImageIndex(0);
    }
  };

  React.useEffect(() => {
    setCurrentImage(`url(${memoizedImages[currentImageIndex]})`);
  }, [currentImageIndex]);

  const styles = {
    background: currentImage,
    height: '100vh',
    width: '100vw',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    fontSize: '24px',
    transition: 'background .2s linear',
  };

  return (
    <React.Fragment>
      <div className='full-page-banner' style={styles}>
        <h1>{memoizedText}</h1>
      </div>
      <button onClick={() => handleImageUpdate()}>UPDATE IMAGE</button>
    </React.Fragment>
  );
};

ReactDOM.render(<FullPageBanner />, domContainer);
ReactDOM.render(<FullPageBanner />, domContainer2);
