import { createRef, useEffect } from "react";
import "@left4code/tw-starter/dist/js/modal";
import { init } from "./index";
import PropTypes from "prop-types";

function Dropzone(props) {
  const fileUploadRef = createRef();
  useEffect(() => {
    props.getRef(fileUploadRef.current);
    init(fileUploadRef.current, props);
  }, [props.file]);

  const { options, getRef, ...computedProps } = props;

  console.log()
  return (
    <div className="dropzone" {...computedProps} ref={fileUploadRef} >
      <div className="dz-message">{props.children}</div>
    </div>
  );
}

Dropzone.propTypes = {
  options: PropTypes.object,
  getRef: PropTypes.func,
  setFile: PropTypes.func,
};

Dropzone.defaultProps = {
  options: {},
  getRef: () => { },
  setFile: () => { },
};

export default Dropzone;
