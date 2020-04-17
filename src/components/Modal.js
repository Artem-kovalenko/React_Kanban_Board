import React, {forwardRef, useImperativeHandle} from "react";
import ReactDom from "react-dom";

const modal_wrapperStyles = {
  position: "fixed",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
}

const modal_backdropStyles = {
  position: "fixed",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  zIndex: 100,
  backgroundColor: "rgba(0,0,0,0.3)",
}

const modal_boxStyles = {
  wordBreak: "break-all",
  position: "relative",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minHeight: "50%",
  width: "20%",
  overflowY: "auto",
  backgroundColor: "white",
  boxShadow: "0 0 10px rgba(0,0,0,0.25)",
  zIndex: 101,
  padding: 30,
  borderRadius: 10,
  fontSize:17,
  lineHeight:1.8,
  fontWeight: "500",
  fontFamily: "Arial, Helvetica, sans-serif"
}

const Modal = forwardRef((props, ref) => {
  const [display, setDisplay] = React.useState(false);

  useImperativeHandle(ref, () => {
    return {
      openModal: () => open(),
      closeModal: () => close()
    }
  })
  const open = () => {
    setDisplay(true)
  }
  const close = () => {
    setDisplay(false)
  }
  if(display) {
    return ReactDom.createPortal(
      <div style={modal_wrapperStyles} className={"modal-wrapper"}>
        <div onClick={close} style={modal_backdropStyles} className={"modal-backdrop"}></div>
        <div style={modal_boxStyles} className={"modal-box"}>
        {props.children}
        </div>
      </div>, document.getElementById("modal-root"))
  } else return null
});

export default Modal
