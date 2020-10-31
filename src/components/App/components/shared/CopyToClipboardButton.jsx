import React, { useState } from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Button } from '@material-ui/core'

export default function CopyToClipboardButton({text, tooltipText, buttonOptions, className, children}) {
  const [copied, setCopied] = useState(false)
  const [show, setShow] = useState(false)

  const handleCopyTooltip = () => {
    setCopied(true)
    setTimeout(() => setCopied(false), 3000)
  };

  return <div className='d-flex flex-row'>
      <Tooltip
        arrow
        PopperProps={{
          disablePortal: true,
        }}
        open={copied || show}
        disableFocusListener
        disableHoverListener
        disableTouchListener
        title={copied ? 'Скопировано!' : tooltipText}
      >
        <CopyToClipboard text={text}
                        onCopy={handleCopyTooltip}>
          <Button {...buttonOptions}
                  onMouseEnter={() => setShow(true)}
                  onMouseLeave={() => setShow(false)}
                  className={className}>
            { children || 'Копировать' }
          </Button>
        </CopyToClipboard>
      </Tooltip>
  </div>
}
