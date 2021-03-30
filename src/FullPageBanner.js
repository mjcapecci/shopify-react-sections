const FullPageBanner = ({ element }) => {
  const memoizedImages = React.useMemo(() => {
    return element.dataset.images.split(',');
  }, []);

  const memoizedText = React.useMemo(() => {
    return element.dataset.title;
  }, []);

  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const [currentImage, setCurrentImage] = React.useState(
    `url(${memoizedImages[currentImageIndex]})`
  );

  const handleImageUpdate = () => {
    if (currentImageIndex < memoizedImages.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    } else {
      setCurrentImageIndex(0);
    }
  };

  React.useEffect(() => {
    setCurrentImage(`url(${memoizedImages[currentImageIndex]})`);
  }, [currentImageIndex]);

  React.useEffect(() => {
    setTimeout(() => {
      handleImageUpdate();
    }, 5000);
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
    transition: 'background 1s linear',
  };

  return (
    <React.Fragment>
      <div className='full-page-banner' style={styles}>
        <h1>{memoizedText}</h1>
      </div>
    </React.Fragment>
  );
};

let domAll = document.querySelectorAll('#full-page-banner-container');

[...domAll].forEach((node) =>
  ReactDOM.render(<FullPageBanner element={node} />, node)
);
