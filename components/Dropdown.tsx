import React, { useState } from "react";

const Dropdown = (props: any) => {
  const [display, setDisplay] = useState('none')
  const [buttonMessage, setButtonMessage] = useState('Show')

  const handleClick = () => {
    if (display === 'none') {
      setDisplay('block');
      setButtonMessage('Hide')
    }
    else {
      setDisplay('none');
      setButtonMessage('Show')
    }
  }

  return <>
    <button onClick={() => { handleClick() }}>{buttonMessage}</button>
    <div style={{ display: display }}>{props.children}</div>
  </>
}

export default Dropdown