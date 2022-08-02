import {useNavigate} from 'react-router-dom'

export default function GoPage(id,type){
    const navigate = useNavigate()
    return navigate(`view/${type}/${id}`)
    
}