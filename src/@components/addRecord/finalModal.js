import React from 'react'
import {Modal, Button, Row} from 'react-bootstrap'
import ReactDOM from 'react-dom'
const FinalModal = ({finalModal, setFinalModal, setShow}) => {
    const handleClose = () => {
        setShow(false)
        setFinalModal(false)
    }
    return ReactDOM.createPortal (
        <Row className = 'justify-content-center align-items-center' style = {{
            position: 'fixed',
            top : '0px',
            bottom : '0px',
            left : '0px',
            right : '0px',
        }}>
            
        <Modal style = {{
                paddingTop : '35vh',
                backgroundColor: 'rgba(0, 0, 0, 0.7)'
            }} dialogClassName="my-modal" show={finalModal} onHide={() => setFinalModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title className = 'ml-auto responsive-content-title'>Discard Post?</Modal.Title>
        </Modal.Header>
        <Modal.Body>If you leave, your edits won't be saved.</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Discard
          </Button>
          <Button variant="secondary" onClick={() => setFinalModal(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      </Row>,
      document.getElementById("portal-root")
    )
}

export default FinalModal
