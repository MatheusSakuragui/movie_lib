import {useNavigate} from 'react-router-dom'

export default function goPage(id,type){
    const navigate = useNavigate()
    
    navigate(`view/${type}/${id}`)
    
}