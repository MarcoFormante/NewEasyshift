import React from 'react'
import TableAdmin from './TableAdmin'
import Title from '../../Layout/Title/Title'
import ShowMore from '../../Elements/ShowMore/ShowMore'
import axios from '../../../AxiosApi/axios'
import { useDispatch } from 'react-redux'
import { setAlert } from '../../../Redux/alertSlice'

const Comments = (props) => {
const dispatch = useDispatch()

const deleteComment = (id) => {
    axios.post("commentApi.php", {
        action: "deleteComment",
        commentId:id 
    }, {
        headers: {
            "Content-Type":"multipart/form-data"
        }
    }).then(response => {
        console.log(response.data);
        if (response.data.status === 1) {
            dispatch(setAlert({ type: "success", text: "Comment Deleted", title: "Success", timeout: 5000 }))
            props.deleteLocalComment(id, props.requestTarget[0].id)
          
        } else {
            dispatch(setAlert({type:"error",text:"Connection Problem",title:"Error",timeout:5000}))
        }
    })
}

    return (
        <div className='fixed-page' style={{ padding: "5px 0 50px 0" }}>
            <div onClick={() => props.closeCommentWindow()}>
                <span className='back-btn btn' style={{ top: 5 }}></span>
            </div>
            <Title title={"Request Target"} />
            {props.requestTarget &&
                <TableAdmin
                target={"requests"}
                requests={props.requestTarget}
                borderWhite={true}
                requestOff={true}
            />
            }
            <hr className='mar-top-m'/>
            <Title title={"Comments"}/>
            {props.comments &&
                <TableAdmin
                target={"comments"}
                comments={props.comments}
                deleteComment={deleteComment}
                />}
        
    </div>
  )
}

export default Comments
