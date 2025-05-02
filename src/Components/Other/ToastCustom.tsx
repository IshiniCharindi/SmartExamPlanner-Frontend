import successIcon from '../../assets/icons/check-circle.png'
import warningIcon from '../../assets/icons/square-exclamation.png'
import info from '../../assets/icons/info.png'
import cross from '../../assets/icons/cross.png'
import {CloseCircleOutlined} from '@ant-design/icons'
import toast from 'react-hot-toast'
import '../../styles/message.css'


const selectType = (type:string) => {
    switch(type) {
        case 'error':
            return cross
        case 'success':
            return successIcon
        case 'info':
            return info
        case 'warning':
            return warningIcon
    }
}

export default function ToastCustom(props: any) {
    const type = props.type

    return (
        <div className='message-box ml-6'
             style={{position: 'relative', flexDirection: 'column'}}
        >

            <div className='horizontal-comp'>
                <div className={`vertical-line ${type}`}></div>

                <div className="icon">
                    <img src={selectType(type)} alt="success-icon" width='40'/>
                </div>

                <div className="content">
                    <h3 className='heading'>{props.header}</h3>

                    <p style={{color: 'rgb(0, 0, 0, 0.4)'}}>{props.children}</p>

                    <div className="time-line"></div>

                </div>

                <button style={{border: 0}} className='cross self-start w-fit h-fit active:border-0 focus:border-0' id='closeBtn' onClick={() => {
                    toast.dismiss(props.toastID)
                }}><CloseCircleOutlined className='text-red-600'/></button>
            </div>
        </div>
    )
}