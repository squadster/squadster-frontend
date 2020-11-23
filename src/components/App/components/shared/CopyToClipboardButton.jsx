import React, { useState, useEffect } from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Button } from '@material-ui/core'

export default function CopyToClipboardButton({text, tooltipText, Element=Button, buttonOptions, className, children}) {
  const [copied, setCopied] = useState(false)
  const [show, setShow] = useState(false)

  const handleCopyTooltip = () => {
    setCopied(true)
    setShow(true)
  };

  useEffect(() => {
    let timer
    if (copied)
      timer = setTimeout(() => {
        setShow(false)
        setCopied(false)
      }, 3000)
   
    return () => clearTimeout(timer)
  }, [copied])

  return <div className='d-flex flex-row'>
      <Tooltip
        arrow
        PopperProps={{
          disablePortal: true,
        }}
        open={show}
        disableFocusListener
        disableHoverListener
        disableTouchListener
        title={tooltipText ? (copied ? 'Скопировано!' : tooltipText) : 'Скопировано!'}
      >
        <CopyToClipboard text={text}
                        onCopy={handleCopyTooltip}>
          <Element {...buttonOptions}
                  onMouseEnter={() => (tooltipText || copied) && setShow(true)}
                  onMouseLeave={() => setShow(false)}
                  className={className}>
            { children || 'Копировать' }
          </Element>
        </CopyToClipboard>
      </Tooltip>
  </div>
}
