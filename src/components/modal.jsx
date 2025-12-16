export default function Modal({open, close, children, containerClass}) {
    if(open){
        return (
            <div className="modal">
                <div className={`modal-content ${containerClass}`}>
                    {children}
                    <button className="cancele-btn" onClick={close}>close</button>
                </div>
            </div>
        )
    }else{
        return null
    }
}  