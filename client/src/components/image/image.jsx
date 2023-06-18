const Image = ({src,...rest}) => {
    return (
      <img {...rest} src={src} alt='' />
    );
}

export default Image;